export default function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(path, { file }) {
        file.set('hasJSX', true);
      },

      Program: {
        enter(path, { file }) {
          file.set('hasJSX', false);
        },

        exit({ node, scope }, { file, opts }) {
          const {binding = 'React', import: importName = 'react'} =  opts;

          if (!(file.get('hasJSX') && !scope.hasBinding(binding))) {
            return;
          }

          const jsxImportDeclaration = t.importDeclaration([
            t.importDefaultSpecifier(t.identifier(binding)),
          ], t.stringLiteral(importName));

          node.body.unshift(jsxImportDeclaration);
        },
      },
    },
  };
}
