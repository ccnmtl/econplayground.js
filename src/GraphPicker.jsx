import React from 'react';
import PropTypes from 'prop-types';
import {displayGraphType} from './utils';

export default class GraphPicker extends React.Component {
    constructor(props) {
        super(props);
        this.mediaPrefix = 'https://ccnmtl-econplayground-static-prod.s3.' +
            'amazonaws.com/media/img/';

        this.renderGraphOption = this.renderGraphOption.bind(this);
        this.b1 = React.createRef();
    }

    renderGraphOption(n, imgname, isBeta, idx) {
        return (
            <div className="card" key={idx}>
                <a href="#"
                   title={displayGraphType(n)}
                   onClick={() => this.props.onSelectGraph(n)}>

                    <img className="img-fluid" src={this.mediaPrefix + imgname} />
                    {isBeta && (
                        <span className="badge badge-warning ml-2 mt-2">
                            Beta
                        </span>
                    )}
                </a>
                <div className="card-body">

                    <h5 className="card-title">
                        <a href="#"
                           title={displayGraphType(n)}
                           onClick={() => this.props.onSelectGraph(n)}>
                            {displayGraphType(n)}
                        </a>
                    </h5>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.showing) {
            return null;
        }

        const me = this;
        const graphs = [
            [1, 'non-linear_demand_supply.png', false],
            [8, 'ADAS.png', false],
            [3, 'cobb_douglas.png', false],
            [7, 'consumption_saving.png', false],
            [5, 'consumption_leisure.png', false],
            [9, 'linear_demand_supply.png', true],
            [10, 'non-linear_demand_supply.png', true],
            [11, 'consumption_saving.png', true],
            [12, 'cobb_douglas.png', true],
            [13, 'linear_demand_supply.png', true],
            [14, 'non-linear_demand_supply.png', true],
        ];

        return (
            <div className="GraphPicker container">
                <h1>Create a Graph</h1>
                <p className="lead text-secondary">Build illustrations or assignments for EconPractice assessment (local) or CourseWorks assessment (LTI).</p>
                <div className="card-deck">
                    <div className="card">
                        <a href="#"
                           title="Linear Demand and Supply"
                           ref={this.b1}
                           onClick={() => this.props.onSelectGraph(0)}>
                            <img className="img-fluid" src={this.mediaPrefix + 'linear_demand_supply.png'} />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#"
                                   title="Linear Demand and Supply"
                                   onClick={() => this.props.onSelectGraph(0)}>
                                    {displayGraphType(0)}
                                </a>
                            </h5>
                        </div>
                    </div>

                    {
                        graphs.map(function(g, idx) {
                            return me.renderGraphOption(
                                g[0], g[1], g[2], idx);
                        })
                    }
                </div>
            </div>
        );
    }
}

GraphPicker.propTypes = {
    onSelectGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
