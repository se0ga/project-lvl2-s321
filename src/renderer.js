import _ from 'lodash';

const stringify = (value, continuationIndent = 0, indent = 4) => {
  if (!_.isObject(value)) {
    return value;
  }
  const inner = _.keys(value).map(key => `${' '.repeat(continuationIndent + indent)}${key}: ${value[key]}`);
  return `{\n${inner.join(',\n')}\n${' '.repeat(continuationIndent)}}`;
};

const getFormatedValue = (value) => {
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

const renderDefaultFormat = (ast, continuationIndent = 0, indent = 4) => {
  const innerStructure = ast.reduce((acc, elem) => {
    const { key } = elem;
    const oldValue = stringify(elem.oldValue, continuationIndent + indent);
    const newValue = stringify(elem.newValue, continuationIndent + indent);
    switch (elem.type) {
      case 'structure':
        return `${acc}${' '.repeat(continuationIndent + indent)}${key}: ${renderDefaultFormat(elem.children, continuationIndent + indent)}\n`;
      case 'changed':
        return `${acc}${' '.repeat(continuationIndent + indent / 2)}- ${key}: ${oldValue}\n${' '.repeat(continuationIndent + indent / 2)}+ ${key}: ${newValue}\n`;
      case 'deleted':
        return `${acc}${' '.repeat(continuationIndent + indent / 2)}- ${key}: ${oldValue}\n`;
      case 'added':
        return `${acc}${' '.repeat(continuationIndent + indent / 2)}+ ${key}: ${newValue}\n`;
      case 'unchanged':
      default:
        return `${acc}${' '.repeat(continuationIndent + indent)}${key}: ${oldValue}\n`;
    }
  }, '');
  return `{\n${innerStructure}${' '.repeat(continuationIndent)}}`;
};

const renderPlainFormat = (ast) => {
  const iter = (list, parent) => list.reduce((acc, elem) => {
    const key = parent ? `${parent}.${elem.key}` : elem.key;
    const oldValue = getFormatedValue(elem.oldValue);
    const newValue = getFormatedValue(elem.newValue);
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

export default (ast, format) => {
  if (format === 'plain') {
    return renderPlainFormat(ast);
  }
  return renderDefaultFormat(ast);
};
