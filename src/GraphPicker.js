import React from 'react';
import PropTypes from 'prop-types';
import {displayGraphType} from './utils';

export default class GraphPicker extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        return (
            <div className="GraphPicker container">
                <h1>Create a Graph</h1>
                <p className="lead text-secondary">Build your own ideas by starting with one of these graphs as a foundation.</p>
                <div className="card-columns">
                    <div className="card">
                        <a
                            ref={(b1) => { this.b1 = b1;  }}
                            onClick={this.handleClick1.bind(this)}>
                            <img className="img-fluid" src="/media/img/linear_demand_supply.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(0)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                        </div>
                    </div>
                    <div className="card">
                        <a
                            onClick={this.handleClick2.bind(this)}>
                            <img className="img-fluid" src="/media/img/non-linear_demand_supply.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(1)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                        </div>
                    </div>
                    <div className="card">
                        <a
                            onClick={this.handleClick4.bind(this)}>
                            <img className="img-fluid" src="/media/img/cobb_douglas.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(3)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                            <button
                                type="button" className="btn btn-primary btn-sm"
                                onClick={this.handleClick4.bind(this)}>
                                Select
                                <svg className="octicon octicon-arrow-right octicon-after" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 8L4 3v3H0v4h4v3z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <a
                            onClick={this.handleClick6.bind(this)}>
                            <img className="img-fluid" src="/media/img/consumption_leisure.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(5)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                        </div>
                    </div>
                    <div className="card">
                        <a
                            onClick={this.handleClick8.bind(this)}>
                            <img className="img-fluid" src="/media/img/consumption_saving.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(7)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                        </div>
                    </div>
                    <div className="card">
                        <a
                            onClick={this.handleClick9.bind(this)}>
                            <img className="img-fluid" src="/media/img/ADAS.png"/>
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">{displayGraphType(8)}</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam ante at iaculis. Donec in dapibus diam. </p>
                        </div>
                    </div>
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
