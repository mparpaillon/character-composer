const Parser = require('expr-eval').Parser;
const setValueByPath = require('set-value');
const getValueByPath = require('get-value');

module.exports = function runCalculations(playerDatas, calculations) {
  if (!calculations || calculations.length <= 0) return;

  // Loop on every calculation and execute it
  calculations.forEach(_calc => {
    // _calc: {
    //   prop: "ability_scores.dex"
    //   formula: "x+2"
    //   params: { "x": "ability_scores.dex" }
    // }

    // "params": { "x": "ability_scores.dex" }
    Object.keys(_calc.params).forEach(variable => {
      const propPath = _calc.params[variable]; // ability_scores.dex
      const propValue = getValueByPath(playerDatas, propPath); // 13
      _calc.params[variable] = propValue; // params: { "x": 13 }
    });

    // Assign new calculated value
    const calculatedValue = Parser.evaluate(_calc.formula, _calc.params);
    setValueByPath(playerDatas, _calc.prop, calculatedValue);
  });
}
