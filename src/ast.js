import _ from 'lodash';

const createAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const oldValue = obj1[key];
      const newValue = obj2[key];
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        return [...acc, {
          key,
          children: createAST(oldValue, newValue),
          type: 'structure',
        }];
      }
      if (oldValue === newValue) {
        return [...acc, {
          key,
          oldValue,
          newValue,
          type: 'unchanged',
        }];
      }
      return [...acc, {
        key,
        oldValue,
        newValue,
        type: 'changed',
      }];
    }
    const result = _.has(obj1, key)
      ? { key, oldValue: obj1[key], type: 'deleted' }
      : { key, newValue: obj2[key], type: 'added' };
    return [...acc, result];
  }, []);
};
export default createAST;
