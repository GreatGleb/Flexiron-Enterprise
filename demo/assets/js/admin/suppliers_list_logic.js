/**
 * Suppliers List Page Logic
 * Page: 04.1_Suppliers_List
 */

// =====================
// STATE
// =====================
let currentView = 'table';
let isLoading = false;
let suppliers = [];
let supplierCount = 0;

// Available categories
const CATEGORIES = ['Sheets', 'Pipes', 'Beams', 'Rebars', 'Lintels', 'Profiles', 'Wire', 'Fittings'];

let filters = {
    search: '',
    status: 'all',
    categories: [],
    rating: 0
};

let pagination = {
    page: 1,
    pageSize: 25,
    total: 0,
    hasMore: true
};

let userPrefs = {
    activeView: 'table',
    columnOrder: [],
    hiddenColumns: [],
    filters: {},
    sortField: 'companyName',
    sortDirection: 'asc'
};

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
    loadUserPrefs();
    initEventListeners();
    applyFiltersToUI(); // Show restored filters in UI
    switchView(currentView); // Restore saved view (table/kanban)
    loadSuppliers();
});

function initEventListeners() {
    // Initialize custom selects
    initCustomSelects();
    
    // Initialize multi-select for categories
    initMultiSelect();
    
    // Search
    const searchInput = document.getElementById('supplier-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            filters.search = e.target.value;
            pagination.page = 1;
            loadSuppliers();
        }, 300));
    }

    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            filters.status = getCustomSelectValue('status-filter');
            pagination.page = 1;
            loadSuppliers();
        });
    }

    // Rating filter
    const ratingFilter = document.getElementById('rating-filter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', (e) => {
            filters.rating = getRatingSelectValue('rating-filter');
            pagination.page = 1;
            loadSuppliers();
        });
    }

    // View tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });

    // Page size
    const pageSize = document.getElementById('page-size');
    if (pageSize) {
        pageSize.addEventListener('change', (e) => {
            pagination.pageSize = parseInt(e.detail.value);
            pagination.page = 1;
            loadSuppliers();
        });
    }

    // Load more
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            pagination.page++;
            loadSuppliers(true);
        });
    }

    // Retry button
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => loadSuppliers());
    }

    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => exportSuppliers());
    }

    // Save view button
    const saveViewBtn = document.getElementById('save-view-btn');
    if (saveViewBtn) {
        saveViewBtn.addEventListener('click', () => saveUserPrefs());
    }

    // Pagination prev/next
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (pagination.page > 1) {
                pagination.page--;
                loadSuppliers();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(pagination.total / pagination.pageSize);
            if (pagination.page < totalPages) {
                pagination.page++;
                loadSuppliers();
            }
        });
    }

    // Kanban drag & drop
    initKanbanDragDrop();
}

