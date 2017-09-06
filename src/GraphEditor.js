import React from 'react';
import PropTypes from 'prop-types';
import VegaRenderer from './VegaRenderer.js';

export default class GraphEditor extends React.Component {
    render() {
        if (!this.props.showing) {
            return <span></span>;
        }
        return (
            <div className="GraphEditor">
                <VegaRenderer
                     vegaSpec={this.props.graph}
                     renderer={'svg'} />
                <label>
                    X-axis label:
                    <input type="text"
                           onChange={this.handleXAxisChange.bind(this)} />
                </label>
                <label>
                    Y-axis label:
                    <input type="text"
                           onChange={this.handleYAxisChange.bind(this)} />
                </label>
                <br />
                <button>Continue ➡</button>
            </div>
        )
    }
    handleXAxisChange(e) {
        let graphCopy = Object.assign({}, this.props.graph);
        let i;
        for (i = 0; i < graphCopy.axes.length; i++) {
            if (graphCopy.axes[i].scale === 'x') {
                break;
            }
        }
        graphCopy.axes[i] = {
            "orient": "bottom",
            "scale": "x",
            "title": e.target.value
        };
        this.props.updateGraph(graphCopy);
    }
    handleYAxisChange(e) {
        let graphCopy = Object.assign({}, this.props.graph);
        let i;
        for (i = 0; i < graphCopy.axes.length; i++) {
            if (graphCopy.axes[i].scale === 'y') {
                break;
            }
        }
        graphCopy.axes[i] = {
            "orient": "left",
            "scale": "y",
            "title": e.target.value
        };
        this.props.updateGraph(graphCopy);
    }
}

GraphEditor.propTypes = {
    graph: PropTypes.object,
    updateGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
