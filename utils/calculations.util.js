const Parser = require('expr-eval').Parser;
const setValueByPath = require('set-value');
const getValueByPath = require('get-value');

const parser = new Parser();

parser.functions.mod = function(score) {
  return Math.floor((score - 10) / 2);
};

module.exports = function runCalculations(playerData, data) {
  if (!data._calculations || data._calculations.length <= 0) return;

  // Loop on every calculation and execute it
  data._calculations.forEach(_calc => {
    // _calc: {
    //   "prop": "ability_scores.dex"
    //   "formula": "x+2"
    //   "params": { "x": "ability_scores.dex" }
    // }

    // Replace param by potential object value
    // "params": { "x": "ability_scores.dex" }
    Object.keys(_calc.params).forEach(variable => {
      const propPath = _calc.params[variable]; // ability_scores.dex
      const propValue = getValueByPath(playerData, propPath); // 13
      _calc.params[variable] = propValue; // params: { "x": 13 }
    });

    // Assign new calculated value
    const calculatedValue = parser.evaluate(_calc.formula, _calc.params);
    setValueByPath(playerData, _calc.prop, calculatedValue);
  });

  delete data._calculations;
}

