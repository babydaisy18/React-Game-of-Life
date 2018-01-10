'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var seeds = {
  ACORN: require('../seeds/acorn.json').data,
  GLIDER: require('../seeds/glider.json').data,
  GLIDER_GUN: require('../seeds/glider_gun.json').data,
  LINE: require('../seeds/line.json').data
};

var run = function run() {
  return {
    type: 'RUN'
  };
};

var step = function step() {
  return {
    type: 'STEP'
  };
};

var importSeed = function importSeed(seedName) {
  return {
    type: 'IMPORT_SEED',
    seed: seeds[seedName]
  };
};

var stop = function stop() {
  return {
    type: 'STOP'
  };
};

var clear = function clear() {
  return {
    type: 'CLEAR'
  };
};

var randomSeed = function randomSeed() {
  return {
    type: 'RANDOM_SEED'
  };
};

var exportMap = function exportMap() {
  return {
    type: 'EXPORT_MAP'
  };
};

var cellClicked = function cellClicked(index) {
  return {
    type: 'CELL_CLICKED',
    index: index
  };
};

exports.run = run;
exports.step = step;
exports.importSeed = importSeed;
exports.stop = stop;
exports.clear = clear;
exports.randomSeed = randomSeed;
exports.exportMap = exportMap;
exports.cellClicked = cellClicked;