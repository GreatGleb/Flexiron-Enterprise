/**
 * Helper to iterate over supplier categories
 * Usage: {{#categories}}...{{/categories}}
 */
module.exports = function() {
  const categories = ['Sheets', 'Pipes', 'Beams', 'Rebars', 'Lintels', 'Profiles', 'Wire', 'Fittings'];
  
  let result = '';
  const options = arguments[arguments.length - 1];
  
  categories.forEach(cat => {
    result += options.fn(cat);
  });
  
  return result;
};
