import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
import {displayGraphType} from './utils';

export default class GraphPicker extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        return (
            <div className="GraphPicker">
                <p>Pick a graph type:</p>
                <div className="graph-card">
                    {displayGraphType(0)}
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
                    {displayGraphType(1)}
                    <JXGBoard id={'jxg-nonlinear-demand-supply'} gType={1} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick2.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    {displayGraphType(3)}
                    <JXGBoard id={'jxg-cobb-douglas'} gType={3} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick4.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    {displayGraphType(5)}
                    <JXGBoard id={'jxg-cons-leisure-choice'} gType={5} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick6.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    {displayGraphType(7)}
                    <JXGBoard id={'jxg-cons-saving-choice'} gType={7} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick8.bind(this)}>
                        Select
                        <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                    </button>
                </div>
                <div className="graph-card">
                    {displayGraphType(8)}
                    <JXGBoard id={'jxg-adas-choice'} gType={8} locked={true} />
                    <button
                         type="button" className="btn btn-primary btn-sm"
                        onClick={this.handleClick9.bind(this)}>
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
    handleClick9() {
        this.props.onSelectGraph(8);
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
