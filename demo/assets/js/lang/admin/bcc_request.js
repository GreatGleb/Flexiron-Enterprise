console.log("Flexiron: BCC Request Tool Dictionary Loading...");

if (typeof window.translations === 'undefined') { 
    window.translations = { ru: {}, en: {}, lt: {} }; 
}

/* BCC Request Tool (04.2) Translations */

// --- RU ---
window.translations.ru.page = window.translations.ru.page || {};
Object.assign(window.translations.ru.page, {
    bcc_request: "Инструмент BCC запросов",
    header_title: "Инструмент BCC запросов"
});

window.translations.ru.bcc = {
    categories: "Выбор товаров",
    categories_label: "Товары",
    select_products: "Выберите товары...",
    active_suppliers: "активных поставщиков",
    recipients: "Получатели",
    email_template: "Шаблон письма",
    subject_label: "Тема",
    subject_placeholder: "Введите тему письма...",
    body_label: "Текст сообщения",
    body_placeholder: "Введите ваше сообщение...",
    attachments: "Вложения",
    dropzone_hint: "Перетащите файлы<br>(PDF чертежи, Спецификации)",
    history: "История запросов",
    accept_response: "Принять ответ",
    supplier: "Поставщик",
    items_requested: "Запрошенные позиции",
    price: "Цена",
    selected_text: "выбрано",
    search_suppliers: "Поиск поставщиков...",
    cancel: "Отмена",
    save_price: "Сохранить цену",
    select_categories: "Выберите категории...",
    status_sent: "Отправлено",
    status_responded: "Отвечено",
    status_no_response: "Нет ответа",
    record_response: "Записать ответ",
    cancel_request: "Отменить запрос",
    edit_response: "Редактировать ответ",
    no_response: "Нет ответа",
    suppliers: "поставщиков",
    badge_suppliers: "поставщиков",
    badge_selected: "выбрано",
    // Categories
    cat_sheets: "Листы",
    cat_lintels: "Перемычки",
    cat_beams: "Балки",
    cat_pipes: "Трубы",
    cat_rebars: "Арматура",
    // Products - Sheets
    prod_sheet_2mm: "Лист 2мм",
    prod_sheet_3mm: "Лист 3мм",
    prod_sheet_5mm: "Лист 5мм",
    prod_sheet_10mm: "Лист 10мм",
    // Products - Lintels
    prod_lintel_100: "Перемычка 100x100",
    prod_lintel_150: "Перемычка 150x150",
    // Products - Beams
    prod_beam_i20: "Двутавр 20",
    prod_beam_i30: "Двутавр 30",
    prod_beam_heb: "Балка HEB",
    // Products - Pipes
    prod_pipe_50: "Труба 50мм",
    prod_pipe_100: "Труба 100мм",
    prod_pipe_150: "Труба 150мм",
    // Products - Rebars
    prod_rebar_12: "Арматура 12мм",
    prod_rebar_16: "Арматура 16мм",
    prod_rebar_20: "Арматура 20мм"
};

window.translations.ru.btn = window.translations.ru.btn || {};
Object.assign(window.translations.ru.btn, {
    send_request: "Отправить BCC запрос",
    select_all: "Выбрать все",
    deselect_all: "Снять выбор"
});

window.translations.ru.th = window.translations.ru.th || {};
Object.assign(window.translations.ru.th, {
    categories: "Категории",
    recipients: "Получатели",
    product: "Товар",
    supplier: "Поставщик",
    actions: "Действия",
    date: "Дата",
    request_id: "ID",
    status: "Статус"
});

window.translations.ru.msg = window.translations.ru.msg || {};
Object.assign(window.translations.ru.msg, {
    bcc_sent: "BCC запрос успешно отправлен!",
    select_product: "Выберите хотя бы один товар",
    select_recipient: "Выберите хотя бы одного получателя",
    enter_subject: "Введите тему письма",
    price_saved: "Цена сохранена в истории поставщика",
    enter_price: "Введите корректную цену"
});

// --- EN ---
window.translations.en.page = window.translations.en.page || {};
Object.assign(window.translations.en.page, {
    bcc_request: "BCC Request Tool",
    header_title: "BCC Request Tool"
});

window.translations.en.bcc = {
    categories: "Select Products",
    categories_label: "Products",
    select_products: "Select products...",
    active_suppliers: "active suppliers",
    recipients: "Recipients",
    email_template: "Email Template",
    subject_label: "Subject",
    subject_placeholder: "Enter email subject...",
    body_label: "Message Body",
    body_placeholder: "Enter your message...",
    attachments: "Attachments",
    dropzone_hint: "Drag & Drop files<br>(PDF drawings, Specifications)",
    history: "Request History",
    accept_response: "Accept Response",
    supplier: "Supplier",
    items_requested: "Items Requested",
    price: "Price",
    selected_text: "selected",
    search_suppliers: "Search suppliers...",
    cancel: "Cancel",
    save_price: "Save Price",
    select_categories: "Select categories...",
    status_sent: "Sent",
    status_responded: "Responded",
    status_no_response: "No Response",
    record_response: "Record Response",
    cancel_request: "Cancel Request",
    edit_response: "Edit Response",
    no_response: "No Response",
    suppliers: "suppliers",
    badge_suppliers: "suppliers",
    badge_selected: "selected",
    // Categories
    cat_sheets: "Sheets",
    cat_lintels: "Lintels",
    cat_beams: "Beams",
    cat_pipes: "Pipes",
    cat_rebars: "Rebars",
    // Products - Sheets
    prod_sheet_2mm: "Sheet 2mm",
    prod_sheet_3mm: "Sheet 3mm",
    prod_sheet_5mm: "Sheet 5mm",
    prod_sheet_10mm: "Sheet 10mm",
    // Products - Lintels
    prod_lintel_100: "Lintel 100x100",
    prod_lintel_150: "Lintel 150x150",
    // Products - Beams
    prod_beam_i20: "I-Beam 20",
    prod_beam_i30: "I-Beam 30",
    prod_beam_heb: "HEB Beam",
    // Products - Pipes
    prod_pipe_50: "Pipe 50mm",
    prod_pipe_100: "Pipe 100mm",
    prod_pipe_150: "Pipe 150mm",
    // Products - Rebars
    prod_rebar_12: "Rebar 12mm",
    prod_rebar_16: "Rebar 16mm",
    prod_rebar_20: "Rebar 20mm"
};

