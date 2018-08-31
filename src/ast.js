import _ from 'lodash';

const createAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    const elem = { key };
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const oldValue = obj1[key];
      const newValue = obj2[key];
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        elem.children = createAST(oldValue, newValue);
        elem.type = 'structure';
      } else {
        elem.oldValue = oldValue;
        elem.newValue = newValue;
        elem.type = oldValue === newValue ? 'unchanged' : 'changed';
      }
    } else if (_.has(obj1, key)) {
      elem.oldValue = obj1[key];
      elem.type = 'deleted';
    } else {
      elem.newValue = obj2[key];
      elem.type = 'added';
    }
    return [...acc, elem];
  }, []);
};
export default createAST;
