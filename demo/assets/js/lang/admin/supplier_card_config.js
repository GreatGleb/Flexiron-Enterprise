console.log("Flexiron: Supplier Card Config Dictionary Loading...");

// Use global translations object (same as admin_common.js)
if (typeof translations === 'undefined') { 
    var translations = { ru: {}, en: {}, lt: {} }; 
}

/* Supplier Card Config (04.1_Config) Translations */

// --- RU ---
// Sidebar navigation
translations.ru.side = translations.ru.side || {};
translations.ru.side.analytics = "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430";
translations.ru.side.modules = "\u041C\u043E\u0434\u0443\u043B\u0438";
translations.ru.side.items = "\u0422\u043E\u0432\u0430\u0440\u044B";
translations.ru.side.warehouse = "\u0421\u043A\u043B\u0430\u0434";
translations.ru.side.sales = "\u041F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 CRM";
translations.ru.side.supply = "\u0417\u0430\u043A\u0443\u043F\u043A\u0438";
translations.ru.side.finance = "\u0424\u0438\u043D\u0430\u043D\u0441\u044B";
translations.ru.side.settings = "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438";

// Header
translations.ru.head = translations.ru.head || {};
translations.ru.head.user = "\u041C\u0430\u043A\u0441\u0438\u043C \u0412.";
translations.ru.head.role = "\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440";
translations.ru.head.search = "\u041F\u043E\u0438\u0441\u043A...";

