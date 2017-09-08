import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';

export default class GraphEditor extends React.Component {
    render() {
        if (!this.props.showing) {
            return <span></span>;
        }
        return (
            <div className="GraphEditor">
                <form>
                    <div className="form-group">
                        <label htmlFor="graph-title">
                            Title
                        </label>
                        <input id="graph-title"
                               className="form-control"
                               type="text" />
                    </div>

                    <JXGBoard id={'editing-graph'} type={this.props.graph} />

                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input"
                                   type="checkbox" value="" />
                            Blue line is movable by users
                        </label>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input"
                                   type="checkbox" value="" />
                            Orange line is movable by users
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="x-axis-label">
                            X-axis label:
                        </label>
                        <input id="x-axis-label"
                               className="form-control"
                               type="text"
                               onChange={this.handleXAxisChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="y-axis-label">
                            Y-axis label:
                        </label>
                        <input id="y-axis-label"
                               className="form-control"
                               type="text"
                               onChange={this.handleYAxisChange.bind(this)} />
                    </div>

                    <button type="button"
                            className="btn btn-primary">Continue ➡</button>
                </form>
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
        graphCopy.axes[i].title = e.target.value;
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
        graphCopy.axes[i].title = e.target.value;
        this.props.updateGraph(graphCopy);
    }
}

GraphEditor.propTypes = {
    graph: PropTypes.number,
    updateGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
