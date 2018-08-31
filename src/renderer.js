import renderPlainFormat from './renderers/plain';
import renderJsonFormat from './renderers/json';
import renderDefaultFormat from './renderers/default';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlainFormat(ast);
    case 'json':
      return renderJsonFormat(ast);
    default:
      return renderDefaultFormat(ast);
  }
};
