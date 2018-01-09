// CIS 197 - React HW

import _ from 'lodash';
import * as timer from '../timer.js';
import * as initialState from '../initialState.js';

const mainReducer = (state, action) => {
  switch (action.type) {
  case 'RUN':
    timer.run();
    return state;

  case 'EXPORT_MAP': {
    let data = encodeURIComponent(state.cells);
    return document.location = `/export?data=[${data}]`;
  }

  case 'CELL_CLICKED': {
    let cells = state.cells.slice(0);
    cells[action.index] = !cells[action.index];
    return _.assign({}, state, {cells: cells});
  }
  case 'STOP': {
    timer.stop();
    return state;
  }

  case 'STEP': {
    return _.assign({}, state, {cells: updateCells(state)});
  }

  case 'CLEAR': {
    timer.stop();
    var arr = Array.apply(null, Array(state.cells.length)).map(Boolean.prototype.valueOf, false);
    return _.assign({}, state, {cells: arr});
  }

  case 'RANDOM_SEED': {
    return _.assign({}, state, {cells: randomSeed(state)});
  }

  case 'IMPORT_SEED': {
    timer.stop();
    return _.assign({}, state, {cells: action.seed});
  }
  }
  return state;
};

const randomSeed = (state) => {
  var array = [];
  for (var i = 0; i < state.cells.length; i++) {
    if ((Math.random() * 2) >= 1) {
      array.push(true);
    } else {
      array.push(false);
    }
  }
  return array;
};

// This is the main algorithm behind the Game of Life simulation.
// Every time it is called, it computes based on the current state's
// cells the NEXT state's cells and return a copy of the new cells array.
//
// The algorthim determines cell state based on the states of neighbouring
// cells for each iteration according to these rules:
//
// 1 - Any live cell with fewer than two live neighbours dies,as if caused by
//     under-population.
// 2 - Any live cell with two or three live neighbours lives on to the next
//     generation.
// 3 - Any live cell with more than three live neighbours dies, as if by
//     overcrowding.
// 4 - Any dead cell with exactly three live neighbours becomes a live cell,
//     as if by reproduction.
//
const updateCells = (state) => {
  let newCells = new Array(state.cells.length);
  state.cells.map((_, i) => {
    let cell = state.cells[i];
    let live_neighbors = 0;
    let x = i % state.x;
    let y = Math.floor(i / state.x);
    let l = x !== 0 && i - 1;
    let r = x !== state.x - 1 && i + 1;
    let t = y !== 0 && i - state.x;
    let b = y !== state.y - 1 && i + state.x;

    let tl, tr, bl, br;
    l && t && (tl = l - state.x);
    l && b && (bl = l + state.x);
    r && t && (tr = r - state.x);
    r && b && (br = r + state.x);

    [l, r, t, b, tl, bl, tr, br].map( (n) => {
      state.cells[n] && live_neighbors++;
    });

    newCells[i] = (cell && (live_neighbors === 2 || live_neighbors === 3)) ||
           (live_neighbors === 3);
  });
  return newCells;
};


export { mainReducer, updateCells, randomSeed };
