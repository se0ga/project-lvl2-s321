import renderPlainFormat from './renderers/plain';
import renderDefaultFormat from './renderers/default';

export default (ast, format) => {
  if (format === 'plain') {
    return renderPlainFormat(ast);
  }
  return renderDefaultFormat(ast);
};
