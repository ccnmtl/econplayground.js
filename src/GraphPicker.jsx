import React from 'react';
import PropTypes from 'prop-types';
import {displayGraphType} from './utils';

export default class GraphPicker extends React.Component {
    constructor(props) {
        super(props);
        this.mediaPrefix = 'https://ccnmtl-econplayground-static-prod.s3.' +
            'amazonaws.com/media/img/';

        this.renderGraphOption = this.renderGraphOption.bind(this);
    }

    renderGraphOption(n, imgname, idx) {
        return (
            <div className="card" key={idx}>
                <a href="#"
                   title={displayGraphType(n)}
                   onClick={() => this.props.onSelectGraph(n)}>
                    <img className="img-fluid" src={this.mediaPrefix + imgname} />
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
            [1, 'non-linear_demand_supply.png'],
            [8, 'ADAS.png'],
            [3, 'cobb_douglas.png'],
            [7, 'consumption_saving.png'],
            [5, 'consumption_leisure.png'],
            [9, 'linear_demand_supply.png'],
            [10, 'non-linear_demand_supply.png'],
        ];

        return (
            <div className="GraphPicker container">
                <h1>Create a Graph</h1>
                <p className="lead text-secondary">Build illustrations or assignments for EconPractice assessment (local) or CourseWorks assessment (LTI).</p>
                <div className="card-deck">
                    <div className="card">
                        <a href="#"
                           title="Linear Demand and Supply"
                           ref={(b1) => { this.b1 = b1;  }}
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
                        graphs.map(function(pair, idx) {
                            return me.renderGraphOption(pair[0], pair[1], idx);
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
