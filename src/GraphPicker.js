import React from 'react';
import PropTypes from 'prop-types';
import {graphs} from './vegaGraphs.js';
import VegaRenderer from './VegaRenderer.js';
import './GraphPicker.css';

export default class GraphPicker extends React.Component {
    render() {
        if (!this.props.showing) {
            return <span></span>;
        }
        return (
            <div className="GraphPicker">
                <p>Pick a graph type:</p>
                <div className="graph-card" onClick={this.handleClick1.bind(this)}>
                    Demand-Supply
                    <VegaRenderer
                         vegaSpec={graphs.demandSupply}
                         renderer={'svg'} />
                </div>
                <div className="graph-card" onClick={this.handleClick2.bind(this)}>
                    Labor Market
                    <VegaRenderer vegaSpec={graphs.laborMarket} renderer={'svg'} />
                </div>
                <div className="graph-card" onClick={this.handleClick3.bind(this)}>
                    Capital Market
                    <VegaRenderer vegaSpec={graphs.capitalMarket} renderer={'svg'} />
                </div>
            </div>
        )
    }
    handleClick1() {
        this.props.onSelectGraph(graphs.demandSupply);
    }
    handleClick2() {
        this.props.onSelectGraph(graphs.laborMarket);
    }
    handleClick3() {
        this.props.onSelectGraph(graphs.capitalMarket);
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
