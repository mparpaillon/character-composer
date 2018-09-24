const Parser = require('expr-eval').Parser;
const setValueByPath = require('set-value');
const getValueByPath = require('get-value');

const parser = new Parser();

parser.functions.hasLevel = function(currentLevel, level) {
  return currentLevel >= level;
};

module.exports = function runConditions(playerDatas, datas) {
  if (!datas._conditions || datas._conditions.length <= 0) return;

  // Loop on every condition and test it
  datas._conditions.forEach(_condition => {
    // _condition: {
    //   "prop": "capacities.faerie_fire",
    //   "condition": "hasLevel(x, 3)",
    //   "params": { "x": "level" },
    //   "value": {
    //     "ammo": 1,
    //     "spellcasting_ability": "cha",
    //     "reset": "long_rest"
    //   }
    // }

    // Replace param by potential object value
    // "params": { "x": "level" }
    Object.keys(_condition.params).forEach(variable => {
      const propPath = _condition.params[variable]; // level
      const propValue = getValueByPath(playerDatas, propPath); // 13
      _condition.params[variable] = propValue; // params: { "x": 13 }
    });

    // Test condition and assign value if true
    const evaludatedCondition = parser.evaluate(_condition.condition, _condition.params);
    if (evaludatedCondition) {
      setValueByPath(playerDatas, _condition.prop, _condition.value);
    }
  });

  delete datas._conditions;
}
