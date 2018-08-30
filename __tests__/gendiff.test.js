import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getTestFilePath = fileName => path.join('__tests__', '__fixtures__', fileName);

const checkGendiffResult = (file1, file2, resultFile) => {
  const resultData = fs.readFileSync(getTestFilePath(resultFile), 'UTF-8');
  expect(gendiff(getTestFilePath(file1), getTestFilePath(file2))).toBe(resultData);
};
test('gendiff before.json after.json', () => {
  checkGendiffResult('plain1.json', 'plain2.json', 'resultPlain.json.txt');
});

test('gendiff before.yml after.yml', () => {
  checkGendiffResult('plain1.yml', 'plain2.yml', 'resultPlain.yml.txt');
});

test('gendiff before.ini after.ini', () => {
  checkGendiffResult('plain1.ini', 'plain2.ini', 'resultPlain.ini.txt');
});

test('gendiff nested1.json nested2.json', () => {
  checkGendiffResult('nested1.json', 'nested2.json', 'resultNested.json.txt');
});

test('gendiff nested1.yml nested2.yml', () => {
  checkGendiffResult('nested1.yml', 'nested2.yml', 'resultNested.yml.txt');
});

test('gendiff nested1.ini nested2.ini', () => {
  checkGendiffResult('nested1.ini', 'nested2.ini', 'resultNested.ini.txt');
});
