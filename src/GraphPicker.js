import React from 'react';
import PropTypes from 'prop-types';
import {displayGraphType} from './utils';

export default class GraphPicker extends React.Component {
    constructor(props) {
        super(props);
        this.mediaPrefix = 'https://ccnmtl-econplayground-static-prod.s3.' +
            'amazonaws.com/media/img/';
    }
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
                        <a href="#"
                           ref={(b1) => { this.b1 = b1;  }}
                            onClick={this.handleClick1.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'linear_demand_supply.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick1.bind(this)}>
                                    {displayGraphType(0)}
                                </a>
                            </h5>
                        </div>
                    </div>
                    <div className="card">
                        <a href="#"
                            onClick={this.handleClick4.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'cobb_douglas.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick4.bind(this)}>
                                    {displayGraphType(3)}
                                </a>
                            </h5>
                        </div>
                    </div>
                    <div className="card">
                        <a href="#"
                            onClick={this.handleClick2.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'non-linear_demand_supply.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick2.bind(this)}>
                                    {displayGraphType(1)}
                                </a>
                            </h5>
                        </div>
                    </div>
                    <div className="card">
                        <a href="#"
                            onClick={this.handleClick8.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'consumption_saving.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick8.bind(this)}>
                                    {displayGraphType(7)}
                                </a>
                            </h5>
                        </div>
                    </div>
                    <div className="card">
                        <a href="#"
                            onClick={this.handleClick9.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'ADAS.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick9.bind(this)}>
                                    {displayGraphType(8)}
                                </a>
                            </h5>
                        </div>
                    </div>
                    <div className="card">
                        <a href="#"
                            onClick={this.handleClick6.bind(this)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'consumption_leisure.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#" onClick={this.handleClick6.bind(this)}>
                                    {displayGraphType(5)}
                                </a>
                            </h5>
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
