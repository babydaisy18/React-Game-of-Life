// CIS 197 - React HW

import _ from 'lodash';
import React from 'react';
import Cell from './Cell';
import * as initialState from '../initialState.js';
import * as actions from '../actions/index.js';


export default class GameOfLife extends React.Component {

  constructor() {
    super();
    this.state = initialState;
    this.onImportSeed = this.onImportSeed.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStep = this.onStep.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onExportMap = this.onExportMap.bind(this);
    this.onRandomSeed = this.onRandomSeed.bind(this);
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onImportSeed(seedName) {
    this.props.store.dispatch(actions.importSeed(seedName));
  }
  onRun() {
    this.props.store.dispatch(actions.run());
  }
  onStep() {
    this.props.store.dispatch(actions.step());
  }
  onStop() {
    this.props.store.dispatch(actions.stop());
  }
  onClear() {
    this.props.store.dispatch(actions.clear());
  }
  onExportMap() {
    this.props.store.dispatch(actions.exportMap());
  }
  onRandomSeed() {
    this.props.store.dispatch(actions.randomSeed());
  }

  render() {
    var cells = '';
    for (var i = 0; i < this.state.cells.length; i++) {
      cells += <Cell alive="this.state.cells[i].props.alive" index="i" key="i" store="this.props.store"></Cell>;
    }
    return (<div className="game-component">
      <div className="board-component" style={{width: 12 * this.state.x}}>
        <span className="cell-widget cell"></span>
        <span className="cell-widget cell"></span>
        <span className="cell-widget cell alive "></span>
        cells
      </div>

          <div className="controls">
           <h4>Controls</h4>
             <button onClick={this.onRun}>run</button>
             <button onClick={this.onStep}>step</button>
             <button onClick={this.onStop}>stop</button>
             <button onClick={this.onClear}>clear</button>
             <button onClick={this.onExportMap}>export map</button>
          </div>

          <div className="seeds">
        <button onClick={this.onImportSeed.bind(this, 'GLIDER')}>glider</button>
        <button onClick={this.onImportSeed.bind(this, 'GLIDER_GUN')}>glider gun</button>
        <button onClick={this.onImportSeed.bind(this, 'ACORN')}>acorn</button>
        <button onClick={this.onImportSeed.bind(this, 'LINE')}>line</button>
        <button onClick={this.onRandomSeed}>random</button>
          </div>

        </div>);
  }
}
