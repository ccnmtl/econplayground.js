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
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="graph-title">
                                    Title
                                </label>
                                <input id="gTitle"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       value={this.props.gTitle}
                                       className="form-control form-control-sm"
                                       type="text" />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="graph-instructor-notes">
                                    Instructor Notes
                                </label>
                                <textarea id="gInstructorNotes"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gInstructorNotes}
                                          className="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="graph-description">
                                    Description
                                </label>
                                <textarea id="gDescription"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gDescription}
                                          className="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>

                    <JXGBoard
                         id={'editing-graph'}
                         width={562.5}
                         height={300}
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gLine1Slope={this.props.gLine1Slope}
                         gLine2Slope={this.props.gLine2Slope}
                         gShowIntersection={this.props.gShowIntersection} />

                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="gLine1Slope">
                                Line 1 slope
                            </label>
                            <input id="gLine1Slope"
                                   onChange={this.handleFormUpdate.bind(this)}
                                   className="form-control form-control-sm"
                                   value={this.props.gLine1Slope}
                                   type="number" step="0.01" />
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Line 2 slope
                                </label>
                                <input id="gLine2Slope"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm"
                                       value={this.props.gLine2Slope}
                                       type="number" step="0.01" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine1Label">
                                    Line 1 label
                                </label>
                                <input id="gLine1Label"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm" type="text" />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2Label">
                                    Line 2 label
                                </label>
                                <input id="gLine2Label"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine1FeedbackIncrease">
                                    Line 1 feedback when moved up
                                </label>
                                <textarea id="gLine1FeedbackIncrease"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gLine1FeedbackIncrease}
                                          className="form-control form-control-sm"></textarea>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2FeedbackIncrease">
                                    Line 2 feedback when moved up
                                </label>
                                <textarea id="gLine2FeedbackIncrease"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gLine2FeedbackIncrease}
                                          className="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine1FeedbackDecrease">
                                    Line 1 feedback when moved down
                                </label>
                                <textarea id="gLine1FeedbackDecrease"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gLine1FeedbackDecrease}
                                          className="form-control form-control-sm" />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2FeedbackDecrease">
                                    Line 2 feedback when moved down
                                </label>
                                <textarea id="gLine2FeedbackDecrease"
                                          onChange={this.handleFormUpdate.bind(this)}
                                          value={this.props.gLine2FeedbackDecrease}
                                          className="form-control form-control-sm"></textarea>
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

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gXAxisLabel">
                                    X-axis label:
                                </label>
                                <input id="gXAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       onChange={this.handleFormUpdate.bind(this)} />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gYAxisLabel">
                                    Y-axis label:
                                </label>
                                <input id="gYAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       onChange={this.handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <button type="button"
                            className="btn btn-primary btn-sm"
                            onClick={this.handleSaveGraph.bind(this)}>Save</button>
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
        this.props.saveGraph();
    }
}

GraphEditor.propTypes = {
    gTitle: PropTypes.string,
    gDescription: PropTypes.string,
    gShowIntersection: PropTypes.bool.isRequired,
    gInstructorNotes: PropTypes.string,
    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine1Slope: PropTypes.number.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gType: PropTypes.number,

    updateDisplayIntersection: PropTypes.func.isRequired,
    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
