import _ from 'lodash';

const stringify = (value, continuationIndent = 0, indent = 4) => {
  if (!_.isObject(value)) {
    return value;
  }
  const inner = _.keys(value).map(key => `${' '.repeat(continuationIndent + indent)}${key}: ${value[key]}`);
  return `{\n${inner.join(',\n')}\n${' '.repeat(continuationIndent)}}`;
};

const render = (ast, continuationIndent = 0, indent = 4) => {
  const innerStructure = ast.reduce((acc, elem) => {
    const { key } = elem;
    const oldValue = stringify(elem.oldValue, continuationIndent + indent);
    const newValue = stringify(elem.newValue, continuationIndent + indent);
    switch (elem.type) {
      case 'structure':
        return `${acc}${' '.repeat(continuationIndent + indent)}${key}: ${render(elem.children, continuationIndent + indent)}\n`;
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

export default render;
