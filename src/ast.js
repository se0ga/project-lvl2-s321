import _ from 'lodash';

const types = [
  {
    type: 'structure',
    signature: (key, firstConfig, secondConfig) => (_.has(firstConfig, key)
      && _.has(secondConfig, key) && _.isObject(firstConfig[key]) && _.isObject(secondConfig[key])),
    getNode: (key, firstConfig, secondConfig, fn) => ({
      key, children: fn(firstConfig[key], secondConfig[key]),
    }),
  },
  {
    type: 'added',
    signature: (key, firstConfig, secondConfig) => (!_.has(firstConfig, key)
      && _.has(secondConfig, key)),
    getNode: (key, firstConfig, secondConfig) => ({ key, newValue: secondConfig[key] }),
  },
  {
    type: 'deleted',
    signature: (key, firstConfig, secondConfig) => (_.has(firstConfig, key)
      && !_.has(secondConfig, key)),
    getNode: (key, firstConfig) => ({ key, oldValue: firstConfig[key] }),
  },
  {
    type: 'unchanged',
    signature: (key, firstConfig, secondConfig) => (_.has(firstConfig, key)
      && _.has(secondConfig, key) && firstConfig[key] === secondConfig[key]),
    getNode: (key, firstConfig, secondConfig) => ({
      key, oldValue: firstConfig[key], newValue: secondConfig[key],
    }),
  },
  {
    type: 'changed',
    signature: (key, firstConfig, secondConfig) => (_.has(firstConfig, key)
      && _.has(secondConfig, key) && firstConfig[key] !== secondConfig[key]),
    getNode: (key, firstConfig, secondConfig) => ({
      key, oldValue: firstConfig[key], newValue: secondConfig[key],
    }),
  },
];
const createAST = (firstConfig, secondConfig) => {
  const keys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  return keys.map((key) => {
    const { type, getNode } = _.find(types, item => item.signature(key, firstConfig, secondConfig));
    return { ...getNode(key, firstConfig, secondConfig, createAST), type };
  });
};
export default createAST;