// =====================
// DATA LOADING
// =====================
async function loadSuppliers(append = false) {
    if (isLoading) return;
    isLoading = true;

    showLoading(true);
    hideError();
    hideEmpty();

    try {
        // Simulated API call - replace with actual API
        const data = await fetchSuppliersMock(filters, pagination);
        
        if (append) {
            suppliers = [...suppliers, ...data.suppliers];
        } else {
            suppliers = data.suppliers;
        }
        
        supplierCount = data.total;
        pagination.total = data.total;
        pagination.hasMore = suppliers.length < data.total;

        renderSuppliers();
        updateSupplierCount();
        updatePagination();
        
        if (suppliers.length === 0) {
            showEmpty();
        }
    } catch (error) {
        console.error('Error loading suppliers:', error);
        showError();
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

// Mock data function - replace with actual API
function fetchSuppliersMock(filters, pagination) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allSuppliers = [
                { id: '1', companyName: 'Steel Plus OÜ', status: 'Active', rating: 5, categories: ['Sheets', 'Pipes'], leadTime: 7, lastBCCDate: '2024-01-15', email: 'info@steelplus.ee', phone: '+372 51234567', hasDeficit: false },
                { id: '2', companyName: 'Metal Trade LT', status: 'Preferred', rating: 4, categories: ['Beams', 'Rebars'], leadTime: 5, lastBCCDate: '2024-01-10', email: 'sales@metaltrade.lt', phone: '+370 61234567', hasDeficit: true },
                { id: '3', companyName: 'Nordic Steel AB', status: 'Active', rating: 4, categories: ['Sheets'], leadTime: 10, lastBCCDate: '2024-01-05', email: 'order@nordicsteel.se', phone: '+46 81234567', hasDeficit: false },
                { id: '4', companyName: 'Baltic Metal Group', status: 'New', rating: 3, categories: ['Pipes', 'Lintels'], leadTime: 14, lastBCCDate: null, email: 'contact@balticmetal.lv', phone: '+371 21234567', hasDeficit: false },
                { id: '5', companyName: 'Euro Metal GmbH', status: 'Under Review', rating: 2, categories: ['Beams'], leadTime: 21, lastBCCDate: '2023-12-20', email: 'info@eurometal.de', phone: '+49 301234567', hasDeficit: false }
            ];

            let filtered = allSuppliers.filter(s => {
                if (filters.search && !s.companyName.toLowerCase().includes(filters.search.toLowerCase())) return false;
                if (filters.status && filters.status.toLowerCase() !== 'all' && s.status !== filters.status) return false;
                if (filters.rating > 0 && s.rating !== filters.rating) return false;
                if (filters.categories && filters.categories.length > 0) {
                    const hasCategory = filters.categories.some(cat => s.categories.includes(cat));
                    if (!hasCategory) return false;
                }
                return true;
            });

            const start = (pagination.page - 1) * pagination.pageSize;
            const paged = filtered.slice(start, start + pagination.pageSize);

            resolve({
                suppliers: paged,
                total: filtered.length,
                hasMore: start + pagination.pageSize < filtered.length
            });
        }, 500);
    });
}

// =====================
// RENDERING
// =====================
function renderSuppliers() {
    if (currentView === 'table') {
        renderTableView();
    } else {
        renderKanbanView();
    }
}

function renderTableView() {
    const tbody = document.getElementById('suppliers-table-body');
    if (!tbody) return;

    tbody.innerHTML = suppliers.map(supplier => `
        <tr data-id="${supplier.id}">
            <td>
                <a href="card.html?id=${supplier.id}" class="link">${supplier.companyName}</a>
                ${supplier.hasDeficit ? '<span class="deficit-indicator" data-i18n-tooltip="tooltip.deficit_indicator" data-tooltip="Supplier has deficit - issues with deliveries"></span>' : ''}
            </td>
            <td><span class="status-pill pill-${getStatusClass(supplier.status)}" data-i18n="status.${supplier.status}">${supplier.status}</span></td>
            <td>${renderStars(supplier.rating)}</td>
            <td class="hid-480">${supplier.categories.map(c => `<span class="tag tag-sm" data-i18n="category.${c}">${c}</span>`).join(' ')}</td>
            <td class="hid-768">${supplier.leadTime} <span data-i18n="suppliers.days">days</span></td>
            <td class="hid-768">${supplier.lastBCCDate || 'Never'}</td>
            <td class="hid-600"><a href="mailto:${supplier.email}" class="link">${supplier.email}</a></td>
            <td>
                <div class="table-actions">
                    <a href="card.html?id=${supplier.id}" class="action-icon-btn action-edit" data-i18n-tooltip="tooltip.view_details" data-tooltip="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </a>
                    <a href="bcc-request.html?supplier=${supplier.id}" class="action-icon-btn action-success" data-i18n-tooltip="tooltip.send_bcc" data-tooltip="Send BCC">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </a>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Initialize action tooltips after rendering
    initActionTooltips();
    
    translationEngine.translateNewElements(tbody);
}

function renderKanbanView() {
    const statuses = ['Active', 'Preferred', 'New', 'Under Review', 'Suspended', 'Blocked'];
    
    statuses.forEach(status => {
        const column = document.getElementById(`kanban-${status.toLowerCase().replace(' ', '-')}`);
        if (!column) return;

        const statusSuppliers = suppliers.filter(s => s.status === status);
        
        column.innerHTML = statusSuppliers.map(s => `
            <div class="kanban-card" data-id="${s.id}" draggable="true">
                <div class="kanban-card-header">
                    <a href="card.html?id=${s.id}" class="kanban-card-title">${s.companyName}</a>
                    ${s.hasDeficit ? '<span class="deficit-indicator" data-i18n-tooltip="tooltip.deficit_indicator" data-tooltip="Supplier has deficit - issues with deliveries"></span>' : ''}
                </div>
                <div class="kanban-card-body">
                    <div class="kanban-card-rating">${renderStars(s.rating)}</div>
                    <div class="kanban-card-tags">${s.categories.map(c => `<span class="tag tag-sm" data-i18n="category.${c}">${c}</span>`).join(' ')}</div>
                    <div class="kanban-card-meta">
                        <span class="lead-time">${s.leadTime} <span data-i18n="suppliers.days">days</span></span>
                    </div>
                </div>
                <div class="kanban-card-footer">
                    <a href="bcc-request.html?supplier=${s.id}" class="kanban-card-action">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </a>
                </div>
            </div>
        `).join('');

        // Update badge count
        const panel = column.closest('.glass-panel');
        if (panel) {
            const badge = panel.querySelector('.panel-badge');
            if (badge) badge.textContent = statusSuppliers.length;
        }
    });

    // Initialize action tooltips after rendering
    initActionTooltips();

    translationEngine.translateNewElements(document.getElementById('kanban-board'));
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const activeClass = i <= rating ? 'active' : '';
        stars += `<svg class="star-svg ${activeClass}" width="14" height="14" viewBox="0 0 24 24" fill="${i <= rating ? '#faad14' : 'none'}" stroke="${i <= rating ? '#faad14' : 'currentColor'}" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
    return `<div class="rating-stars">${stars}</div>`;
}

function getStatusClass(status) {
    const map = {
        'Active': 'success',
        'Preferred': 'info',
        'New': 'mint',
        'Under Review': 'warning',
        'Suspended': 'suspended',
        'Blocked': 'danger'
    };
    return map[status] || 'default';
}

// =====================
// VIEW SWITCHING
// =====================
function switchView(view) {
    currentView = view;
    
    // Update tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === view);
    });

    // Toggle views
    const tableView = document.getElementById('table-view');
    const kanbanView = document.getElementById('kanban-view');
    
    if (tableView) tableView.classList.toggle('hidden', view !== 'table');
    if (kanbanView) kanbanView.classList.toggle('hidden', view !== 'kanban');

    // Re-render
    renderSuppliers();
    
    // Save preference
    userPrefs.activeView = view;
}

