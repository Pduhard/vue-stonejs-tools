const ts = require("typescript");
const fs = require("fs");

function extractTsStrings(sourceFile, functionsNames) {
  const strings = [];

  function visit(node) {
    // console.log('Visiting node:', ts.SyntaxKind[node.kind], node.getText?.());

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
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
  return extractTsStrings(source, functionsNames);
}

module.exports = extract;
