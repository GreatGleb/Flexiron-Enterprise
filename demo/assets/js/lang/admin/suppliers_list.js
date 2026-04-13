console.log("Flexiron: Suppliers List Dictionary Loading...");

if (typeof window.translations === 'undefined') { 
    window.translations = { ru: {}, en: {}, lt: {} }; 
}

/* Suppliers List (04.1) Translations */

// --- RU ---
window.translations.ru.page = window.translations.ru.page || {};
Object.assign(window.translations.ru.page, {
    suppliers_list: "Список поставщиков",
    header_title: "Поставщики"
});

window.translations.ru.page.seo = window.translations.ru.page.seo || {};
Object.assign(window.translations.ru.page.seo, {
    title: "Flexiron — Список поставщиков",
    description: "Управление поставщиками"
});

window.translations.ru.suppliers = {
    list: "Поставщики",
    filters: "Фильтры",
    count: "поставщиков",
    view_table: "Таблица",
    view_kanban: "Канбан",
    search_placeholder: "Поиск по названию, коду или контакту...",
    select_categories: "Выберите категории...",
    days: "дней",
    of: "из",
    // Table columns
    th_company: "Компания",
    th_status: "Статус",
    th_rating: "Рейтинг",
    th_specialization: "Специализация",
    th_lead_time: "Срок поставки",
    th_last_request: "Последний запрос",
    th_contacts: "Контакты",
    th_actions: "Действия",
    // Kanban columns
    col_active: "Активные",
    col_preferred: "Приоритетные",
    col_new: "Новые",
    col_under_review: "На проверке",
    col_suspended: "Приостановлены",
    col_blocked: "Заблокированы",
    // Empty/Error states
    empty_title: "Поставщики не найдены",
    empty_btn: "Добавить первого поставщика",
    error_title: "Ошибка загрузки данных",
    error_btn: "Повторить",
    // Pagination
    page_size: "на странице",
    load_more: "Загрузить ещё",
    // Rating
    any_rating: "Любой рейтинг"
};

window.translations.ru.btn = window.translations.ru.btn || {};
Object.assign(window.translations.ru.btn, {
    new_supplier: "Новый поставщик",
    bcc_request: "BCC запрос",
    export: "Экспорт",
    save_view: "Сохранить вид"
});

window.translations.ru.status = window.translations.ru.status || {};
Object.assign(window.translations.ru.status, {
    Active: "Активен",
    Preferred: "Приоритетный",
    New: "Новый",
    "Under Review": "На проверке",
    Suspended: "Приостановлен",
    Blocked: "Заблокирован"
});

window.translations.ru.st = window.translations.ru.st || {};
Object.assign(window.translations.ru.st, {
    all: "Все",
    active: "Активен",
    preferred: "Приоритетный",
    new: "Новый",
    review: "На проверке",
    suspended: "Приостановлен",
    blocked: "Заблокирован"
});

window.translations.ru.category = window.translations.ru.category || {};
Object.assign(window.translations.ru.category, {
    Sheets: "Листы",
    Pipes: "Трубы",
    Beams: "Балки",
    Rebars: "Арматура",
    Lintels: "Перемычки",
    Profiles: "Профили",
    Wire: "Проволока",
    Fittings: "Фитинги"
});

window.translations.ru.tooltip = window.translations.ru.tooltip || {};
Object.assign(window.translations.ru.tooltip, {
    deficit_indicator: "Дефицит поставщика — проблемы с поставками",
    view_details: "Открыть карточку",
    send_bcc: "Отправить BCC"
});

window.translations.ru.msg = window.translations.ru.msg || {};
Object.assign(window.translations.ru.msg, {
    supplier_deleted: "Поставщик удалён",
    status_changed: "Статус изменён",
    status_error: "Ошибка изменения статуса",
    prefs_saved: "Настройки сохранены"
});

// --- EN ---
window.translations.en.page = window.translations.en.page || {};
Object.assign(window.translations.en.page, {
    suppliers_list: "Suppliers List",
    header_title: "Suppliers"
});

window.translations.en.page.seo = window.translations.en.page.seo || {};
Object.assign(window.translations.en.page.seo, {
    title: "Flexiron — Suppliers List",
    description: "Suppliers management"
});

window.translations.en.suppliers = {
    list: "Suppliers",
    filters: "Filters",
    count: "suppliers",
    view_table: "Table",
    view_kanban: "Kanban",
    search_placeholder: "Search by name, code or contact...",
    select_categories: "Select categories...",
    days: "days",
    of: "of",
    th_company: "Company",
    th_status: "Status",
    th_rating: "Rating",
    th_specialization: "Specialization",
    th_lead_time: "Lead Time",
    th_last_request: "Last Request",
    th_contacts: "Contacts",
    th_actions: "Actions",
    col_active: "Active",
    col_preferred: "Preferred",
    col_new: "New",
    col_under_review: "Under Review",
    col_suspended: "Suspended",
    col_blocked: "Blocked",
    empty_title: "No suppliers found",
    empty_btn: "Add first supplier",
    error_title: "Error loading data",
    error_btn: "Retry",
    page_size: "per page",
    load_more: "Load more",
    // Rating
    any_rating: "Any rating"
};

window.translations.en.btn = window.translations.en.btn || {};
Object.assign(window.translations.en.btn, {
    new_supplier: "New Supplier",
    bcc_request: "BCC Request",
    export: "Export",
    save_view: "Save View"
});

