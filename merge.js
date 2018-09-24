const fs = require('fs');
const deepAssign = require('deep-assign');

const runCalculations = require('./utils/calculations.util');
const runConditions = require('./utils/conditions.util');

const playerDatas = JSON.parse(fs.readFileSync('./datas/player.json'));
const systemDatas = JSON.parse(fs.readFileSync('./datas/systems/dnd5e.json'));

// The "player._extends" property tells the program which datas it should inherit from

systemDatas.player._extends.forEach(extend => {
  // Ex: gnome.json
  const extendDatas = JSON.parse(fs.readFileSync(`./datas/${extend.folder}/${playerDatas[extend.property_value]}.json`));

  runConditions(playerDatas, extendDatas);
  runCalculations(playerDatas, extendDatas);
  
  deepAssign(playerDatas, extendDatas);
});

runCalculations(playerDatas, systemDatas.player);

console.log(JSON.stringify(playerDatas, '', 4));
