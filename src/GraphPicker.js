import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
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
                    <JXGBoard id={'jxg-demand-supply'} type={0} />
                </div>
                <div className="graph-card" onClick={this.handleClick2.bind(this)}>
                    Labor Market
                    <JXGBoard id={'jxg-labor-market'} type={1} />
                </div>
                <div className="graph-card" onClick={this.handleClick3.bind(this)}>
                    Labor Market (perfectly inelastic)
                    <JXGBoard id={'jxg-capital-market'} type={2} />
                </div>
                <div className="graph-card" onClick={this.handleClick3.bind(this)}>
                    Cobb-Douglas
                    <JXGBoard id={'jxg-capital-market'} type={3} />
                </div>
                <div className="graph-card" onClick={this.handleClick1.bind(this)}>
                    Labor Supply
                    <JXGBoard id={'jxg-demand-supply'} type={4} />
                </div>
                <div className="graph-card" onClick={this.handleClick2.bind(this)}>
                    Consumption - Saving
                    <JXGBoard id={'jxg-labor-market'} type={5} />
                </div>
                <div className="graph-card" onClick={this.handleClick3.bind(this)}>
                    Saving - Investment
                    <JXGBoard id={'jxg-capital-market'} type={6} />
                </div>
                <div className="graph-card" onClick={this.handleClick3.bind(this)}>
                    Money Market
                    <JXGBoard id={'jxg-capital-market'} type={7} />
                </div>
            </div>
        )
    }
    handleClick1() {
        this.props.onSelectGraph(this.state.board);
    }
    handleClick2() {
        this.props.onSelectGraph(this.state.board);
    }
    handleClick3() {
        this.props.onSelectGraph(this.state.board);
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