// =====================
// KANBAN DRAG & DROP
// =====================
function initKanbanDragDrop() {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('kanban-card')) {
            e.target.classList.add('dragging');
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('kanban-card')) {
            e.target.classList.remove('dragging');
        }
    });

    document.addEventListener('dragover', (e) => {
        if (e.target.closest('.kanban-column')) {
            e.preventDefault();
            e.target.closest('.kanban-column').classList.add('drag-over');
        }
    });

    document.addEventListener('dragleave', (e) => {
        if (e.target.closest('.kanban-column')) {
            e.target.closest('.kanban-column').classList.remove('drag-over');
        }
    });

    document.addEventListener('drop', (e) => {
        const column = e.target.closest('.kanban-column');
        if (!column) return;

        e.preventDefault();
        column.classList.remove('drag-over');

        const supplierId = e.dataTransfer.getData('text/plain');
        const newStatus = column.dataset.status;

        updateSupplierStatus(supplierId, newStatus);
    });
}

async function updateSupplierStatus(id, newStatus) {
    try {
        // API call would go here
        const supplier = suppliers.find(s => s.id === id);
        if (supplier) {
            supplier.status = newStatus;
            renderKanbanView();
            showToast('msg.status_changed');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        showToast('msg.status_error');
    }
}

// =====================
// UI HELPERS
// =====================
function showLoading(show) {
    const panels = document.querySelectorAll('.glass-panel');
    panels.forEach(panel => {
        if (show) {
            panel.classList.add('loading');
        } else {
            panel.classList.remove('loading');
        }
    });
}

function showError() {
    const errorState = document.getElementById('error-state');
    if (errorState) errorState.classList.remove('hidden');
}

function hideError() {
    const errorState = document.getElementById('error-state');
    if (errorState) errorState.classList.add('hidden');
}

function showEmpty() {
    const emptyState = document.getElementById('empty-state');
    if (emptyState) emptyState.classList.remove('hidden');
}

function hideEmpty() {
    const emptyState = document.getElementById('empty-state');
    if (emptyState) emptyState.classList.add('hidden');
}

function updateSupplierCount() {
    const countEl = document.getElementById('supplier-count');
    if (countEl) countEl.textContent = supplierCount;
    
    // Update panel badge
    const badges = document.querySelectorAll('.panel-badge');
    badges.forEach(badge => {
        if (badge.closest('.col-right')) {
            badge.textContent = supplierCount;
        }
    });
}

function updateLoadMoreButton() {
    const btn = document.getElementById('load-more-btn');
    if (btn) {
        btn.disabled = !pagination.hasMore;
        btn.classList.toggle('hidden', !pagination.hasMore);
    }
}

function updatePagination() {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    const pagesContainer = document.getElementById('pagination-pages');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const showingEl = document.getElementById('pagination-showing');
    const totalEl = document.getElementById('pagination-total');
    const paginationNav = document.querySelector('.pagination-nav');
    
    // Hide pagination nav arrows if only 1 page, but keep page number visible
    if (paginationNav) {
        const prevBtn = paginationNav.querySelector('#prev-page');
        const nextBtn = paginationNav.querySelector('#next-page');
        if (prevBtn) prevBtn.style.display = totalPages <= 1 ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = totalPages <= 1 ? 'none' : 'flex';
    }
    
    // Update prev/next buttons
    if (prevBtn) prevBtn.disabled = pagination.page <= 1;
    if (nextBtn) nextBtn.disabled = pagination.page >= totalPages;
    
    // Update showing info
    const start = (pagination.page - 1) * pagination.pageSize + 1;
    const end = Math.min(pagination.page * pagination.pageSize, pagination.total);
    if (showingEl) showingEl.textContent = `${start}-${end}`;
    if (totalEl) totalEl.textContent = pagination.total;
    
    // Render page numbers
    if (pagesContainer) {
        let pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (pagination.page <= 3) {
                pages = [1, 2, 3, 4, '...', totalPages];
            } else if (pagination.page >= totalPages - 2) {
                pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', pagination.page - 1, pagination.page, pagination.page + 1, '...', totalPages];
            }
        }
        
        pagesContainer.innerHTML = pages.map(p => {
            if (p === '...') {
                return '<span class="pagination-ellipsis">...</span>';
            }
            const active = p === pagination.page ? 'active' : '';
            return `<button class="page-btn ${active}" data-page="${p}">${p}</button>`;
        }).join('');
        
        // Add click handlers
        pagesContainer.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                pagination.page = parseInt(btn.dataset.page);
                loadSuppliers();
            });
        });
    }
}

