const ts = require("typescript");
const fs = require("fs");

function _cleanString(str) {
  return new Function("return " + str.replace(/\n/g, "") + ";")();  // jshint ignore:line
}

function extractTsStrings(sourceFile, functionsNames) {
  const strings = {};

  function visit(node) {
    // console.log('Visiting node:', ts.SyntaxKind[node.kind], node.getText());
    if (ts.isMethodDeclaration(node)) {
      const children = node.getChildren();
      if (!functionsNames.includes(children[0].text)) return;

      const string = _cleanString(children[2].getText());
      strings[string] = true
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  console.log(strings);
  return strings;
}

var extract = {};

extract.extractTsStrings = function(
  source,
  functionsNames,
  pluralFunctionsNames,
  contextFunctionsNames,
  pluralContextFunctionsNames,
  isTsx,
) {
  const sourceFile = ts.createSourceFile(
      "out.json",
      source,
      ts.ScriptTarget.Latest,
      true
    );
  return extractTsStrings(sourceFile, functionsNames);
}

module.exports = extract;
