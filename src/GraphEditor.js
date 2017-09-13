import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
import './GraphEditor.css';

export default class GraphEditor extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
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

                    <JXGBoard
                         id={'editing-graph'}
                         gType={this.props.gType}
                         gShowIntersection={this.props.gShowIntersection} />

                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="line-1-slope">
                                Line 1 slope
                            </label>
                            <input id="line-1-slope"
                                   className="form-control" type="number" step="0.01" />
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="line-2-slope">
                                    Line 2 slope
                                </label>
                                <input id="line-2-slope"
                                       className="form-control" type="number" step="0.01" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="line-1-label">
                                    Line 1 label
                                </label>
                                <input id="line-1-label"
                                       className="form-control" type="text" />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="line-2-label">
                                    Line 2 label
                                </label>
                                <input id="line-2-label"
                                       className="form-control" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                 className="form-check-input"
                                 type="checkbox"
                                 onChange={this.handleDisplayIntersectionChange.bind(this)}
                                 defaultChecked={this.props.gShowIntersection} />
                            Display intersection
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="x-axis-label">
                                    X-axis label:
                                </label>
                                <input id="x-axis-label"
                                       className="form-control"
                                       type="text"
                                       onChange={this.handleXAxisChange.bind(this)} />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="y-axis-label">
                                    Y-axis label:
                                </label>
                                <input id="y-axis-label"
                                       className="form-control"
                                       type="text"
                                       onChange={this.handleYAxisChange.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.handleSaveGraph.bind(this)}
                            >Save</button>
                </form>
            </div>
        )
    }
    handleXAxisChange() {
    }
    handleYAxisChange() {
    }
    handleDisplayIntersectionChange(e) {
        this.props.updateDisplayIntersection(e.target.checked);
    }
    handleSaveGraph() {
        this.props.saveGraph();
    }
}

GraphEditor.propTypes = {
    gShowIntersection: PropTypes.bool,
    gType: PropTypes.number,

    updateDisplayIntersection: PropTypes.func.isRequired,
    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
