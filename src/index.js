import fs from 'fs';
import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const comparedKeys = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return `${acc}    ${key}: ${obj1[key]}\n`;
      }
      return `${acc}  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}\n`;
    }
    if (_.has(obj1, key)) {
      return `${acc}  - ${key}: ${obj1[key]}\n`;
    }
    return `${acc}  + ${key}: ${obj2[key]}\n`;
  }, '');
  return `{\n${comparedKeys}}`;
};

export default (file1, file2) => {
  const plainData1 = fs.readFileSync(file1, 'UTF-8');
  const plainData2 = fs.readFileSync(file2, 'UTF-8');
  const obj1 = JSON.parse(plainData1);
  const obj2 = JSON.parse(plainData2);
  return compare(obj1, obj2);
};
