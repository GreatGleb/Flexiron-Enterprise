/**
 * Supplier Card Configuration Logic
 * Handles drag-and-drop, editor panel, modals, and persistence
 */

console.log('Flexiron: Supplier Card Config Logic Loading...');

// State
let configState = {
    fields: [],
    sections: [],
    selectedItem: null,
    isDirty: false,
    users: {
        admin: ['admin@flexiron.com', 'super@flexiron.com'],
        sales: ['sales1@flexiron.com', 'sales2@flexiron.com'],
        warehouse: ['warehouse@flexiron.com'],
        accounting: ['accounting@flexiron.com', 'finance@flexiron.com']
    },
    // Track user permissions per item: { itemId: { role: { userEmail: { action: boolean } } } }
    userPermissions: {},
    // Track override fields: { itemId: true }
    overrideFields: {}
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
    initializeModals();
    initializeCustomSelects();
    recalculateAllUsageCounts();
    initializePermissionsTable();
    initializeTooltips();
    loadConfiguration();
    
    // Register language change callback to rebuild permissions table
    if (typeof translationEngine !== 'undefined') {
        translationEngine.onLanguageChange.push(rebuildPermissionsTableOnLanguageChange);
    }
});

// === CUSTOM SELECT ===
function initializeCustomSelects() {
    document.querySelectorAll('.custom-select-wrap').forEach(wrap => {
        const trigger = wrap.querySelector('.custom-select-trigger');
        const valSpan = wrap.querySelector('.curr-val');
        const list = wrap.querySelector('.custom-select-list');
        const options = wrap.querySelectorAll('.custom-select-option');
        const hiddenInput = wrap.querySelector('input[type="hidden"]');

        if (!trigger || !list) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = list.classList.toggle('open');
            wrap.classList.toggle('open', isOpen);
            
            const panel = wrap.closest('.glass-panel');
            wrap.style.zIndex = isOpen ? "100" : "1";
            if (panel) panel.style.zIndex = isOpen ? "10" : "1";
            
            document.querySelectorAll('.custom-select-list').forEach(l => {
                if (l !== list) {
                    l.classList.remove('open');
                    const parentWrap = l.closest('.custom-select-wrap');
                    if (parentWrap) {
                        parentWrap.classList.remove('open');
                        parentWrap.style.zIndex = "1";
                        const parentPanel = parentWrap.closest('.glass-panel');
                        if (parentPanel) parentPanel.style.zIndex = "1";
                    }
                }
            });
        });

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                if (valSpan) valSpan.innerHTML = opt.innerHTML;
                if (hiddenInput) hiddenInput.value = opt.dataset.value;
                list.classList.remove('open');
                wrap.classList.remove('open');
                wrap.style.zIndex = "1";
                const panel = wrap.closest('.glass-panel');
                if (panel) panel.style.zIndex = "1";
                markDirty();
            });
        });
    });

    // Close on click outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-list.open').forEach(list => {
            list.classList.remove('open');
            const wrap = list.closest('.custom-select-wrap');
            if (wrap) {
                wrap.classList.remove('open');
                wrap.style.zIndex = "1";
                const panel = wrap.closest('.glass-panel');
                if (panel) panel.style.zIndex = "1";
            }
        });
    });
}

// === DRAG AND DROP ===
let draggingSectionId = null;

function initializeDragAndDrop() {
    const fieldLibrary = document.getElementById('field-library');
    const sectionBuilder = document.getElementById('section-builder');
    
    // Make field items draggable (both in library and in sections)
    const allFields = document.querySelectorAll('.field-library-item');
    console.log('initializeDragAndDrop: found', allFields.length, 'field items');
    
    allFields.forEach(item => {
        const isDraggable = item.getAttribute('draggable');
        console.log('field:', item.dataset.fieldId, 'already draggable:', isDraggable);
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', handleFieldDragStart);
        item.addEventListener('dragend', handleFieldDragEnd);
    });
    
    // Make section headers draggable
    document.querySelectorAll('.section-card-header').forEach(header => {
        header.setAttribute('draggable', 'true');
        header.addEventListener('dragstart', handleSectionDragStart);
        header.addEventListener('dragend', handleSectionDragEnd);
    });
    
    // Section builder container as drop target for reordering sections
    if (sectionBuilder) {
        sectionBuilder.addEventListener('dragover', handleSectionDragOver);
        sectionBuilder.addEventListener('drop', handleSectionDropOnContainer);
    }
    
    // Section cards as drop targets for reordering
    document.querySelectorAll('.config-section-card').forEach(card => {
        card.addEventListener('dragover', handleSectionDragOver);
        card.addEventListener('drop', handleSectionDropOnCard);
    });
    
    // Drop zones in sections for fields
    document.querySelectorAll('.section-fields-list').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleFieldDrop);
    });
}

function handleFieldDragStart(e) {
    e.stopPropagation(); // Prevent section card from capturing drag
    
    const item = e.target.closest('.field-library-item');
    if (!item) {
        console.log('handleFieldDragStart: no item found, e.target:', e.target);
        return;
    }
    
    const fieldId = item.dataset.fieldId;
    console.log('handleFieldDragStart:', fieldId, 'draggable:', item.getAttribute('draggable'));
    item.classList.add('dragging');
    e.dataTransfer.setData('application/field-id', fieldId);
    e.dataTransfer.setData('text/plain', fieldId); // Fallback
    e.dataTransfer.effectAllowed = 'move';
}

function handleFieldDragEnd(e) {
    const item = e.target.closest('.field-library-item');
    if (item) item.classList.remove('dragging');
    console.log('handleFieldDragEnd');
}

function handleSectionDragStart(e) {
    const header = e.target.closest('.section-card-header');
    if (!header) return;
    
    const card = header.closest('.config-section-card');
    const actionBtn = e.target.closest('.section-action-btn');
    
    console.log('handleSectionDragStart - header:', header, 'card:', card, 'actionBtn:', actionBtn);
    
    // Block drag from action buttons
    if (!card || actionBtn) {
        console.log('handleSectionDragStart - blocked, on action btn');
        e.preventDefault();
        return;
    }
    
    console.log('handleSectionDragStart - starting drag for section:', card.dataset.sectionId);
    card.classList.add('dragging');
    draggingSectionId = card.dataset.sectionId;
    e.dataTransfer.setData('application/section-id', card.dataset.sectionId);
    e.dataTransfer.effectAllowed = 'move';
}

function handleSectionDragEnd(e) {
    const card = e.target.closest('.config-section-card');
    if (card) card.classList.remove('dragging');
    draggingSectionId = null;
    // Remove drop indicator
    document.querySelectorAll('.section-drop-indicator').forEach(el => el.remove());
}

function handleSectionDragOver(e) {
    // Only handle if dragging a section
    if (!draggingSectionId) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const container = document.getElementById('section-builder');
    const cards = [...container.querySelectorAll('.config-section-card:not(.dragging)')];
    
    // Remove previous drop indicator
    document.querySelectorAll('.section-drop-indicator').forEach(el => el.remove());
    
    // Find position and show indicator
    let inserted = false;
    for (const card of cards) {
        const rect = card.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
            const indicator = document.createElement('div');
            indicator.className = 'section-drop-indicator';
            card.parentNode.insertBefore(indicator, card);
            inserted = true;
            break;
        }
    }
    
    // If not inserted above any card, show at the end
    if (!inserted && cards.length > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'section-drop-indicator';
        container.appendChild(indicator);
    }
}

