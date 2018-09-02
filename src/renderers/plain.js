import _ from 'lodash';

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
  const iter = (list, parent) => {
    const result = list.filter(elem => elem.type !== 'unchanged')
      .map((elem) => {
        const key = parent ? `${parent}.${elem.key}` : elem.key;
        const oldValue = getFormattedValue(elem.oldValue);
        const newValue = getFormattedValue(elem.newValue);
        switch (elem.type) {
          case 'structure':
            return iter(elem.children, key);
          case 'changed':
            return `Property '${key}' was updated. From ${oldValue} to ${newValue}`;
          case 'deleted':
            return `Property '${key}' was removed`;
          case 'added':
            return `Property '${key}' was added with value: ${newValue}`;
          default:
            throw new TypeError(`Unknown type: ${elem.type}`);
        }
      });
    return _.flatten(result);
  };
  return iter(ast, '').join('\n');
};
