module.exports = function(...args) {
    // Last argument is the Handlebars options object
    const options = args.pop();
    return args.join('');
};