// =====================
// USER PREFERENCES
// =====================
function loadUserPrefs() {
    try {
        const saved = localStorage.getItem('suppliers_list_prefs');
        if (saved) {
            const savedPrefs = JSON.parse(saved);
            currentView = savedPrefs.activeView || 'table';
            userPrefs.activeView = currentView;

            // Load saved filters (only if user clicked Save View before)
            if (savedPrefs.filters) {
                filters = { ...filters, ...savedPrefs.filters };
            }
        }
    } catch (e) {
        console.error('Error loading preferences:', e);
    }
}

function applyFiltersToUI() {
    // Apply status filter to custom-select
    if (filters.status) {
        const statusSelect = document.getElementById('status-filter');
        if (statusSelect) {
            const valSpan = statusSelect.querySelector('.curr-val');
            const option = statusSelect.querySelector(`.custom-select-option[data-value="${filters.status}"]`);
            if (valSpan && option) {
                valSpan.innerHTML = option.innerHTML;
            }
            const hiddenInput = statusSelect.querySelector('input[type="hidden"]');
            if (hiddenInput) {
                hiddenInput.value = filters.status;
            }
        }
    }

    // Apply categories filter to multi-select
    if (filters.categories && filters.categories.length > 0) {
        const wrap = document.getElementById('categories-filter');
        if (wrap) {
            const list = wrap.querySelector('.multi-select-list');
            const tagsContainer = wrap.querySelector('.multi-select-tags');
            const placeholder = wrap.querySelector('.multi-select-placeholder');

            // Check checkboxes
            filters.categories.forEach(cat => {
                const checkbox = list.querySelector(`input[value="${cat}"]`);
                if (checkbox) checkbox.checked = true;
            });

            // Show tags
            if (placeholder) placeholder.style.display = 'none';
            tagsContainer.innerHTML = filters.categories.map(cat =>
                `<span class="tag tag-sm" data-i18n="category.${cat}">${cat} <svg onclick="this.parentElement.remove();document.querySelector('#categories-filter input[value=\\'${cat}\\']').checked=false;filters.categories=filters.categories.filter(c=>c!=='${cat}');loadSuppliers();" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>`
            ).join('');
        }
    }

    // Apply rating filter to rating-select
    if (filters.rating > 0) {
        const ratingSelect = document.getElementById('rating-filter');
        if (ratingSelect) {
            const hiddenInput = ratingSelect.querySelector('input[type="hidden"]');
            if (hiddenInput) hiddenInput.value = filters.rating;

            // Update stars display in trigger (use .active class on .star-svg)
            const trigger = ratingSelect.querySelector('.custom-select-trigger');
            if (trigger) {
                const stars = trigger.querySelectorAll('.star-svg');
                stars.forEach((star, idx) => {
                    if (idx < filters.rating) {
                        star.classList.add('active');
                    } else {
                        star.classList.remove('active');
                    }
                });
            }
        }
    }

    // Apply search filter
    if (filters.search) {
        const searchInput = document.getElementById('supplier-search');
        if (searchInput) {
            searchInput.value = filters.search;
        }
    }
}

