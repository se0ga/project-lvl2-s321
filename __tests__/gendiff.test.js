import fs from 'fs';
import gendiff from '../src';

const basePath = '__tests__/__fixtures__/';
test('gendiff before.json after.json', () => {
  const data = fs.readFileSync(`${basePath}result.json.txt`, 'UTF-8');
  expect(gendiff(`${basePath}before.json`, `${basePath}after.json`)).toBe(data);
});
