import _ from "lodash";

const getFormattedValue = (value) => {
  // I should check is it number or not because of this bug https://github.com/npm/ini/pull/76
  if (!_.isNaN(value) && !_.isNaN(parseFloat(value))) {
    return Number(value);
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

export default (ast) => {
  const iter = (list, parent) => list.reduce((acc, elem) => {
    const key = parent ? `${parent}.${elem.key}` : elem.key;
    const oldValue = getFormattedValue(elem.oldValue);
    const newValue = getFormattedValue(elem.newValue);
    switch (elem.type) {
      case 'structure':
        return `${acc}${iter(elem.children, key)}`;
      case 'changed':
        return `${acc}Property '${key}' was updated. From ${oldValue} to ${newValue}\n`;
      case 'deleted':
        return `${acc}Property '${key}' was removed\n`;
      case 'added':
        return `${acc}Property '${key}' was added with value: ${newValue}\n`;
      default:
        return acc;
    }
  }, '');
  return iter(ast, '');
};