function handleSectionDrop(e) {
    const sectionId = e.dataTransfer.getData('application/section-id');
    console.log('handleSectionDrop - sectionId:', sectionId, 'target:', e.target);
    
    if (!sectionId) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Remove drop indicator
    document.querySelectorAll('.section-drop-indicator').forEach(el => el.remove());
    
    const draggedCard = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    const targetCard = e.target.closest('.config-section-card');
    
    console.log('handleSectionDrop - draggedCard:', draggedCard, 'targetCard:', targetCard);
    
    if (!draggedCard || !targetCard || draggedCard === targetCard) return;
    
    const container = document.getElementById('section-builder');
    
    // Determine if dropping before or after based on mouse position
    const rect = targetCard.getBoundingClientRect();
    const insertBefore = e.clientY < rect.top + rect.height / 2;
    
    if (insertBefore) {
        container.insertBefore(draggedCard, targetCard);
    } else {
        container.insertBefore(draggedCard, targetCard.nextSibling);
    }
    
    draggedCard.classList.remove('dragging');
    markDirty();
    console.log('handleSectionDrop - section moved');
}

function handleSectionDropOnCard(e) {
    const sectionId = e.dataTransfer.getData('application/section-id');
    if (!sectionId) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Remove drop indicator
    document.querySelectorAll('.section-drop-indicator').forEach(el => el.remove());
    
    const draggedCard = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    const targetCard = e.currentTarget;
    
    if (!draggedCard || draggedCard === targetCard) return;
    
    const container = document.getElementById('section-builder');
    
    // Determine if dropping before or after based on mouse position
    const rect = targetCard.getBoundingClientRect();
    const insertBefore = e.clientY < rect.top + rect.height / 2;
    
    if (insertBefore) {
        container.insertBefore(draggedCard, targetCard);
    } else {
        container.insertBefore(draggedCard, targetCard.nextSibling);
    }
    
    draggedCard.classList.remove('dragging');
    markDirty();
    console.log('handleSectionDropOnCard - section moved');
}

function handleSectionDropOnContainer(e) {
    const sectionId = e.dataTransfer.getData('application/section-id');
    console.log('handleSectionDropOnContainer - sectionId:', sectionId, 'target:', e.target);
    
    if (!sectionId) return;
    
    e.preventDefault();
    
    // Remove drop indicator
    document.querySelectorAll('.section-drop-indicator').forEach(el => el.remove());
    
    const draggedCard = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (!draggedCard) return;
    
    const container = document.getElementById('section-builder');
    const cards = [...container.querySelectorAll('.config-section-card:not(.dragging)')];
    
    // Find the card to insert before based on mouse Y position
    let insertBeforeCard = null;
    for (const card of cards) {
        const rect = card.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
            insertBeforeCard = card;
            break;
        }
    }
    
    console.log('handleSectionDropOnContainer - insertBeforeCard:', insertBeforeCard);
    
    if (insertBeforeCard) {
        container.insertBefore(draggedCard, insertBeforeCard);
    } else {
        // Drop at the end
        container.appendChild(draggedCard);
    }
    
    draggedCard.classList.remove('dragging');
    markDirty();
    console.log('handleSectionDropOnContainer - section moved');
}

function handleDragOver(e) {
    // Skip if dragging a section - let it bubble to section handlers
    if (draggingSectionId) {
        console.log('handleDragOver - skipping, dragging section:', draggingSectionId);
        return;
    }
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drop-zone-active', 'drag-over');
    console.log('dragover on:', e.currentTarget.dataset.sectionId);
}

function handleDragLeave(e) {
    // Only remove if leaving the zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove('drop-zone-active', 'drag-over');
    }
}

function handleFieldDrop(e) {
    // Skip if dragging a section
    const dragSectionId = e.dataTransfer.getData('application/section-id');
    if (dragSectionId) {
        console.log('handleFieldDrop - skipping, dragging section:', dragSectionId);
        return;
    }
    
    e.preventDefault();
    e.currentTarget.classList.remove('drop-zone-active', 'drag-over');
    
    // Try both MIME types for compatibility
    const fieldId = e.dataTransfer.getData('application/field-id') || 
                    e.dataTransfer.getData('text/plain');
    const sectionId = e.currentTarget.dataset.sectionId;
    
    console.log('drop - fieldId:', fieldId, 'sectionId:', sectionId);
    
    // Validation - just check if fieldId exists
    if (!fieldId) {
        console.warn('No fieldId in drop data');
        return;
    }
    
    // Find drop target (field we're dropping before)
    const dropZone = e.currentTarget;
    const fields = [...dropZone.querySelectorAll('.field-library-item:not(.dragging)')];
    console.log('fields in drop zone:', fields.length);
    
    const dropTarget = fields.find(field => {
        const rect = field.getBoundingClientRect();
        return e.clientY < rect.top + rect.height / 2;
    });
    
    console.log('dropTarget:', dropTarget?.dataset.fieldId || 'null (append to end)');
    
    addFieldToSection(fieldId, sectionId, dropTarget);
    markDirty();
}

