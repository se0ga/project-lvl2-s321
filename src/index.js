import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

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

const parse = {
  '.json': data => JSON.parse(data),
  '.yml': data => yaml.safeLoad(data),
};

export default (file1, file2) => {
  const plainData1 = fs.readFileSync(file1, 'UTF-8');
  const plainData2 = fs.readFileSync(file2, 'UTF-8');
  const obj1 = parse[path.extname(file1)](plainData1);
  const obj2 = parse[path.extname(file2)](plainData2);
  return compare(obj1, obj2);
};
