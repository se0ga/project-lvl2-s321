import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getTestFilePath = fileName => path.join('__tests__', '__fixtures__', fileName);

const checkGendiffResult = (file1, file2, resultFile, format) => {
  const resultData = fs.readFileSync(getTestFilePath(resultFile), 'UTF-8');
  expect(gendiff(getTestFilePath(file1), getTestFilePath(file2), format)).toBe(resultData);
};
const files = [
  ['basic1.json', 'basic2.json', 'Basic.json.txt'],
  ['basic1.yml', 'basic2.yml', 'Basic.yml.txt'],
  ['basic1.ini', 'basic2.ini', 'Basic.ini.txt'],
  ['nested1.json', 'nested2.json', 'Nested.json.txt'],
  ['nested1.yml', 'nested2.yml', 'Nested.yml.txt'],
  ['nested1.ini', 'nested2.ini', 'Nested.ini.txt'],
];
test('check gendiff with json, yml, ini', () => {
  files.forEach(([file1, file2, resultFile]) => checkGendiffResult(file1, file2, `default${resultFile}`));
});
test('check gendiff with json, yml, ini with --format plain', () => {
  files.forEach(([file1, file2, resultFile]) => checkGendiffResult(file1, file2, `plain${resultFile}`, 'plain'));
});
test('check gendiff with json, yml, ini with --format json', () => {
  files.forEach(([file1, file2, resultFile]) => checkGendiffResult(file1, file2, `json${resultFile}`, 'json'));
});
