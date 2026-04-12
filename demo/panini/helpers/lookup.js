module.exports = function(obj, key) {
    if (!obj || typeof obj !== 'object') return false;
    return obj[key] || false;
};
