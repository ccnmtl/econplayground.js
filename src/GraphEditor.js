import React from 'react';
import PropTypes from 'prop-types';
import CobbDouglasEditor from './CobbDouglasEditor';
import CommonGraphEditor from './CommonGraphEditor';
import JXGBoard from './JXGBoard';
import RangeEditor from './RangeEditor';
import {handleFormUpdate} from './utils';
import './GraphEditor.css';

export default class GraphEditor extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        if (this.props.gType === 3) {
            return <div className="GraphEditor">
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gIsPublished={this.props.gIsPublished}
            updateGraph={this.props.updateGraph}
                />
                <JXGBoard
            id={'editing-graph'}
            width={562.5}
            height={300}
            gType={this.props.gType}
            gLine1Label={this.props.gLine1Label}
            gLine2Label={this.props.gLine2Label}
            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine1Offset={this.props.gLine1Offset}
            gLine2Offset={this.props.gLine2Offset}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}

                />
                <CobbDouglasEditor
            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAEditable={this.props.gCobbDouglasAEditable}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKEditable={this.props.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasAlphaEditable={this.props.gCobbDouglasAlphaEditable}
            updateGraph={this.props.updateGraph}
                />

                <button type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleSaveGraph.bind(this)}>Save</button>

                </form>
                </div>;
        }
        return (
            <div className="GraphEditor">
                <form>
                    <CommonGraphEditor
                         gTitle={this.props.gTitle}
                         gInstructorNotes={this.props.gInstructorNotes}
                         gDescription={this.props.gDescription}
                         gNeedsSubmit={this.props.gNeedsSubmit}
                         gDisplayFeedback={this.props.gDisplayFeedback}
                         gShowIntersection={this.props.gShowIntersection}
                         gIsPublished={this.props.gIsPublished}
                         updateGraph={this.props.updateGraph}
                         />
                    <JXGBoard
                         id={'editing-graph'}
                         width={562.5}
                         height={300}
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gXAxisLabel={this.props.gXAxisLabel}
                         gYAxisLabel={this.props.gYAxisLabel}
                         gLine1Slope={this.props.gLine1Slope}
                         gLine2Slope={this.props.gLine2Slope}
                         gLine1Offset={this.props.gLine1Offset}
                         gLine2Offset={this.props.gLine2Offset}
                         gShowIntersection={this.props.gShowIntersection}
                         gIntersectionLabel={this.props.gIntersectionLabel}
                         gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                         gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                         gCobbDouglasA={this.props.gCobbDouglasA}
                         gCobbDouglasL={this.props.gCobbDouglasL}
                         gCobbDouglasK={this.props.gCobbDouglasK}
                         gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}

                         />

                    <div className="form-row">
                        <div className="col-sm-4">
                            <label htmlFor="gLine1Slope">
                                Orange line slope
                            </label>
                            <RangeEditor
                                 dataId="gLine1Slope"
                                 value={this.props.gLine1Slope}
                                 handler={handleFormUpdate.bind(this)} />
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gLine1SlopeEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine1SlopeEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Blue line slope
                                </label>
                                <RangeEditor
                                     dataId="gLine2Slope"
                                     value={this.props.gLine2Slope}
                                     handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gLine2SlopeEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine2SlopeEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gLine1Label">
                                    Orange line label
                                </label>
                                <input id="gLine1Label"
                                       value={this.props.gLine1Label}
                                       onChange={handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm" type="text" />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gLine1LabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine1LabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gLine2Label">
                                    Blue line label
                                </label>
                                <input id="gLine2Label"
                                       value={this.props.gLine2Label}
                                       onChange={handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm" type="text" />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gLine2LabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine2LabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gXAxisLabel">
                                    X-axis label:
                                </label>
                                <input id="gXAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       value={this.props.gXAxisLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gXAxisLabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gXAxisLabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gYAxisLabel">
                                    Y-axis label:
                                </label>
                                <input id="gYAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       value={this.props.gYAxisLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gYAxisLabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gYAxisLabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gIntersectionLabel">
                                    Intersection point label:
                                </label>
                                <input id="gIntersectionLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       value={this.props.gIntersectionLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gIntersectionLabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gIntersectionLabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gIntersectionHorizLineLabel">
                                    Intersection&apos;s horizontal line label:
                                </label>
                                <input id="gIntersectionHorizLineLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       value={this.props.gIntersectionHorizLineLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gIntersectionHorizLineLabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gIntersectionHorizLineLabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gIntersectionVertLineLabel">
                                    Intersection&apos;s vertical line label:
                                </label>
                                <input id="gIntersectionVertLineLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       value={this.props.gIntersectionVertLineLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gIntersectionVertLineLabelEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gIntersectionVertLineLabelEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine1FeedbackIncrease">
                                    Orange line feedback when moved up
                                </label>
                                <textarea id="gLine1FeedbackIncrease"
                                          onChange={handleFormUpdate.bind(this)}
                                          value={this.props.gLine1FeedbackIncrease}
                                          className="form-control form-control-sm"></textarea>

                                <div className="form-inline mt-sm-1">
                                    <label htmlFor="gLine1IncreaseScore">
                                        Score:
                                    </label>
                                    <input id="gLine1IncreaseScore"
                                           type="number"
                                           step="0.01"
                                           min="0"
                                           max="1"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gLine1IncreaseScore}
                                           aria-describedby="gLine1IncreaseScoreHelpBlock"
                                           className="form-control form-control-sm ml-sm-2" />
                                    <small id="gLine1IncreaseScoreHelpBlock"
                                           className="form-text text-muted ml-sm-2">
                                        Percentage of total between 0 and 1. e.g.: 0.8 = 80%
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2FeedbackIncrease">
                                    Blue line feedback when moved up
                                </label>
                                <textarea id="gLine2FeedbackIncrease"
                                          onChange={handleFormUpdate.bind(this)}
                                          value={this.props.gLine2FeedbackIncrease}
                                          className="form-control form-control-sm" />

                                <div className="form-inline mt-sm-1">
                                    <label htmlFor="gLine2IncreaseScore">
                                        Score:
                                    </label>
                                    <input id="gLine2IncreaseScore"
                                           type="number"
                                           step="0.01"
                                           min="0"
                                           max="1"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gLine2IncreaseScore}
                                           className="form-control form-control-sm ml-sm-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine1FeedbackDecrease">
                                    Orange line feedback when moved down
                                </label>
                                <textarea id="gLine1FeedbackDecrease"
                                          onChange={handleFormUpdate.bind(this)}
                                          value={this.props.gLine1FeedbackDecrease}
                                          className="form-control form-control-sm" />

                                <div className="form-inline mt-sm-1">
                                    <label htmlFor="gLine1DecreaseScore">
                                        Score:
                                    </label>
                                    <input id="gLine1DecreaseScore"
                                           type="number"
                                           step="0.01"
                                           min="0"
                                           max="1"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gLine1DecreaseScore}
                                           className="form-control form-control-sm ml-sm-2" />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="gLine2FeedbackDecrease">
                                    Blue line feedback when moved down
                                </label>
                                <textarea id="gLine2FeedbackDecrease"
                                          onChange={handleFormUpdate.bind(this)}
                                          value={this.props.gLine2FeedbackDecrease}
                                          className="form-control form-control-sm"></textarea>

                                <div className="form-inline mt-sm-1">
                                    <label htmlFor="gLine2DecreaseScore">
                                        Score:
                                    </label>
                                    <input id="gLine2DecreaseScore"
                                           type="number"
                                           step="0.01"
                                           min="0"
                                           max="1"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gLine2DecreaseScore}
                                           className="form-control form-control-sm ml-sm-2" />
                                </div>
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
    handleSaveGraph() {
        this.props.saveGraph();
    }
}