window.translations.en.status = window.translations.en.status || {};
Object.assign(window.translations.en.status, {
    Active: "Active",
    Preferred: "Preferred",
    New: "New",
    "Under Review": "Under Review",
    Suspended: "Suspended",
    Blocked: "Blocked"
});

window.translations.en.st = window.translations.en.st || {};
Object.assign(window.translations.en.st, {
    all: "All",
    active: "Active",
    preferred: "Preferred",
    new: "New",
    review: "Under Review",
    suspended: "Suspended",
    blocked: "Blocked"
});

window.translations.en.category = window.translations.en.category || {};
Object.assign(window.translations.en.category, {
    Sheets: "Sheets",
    Pipes: "Pipes",
    Beams: "Beams",
    Rebars: "Rebars",
    Lintels: "Lintels",
    Profiles: "Profiles",
    Wire: "Wire",
    Fittings: "Fittings"
});

window.translations.en.tooltip = window.translations.en.tooltip || {};
Object.assign(window.translations.en.tooltip, {
    deficit_indicator: "Supplier has deficit - issues with deliveries",
    view_details: "View Details",
    send_bcc: "Send BCC"
});

window.translations.en.msg = window.translations.en.msg || {};
Object.assign(window.translations.en.msg, {
    supplier_deleted: "Supplier deleted",
    status_changed: "Status changed successfully",
    status_error: "Error updating status",
    prefs_saved: "Preferences saved"
});

// --- LT ---
window.translations.lt.page = window.translations.lt.page || {};
Object.assign(window.translations.lt.page, {
    suppliers_list: "Tiekėjų sąrašas",
    header_title: "Tiekėjai"
});

window.translations.lt.page.seo = window.translations.lt.page.seo || {};
Object.assign(window.translations.lt.page.seo, {
    title: "Flexiron — Tiekėjų sąrašas",
    description: "Tiekėjų valdymas"
});

window.translations.lt.suppliers = {
    list: "Tiekėjai",
    filters: "Filtrai",
    count: "tiekėjai",
    view_table: "Lentelė",
    view_kanban: "Kanban",
    search_placeholder: "Ieškoti pagal pavadinimą, kodą ar kontaktą...",
    select_categories: "Pasirinkti kategorijas...",
    days: "dienos",
    of: "iš",
    th_company: "Įmonė",
    th_status: "Būsena",
    th_rating: "Įvertinimas",
    th_specialization: "Specializacija",
    th_lead_time: "Pristatymo laikas",
    th_last_request: "Paskutinis užklausimas",
    th_contacts: "Kontaktai",
    th_actions: "Veiksmai",
    col_active: "Aktyvus",
    col_preferred: "Pageidaujamas",
    col_new: "Naujas",
    col_under_review: "Peržiūrimas",
    col_suspended: "Sustabdytas",
    col_blocked: "Blokuotas",
    empty_title: "Tiekėjai nerasti",
    empty_btn: "Pridėti pirmą tiekėją",
    error_title: "Klaida kraunant duomenis",
    error_btn: "Bandyti dar kart",
    page_size: "puslapyje",
    load_more: "Krauti daugiau",
    // Rating
    any_rating: "Bet koks vertinimas"
};

window.translations.lt.btn = window.translations.lt.btn || {};
Object.assign(window.translations.lt.btn, {
    new_supplier: "Naujas tiekjas",
    bcc_request: "BCC uzklausa",
    export: "Eksportuoti",
    save_view: "Isaugoti vaizd"
});

window.translations.lt.status = window.translations.lt.status || {};
Object.assign(window.translations.lt.status, {
    Active: "Aktyvus",
    Preferred: "Pageidaujamas",
    New: "Naujas",
    "Under Review": "Peržiūrimas",
    Suspended: "Sustabdytas",
    Blocked: "Blokuotas"
});

window.translations.lt.st = window.translations.lt.st || {};
Object.assign(window.translations.lt.st, {
    all: "Visi",
    active: "Aktyvus",
    preferred: "Pageidaujamas",
    new: "Naujas",
    review: "Peržiūrimas",
    suspended: "Sustabdytas",
    blocked: "Blokuotas"
});

window.translations.lt.category = window.translations.lt.category || {};
Object.assign(window.translations.lt.category, {
    Sheets: "Lakštai",
    Pipes: "Vamzdžiai",
    Beams: "Sijos",
    Rebars: "Armatura",
    Lintels: "Sijos",
    Profiles: "Profiliai",
    Wire: "Viela",
    Fittings: "Jungiamosios detalės"
});

window.translations.lt.tooltip = window.translations.lt.tooltip || {};
Object.assign(window.translations.lt.tooltip, {
    deficit_indicator: "Tiekėjo deficitas — problemos su pristatymais",
    view_details: "Peržiūrėti profilį",
    send_bcc: "Siųsti BCC"
});

window.translations.lt.msg = window.translations.lt.msg || {};
Object.assign(window.translations.lt.msg, {
    supplier_deleted: "Tiekėjas ištrintas",
    status_changed: "Statusas pakeistas sėkmingai",
    status_error: "Klaida keičiant statusą",
    prefs_saved: "Nustatymai išsaugoti"
});

console.log("Flexiron: Suppliers List Dictionary Loaded.");
