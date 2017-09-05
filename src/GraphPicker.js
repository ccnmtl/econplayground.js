import React from 'react';
import {graphs} from './vegaSpecs.js';
import VegaRenderer from './VegaRenderer.js';
import './GraphPicker.css';

export default class GraphPicker extends React.Component {
    handleClick() {
    }
    render() {
        return (
            <div className="GraphPicker">
                <p>Pick a graph type:</p>
                <div className="card" onClick={this.handleClick.bind(this)}>
                    Demand-Supply
                    <VegaRenderer
                         vegaSpec={graphs.demandSupply}
                         renderer={'svg'} />
                </div>
                <div className="card" onClick={this.handleClick.bind(this)}>
                    Labor Market
                    <VegaRenderer vegaSpec={graphs.laborMarket} renderer={'svg'} />
                </div>
                <div className="card" onClick={this.handleClick.bind(this)}>
                    Capital Market
                    <VegaRenderer vegaSpec={graphs.capitalMarket} renderer={'svg'} />
                </div>
            </div>
        )
    }
}