translations.ru.page = translations.ru.page || {};
translations.ru.page.config_title = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F";
translations.ru.page.global_fields = "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F";
translations.ru.page.card_structure = "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430";
translations.ru.page.editor = "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440";
translations.ru.page.header_title = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430";
translations.ru.page.seo = { title: "Flexiron - \u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430", description: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u043E\u043B\u0435\u0439 \u0438 \u0441\u0435\u043A\u0446\u0438\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430" };
translations.ru.page.permissions_editor = "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430";

// Section & Field names (from supplier_card.js)
translations.ru.sp = {
    status_title: "\u0416\u0438\u0437\u043D\u0435\u043D\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u0438 \u0441\u0442\u0430\u0442\u0443\u0441",
    status_label: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441",
    status: "\u0421\u0442\u0430\u0442\u0443\u0441",
    rating_label: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0441\u0442\u0438",
    rating: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433",
    status_reason: "\u041F\u0440\u0438\u0447\u0438\u043D\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 / \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
    status_placeholder: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0438\u043B\u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438...",
    contract_date: "\u0414\u0430\u0442\u0430 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430",
    requisites: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
    name: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
    vat: "\u041A\u043E\u0434 \u041D\u0414\u0421",
    address: "\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0434\u0440\u0435\u0441",
    contact: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E",
    contact_name: "\u0424\u0418\u041E",
    contact_email: "\u042D\u043B. \u043F\u043E\u0447\u0442\u0430",
    contact_phone: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    procurement: "\u0417\u0430\u043A\u0443\u043F\u043A\u0438 \u0438 \u043B\u043E\u0433\u0438\u0441\u0442\u0438\u043A\u0430",
    spec: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F (\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043C\u0435\u0442\u0430\u043B\u043B\u0430)",
    spec_placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E...",
    bcc: "BCC Price Emails",
    bcc_placeholder: "\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C@email.com",
    currency: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0432\u0430\u043B\u044E\u0442\u0430",
    payment: "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u043F\u043B\u0430\u0442\u044B",
    lead: "\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 (\u0441\u0440\u0435\u0434. \u0434\u043D\u0435\u0439)",
    lead_hint: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442 \u0437\u0430\u043A\u0430\u0437\u0430 \u0434\u043E \u043F\u043E\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0430 \u0441\u043A\u043B\u0430\u0434.",
    min: "\u041C\u0438\u043D. \u0441\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430",
    notes_title: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F",
    notes: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
    notes_placeholder: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0443...",
    pricing_hist: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0446\u0435\u043D \u0438 \u0437\u0430\u043A\u0430\u0437\u043E\u0432",
    pricing_table: "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0446\u0435\u043D",
    req_hist: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F BCC \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432",
    bcc_logs_table: "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 BCC \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432",
    files_title: "\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B",
    files: "\u0424\u0430\u0439\u043B\u044B",
    dropzone_hint: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0441\u044E\u0434\u0430<br>(\u041A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B, \u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442\u044B, \u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B)",
    audit: "\u041F\u043E\u043B\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0430\u0443\u0434\u0438\u0442\u0430 (Entity Log)",
    audit_log: "\u0416\u0443\u0440\u043D\u0430\u043B \u0430\u0443\u0434\u0438\u0442\u0430",
    new_req: "\u041D\u043E\u0432\u044B\u0439 \u0417\u0430\u043F\u0440\u043E\u0441...",
    sel_source: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
    sel_status: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0421\u0442\u0430\u0442\u0443\u0441",
    sel_product: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0422\u043E\u0432\u0430\u0440"
};

translations.ru.btn = translations.ru.btn || {};
translations.ru.btn.new_field = "\u041D\u043E\u0432\u043E\u0435 \u043F\u043E\u043B\u0435";
translations.ru.btn.add_section = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.btn.save = "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C";
translations.ru.btn.preview = "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440";
translations.ru.btn.reset = "\u0421\u0431\u0440\u043E\u0441";
translations.ru.btn.export = "\u042D\u043A\u0441\u043F\u043E\u0440\u0442";
translations.ru.btn.import = "\u0418\u043C\u043F\u043E\u0440\u0442";
translations.ru.btn.cancel = "\u041E\u0442\u043C\u0435\u043D\u0430";
translations.ru.btn.create = "\u0421\u043E\u0437\u0434\u0430\u0442\u044C";
translations.ru.btn.delete = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C";
translations.ru.btn.collapse = "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C";
translations.ru.btn.edit = "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
translations.ru.btn.add = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C";
translations.ru.btn.add_field = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u0435";
translations.ru.btn.hide_field = "\u0421\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u0435";
translations.ru.btn.delete_field = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u0435";
translations.ru.btn.hide_section = "\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.btn.system_section = "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0441\u0435\u043A\u0446\u0438\u044F";
translations.ru.btn.system_section_tooltip = "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0441\u0435\u043A\u0446\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0430";

translations.ru.field = translations.ru.field || {};
translations.ru.field.search = "\u041F\u043E\u0438\u0441\u043A \u043F\u043E\u043B\u0435\u0439...";
translations.ru.field.field_name = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u043B\u044F";
translations.ru.field.field_type = "\u0422\u0438\u043F \u043F\u043E\u043B\u044F";
translations.ru.field.type = "\u0422\u0438\u043F \u043F\u043E\u043B\u044F";
translations.ru.field.default_value = "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E";
translations.ru.field.section_name = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u0435\u043A\u0446\u0438\u0438";
translations.ru.field.type_text = "\u0422\u0435\u043A\u0441\u0442";
translations.ru.field.type_number = "\u0427\u0438\u0441\u043B\u043E";
translations.ru.field.type_boolean = "\u041B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439";
translations.ru.field.type_email = "Email";
translations.ru.field.type_date = "\u0414\u0430\u0442\u0430";
translations.ru.field.type_money = "\u0412\u0430\u043B\u044E\u0442\u0430";
translations.ru.field.type_enum = "\u0421\u043F\u0438\u0441\u043E\u043A";
translations.ru.field.type_reference = "\u0421\u0441\u044B\u043B\u043A\u0430";
translations.ru.field.type_file = "\u0424\u0430\u0439\u043B";
translations.ru.field.type_tags = "\u0422\u0435\u0433\u0438";
translations.ru.field.type_notes = "\u0417\u0430\u043C\u0435\u0442\u043A\u0438";
translations.ru.field.type_table = "\u0422\u0430\u0431\u043B\u0438\u0446\u0430";
translations.ru.field.used_in_sections = "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432 \u0441\u0435\u043A\u0446\u0438\u044F\u0445";
translations.ru.field.new = "\u041D\u043E\u0432\u043E\u0435";

translations.ru.section = translations.ru.section || {};
translations.ru.section.fields = "\u043F\u043E\u043B\u0435\u0439";
translations.ru.section.permissions = "\u041F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430";
translations.ru.section.new = "\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u043A\u0446\u0438\u044F";

translations.ru.modal = translations.ru.modal || {};
translations.ru.modal.new_field = "\u041D\u043E\u0432\u043E\u0435 \u043F\u043E\u043B\u0435";
translations.ru.modal.preview = "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440";
translations.ru.modal.confirm_delete = "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435";
translations.ru.modal.edit_section = "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.modal.add_field_to_section = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u0435 \u0432 \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.modal.delete_message = "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.";

translations.ru.preview = translations.ru.preview || {};
translations.ru.preview.description = "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0441\u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C";

translations.ru.permissions = translations.ru.permissions || {};
translations.ru.permissions.action = "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435";
translations.ru.permissions.item = "\u042D\u043B\u0435\u043C\u0435\u043D\u0442";
translations.ru.permissions.type = "\u0422\u0438\u043F";
translations.ru.permissions.type_section = "\u0421\u0435\u043A\u0446\u0438\u044F";
translations.ru.permissions.type_field = "\u041F\u043E\u043B\u0435";
translations.ru.permissions.action_read = "\u0427\u0442\u0435\u043D\u0438\u0435";
translations.ru.permissions.action_edit = "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435";
translations.ru.permissions.action_create = "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435";
translations.ru.permissions.action_delete = "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435";
translations.ru.permissions.expand_users = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439";

translations.ru.role = translations.ru.role || {};
translations.ru.role.admin = "\u0410\u0434\u043C\u0438\u043D";
translations.ru.role.manager = "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440";
translations.ru.role.user = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C";
translations.ru.role.viewer = "\u0417\u0440\u0438\u0442\u0435\u043B\u044C";
translations.ru.role.sales = "\u041F\u0440\u043E\u0434\u0430\u0436\u0438";
translations.ru.role.warehouse = "\u0421\u043A\u043B\u0430\u0434";
translations.ru.role.accounting = "\u0411\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440\u0438\u044F";

translations.ru.permission = translations.ru.permission || {};
translations.ru.permission.view = "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440";
translations.ru.permission.edit = "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435";
translations.ru.permission.delete = "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435";
translations.ru.permission.override = "\u041F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435";

translations.ru.notification = translations.ru.notification || {};
translations.ru.notification.field_added = "\u041F\u043E\u043B\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.notification.field_reordered = "\u041F\u043E\u043B\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E \u0432 \u0441\u0435\u043A\u0446\u0438\u0438";
translations.ru.notification.field_moved = "\u041F\u043E\u043B\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043E \u0432 \u0434\u0440\u0443\u0433\u0443\u044E \u0441\u0435\u043A\u0446\u0438\u044E";
translations.ru.notification.fill_all_fields = "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F";
translations.ru.notification.section_updated = "\u0421\u0435\u043A\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430";
translations.ru.notification.enter_field_name = "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u043B\u044F";
translations.ru.notification.section_not_found = "\u0421\u0435\u043A\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430";
translations.ru.notification.field_created = "\u041F\u043E\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u043E";
translations.ru.notification.config_saved = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430";
translations.ru.notification.config_reset = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0441\u0431\u0440\u043E\u0448\u0435\u043D\u0430";
translations.ru.notification.config_imported = "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430";
translations.ru.notification.invalid_config = "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u0430\u0439\u043B \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438";

// --- EN (Default) ---
// Sidebar navigation
translations.en.side = translations.en.side || {};
translations.en.side.analytics = "Analytics";
translations.en.side.modules = "Modules";
translations.en.side.items = "Products";
translations.en.side.warehouse = "Warehouse";
translations.en.side.sales = "Sales & CRM";
translations.en.side.supply = "Procurement";
translations.en.side.finance = "Finance";
translations.en.side.settings = "Settings";

// Header
translations.en.head = translations.en.head || {};
translations.en.head.user = "Maxim V.";
translations.en.head.role = "Director";
translations.en.head.search = "Search...";

translations.en.page = translations.en.page || {};
translations.en.page.config_title = "Config";
translations.en.page.global_fields = "Global Fields";
translations.en.page.card_structure = "Supplier Card Structure";
translations.en.page.editor = "Editor";
translations.en.page.header_title = "Supplier Card Configuration";
translations.en.page.seo = { title: "Flexiron - Supplier Card Configuration", description: "Configure supplier card fields and sections" };
translations.en.page.permissions_editor = "Permissions Editor";

// Section & Field names (from supplier_card.js)
translations.en.sp = {
    status_title: "Lifecycle & Status",
    status_label: "Current Status",
    status: "Status",
    rating_label: "Reliability Rating",
    rating: "Rating",
    status_reason: "Status Reason / Comment",
    status_placeholder: "Add status details or internal comments...",
    contract_date: "Contract Date",
    requisites: "Company Requisites",
    name: "Company Name",
    vat: "VAT Code",
    address: "Physical Address",
    contact: "Main Contact Person",
    contact_name: "Full Name",
    contact_email: "Email",
    contact_phone: "Phone",
    procurement: "Procurement & Logistics",
    spec: "Specialization (Metal Categories)",
    spec_placeholder: "Select category...",
    bcc: "BCC Price Emails",
    bcc_placeholder: "add@email.com",
    currency: "Base Currency",
    payment: "Payment Terms",
    lead: "Lead Time (Avg. Days)",
    lead_hint: "Average time from order to goods receipt at the warehouse.",
    min: "Min. Order Value",
    notes_title: "Internal Notes & History",
    notes: "Notes",
    notes_placeholder: "Write a new update about this supplier...",
    pricing_hist: "Pricing & Order History",
    pricing_table: "Pricing Table",
    req_hist: "BCC Request Logs",
    bcc_logs_table: "BCC Logs Table",
    files_title: "Attachments & Contracts",
    files: "Files",
    dropzone_hint: "Drag & Drop Documents<br>(Contracts, Price Lists, Certificates)",
    audit: "Full Audit History (Entity Log)",
    audit_log: "Audit Log",
    new_req: "New Request...",
    sel_source: "Select Source",
    sel_status: "Select Status",
    sel_product: "Select Product"
};

translations.en.btn = translations.en.btn || {};
translations.en.btn.new_field = "New Field";
translations.en.btn.add_section = "Add Section";
translations.en.btn.save = "Save";
translations.en.btn.preview = "Preview";
translations.en.btn.reset = "Reset";
translations.en.btn.export = "Export";
translations.en.btn.import = "Import";
translations.en.btn.cancel = "Cancel";
translations.en.btn.create = "Create";
translations.en.btn.delete = "Delete";
translations.en.btn.collapse = "Collapse";
translations.en.btn.edit = "Edit";
translations.en.btn.add = "Add";
translations.en.btn.add_field = "Add Field";
translations.en.btn.hide_field = "Hide Field";
translations.en.btn.delete_field = "Delete Field";
translations.en.btn.hide_section = "Hide Section";
translations.en.btn.system_section = "System Section";
translations.en.btn.system_section_tooltip = "System section cannot be deleted";

translations.en.field = translations.en.field || {};
translations.en.field.search = "Search fields...";
translations.en.field.field_name = "Field Name";
translations.en.field.field_type = "Field Type";
translations.en.field.type = "Field Type";
translations.en.field.default_value = "Default Value";
translations.en.field.section_name = "Section Name";
translations.en.field.type_text = "Text";
translations.en.field.type_number = "Number";
translations.en.field.type_boolean = "Boolean";
translations.en.field.type_email = "Email";
translations.en.field.type_date = "Date";
translations.en.field.type_money = "Money";
translations.en.field.type_enum = "Enum";
translations.en.field.type_reference = "Reference";
translations.en.field.type_file = "File";
translations.en.field.type_tags = "Tags";
translations.en.field.type_notes = "Notes";
translations.en.field.type_table = "Table";
translations.en.field.used_in_sections = "Used in sections";
translations.en.field.new = "New";

translations.en.section = translations.en.section || {};
translations.en.section.fields = "fields";
translations.en.section.permissions = "Permissions";
translations.en.section.new = "New Section";

translations.en.modal = translations.en.modal || {};
translations.en.modal.new_field = "New Field";
translations.en.modal.preview = "Preview";
translations.en.modal.confirm_delete = "Confirm Delete";
translations.en.modal.edit_section = "Edit Section";
translations.en.modal.add_field_to_section = "Add Field to Section";
translations.en.modal.delete_message = "Are you sure you want to delete this item? This action cannot be undone.";

translations.en.preview = translations.en.preview || {};
translations.en.preview.description = "Preview of the configured Supplier Card will appear here";

translations.en.permissions = translations.en.permissions || {};
translations.en.permissions.action = "Action";
translations.en.permissions.item = "Item";
translations.en.permissions.type = "Type";
translations.en.permissions.type_section = "Section";
translations.en.permissions.type_field = "Field";
translations.en.permissions.action_read = "Read";
translations.en.permissions.action_edit = "Edit";
translations.en.permissions.action_create = "Create";
translations.en.permissions.action_delete = "Delete";
translations.en.permissions.expand_users = "Show users";

translations.en.role = translations.en.role || {};
translations.en.role.admin = "Admin";
translations.en.role.manager = "Manager";
translations.en.role.user = "User";
translations.en.role.viewer = "Viewer";
translations.en.role.sales = "Sales";
translations.en.role.warehouse = "Warehouse";
translations.en.role.accounting = "Accounting";

translations.en.permission = translations.en.permission || {};
translations.en.permission.view = "View";
translations.en.permission.edit = "Edit";
translations.en.permission.delete = "Delete";
translations.en.permission.override = "Override";

translations.en.notification = translations.en.notification || {};
translations.en.notification.field_added = "Field added to section";
translations.en.notification.field_reordered = "Field reordered in section";
translations.en.notification.field_moved = "Field moved to section";
translations.en.notification.fill_all_fields = "Please fill all fields";
translations.en.notification.section_updated = "Section updated";
translations.en.notification.enter_field_name = "Please enter field name";
translations.en.notification.section_not_found = "Section not found";
translations.en.notification.field_created = "Field created";
translations.en.notification.config_saved = "Configuration saved";
translations.en.notification.config_reset = "Configuration reset";
translations.en.notification.config_imported = "Configuration imported";
translations.en.notification.invalid_config = "Invalid configuration file";

// --- LT ---
// Sidebar navigation
translations.lt.side = translations.lt.side || {};
translations.lt.side.analytics = "Analitika";
translations.lt.side.modules = "Moduliai";
translations.lt.side.items = "Produktai";
translations.lt.side.warehouse = "Sandelys";
translations.lt.side.sales = "Pardavimai ir CRM";
translations.lt.side.supply = "Pirkimai";
translations.lt.side.finance = "Finansai";
translations.lt.side.settings = "Nustatymai";

// Header
translations.lt.head = translations.lt.head || {};
translations.lt.head.user = "Maksimas V.";
translations.lt.head.role = "Direktorius";
translations.lt.head.search = "Paieska...";

translations.lt.page = translations.lt.page || {};
translations.lt.page.config_title = "Konfiguracija";
translations.lt.page.global_fields = "Visuotiniai laukai";
translations.lt.page.card_structure = "Tiekejo korteles struktura";
translations.lt.page.editor = "Redaktorius";
translations.lt.page.header_title = "Tiekejo korteles konfiguracija";
translations.lt.page.seo = { title: "Flexiron - Tiekejo korteles konfiguracija", description: "Konfiguruoti tiekejo korteles laukus ir sekcijas" };
translations.lt.page.permissions_editor = "Leidimu redaktorius";

// Section & Field names (from supplier_card.js)
translations.lt.sp = {
    status_title: "Gyvavimo ciklas ir busena",
    status_label: "Dabartine busena",
    status: "Busena",
    rating_label: "Patikimumo reitingas",
    rating: "Reitingas",
    status_reason: "Buenos priezastis / Komentaras",
    status_placeholder: "Pridekite buzenos detales arba vidinius komentarus...",
    contract_date: "Sutarties data",
    requisites: "Imones rekvizitai",
    name: "Imones pavadinimas",
    vat: "PVM kodas",
    address: "Fizinis adresas",
    contact: "Pagrindinis kontaktinis asmuo",
    contact_name: "Vardas, Pavarde",
    contact_email: "El. pastas",
    contact_phone: "Telefonas",
    procurement: "Pirkimai ir logistika",
    spec: "Specializacija (metalo kategorijos)",
    spec_placeholder: "Pasirinkite kategorija...",
    bcc: "BCC kainu el. laiskai",
    bcc_placeholder: "prideti@pastas.lt",
    currency: "Bazine valiuta",
    payment: "Mokejimo salygos",
    lead: "Pristatymo terminas (vid. dienu)",
    lead_hint: "Vidutinis laikas nuo uzsakymo iki prekiu gavimo i sandeli.",
    min: "Min. uzsakymo verte",
    notes_title: "Vidines pastabos ir istorija",
    notes: "Pastabos",
    notes_placeholder: "Parasykite nauja atnaujinima apie si tiekeja...",
    pricing_hist: "Kainu ir uzsakymu istorija",
    pricing_table: "Kainu lentele",
    req_hist: "BCC uzlausu zurnalai",
    bcc_logs_table: "BCC zurnalu lentele",
    files_title: "Priedai ir sutartys",
    files: "Failai",
    dropzone_hint: "Vilkite dokumentus cia<br>(Sutartys, kainorasciai, sertifikatai)",
    audit: "Visa audito istorija (Entity Log)",
    audit_log: "Audito zurnalas",
    new_req: "Nauja Uzklausa...",
    sel_source: "Pasirinkti Saltini",
    sel_status: "Pasirinkti Statusa",
    sel_product: "Pasirinkti Produkta"
};

translations.lt.btn = translations.lt.btn || {};
translations.lt.btn.new_field = "Naujas laukas";
translations.lt.btn.add_section = "Prideti sekcija";
translations.lt.btn.save = "Issaugoti";
translations.lt.btn.preview = "Perziura";
translations.lt.btn.reset = "Atstatyti";
translations.lt.btn.export = "Eksportuoti";
translations.lt.btn.import = "Importuoti";
translations.lt.btn.cancel = "Atsaukti";
translations.lt.btn.create = "Sukurti";
translations.lt.btn.delete = "Istrinti";
translations.lt.btn.collapse = "Suskleisti";
translations.lt.btn.edit = "Redaguoti";
translations.lt.btn.add = "Prideti";
translations.lt.btn.add_field = "Prideti lauka";
translations.lt.btn.hide_field = "Slepti lauka";
translations.lt.btn.delete_field = "Istrinti lauka";
translations.lt.btn.hide_section = "Slepti sekcija";
translations.lt.btn.system_section = "Sistemine sekcija";
translations.lt.btn.system_section_tooltip = "Sisteminems sekcijoms negali buti istrintos";

translations.lt.field = translations.lt.field || {};
translations.lt.field.search = "Ieskoti lauku...";
translations.lt.field.field_name = "Lauko pavadinimas";
translations.lt.field.field_type = "Lauko tipas";
translations.lt.field.type = "Lauko tipas";
translations.lt.field.default_value = "Numatytoji reiksme";
translations.lt.field.section_name = "Sekcijos pavadinimas";
translations.lt.field.type_text = "Tekstas";
translations.lt.field.type_number = "Skaicius";
translations.lt.field.type_boolean = "Loginis";
translations.lt.field.type_email = "El. pastas";
translations.lt.field.type_date = "Data";
translations.lt.field.type_money = "Valiuta";
translations.lt.field.type_enum = "Sarasas";
translations.lt.field.type_reference = "Nuoroda";
translations.lt.field.type_file = "Failas";
translations.lt.field.type_tags = "Zymos";
translations.lt.field.type_notes = "Uzrasai";
translations.lt.field.type_table = "Lentele";
translations.lt.field.used_in_sections = "Naudojama sekcijose";
translations.lt.field.new = "Naujas";

translations.lt.section = translations.lt.section || {};
translations.lt.section.fields = "laukai";
translations.lt.section.permissions = "Leidimai";
translations.lt.section.new = "Nauja sekcija";

translations.lt.modal = translations.lt.modal || {};
translations.lt.modal.new_field = "Naujas laukas";
translations.lt.modal.preview = "Perziura";
translations.lt.modal.confirm_delete = "Patvirtinti istrynima";
translations.lt.modal.edit_section = "Redaguoti sekcija";
translations.lt.modal.add_field_to_section = "Prideti lauka i sekcija";
translations.lt.modal.delete_message = "Ar tikrai norite istrinti si elementa? Sio veiksmo negalima atsaukti.";

translations.lt.preview = translations.lt.preview || {};
translations.lt.preview.description = "Sukonfiguruotos tiekejo korteles perziura bus rodoma cia";

translations.lt.permissions = translations.lt.permissions || {};
translations.lt.permissions.action = "Veiksmas";
translations.lt.permissions.item = "Elementas";
translations.lt.permissions.type = "Tipas";
translations.lt.permissions.type_section = "Sekcija";
translations.lt.permissions.type_field = "Laukas";
translations.lt.permissions.action_read = "Skaityti";
translations.lt.permissions.action_edit = "Redaguoti";
translations.lt.permissions.action_create = "Sukurti";
translations.lt.permissions.action_delete = "Istrinti";
translations.lt.permissions.expand_users = "Rodyti vartotojus";

translations.lt.role = translations.lt.role || {};
translations.lt.role.admin = "Administratorius";
translations.lt.role.manager = "Vadybininkas";
translations.lt.role.user = "Vartotojas";
translations.lt.role.viewer = "Stebetojas";
translations.lt.role.sales = "Pardavimai";
translations.lt.role.warehouse = "Sandelis";
translations.lt.role.accounting = "Apskaita";

translations.lt.permission = translations.lt.permission || {};
translations.lt.permission.view = "Perziura";
translations.lt.permission.edit = "Redagavimas";
translations.lt.permission.delete = "Trynimas";
translations.lt.permission.override = "Nastelbimas";

translations.lt.notification = translations.lt.notification || {};
translations.lt.notification.field_added = "Laukas pridetas i sekcija";
translations.lt.notification.field_reordered = "Laukas perkeltas sekcijoje";
translations.lt.notification.field_moved = "Laukas perkeltas i kita sekcija";
translations.lt.notification.fill_all_fields = "Prasome uzpildyti visus laukus";
translations.lt.notification.section_updated = "Sekcija atnaujinta";
translations.lt.notification.enter_field_name = "Prasome ivesti lauko pavadinima";
translations.lt.notification.section_not_found = "Sekcija nerasta";
translations.lt.notification.field_created = "Laukas sukurtas";
translations.lt.notification.config_saved = "Konfiguracija issaugota";
translations.lt.notification.config_reset = "Konfiguracija atstatyta";
translations.lt.notification.config_imported = "Konfiguracija importuota";
translations.lt.notification.invalid_config = "Neteisingas konfiguracijos failas";

console.log("Flexiron: Supplier Card Config Dictionary Loaded");