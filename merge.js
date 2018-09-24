const fs = require('fs');
const deepAssign = require('deep-assign');

const runCalculations = require('./utils/calculations.util');
const runConditions = require('./utils/conditions.util');

const playerData = JSON.parse(fs.readFileSync('./data/player.json'));
const systemData = JSON.parse(fs.readFileSync('./data/systems/dnd5e.json'));

// The "player._extends" property tells the program which data it should inherit from

systemData.player._extends.forEach(extend => {
  // Ex: gnome.json
  const extendData = JSON.parse(fs.readFileSync(`./data/${extend.folder}/${playerData[extend.property_value]}.json`));

  runConditions(playerData, extendData);
  runCalculations(playerData, extendData);
  
  deepAssign(playerData, extendData);
});

runCalculations(playerData, systemData.player);

console.log(JSON.stringify(playerData, '', 4));
