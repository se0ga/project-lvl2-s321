import _ from 'lodash';

const createAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, {
        key,
        children: createAST(obj1[key], obj2[key]),
        type: 'structure',
      }];
    } else if (!_.has(obj2, key)) {
      return [...acc, {
        key,
        oldValue: obj1[key],
        type: 'deleted',
      }];
    } else if (!_.has(obj1, key)) {
      return [...acc, {
        key,
        newValue: obj2[key],
        type: 'added',
      }];
    } else if (obj1[key] === obj2[key]) {
      return [...acc, {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        type: 'unchanged',
      }];
    }
    return [...acc, {
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
      type: 'changed',
    }];
  }, []);
};
export default createAST;
