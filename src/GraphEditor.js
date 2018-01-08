import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard';
import RangeEditor from './RangeEditor';
import {handleFormUpdate} from './utils';
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
                                       onChange={handleFormUpdate.bind(this)}
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
                                          onChange={handleFormUpdate.bind(this)}
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
                                          onChange={handleFormUpdate.bind(this)}
                                          value={this.props.gDescription}
                                          className="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gNeedsSubmit"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gNeedsSubmit} />
                                    Requires submission
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gDisplayFeedback"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gDisplayFeedback} />
                                    Display feedback
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gShowIntersection"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gShowIntersection} />
                                    Display intersection
                                </label>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gIsPublished"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gIsPublished} />
                                    Published
                                </label>
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

                    <div className={this.props.gType === 3 ? '' : 'd-none'} >
                        This is a projection of the Cobb-Douglas
                        function with L plotted along the X-axis.
                        <div className="ml-2 mb-2">
                            <img width="120" height="18.33" src="data:image/png;base64,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" />
                        </div>

                    </div>

                    <div className={'row ' + (this.props.gType === 3 ? '' : 'd-none')} >
                        <div className="col-sm-4">
                            <label htmlFor="gCobbDouglasA">
                                A
                            </label>
                            <RangeEditor
                                 dataId="gCobbDouglasA"
                                 value={this.props.gCobbDouglasA}
                                 handler={handleFormUpdate.bind(this)}
                                 min={0} />
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gCobbDouglasAEditable"
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
                                <label htmlFor="gCobbDouglasK">
                                    K
                                </label>
                                <RangeEditor
                                     dataId="gCobbDouglasK"
                                     value={this.props.gCobbDouglasK}
                                     handler={handleFormUpdate.bind(this)}
                                     min={0} />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gCobbDouglasKEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine2SlopeEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={'row ' + (this.props.gType === 3 ? '' : 'd-none')} >
                        <div className="col-sm-4">
                            <label htmlFor="gLine1Slope">
                                &alpha;
                            </label>
                            <RangeEditor
                                 dataId="gCobbDouglasAlpha"
                                 value={this.props.gCobbDouglasAlpha}
                                 handler={handleFormUpdate.bind(this)}
                                 min={0}
                                 max={1} />
                        </div>
                        <div className="col-sm-2">
                            <label></label>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                         id="gCobbDouglasAlphaEditable"
                                         className="form-check-input"
                                         type="checkbox"
                                         onChange={handleFormUpdate.bind(this)}
                                         checked={this.props.gLine1SlopeEditable} />
                                    Student editable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={'form-row ' + (this.props.gType !== 3 ? '' : 'd-none')}>
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

                        <div className={(this.props.gType !== 3 ? 'col-sm-4' : 'd-none')}>
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
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasAlpha: PropTypes.number,

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