window.translations.en.btn = window.translations.en.btn || {};
Object.assign(window.translations.en.btn, {
    send_request: "Send BCC Request",
    select_all: "Select All",
    deselect_all: "Deselect All"
});

window.translations.en.th = window.translations.en.th || {};
Object.assign(window.translations.en.th, {
    categories: "Categories",
    recipients: "Recipients",
    product: "Product",
    supplier: "Supplier",
    actions: "Actions",
    date: "Date",
    request_id: "ID",
    status: "Status"
});

window.translations.en.msg = window.translations.en.msg || {};
Object.assign(window.translations.en.msg, {
    bcc_sent: "BCC Request sent successfully!",
    select_product: "Please select at least one product",
    select_recipient: "Please select at least one recipient",
    enter_subject: "Please enter email subject",
    price_saved: "Price saved to supplier history",
    enter_price: "Please enter a valid price"
});

// --- LT ---
window.translations.lt.page = window.translations.lt.page || {};
Object.assign(window.translations.lt.page, {
    bcc_request: "BCC Užklausų Įrankis",
    header_title: "BCC Užklausų Įrankis"
});

window.translations.lt.bcc = {
    categories: "Pasirinkti Produktus",
    categories_label: "Produktai",
    select_products: "Pasirinkite produktus...",
    active_suppliers: "aktyvs tiekėjai",
    recipients: "Gavėjai",
    email_template: "El. Laiško Šablonas",
    subject_label: "Tema",
    subject_placeholder: "įveskite el. laiško temą...",
    body_label: "Laiško Turinys",
    body_placeholder: "Įveskite savo žinutę...",
    attachments: "Priedai",
    dropzone_hint: "Vilkite failus čia<br>(PDF brėžiniai, Specifikacijos)",
    history: "Užklausų Istorija",
    accept_response: "Priimti Atsakymą",
    supplier: "Tiekėjas",
    items_requested: "Užklaustos Prekės",
    price: "Kaina",
    selected_text: "pasirinkta",
    search_suppliers: "Ieškoti tiekėjų...",
    cancel: "Atšaukti",
    save_price: "Išsaugoti kainą",
    select_categories: "Pasirinkti kategorijas...",
    status_sent: "Išsiųsta",
    status_responded: "Atsakyta",
    status_no_response: "Nėra atsakymo",
    record_response: "Užregistruoti atsakymą",
    cancel_request: "Atšaukti užklausą",
    edit_response: "Redaguoti atsakymą",
    no_response: "Nera atsakymo",
    suppliers: "tiekejai",
    badge_suppliers: "tiekejai",
    badge_selected: "pasirinkta",
    // Categories
    cat_sheets: "Lakštai",
    cat_lintels: "Sijos",
    cat_beams: "Bėgiai",
    cat_pipes: "Vamzdžiai",
    cat_rebars: "Armatura",
    // Products - Sheets
    prod_sheet_2mm: "Lakštas 2mm",
    prod_sheet_3mm: "Lakštas 3mm",
    prod_sheet_5mm: "Lakštas 5mm",
    prod_sheet_10mm: "Lakštas 10mm",
    // Products - Lintels
    prod_lintel_100: "Sija 100x100",
    prod_lintel_150: "Sija 150x150",
    // Products - Beams
    prod_beam_i20: "Dvitėjis 20",
    prod_beam_i30: "Dvitėjis 30",
    prod_beam_heb: "Bėgis HEB",
    // Products - Pipes
    prod_pipe_50: "Vamzdis 50mm",
    prod_pipe_100: "Vamzdis 100mm",
    prod_pipe_150: "Vamzdis 150mm",
    // Products - Rebars
    prod_rebar_12: "Armatura 12mm",
    prod_rebar_16: "Armatura 16mm",
    prod_rebar_20: "Armatura 20mm"
};

window.translations.lt.btn = window.translations.lt.btn || {};
Object.assign(window.translations.lt.btn, {
    send_request: "Sisti BCC Uklaus",
    select_all: "Pasirinkti Visus",
    deselect_all: "Nuimti Visus"
});

window.translations.lt.th = window.translations.lt.th || {};
Object.assign(window.translations.lt.th, {
    categories: "Kategorijos",
    recipients: "Gavėjai",
    product: "Produktas",
    supplier: "Tiekėjas",
    actions: "Veiksmai",
    date: "Data",
    request_id: "ID",
    status: "Būsena"
});

window.translations.lt.msg = window.translations.lt.msg || {};
Object.assign(window.translations.lt.msg, {
    bcc_sent: "BCC ukklausa skmingai ista!",
    select_product: "Pasirinkite bent vien produkt",
    select_recipient: "Pasirinkite bent vien gavj",
    enter_subject: "veskite el. laiiko tem",
    price_saved: "Kaina irayta tiekjo istorijoje",
    enter_price: "veskite teising kain"
});

console.log("Flexiron: BCC Request Tool Dictionary Loaded.");
