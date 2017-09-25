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
                               ref={(title) => { this.title = title; }}
                               className="form-control"
                               type="text" />
                    </div>

                    <JXGBoard
                         id={'editing-graph'}
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gShowIntersection={this.props.gShowIntersection} />

                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="gLine1Slope">
                                Line 1 slope
                            </label>
                            <input id="gLine1Slope"
                                   onChange={this.handleFormUpdate.bind(this)}
                                   className="form-control"
                                   type="number" step="0.01" />
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Line 2 slope
                                </label>
                                <input id="gLine2Slope"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control"
                                       type="number" step="0.01" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gLine1Label">
                                    Line 1 label
                                </label>
                                <input id="gLine1Label"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control" type="text" />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gLine2Label">
                                    Line 2 label
                                </label>
                                <input id="gLine2Label"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                 id="gShowIntersection"
                                 className="form-check-input"
                                 type="checkbox"
                                 onChange={this.handleFormUpdate.bind(this)}
                                 defaultChecked={this.props.gShowIntersection} />
                            Display intersection
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gXAxisLabel">
                                    X-axis label:
                                </label>
                                <input id="gXAxisLabel"
                                       className="form-control"
                                       type="text"
                                       onChange={this.handleFormUpdate.bind(this)} />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gYAxisLabel">
                                    Y-axis label:
                                </label>
                                <input id="gYAxisLabel"
                                       className="form-control"
                                       type="text"
                                       onChange={this.handleFormUpdate.bind(this)} />
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
    handleFormUpdate(e) {
        let obj = {};

        switch(e.target.type) {
        case 'checkbox':
            obj[e.target.id] = e.target.checked;
            break;
        case 'number':
            obj[e.target.id] = parseFloat(e.target.value);
            break;
        default:
            obj[e.target.id] = e.target.value;
        }

        this.props.updateGraph(obj);
    }
    handleDisplayIntersectionChange(e) {
        this.props.updateDisplayIntersection(e.target.checked);
    }
    handleSaveGraph() {
        this.props.saveGraph(this.title.value);
    }
}

GraphEditor.propTypes = {
    gShowIntersection: PropTypes.bool,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gType: PropTypes.number,

    updateDisplayIntersection: PropTypes.func.isRequired,
    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
