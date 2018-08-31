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
      } else if (oldValue === newValue) {
        return [...acc, {
          key,
          oldValue,
          newValue,
          type: 'unchanged',
        }];
      } else {
        return [...acc, {
          key,
          oldValue,
          newValue,
          type: 'changed',
        }];
      }
    }
    if (_.has(obj1, key)) {
      return [...acc, {
        key,
        oldValue: obj1[key],
        type: 'deleted',
      }];
    } else {
      return [...acc, {
        key,
        newValue: obj2[key],
        type: 'added',
      }];
    }
  }, []);
};
export default createAST;