function saveUserPrefs() {
    userPrefs.filters = { ...filters };
    userPrefs.activeView = currentView;
    
    try {
        localStorage.setItem('suppliers_list_prefs', JSON.stringify(userPrefs));
        showToast('msg.prefs_saved');
    } catch (e) {
        console.error('Error saving preferences:', e);
    }
}

// =====================
// EXPORT
// =====================
function exportSuppliers() {
    // Mock export - replace with actual implementation
    const csv = suppliers.map(s => 
        `${s.companyName},${s.status},${s.rating},${s.categories.join(';')},${s.leadTime},${s.email},${s.phone}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suppliers.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// =====================
// CUSTOM SELECT INIT
// =====================
function initCustomSelects() {
    document.querySelectorAll('.custom-select-wrap').forEach(wrap => {
        // Skip multi-select - handled by initMultiSelect
        if (wrap.classList.contains('multi-select-wrap')) return;

        const trigger = wrap.querySelector('.custom-select-trigger');
        const valSpan = wrap.querySelector('.curr-val');
        const list = wrap.querySelector('.custom-select-list');
        const options = wrap.querySelectorAll('.custom-select-option');

        if (!trigger || !list) return;

        // Skip if already initialized
        if (wrap.dataset.initialized) return;
        wrap.dataset.initialized = 'true';

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = list.classList.toggle('open');
            wrap.classList.toggle('open', isOpen);
            
            // Close other dropdowns
            document.querySelectorAll('.custom-select-list.open').forEach(l => {
                if (l !== list) {
                    l.classList.remove('open');
                    l.closest('.custom-select-wrap')?.classList.remove('open');
                }
            });
        });

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                if (valSpan) valSpan.innerHTML = opt.innerHTML;
                list.classList.remove('open');
                wrap.classList.remove('open');
                
                // Update hidden input
                const hiddenInput = wrap.querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    hiddenInput.value = opt.dataset.value || opt.innerText;
                }
                
                // Trigger change event
                wrap.dispatchEvent(new CustomEvent('change', { detail: { value: opt.dataset.value } }));
            });
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-list.open').forEach(list => {
            list.classList.remove('open');
            list.closest('.custom-select-wrap')?.classList.remove('open');
        });
    });
}

// =====================
// MULTI-SELECT INIT
// =====================
function initMultiSelect() {
    const wrap = document.getElementById('categories-filter');
    if (!wrap) return;
    
    const trigger = wrap.querySelector('.custom-select-trigger');
    const tagsContainer = wrap.querySelector('.multi-select-tags');
    const placeholder = wrap.querySelector('.multi-select-placeholder');
    const list = wrap.querySelector('.multi-select-list');
    
    if (!trigger || !list) {
        return;
    }
    
    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = list.classList.toggle('open');
        wrap.classList.toggle('open', isOpen);
    });
    
    // Handle checkbox changes
    list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const selected = Array.from(list.querySelectorAll('input:checked')).map(c => c.value);
            filters.categories = selected;
            
            // Update tags display
            if (selected.length > 0) {
                if (placeholder) placeholder.style.display = 'none';
                tagsContainer.innerHTML = selected.map(cat => 
                    `<span class="tag tag-sm" data-i18n="category.${cat}">${cat} <svg onclick="this.parentElement.remove();document.querySelector('#categories-filter input[value=\\'${cat}\\']').checked=false;filters.categories=filters.categories.filter(c=>c!=='${cat}');loadSuppliers();" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>`
                ).join('');
            } else {
                tagsContainer.innerHTML = `<span class="multi-select-placeholder" data-i18n="suppliers.select_categories">Select categories...</span>`;
            }
            
            pagination.page = 1;
            loadSuppliers();
        });
    });
}

// =====================
// UTILITIES
// =====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getCustomSelectValue(id) {
    const select = document.getElementById(id);
    if (!select) return 'all';
    const hidden = select.querySelector('input[type="hidden"]');
    return hidden ? hidden.value : 'all';
}

function getRatingSelectValue(id) {
    const select = document.getElementById(id);
    if (!select) return 0;
    const hidden = select.querySelector('input[type="hidden"]');
    return hidden ? parseInt(hidden.value) : 0;
}

function showToast(messageKey) {
    // Get translated message
    let message = messageKey;
    if (typeof translationEngine !== 'undefined') {
        const data = window.translations && window.translations[translationEngine.currentLang];
        if (data) {
            const translated = translationEngine.getValueByPath(data, messageKey);
            if (translated) message = translated;
        }
    }
    
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// =====================
// DEFICIT TOOLTIP (JS positioning to avoid overflow)
// =====================
let actionTooltipEl = null;

function showActionTooltip(el, text) {
    if (!text) return;

    // Remove any existing tooltip
    hideActionTooltip();

    // Get translated text if available
    const i18nKey = el.getAttribute('data-i18n-tooltip');
    let translatedText = text;
    if (i18nKey && typeof translationEngine !== 'undefined') {
        const data = window.translations && window.translations[translationEngine.currentLang];
        if (data) {
            const translated = translationEngine.getValueByPath(data, i18nKey);
            if (translated) translatedText = translated;
        }
    }

    actionTooltipEl = document.createElement('div');
    actionTooltipEl.className = 'js-action-tooltip';
    actionTooltipEl.innerHTML = `<span>${translatedText}</span>`;
    document.body.appendChild(actionTooltipEl);
    
    const rect = el.getBoundingClientRect();
    const tooltipWidth = actionTooltipEl.offsetWidth;
    const tooltipHeight = actionTooltipEl.offsetHeight;
    const viewportWidth = window.innerWidth;
    
    // Smart positioning: check if tooltip would overflow left or right
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    
    // If too far left, align to left edge of indicator
    if (left < 10) {
        left = rect.left;
    }
    // If too far right, align to right edge of indicator
    if (left + tooltipWidth > viewportWidth - 10) {
        left = rect.right - tooltipWidth;
    }
    
    // Position above indicator
    let top = rect.top - tooltipHeight - 8;
    
    // If not enough space above, show below
    if (top < 10) {
        top = rect.bottom + 8;
    }
    
    actionTooltipEl.style.left = `${left}px`;
    actionTooltipEl.style.top = `${top}px`;
    
    requestAnimationFrame(() => actionTooltipEl.style.opacity = '1');
}

function hideActionTooltip() {
    if (actionTooltipEl) {
        actionTooltipEl.remove();
        actionTooltipEl = null;
    }
}

function initActionTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(el => {
        // Skip already initialized
        if (el.dataset.tooltipInit) return;
        el.dataset.tooltipInit = 'true';
        
        el.addEventListener('mouseenter', () => {
            const text = el.dataset.tooltip;
            showActionTooltip(el, text);
        });
        el.addEventListener('mouseleave', hideActionTooltip);
        
        // Touch support for mobile
        el.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const text = el.dataset.tooltip;
            showActionTooltip(el, text);
        });
        el.addEventListener('touchend', hideActionTooltip);
    });
}

// =====================
// GLOBAL EXPOSURE
// =====================
window.switchView = switchView;
window.updateSupplierStatus = updateSupplierStatus;
window.exportSuppliers = exportSuppliers;
