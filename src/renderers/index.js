import renderPlainFormat from './plain';
import renderJsonFormat from './json';
import renderDiffFormat from './diff';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlainFormat(ast);
    case 'json':
      return renderJsonFormat(ast);
    default:
      return renderDiffFormat(ast);
  }
};