function addFieldToSection(fieldId, sectionId, dropTarget = null) {
    // Find the field - first check if it's being dragged from a section (for reordering)
    // Look for .dragging field first
    let fieldItem = document.querySelector(`.section-fields-list .field-library-item.dragging[data-field-id="${fieldId}"]`);
    let isFromLibrary = false;
    
    // If not dragging from a section, check library
    if (!fieldItem) {
        fieldItem = document.querySelector(`#field-library .field-library-item[data-field-id="${fieldId}"]`);
        isFromLibrary = !!fieldItem;
    }
    
    // If still not found, check any section (shouldn't happen normally)
    if (!fieldItem) {
        fieldItem = document.querySelector(`.section-fields-list .field-library-item[data-field-id="${fieldId}"]`);
        if (!fieldItem) {
            console.error('Field not found:', fieldId);
            return;
        }
    }
    
    // Get the target section's fields list
    const targetSectionFieldsList = document.querySelector(`.section-fields-list[data-section-id="${sectionId}"]`);
    if (!targetSectionFieldsList) {
        console.error('Target section fields list not found:', sectionId);
        return;
    }
    
    // Get source section for count update
    const sourceSectionFieldsList = fieldItem.closest('.section-fields-list');
    const sourceSectionId = sourceSectionFieldsList?.dataset.sectionId;
    const isSameSection = sourceSectionId === sectionId;
    
    // Move or clone the field
    if (isFromLibrary) {
        // Clone from library with new fieldId
        const newFieldId = 'field-' + Date.now();
        const clonedField = fieldItem.cloneNode(true);
        clonedField.setAttribute('draggable', 'true');
        clonedField.classList.remove('dragging');
        clonedField.dataset.fieldId = newFieldId;
        clonedField.addEventListener('dragstart', handleFieldDragStart);
        clonedField.addEventListener('dragend', handleFieldDragEnd);
        
        // Enable action buttons on cloned field (remove disabled state)
        const hideBtn = clonedField.querySelector('.field-hide-btn');
        const deleteBtn = clonedField.querySelector('.field-delete-btn');
        if (hideBtn) {
            hideBtn.classList.remove('disabled');
            hideBtn.removeAttribute('disabled');
            hideBtn.setAttribute('onclick', `toggleFieldVisibility('${newFieldId}')`);
        }
        if (deleteBtn) {
            deleteBtn.classList.remove('disabled');
            deleteBtn.removeAttribute('disabled');
            deleteBtn.setAttribute('onclick', `deleteField('${newFieldId}')`);
        }
        
        // Insert at position or append
        if (dropTarget) {
            targetSectionFieldsList.insertBefore(clonedField, dropTarget);
        } else {
            targetSectionFieldsList.appendChild(clonedField);
        }
        
        // Update usage count on original field
        const usageBadge = fieldItem.querySelector('.field-item-badge');
        if (usageBadge) {
            const currentCount = parseInt(usageBadge.textContent) || 0;
            usageBadge.textContent = currentCount + 1;
        }
    } else {
        // Move from another section or reorder within same section
        fieldItem.classList.remove('dragging');
        
        // Insert at position or append
        if (dropTarget) {
            targetSectionFieldsList.insertBefore(fieldItem, dropTarget);
        } else {
            targetSectionFieldsList.appendChild(fieldItem);
        }
        
        // Update source section count (if different from target)
        if (!isSameSection && sourceSectionId) {
            const sourceCard = document.querySelector(`.config-section-card[data-section-id="${sourceSectionId}"]`);
            if (sourceCard && sourceSectionFieldsList) {
                const countBadge = sourceCard.querySelector('.section-field-count');
                if (countBadge) {
                    const count = sourceSectionFieldsList.querySelectorAll('.field-library-item').length;
                    // Preserve existing label text, just update count
                    const text = countBadge.textContent.split(':')[0];
                    countBadge.textContent = `${text}: ${count}`;
                }
            }
            // Recalculate usage counts when moving between sections
            recalculateAllUsageCounts();
        }
    }
    
    // Update target section field count
    const targetSectionCard = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (targetSectionCard) {
        const countBadge = targetSectionCard.querySelector('.section-field-count');
        if (countBadge) {
            const count = targetSectionFieldsList.querySelectorAll('.field-library-item').length;
            // Preserve existing label text, just update count
            const text = countBadge.textContent.split(':')[0];
            countBadge.textContent = `${text}: ${count}`;
        }
    }
    
    markDirty();
    const actionKey = isFromLibrary ? 'notification.field_added' : isSameSection ? 'notification.field_reordered' : 'notification.field_moved';
    showNotification(getTranslation(actionKey), 'success');
}

// === SECTION ACTIONS ===
function toggleSectionCollapse(sectionId) {
    const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (card) {
        card.classList.toggle('collapsed');
    }
}

function toggleSectionVisibility(sectionId) {
    console.log('toggleSectionVisibility called:', sectionId);
    const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    console.log('card found:', card);
    if (card) {
        card.classList.toggle('hidden');
        const btn = card.querySelector('.section-hide-btn');
        console.log('btn found:', btn, 'classList:', btn?.classList);
        if (btn) {
            btn.classList.toggle('active');
            console.log('active toggled, contains active:', btn.classList.contains('active'));
        }
        markDirty();
    }
}

function toggleFieldVisibility(fieldId) {
    const field = document.querySelector(`.field-library-item[data-field-id="${fieldId}"]`);
    if (field) {
        field.classList.toggle('hidden');
        const btn = field.querySelector('.field-hide-btn');
        if (btn) {
            btn.classList.toggle('active');
        }
        markDirty();
    }
}

function deleteField(fieldId) {
    const field = document.querySelector(`.field-library-item[data-field-id="${fieldId}"]`);
    if (field) {
        field.style.transition = 'all 0.3s';
        field.style.opacity = '0';
        field.style.transform = 'translateX(20px)';
        setTimeout(() => {
            field.remove();
            markDirty();
        }, 300);
    }
}

function editSection(sectionId) {
    const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (!card) return;
    
    // Get current section data
    const sectionName = card.querySelector('.section-name')?.textContent || '';
    
    // Populate modal fields
    document.getElementById('edit-section-name').value = sectionName;
    document.getElementById('edit-section-id').value = sectionId;
    
    // Store section ID for save
    document.getElementById('edit-section-modal').dataset.sectionId = sectionId;
    
    openModal('edit-section-modal');
}

function saveSectionEdit() {
    const modal = document.getElementById('edit-section-modal');
    const sectionId = modal.dataset.sectionId;
    const newName = document.getElementById('edit-section-name').value.trim();
    
    if (!sectionId || !newName) {
        showNotification(getTranslation('notification.fill_all_fields'), 'error');
        return;
    }
    
    const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (card) {
        const nameEl = card.querySelector('.section-name');
        if (nameEl) nameEl.textContent = newName;
        markDirty();
        showNotification(getTranslation('notification.section_updated'), 'success');
    }
    
    closeModal('edit-section-modal');
}

function deleteSection(sectionId) {
    openDeleteModal(() => {
        const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
        if (card) {
            card.remove();
            recalculateAllUsageCounts();
            markDirty();
        }
    });
}

function recalculateAllUsageCounts() {
    // Get all fields from library
    const libraryFields = document.querySelectorAll('#field-library .field-library-item');
    
    libraryFields.forEach(libField => {
        const badge = libField.querySelector('.field-item-badge');
        if (!badge) return;
        
        // Get field name from library item
        const libFieldName = libField.querySelector('.field-item-name')?.textContent?.trim().toLowerCase();
        if (!libFieldName) return;
        
        // Count how many sections use this field (match by name)
        let count = 0;
        document.querySelectorAll('.section-fields-list').forEach(sectionList => {
            const sectionFields = sectionList.querySelectorAll('.field-library-item');
            sectionFields.forEach(sectionField => {
                const sectionFieldName = sectionField.querySelector('.field-item-name')?.textContent?.trim().toLowerCase();
                if (sectionFieldName === libFieldName) {
                    count++;
                }
            });
        });
        
        badge.textContent = count;
        badge.title = `Used in ${count} section${count !== 1 ? 's' : ''}`;
    });
}

function openAddFieldToSectionModal(sectionId) {
    document.getElementById('add-field-section-name').value = '';
    // Reset custom-select to default
    const typeSelect = document.getElementById('add_field_section_type');
    if (typeSelect) typeSelect.value = 'Text';
    const typeTrigger = document.querySelector('#add-field-section-type .curr-val');
    if (typeTrigger) typeTrigger.textContent = 'Text';
    document.getElementById('add-field-section-default').value = '';
    document.getElementById('add-field-section-target').value = sectionId;
    openModal('add-field-section-modal');
}

