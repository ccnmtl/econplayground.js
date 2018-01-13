import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
import './GraphPicker.css';

export default class GraphPicker extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        return (
            <div className="GraphPicker">
                <p>Pick a graph type:</p>
                <div className="graph-card">
                    Linear Demand and Supply
                    <JXGBoard id={'jxg-demand-supply'} gType={0} locked={true} />
                    <button
                        ref={(b1) => { this.b1 = b1; }}
                        type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick1.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Labor Market
                    <JXGBoard id={'jxg-labor-market'} gType={1} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick2.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Labor Market (perfectly inelastic)
                    <JXGBoard id={'jxg-labor-market-inelastic'} gType={2} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick3.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Cobb-Douglas
                    <JXGBoard id={'jxg-cobb-douglas'} gType={3} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick4.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Labor Supply
                    <JXGBoard id={'jxg-labor-supply'} gType={4} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick5.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Consumption - Saving
                    <JXGBoard id={'jxg-consumption-saving'} gType={5} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick6.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Saving - Investment
                    <JXGBoard id={'jxg-saving-investment'} gType={6} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick7.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    Money Market
                    <JXGBoard id={'jxg-money-market'} gType={7} locked={true} />
                    <button
                        type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick8.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
            </div>
        )
    }
    handleClick1() {
        this.props.onSelectGraph(0);
    }
    handleClick2() {
        this.props.onSelectGraph(1);
    }
    handleClick3() {
        this.props.onSelectGraph(2);
    }
    handleClick4() {
        this.props.onSelectGraph(3);
    }
    handleClick5() {
        this.props.onSelectGraph(4);
    }
    handleClick6() {
        this.props.onSelectGraph(5);
    }
    handleClick7() {
        this.props.onSelectGraph(6);
    }
    handleClick8() {
        this.props.onSelectGraph(7);
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
