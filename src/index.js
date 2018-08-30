import fs from 'fs';
import path from 'path';
import parse from './parse';
import createAST from './ast';
import render from './renderer';

export default (file1, file2) => {
  const plainData1 = fs.readFileSync(file1, 'UTF-8');
  const plainData2 = fs.readFileSync(file2, 'UTF-8');
  const obj1 = parse[path.extname(file1)](plainData1);
  const obj2 = parse[path.extname(file2)](plainData2);
  const ast = createAST(obj1, obj2);
  return render(ast);
};