function saveFieldToSection() {
    const sectionId = document.getElementById('add-field-section-target').value;
    const fieldName = document.getElementById('add-field-section-name').value.trim();
    // Get value from custom-select hidden input
    const typeInput = document.getElementById('add_field_section_type');
    const fieldType = typeInput ? typeInput.value.toLowerCase() : 'text';
    const defaultValue = document.getElementById('add-field-section-default').value.trim();

    if (!fieldName) {
        showNotification(getTranslation('notification.enter_field_name'), 'error');
        return;
    }

    const fieldId = 'field-' + fieldName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const fieldsList = document.querySelector(`.section-fields-list[data-section-id="${sectionId}"]`);

    if (!fieldsList) {
        showNotification(getTranslation('notification.section_not_found'), 'error');
        return;
    }

    // Create field element
    const fieldEl = document.createElement('div');
    fieldEl.className = 'field-library-item';
    fieldEl.dataset.fieldId = fieldId;
    fieldEl.dataset.fieldType = fieldType;
    fieldEl.draggable = true;

    const iconSvg = getFieldIconSvg(fieldType);

    fieldEl.innerHTML = `
        <div class="field-item-drag-handle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
        </div>
        <div class="field-item-icon field-icon-${fieldType}">
            ${iconSvg}
        </div>
        <div class="field-item-info">
            <span class="field-item-name">${fieldName}</span>
            <span class="field-item-type">${fieldType}</span>
        </div>
        <div class="field-item-actions">
            <button class="field-action-btn field-hide-btn" onclick="toggleFieldVisibility('${fieldId}')" data-i18n-title="btn.hide_field" title="Hide Field">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
            </button>
            <button class="field-action-btn field-delete-btn" onclick="deleteField('${fieldId}')" data-i18n-title="btn.delete_field" title="Delete Field">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;

    // Add drag events
    fieldEl.addEventListener('dragstart', handleFieldDragStart);
    fieldEl.addEventListener('dragend', handleFieldDragEnd);

    fieldsList.appendChild(fieldEl);
    
    // Make i18n elements visible (both data-i18n and data-i18n-title)
    fieldEl.querySelectorAll('[data-i18n], [data-i18n-title]').forEach(el => {
        el.classList.add('i18n-visible');
    });
    updateFieldCount(sectionId);
    markDirty();
    closeModal('add-field-section-modal');
    showNotification(getTranslation('notification.field_added'), 'success');
}

function getFieldIconSvg(type) {
    const icons = {
        text: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>',
        number: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17h6M10 17l3-10 3 10M6 13h8"/></svg>',
        enum: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01M19 7h.01M19 11h.01M19 15h.01M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
        date: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        boolean: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
        email: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
        url: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>'
    };
    return icons[type] || icons.text;
}

function updateFieldCount(sectionId) {
    const card = document.querySelector(`.config-section-card[data-section-id="${sectionId}"]`);
    if (card) {
        const fieldsCount = card.querySelectorAll('.field-library-item').length;
        const countEl = card.querySelector('.section-field-count');
        if (countEl) {
            countEl.innerHTML = `<span class="i18n-visible" data-i18n="section.fields">fields</span>: ${fieldsCount}`;
        }
    }
}

// === MODALS ===
let modalOpenCount = 0;

function initializeModals() {
    // Close modals on backdrop click (overlay)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                const modal = overlay.querySelector('.modal');
                if (modal) closeModal(modal.id);
            }
        });
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOpenCount > 0) {
            const openModal = document.querySelector('.modal.open');
            if (openModal) closeModal(openModal.id);
        }
    });
    
    // New Field button
    document.getElementById('btn-new-field')?.addEventListener('click', openNewFieldModal);
    
    // Add Section button
    document.getElementById('btn-add-section')?.addEventListener('click', addNewSection);
    
    // Delete modal buttons
    const deleteCancelBtn = document.querySelector('#delete-modal .btn-secondary');
    const deleteConfirmBtn = document.querySelector('#delete-modal .btn-danger');
    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', () => closeModal('delete-modal'));
    }
    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => {
            if (typeof window.deleteCallback === 'function') {
                window.deleteCallback();
                window.deleteCallback = null;
            }
            closeModal('delete-modal');
        });
    }
    
    // Edit Section modal buttons
    const editSectionCancelBtn = document.querySelector('#edit-section-modal .btn-secondary');
    const editSectionSaveBtn = document.querySelector('#edit-section-modal .btn-primary');
    if (editSectionCancelBtn) {
        editSectionCancelBtn.addEventListener('click', () => closeModal('edit-section-modal'));
    }
    if (editSectionSaveBtn) {
        editSectionSaveBtn.addEventListener('click', saveSectionEdit);
    }
    
    // Add Field to Section modal buttons
    const addFieldSectionCancelBtn = document.querySelector('#add-field-section-modal .btn-secondary');
    const addFieldSectionSaveBtn = document.querySelector('#add-field-section-modal .btn-primary');
    if (addFieldSectionCancelBtn) {
        addFieldSectionCancelBtn.addEventListener('click', () => closeModal('add-field-section-modal'));
    }
    if (addFieldSectionSaveBtn) {
        addFieldSectionSaveBtn.addEventListener('click', saveFieldToSection);
    }
    
    // New Field modal buttons
    const newFieldCancelBtn = document.querySelector('#new-field-modal .btn-secondary');
    const newFieldSaveBtn = document.querySelector('#new-field-modal .btn-primary');
    if (newFieldCancelBtn) {
        newFieldCancelBtn.addEventListener('click', () => closeModal('new-field-modal'));
    }
    if (newFieldSaveBtn) {
        newFieldSaveBtn.addEventListener('click', createNewField);
    }
}

function openModal(modalId) {
    console.log('openModal called with:', modalId);
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    const overlay = modal.closest('.modal-overlay') || document.getElementById(modalId + '-overlay');
    console.log('Modal:', modal, 'Overlay:', overlay);
    
    modal.classList.add('open');
    if (overlay) overlay.classList.add('active');
    modalOpenCount++;
    
    if (modalOpenCount === 1) {
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const overlay = modal.closest('.modal-overlay') || document.getElementById(modalId + '-overlay');
    
    modal.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    modalOpenCount = Math.max(0, modalOpenCount - 1);
    
    if (modalOpenCount === 0) {
        document.body.style.overflow = '';
    }
}

function openNewFieldModal() {
    console.log('openNewFieldModal called');
    openModal('new-field-modal');
}

function openPreviewModal() {
    // TODO: Generate preview content
    openModal('preview-modal');
}

function openDeleteModal(onConfirm) {
    window.deleteCallback = onConfirm;
    openModal('delete-modal');
}

function createNewField() {
    const nameInput = document.getElementById('new-field-name');
    const typeInput = document.getElementById('new_field_type');
    const defaultInput = document.getElementById('new-field-default');
    
    const name = nameInput?.value?.trim();
    const type = typeInput?.value || 'Text';
    const defaultValue = defaultInput?.value?.trim();
    
    if (!name) {
        showNotification(getTranslation('notification.enter_field_name'), 'error');
        return;
    }
    
    // Create new field ID
    const fieldId = 'field-' + Date.now();
    
    // Add to field library
    const fieldLibrary = document.getElementById('field-library');
    if (fieldLibrary) {
        const fieldItem = document.createElement('div');
        fieldItem.className = 'field-library-item';
        fieldItem.dataset.fieldId = fieldId;
        fieldItem.dataset.fieldType = type.toLowerCase();
        fieldItem.draggable = true;
        fieldItem.innerHTML = `
            <div class="field-item-drag-handle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
            </div>
            <div class="field-item-icon field-icon-${type.toLowerCase()}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01M19 7h.01M19 11h.01M19 15h.01M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            </div>
            <div class="field-item-info">
                <span class="field-item-name">${name}</span>
                <span class="field-item-type">${type.toLowerCase()}</span>
            </div>
            <div class="field-item-badge" title="Used in 0 sections">0</div>
            <div class="field-item-actions">
                <button class="field-action-btn field-hide-btn" onclick="toggleFieldVisibility('${fieldId}')" data-i18n-title="btn.hide_field" title="Hide Field">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                </button>
                <button class="field-action-btn field-delete-btn" onclick="deleteField('${fieldId}')" data-i18n-title="btn.delete_field" title="Delete Field">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
        fieldLibrary.appendChild(fieldItem);
        
        // Attach drag event listeners to new field
        fieldItem.addEventListener('dragstart', handleFieldDragStart);
        fieldItem.addEventListener('dragend', handleFieldDragEnd);
        
        // Make i18n elements visible (both data-i18n and data-i18n-title)
        fieldItem.querySelectorAll('[data-i18n], [data-i18n-title]').forEach(el => {
            el.classList.add('i18n-visible');
        });
        
        // Scroll to new field
        fieldItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Add to state
    configState.fields.push({
        id: fieldId,
        name: name,
        type: type,
        defaultValue: defaultValue,
        usageCount: 0
    });
    
    // Clear form
    if (nameInput) nameInput.value = '';
    if (defaultInput) defaultInput.value = '';
    
    // Close modal
    closeModal('new-field-modal');
    
    markDirty();
    showNotification(getTranslation('notification.field_created'), 'success');
}