GraphEditor.propTypes = {
    gTitle: PropTypes.string,
    gDescription: PropTypes.string,

    gShowIntersection: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

    gIsPublished: PropTypes.bool,
    gDisplayFeedback: PropTypes.bool,
    gInstructorNotes: PropTypes.string,
    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,
    gLine2Label: PropTypes.string.isRequired,
    gLine2LabelEditable: PropTypes.bool,
    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeEditable: PropTypes.bool,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2SlopeEditable: PropTypes.bool,
    gLine1Offset: PropTypes.number.isRequired,
    gLine2Offset: PropTypes.number.isRequired,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine1IncreaseScore: PropTypes.number,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1DecreaseScore: PropTypes.number,
    gLine2FeedbackIncrease: PropTypes.string,
    gLine2IncreaseScore: PropTypes.number,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2DecreaseScore: PropTypes.number,
    gXAxisLabel: PropTypes.string.isRequired,
    gXAxisLabelEditable: PropTypes.bool,
    gYAxisLabel: PropTypes.string.isRequired,
    gYAxisLabelEditable: PropTypes.bool,
    gType: PropTypes.number,
    gNeedsSubmit: PropTypes.bool,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAEditable: PropTypes.bool,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKEditable: PropTypes.bool,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaEditable: PropTypes.bool,

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
