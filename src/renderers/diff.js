import _ from 'lodash';

const indent = 4;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const inner = _.keys(value).map(key => `${' '.repeat(indent * (depth + 1))}${key}: ${value[key]}`);
  return `{\n${inner.join(',\n')}\n${' '.repeat(indent * depth)}}`;
};

const render = (ast) => {
  const iter = (list, depth) => {
    const newList = list.reduce((acc, elem) => {
      const { key } = elem;
      const oldValue = stringify(elem.oldValue, depth);
      const newValue = stringify(elem.newValue, depth);
      const fullIndent = ' '.repeat(indent * depth);
      const indentWithChanges = ' '.repeat(indent * depth - 2);
      const getFormattedChangedValue = (value, sign) => `${indentWithChanges}${sign} ${key}: ${value}`;
      switch (elem.type) {
        case 'structure':
          return [...acc, `${fullIndent}${key}: {`, iter(elem.children, depth + 1), `${fullIndent}}`];
        case 'changed':
          return [...acc, getFormattedChangedValue(oldValue, '-'), getFormattedChangedValue(newValue, '+')];
        case 'deleted':
          return [...acc, getFormattedChangedValue(oldValue, '-')];
        case 'added':
          return [...acc, getFormattedChangedValue(newValue, '+')];
        case 'unchanged':
          return [...acc, `${fullIndent}${key}: ${oldValue}`];
        default:
          throw new TypeError(`Unknown type: ${elem.type}`);
      }
    }, []);
    return _.flatten(newList);
  };
  const innerStructure = iter(ast, 1);
  return `{\n${innerStructure.join('\n')}\n}`;
};

export default render;
