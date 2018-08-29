import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getTestFilePath = fileName => path.join('__tests__', '__fixtures__', fileName);

const checkGendiffResult = (file1, file2, resultFile) => {
  const resultData = fs.readFileSync(getTestFilePath(resultFile), 'UTF-8');
  expect(gendiff(getTestFilePath(file1), getTestFilePath(file2))).toBe(resultData);
};
test('gendiff before.json after.json', () => {
  checkGendiffResult('before.json', 'after.json', 'result.json.txt');
});

test('gendiff before.yml after.yml', () => {
  checkGendiffResult('before.yml', 'after.yml', 'result.yml.txt');
});

test('gendiff before.ini after.ini', () => {
  checkGendiffResult('before.ini', 'after.ini', 'result.ini.txt');
});