// === ACTIONS ===
function saveConfiguration() {
    console.log('Saving configuration...');
    // TODO: Save to localStorage or API
    configState.isDirty = false;
    showNotification(getTranslation('notification.config_saved'), 'success');
}

function resetConfiguration() {
    if (confirm('Are you sure you want to reset all changes?')) {
        loadConfiguration();
        showNotification(getTranslation('notification.config_reset'), 'info');
    }
}

function exportConfiguration() {
    const data = JSON.stringify(configState, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier-card-config.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importConfiguration() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    configState = JSON.parse(e.target.result);
                    renderConfiguration();
                    showNotification(getTranslation('notification.config_imported'), 'success');
                } catch (err) {
                    showNotification(getTranslation('notification.invalid_config'), 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function addNewSection() {
    const sectionId = 'section-' + Date.now();
    const section = {
        id: sectionId,
        name: 'New Section',
        fields: [],
        permissions: {}
    };
    configState.sections.push(section);
    
    // Create section card element
    const sectionBuilder = document.getElementById('section-builder');
    if (sectionBuilder) {
        const sectionCard = document.createElement('div');
        sectionCard.className = 'config-section-card';
        sectionCard.dataset.sectionId = sectionId;
        sectionCard.setAttribute('draggable', 'true');
        
        sectionCard.innerHTML = `
            <div class="section-card-header" draggable="true">
                <div class="section-drag-handle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18"/>
                    </svg>
                </div>
                <div class="section-info">
                    <span class="section-name">New Section</span>
                    <button class="section-action-btn section-toggle-btn" onclick="toggleSectionCollapse('${sectionId}')" data-i18n-title="btn.collapse" title="Collapse">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                    <span class="section-field-count"><span data-i18n="section.fields">fields</span>: 0</span>
                </div>
                <div class="section-actions">
                    <button class="section-action-btn section-add-field-btn" onclick="openAddFieldToSectionModal('${sectionId}')" data-i18n-title="btn.add_field" title="Add Field">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                    <button class="section-action-btn section-edit-btn" onclick="editSection('${sectionId}')" data-i18n-title="btn.edit" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="section-action-btn section-hide-btn" onclick="toggleSectionVisibility('${sectionId}')" data-i18n-title="btn.hide_section" title="Hide Section">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    </button>
                    <button class="section-action-btn section-delete-btn" onclick="deleteSection('${sectionId}')" data-i18n-title="btn.delete" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="section-card-body">
                <div class="section-fields-list drop-zone" data-section-id="${sectionId}"></div>
            </div>
        `;
        
        // Add drag events for section reordering
        const header = sectionCard.querySelector('.section-card-header');
        header.addEventListener('dragstart', handleSectionDragStart);
        header.addEventListener('dragend', handleSectionDragEnd);
        
        // Add drop zone events
        const fieldsList = sectionCard.querySelector('.section-fields-list');
        fieldsList.addEventListener('dragover', handleDragOver);
        fieldsList.addEventListener('dragleave', handleDragLeave);
        fieldsList.addEventListener('drop', handleFieldDrop);
        
        // Insert at top (after any existing sections)
        const firstSection = sectionBuilder.querySelector('.config-section-card');
        if (firstSection) {
            sectionBuilder.insertBefore(sectionCard, firstSection);
        } else {
            sectionBuilder.appendChild(sectionCard);
        }
        
        // Apply i18n to new elements
        if (typeof translationEngine !== 'undefined') {
            translationEngine.translateNewElements(sectionCard);
        }
        
        // Make i18n elements visible (they have opacity: 0 by default)
        sectionCard.querySelectorAll('[data-i18n]').forEach(el => {
            el.classList.add('i18n-visible');
        });
    }
    
    markDirty();
    console.log(`Added new section: ${sectionId}`);
}

function loadConfiguration() {
    // TODO: Load from localStorage or API
    console.log('Loading configuration...');
    
    // Remove loading state from panels
    setTimeout(() => {
        const panels = document.querySelectorAll('.glass-panel.loading');
        console.log('Found loading panels:', panels.length);
        panels.forEach(panel => {
            panel.classList.remove('loading');
            console.log('Removed loading from:', panel);
        });
    }, 300);
}

// === PERMISSIONS TABLE ===
function rebuildPermissionsTableOnLanguageChange(lang) {
    console.log('Language changed to:', lang, '- Rebuilding dynamic content');
    
    // Rebuild permissions table to update item names from DOM sections
    const tbody = document.getElementById('permissions-table-body');
    if (tbody) {
        buildPermissionsTable(tbody);
        
        // Re-check override badges for all fields
        tbody.querySelectorAll('tr[data-item-type="field"]').forEach(fieldRow => {
            checkAndShowOverrideBadge(fieldRow.dataset.itemId, fieldRow);
        });
    }
}

function initializePermissionsTable() {
    const tbody = document.getElementById('permissions-table-body');
    if (!tbody) {
        console.error('Permissions table body not found');
        return;
    }
    
    // Build table from sections and fields in HTML
    buildPermissionsTable(tbody);
    
    // Use event delegation for expand buttons (survives table rebuilds)
    tbody.addEventListener('click', handleRoleExpand);
    
    // Initialize checkbox changes
    tbody.addEventListener('change', handlePermissionChange);
}

function buildPermissionsTable(tbody) {
    tbody.innerHTML = '';
    
    // Get sections from DOM
    const sections = document.querySelectorAll('.config-section-card');
    
    sections.forEach(section => {
        const sectionId = section.dataset.sectionId;
        const sectionName = section.querySelector('.section-name').textContent;
        
        // Add section row
        const sectionRow = createPermissionsRow(sectionId, sectionName, 'section');
        tbody.appendChild(sectionRow);
        
        // Add field rows
        const fields = section.querySelectorAll('.section-fields-list .field-library-item');
        fields.forEach(field => {
            const fieldId = field.dataset.fieldId || 'field-' + Math.random().toString(36).substr(2, 9);
            const fieldName = field.querySelector('.field-item-name').textContent;
            
            const fieldRow = createPermissionsRow(fieldId, fieldName, 'field', sectionId);
            tbody.appendChild(fieldRow);
        });
    });
}

function createPermissionsRow(itemId, name, type, parentId = null) {
    const tr = document.createElement('tr');
    tr.className = type === 'section' ? 'permissions-table-row permissions-section-row' : 'permissions-table-row permissions-field-row';
    tr.dataset.itemId = itemId;
    tr.dataset.itemType = type;
    if (parentId) tr.dataset.parentId = parentId;
    
    const roles = ['admin', 'sales', 'warehouse', 'accounting'];
    const actions = ['read', 'edit', 'create', 'delete'];
    
    // Name cell
    const nameCell = document.createElement('td');
    nameCell.className = 'permissions-cell-name';
    if (type === 'field') {
        // Check if this field has override
        const hasOverride = configState.overrideFields[itemId];
        const overrideDisplay = hasOverride ? 'inline-block' : 'none';
        const i18nClass = hasOverride ? ' i18n-visible' : '';
        nameCell.innerHTML = `<span class="permissions-field-indent"></span><span class="permissions-item-name">${name}</span><span class="permissions-override-badge${i18nClass}" style="display:${overrideDisplay};" data-i18n="permission.override">Override</span>`;
    } else {
        nameCell.innerHTML = `<span class="permissions-item-name">${name}</span>`;
    }
    tr.appendChild(nameCell);
    
    // Type cell
    const typeCell = document.createElement('td');
    typeCell.className = 'permissions-cell-type';
    const typeKey = type === 'section' ? 'permissions.type_section' : 'permissions.type_field';
    typeCell.innerHTML = `<span class="permissions-type-badge" data-i18n="${typeKey}">${type}</span>`;
    tr.appendChild(typeCell);
    
    // Role cells
    roles.forEach(role => {
        const roleCell = document.createElement('td');
        roleCell.className = 'permissions-cell-role';
        roleCell.dataset.role = role;
        
        let checkboxesHtml = '<div class="permissions-role-cell"><div class="permissions-actions-row">';
        actions.forEach(action => {
            const checked = (role === 'admin') ? 'checked' : '';
            const actionKey = `permissions.action_${action}`;
            checkboxesHtml += `<label class="permissions-checkbox" data-i18n-title="${actionKey}" title="${action}">
                <input type="checkbox" data-action="${action}" data-role="${role}" ${checked}>
                <span class="checkbox-custom"></span>
            </label>`;
        });
        checkboxesHtml += '</div>';
        checkboxesHtml += `<button class="permissions-expand-btn" data-role="${role}" data-i18n-title="permissions.expand_users" title="Expand users">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none"><path d="M6 9l6 6 6-6"/></svg>
        </button>`;
        checkboxesHtml += '</div>';
        
        roleCell.innerHTML = checkboxesHtml;
        tr.appendChild(roleCell);
    });
    
    return tr;
}

function handleRoleExpand(e) {
    // Support both direct click and delegated event
    const btn = e.target.closest ? e.target.closest('.permissions-expand-btn') : e.currentTarget;
    if (!btn) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    const role = btn.dataset.role;
    const row = btn.closest('tr');
    const itemId = row.dataset.itemId;
    
    btn.classList.toggle('expanded');
    
    // Check if users list already exists
    let usersList = row.querySelector(`.permissions-users-list[data-role="${role}"]`);
    
    if (usersList) {
        usersList.classList.toggle('visible');
    } else {
        // Create users list
        const roleCell = row.querySelector(`.permissions-cell-role[data-role="${role}"]`);
        const roleCellContent = roleCell.querySelector('.permissions-role-cell');
        
        usersList = document.createElement('div');
        usersList.className = 'permissions-users-list visible';
        usersList.dataset.role = role;
        
        // Get current role checkbox states to sync with users
        const actions = ['read', 'edit', 'create', 'delete'];
        const roleStates = {};
        actions.forEach(action => {
            const roleCheckbox = roleCell.querySelector(`.permissions-actions-row input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
            roleStates[action] = roleCheckbox ? roleCheckbox.checked : false;
        });
        
        const users = configState.users[role] || [];
        const itemId = row.dataset.itemId;
        
        users.forEach(userEmail => {
            // Check if we have saved permissions for this user
            const savedPerms = configState.userPermissions?.[itemId]?.[role]?.[userEmail];
            
            const userRow = document.createElement('div');
            userRow.className = 'permissions-user-row';
            userRow.innerHTML = `
                <span class="permissions-user-email">${userEmail}</span>
                <div class="permissions-user-actions">
                    <label class="permissions-checkbox" title="Read">
                        <input type="checkbox" data-action="read" data-role="${role}" data-user="${userEmail}" ${savedPerms?.read !== undefined ? (savedPerms.read ? 'checked' : '') : (roleStates.read ? 'checked' : '')}>
                        <span class="checkbox-custom"></span>
                    </label>
                    <label class="permissions-checkbox" title="Edit">
                        <input type="checkbox" data-action="edit" data-role="${role}" data-user="${userEmail}" ${savedPerms?.edit !== undefined ? (savedPerms.edit ? 'checked' : '') : (roleStates.edit ? 'checked' : '')}>
                        <span class="checkbox-custom"></span>
                    </label>
                    <label class="permissions-checkbox" title="Create">
                        <input type="checkbox" data-action="create" data-role="${role}" data-user="${userEmail}" ${savedPerms?.create !== undefined ? (savedPerms.create ? 'checked' : '') : (roleStates.create ? 'checked' : '')}>
                        <span class="checkbox-custom"></span>
                    </label>
                    <label class="permissions-checkbox" title="Delete">
                        <input type="checkbox" data-action="delete" data-role="${role}" data-user="${userEmail}" ${savedPerms?.delete !== undefined ? (savedPerms.delete ? 'checked' : '') : (roleStates.delete ? 'checked' : '')}>
                        <span class="checkbox-custom"></span>
                    </label>
                </div>
            `;
            usersList.appendChild(userRow);
        });
        
        roleCellContent.appendChild(usersList);
    }
}

function handlePermissionChange(e) {
    const checkbox = e.target;
    if (checkbox.type !== 'checkbox') return;
    
    const row = checkbox.closest('tr');
    const itemId = row.dataset.itemId;
    const itemType = row.dataset.itemType;
    const action = checkbox.dataset.action;
    const role = checkbox.dataset.role;
    const user = checkbox.dataset.user;
    
    console.log(`Permission changed: ${itemType} ${itemId}, ${role}${user ? '/' + user : ''}, ${action} = ${checkbox.checked}`);
    
    // === SYNCHRONIZATION LOGIC ===
    
    // 1. Section -> Fields: When section checkbox changes, sync all fields in that section
    if (itemType === 'section' && !user) {
        syncSectionToFields(itemId, action, role, checkbox.checked);
    }
    
    // 2. Section User -> Field Users: When section user checkbox changes, sync to all field users
    if (itemType === 'section' && user) {
        syncSectionUserToFieldUsers(itemId, action, role, user, checkbox.checked);
    }
    
    // 3. Fields -> Section: When field checkbox changes, check if all fields in section are same
    if (itemType === 'field' && !user) {
        syncFieldToSection(row, action, role);
    }
    
    // 4. Role -> Users: When role checkbox changes (not user-specific), sync all users in that role
    if (!user) {
        syncRoleToUsers(row, action, role, checkbox.checked);
    }
    
    // 5. Users -> Role: When user checkbox changes, check if all users are same and update role checkbox
    if (user) {
        syncUserToRole(row, action, role);
        
        // Save user permission to configState
        if (itemType === 'field') {
            if (!configState.userPermissions[itemId]) {
                configState.userPermissions[itemId] = {};
            }
            if (!configState.userPermissions[itemId][role]) {
                configState.userPermissions[itemId][role] = {};
            }
            if (!configState.userPermissions[itemId][role][user]) {
                configState.userPermissions[itemId][role][user] = {};
            }
            configState.userPermissions[itemId][role][user][action] = checkbox.checked;
        }
    }
    
    // Show override badge if field has different permissions than section
    if (itemType === 'field') {
        checkAndShowOverrideBadge(itemId, row);
    }
    
    markDirty();
}

// Sync section checkbox to all fields in that section
function syncSectionToFields(sectionId, action, role, checked) {
    const tbody = document.getElementById('permissions-table-body');
    if (!tbody) return;
    
    // Find all field rows that belong to this section
    const fieldRows = tbody.querySelectorAll(`tr[data-parent-id="${sectionId}"]`);
    fieldRows.forEach(fieldRow => {
        const fieldCheckbox = fieldRow.querySelector(`input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
        if (fieldCheckbox) {
            fieldCheckbox.checked = checked;
        }
    });
}

// Sync section user checkbox to all field user checkboxes
function syncSectionUserToFieldUsers(sectionId, action, role, userEmail, checked) {
    const tbody = document.getElementById('permissions-table-body');
    if (!tbody) return;
    
    // Save state for this user permission
    const fieldRows = tbody.querySelectorAll(`tr[data-parent-id="${sectionId}"]`);
    fieldRows.forEach(fieldRow => {
        const fieldId = fieldRow.dataset.itemId;
        
        // Initialize nested structure if needed
        if (!configState.userPermissions[fieldId]) {
            configState.userPermissions[fieldId] = {};
        }
        if (!configState.userPermissions[fieldId][role]) {
            configState.userPermissions[fieldId][role] = {};
        }
        if (!configState.userPermissions[fieldId][role][userEmail]) {
            configState.userPermissions[fieldId][role][userEmail] = {};
        }
        
        // Save the permission state
        configState.userPermissions[fieldId][role][userEmail][action] = checked;
        
        // Apply to DOM if users list exists
        const usersList = fieldRow.querySelector(`.permissions-users-list[data-role="${role}"]`);
        if (usersList) {
            const userCheckbox = usersList.querySelector(`input[data-action="${action}"][data-role="${role}"][data-user="${userEmail}"]`);
            if (userCheckbox) {
                userCheckbox.checked = checked;
            }
        }
        
        // Update role checkbox indeterminate state on field
        updateRoleCheckboxState(fieldRow, action, role);
    });
}

// Update role checkbox state based on user checkboxes
function updateRoleCheckboxState(row, action, role) {
    const roleCheckbox = row.querySelector(`.permissions-actions-row input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
    if (!roleCheckbox) return;
    
    const usersList = row.querySelector(`.permissions-users-list[data-role="${role}"]`);
    const itemId = row.dataset.itemId;
    
    // Check saved permissions or current DOM state
    let allChecked = true;
    let allUnchecked = true;
    
    const users = configState.users[role] || [];
    users.forEach(userEmail => {
        const savedPerm = configState.userPermissions?.[itemId]?.[role]?.[userEmail]?.[action];
        
        if (savedPerm !== undefined) {
            if (savedPerm) allUnchecked = false;
            else allChecked = false;
        } else if (usersList) {
            const userCheckbox = usersList.querySelector(`input[data-action="${action}"][data-role="${role}"][data-user="${userEmail}"]`);
            if (userCheckbox) {
                if (userCheckbox.checked) allUnchecked = false;
                else allChecked = false;
            }
        } else {
            // No saved and no DOM - use role state
            if (roleCheckbox.checked) allUnchecked = false;
            else allChecked = false;
        }
    });
    
    // Update role checkbox
    if (allChecked) {
        roleCheckbox.checked = true;
        roleCheckbox.indeterminate = false;
    } else if (allUnchecked) {
        roleCheckbox.checked = false;
        roleCheckbox.indeterminate = false;
    } else {
        roleCheckbox.indeterminate = true;
    }
}

// Sync field checkbox to section checkbox (check if all fields in section are same)
function syncFieldToSection(fieldRow, action, role) {
    const sectionId = fieldRow.dataset.parentId;
    if (!sectionId) return;
    
    const tbody = document.getElementById('permissions-table-body');
    if (!tbody) return;
    
    // Find section row
    const sectionRow = tbody.querySelector(`tr[data-item-id="${sectionId}"][data-item-type="section"]`);
    if (!sectionRow) return;
    
    // Find all field rows in this section
    const fieldRows = tbody.querySelectorAll(`tr[data-parent-id="${sectionId}"]`);
    if (fieldRows.length === 0) return;
    
    const sectionCheckbox = sectionRow.querySelector(`input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
    if (!sectionCheckbox) return;
    
    // Check if all fields have same state
    let allChecked = true;
    let allUnchecked = true;
    
    fieldRows.forEach(row => {
        const fieldCheckbox = row.querySelector(`input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
        if (fieldCheckbox) {
            if (fieldCheckbox.checked) allUnchecked = false;
            else allChecked = false;
        }
    });
    
    // Update section checkbox
    if (allChecked) {
        sectionCheckbox.checked = true;
        sectionCheckbox.indeterminate = false;
    } else if (allUnchecked) {
        sectionCheckbox.checked = false;
        sectionCheckbox.indeterminate = false;
    } else {
        // Mixed state - use indeterminate
        sectionCheckbox.indeterminate = true;
    }
}

// Sync role checkbox to all users in that role (within same row)
function syncRoleToUsers(row, action, role, checked) {
    const usersList = row.querySelector(`.permissions-users-list[data-role="${role}"]`);
    if (!usersList) return;
    
    const userCheckboxes = usersList.querySelectorAll(`input[data-action="${action}"][data-role="${role}"][data-user]`);
    userCheckboxes.forEach(cb => {
        cb.checked = checked;
    });
}

// Check if field permissions differ from section and show/hide override badge
function checkAndShowOverrideBadge(fieldId, fieldRow) {
    const tbody = document.getElementById('permissions-table-body');
    if (!tbody) return;
    
    const sectionId = fieldRow.dataset.parentId;
    if (!sectionId) {
        console.log('checkAndShowOverrideBadge: No sectionId for field', fieldId);
        return;
    }
    
    const sectionRow = tbody.querySelector(`tr[data-item-id="${sectionId}"][data-item-type="section"]`);
    if (!sectionRow) {
        console.log('checkAndShowOverrideBadge: No sectionRow found for', sectionId);
        return;
    }
    
    const roles = ['admin', 'sales', 'warehouse', 'accounting'];
    const actions = ['read', 'edit', 'create', 'delete'];
    
    let hasOverride = false;
    let differences = [];
    
    // Compare role-level permissions
    roles.forEach(role => {
        actions.forEach(action => {
            const fieldCheckbox = fieldRow.querySelector(`input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
            const sectionCheckbox = sectionRow.querySelector(`input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
            
            if (fieldCheckbox && sectionCheckbox) {
                if (fieldCheckbox.checked !== sectionCheckbox.checked) {
                    hasOverride = true;
                    differences.push(`role.${role}.${action}: field=${fieldCheckbox.checked}, section=${sectionCheckbox.checked}`);
                }
            }
        });
    });
    
    // Compare user-level permissions
    roles.forEach(role => {
        const users = configState.users[role] || [];
        users.forEach(userEmail => {
            actions.forEach(action => {
                const fieldUserPerm = configState.userPermissions?.[fieldId]?.[role]?.[userEmail]?.[action];
                const sectionUserPerm = configState.userPermissions?.[sectionId]?.[role]?.[userEmail]?.[action];
                
                // If field has user permission set, compare with section (or section default)
                if (fieldUserPerm !== undefined) {
                    const sectionValue = sectionUserPerm !== undefined ? sectionUserPerm : true; // default is checked
                    if (fieldUserPerm !== sectionValue) {
                        hasOverride = true;
                        differences.push(`user.${role}.${userEmail}.${action}: field=${fieldUserPerm}, section=${sectionValue}`);
                    }
                }
            });
        });
    });
    
    // console.log('checkAndShowOverrideBadge:', fieldId, 'hasOverride=', hasOverride, differences.length > 0 ? 'diffs:' + differences.join(', ') : '');
    
    const overrideBadge = fieldRow.querySelector('.permissions-override-badge');
    if (overrideBadge) {
        overrideBadge.style.display = hasOverride ? 'inline-block' : 'none';
        if (hasOverride) {
            overrideBadge.classList.add('i18n-visible');
            // Translate the badge (pass fieldRow as scope so querySelectorAll finds the badge)
            if (typeof translationEngine !== 'undefined') {
                translationEngine.translateNewElements(fieldRow);
            }
        }
        
        // Update stored state
        if (hasOverride) {
            configState.overrideFields[fieldId] = true;
        } else {
            delete configState.overrideFields[fieldId];
        }
    }
}

// Sync user checkbox to role checkbox (check if all users are same)
function syncUserToRole(row, action, role) {
    const usersList = row.querySelector(`.permissions-users-list[data-role="${role}"]`);
    if (!usersList) return;
    
    const userCheckboxes = usersList.querySelectorAll(`input[data-action="${action}"][data-role="${role}"][data-user]`);
    const roleCheckbox = row.querySelector(`.permissions-actions-row input[data-action="${action}"][data-role="${role}"]:not([data-user])`);
    
    if (!roleCheckbox || userCheckboxes.length === 0) return;
    
    // Check if all users have same state
    let allChecked = true;
    let allUnchecked = true;
    
    userCheckboxes.forEach(cb => {
        if (cb.checked) allUnchecked = false;
        else allChecked = false;
    });
    
    // Update role checkbox
    if (allChecked) {
        roleCheckbox.checked = true;
        roleCheckbox.indeterminate = false;
    } else if (allUnchecked) {
        roleCheckbox.checked = false;
        roleCheckbox.indeterminate = false;
    } else {
        // Mixed state - use indeterminate
        roleCheckbox.indeterminate = true;
    }
}

function renderConfiguration() {
    // TODO: Render fields and sections from state
    console.log('Rendering configuration...');
}

// === UTILITIES ===
function markDirty() {
    configState.isDirty = true;
    // Enable save button
    const saveBtn = document.getElementById('save-config-btn');
    if (saveBtn) {
        saveBtn.classList.add('dirty');
    }
}

// === i18n HELPER ===
function getTranslation(key) {
    if (typeof translationEngine !== 'undefined' && translationEngine.currentLang) {
        const data = translations[translationEngine.currentLang];
        if (data) {
            const keys = key.split('.');
            let value = data;
            for (let k of keys) {
                if (value && value[k] !== undefined) {
                    value = value[k];
                } else {
                    return key; // Return key if translation not found
                }
            }
            return typeof value === 'string' ? value : key;
        }
    }
    return key; // Fallback to key
}

function showNotification(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            ${type === 'success' 
                ? '<polyline points="20 6 9 17 4 12"/>' 
                : type === 'error'
                    ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
                    : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
        </svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// === JS TOOLTIP (avoids overflow clipping) ===
let tooltipEl = null;

function showTooltip(btn, text) {
    if (!text) return;
    
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'js-tooltip';
    tooltipEl.textContent = text;
    tooltipEl.style.cssText = `
        position: fixed;
        padding: 8px 12px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: #fff;
        font-size: 11px;
        line-height: 1.4;
        white-space: normal;
        max-width: 200px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    `;
    document.body.appendChild(tooltipEl);
    
    const rect = btn.getBoundingClientRect();
    tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
    tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
    
    requestAnimationFrame(() => tooltipEl.style.opacity = '1');
}

function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.remove();
        tooltipEl = null;
    }
}

function initializeTooltips() {
    document.querySelectorAll('.section-delete-btn.disabled[data-i18n-tooltip], .section-delete-btn:disabled[data-i18n-tooltip]').forEach(btn => {
        const tooltipKey = btn.dataset.i18nTooltip;
        btn.addEventListener('mouseenter', () => {
            const text = getTranslation(tooltipKey) || btn.dataset.tooltip;
            showTooltip(btn, text);
        });
        btn.addEventListener('mouseleave', hideTooltip);
    });
}

// Expose functions globally
window.saveConfiguration = saveConfiguration;
window.resetConfiguration = resetConfiguration;
window.exportConfiguration = exportConfiguration;
window.importConfiguration = importConfiguration;
window.editSection = editSection;
window.saveSectionEdit = saveSectionEdit;
window.deleteSection = deleteSection;
window.openAddFieldToSectionModal = openAddFieldToSectionModal;
window.saveFieldToSection = saveFieldToSection;
window.openPreviewModal = openPreviewModal;
window.openNewFieldModal = openNewFieldModal;
window.toggleSectionCollapse = toggleSectionCollapse;
window.editSection = editSection;
window.saveSectionEdit = saveSectionEdit;
window.deleteSection = deleteSection;
window.openModal = openModal;
window.closeModal = closeModal;

console.log('Flexiron: Supplier Card Config Logic Loaded');
