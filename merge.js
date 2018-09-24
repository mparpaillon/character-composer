const fs = require('fs');
const deepAssign = require('deep-assign');
const stringify = require('json-stable-stringify');
const runCalculations = require('./calculate.util');

const playerDatas = JSON.parse(fs.readFileSync('./datas/player.json'));
const systemDatas = JSON.parse(fs.readFileSync('./datas/systems/dnd5e.json'));

// The "player._extends" property tells the program which datas it should inherit from

systemDatas.player._extends.forEach(extend => {
  // Ex: gnome.json
  const extendDatas = JSON.parse(fs.readFileSync(`./datas/${extend.folder}/${playerDatas[extend.property_value]}.json`));

  runCalculations(playerDatas, extendDatas._calculations);
  delete extendDatas._calculations;
  
  deepAssign(playerDatas, extendDatas);
});

runCalculations(playerDatas, systemDatas.player._calculations);

// const orderedDatas = JSON.parse(stringify(playerDatas));
const orderedDatas = playerDatas;
console.log(JSON.stringify(orderedDatas, '', 4));
