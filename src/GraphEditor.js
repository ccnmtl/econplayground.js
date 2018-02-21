import React from 'react';
import PropTypes from 'prop-types';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import NonLinearDemandSupplyEditor from './editors/NonLinearDemandSupplyEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import CommonGraphEditor from './editors/CommonGraphEditor';
import JXGBoard from './JXGBoard';
import RangeEditor from './RangeEditor';
import {handleFormUpdate, displayGraphType} from './utils';

export default class GraphEditor extends React.Component {
    title() {
        return <h2>{displayGraphType(this.props.gType)}</h2>;
    }
    render() {
        if (!this.props.showing) {
            return null;
        }
        if (this.props.gType === 1) {
            return <div className="GraphEditor">
                {this.title()}
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayShadow={this.props.gDisplayShadow}
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
            gXAxisLabel={'L' || this.props.gCobbDouglasKName}
            gYAxisLabel={'Y'}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gAlpha={this.props.gAlpha}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAName={this.props.gCobbDouglasAName}
            gCobbDouglasAEditable={this.props.gCobbDouglasAEditable}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasLEditable={this.props.gCobbDouglasLEditable}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasKEditable={this.props.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasAlphaEditable={this.props.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.props.gCobbDouglasYName}

                />
                <NonLinearDemandSupplyEditor
            isInstructor={true}
            gLine1Label={this.props.gLine1Label}
            gLine2Label={this.props.gLine2Label}
            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gLine1Slope={this.props.gLine1Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            updateGraph={this.props.updateGraph}
                />

                <button type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleSaveGraph.bind(this)}>Save</button>

                </form>
                </div>;
        } else if (this.props.gType === 3) {
            return <div className="GraphEditor">
                {this.title()}
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayShadow={this.props.gDisplayShadow}
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
            gXAxisLabel={this.props.gCobbDouglasLName}
            gYAxisLabel={this.props.gCobbDouglasYName}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAName={this.props.gCobbDouglasAName}
            gCobbDouglasAEditable={this.props.gCobbDouglasAEditable}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasLEditable={this.props.gCobbDouglasLEditable}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasKEditable={this.props.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasAlphaEditable={this.props.gCobbDouglasAlphaEditable}
                />
                <CobbDouglasEditor
            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAName={this.props.gCobbDouglasAName}
            gCobbDouglasAEditable={this.props.gCobbDouglasAEditable}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasLEditable={this.props.gCobbDouglasLEditable}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasKEditable={this.props.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasAlphaEditable={this.props.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.props.gCobbDouglasYName}
            gCobbDouglasCorrectScenario={this.props.gCobbDouglasCorrectScenario}

            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            isInstructor={true}
            updateGraph={this.props.updateGraph}
                />

                <button type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleSaveGraph.bind(this)}>Save</button>

                </form>
                </div>;
        } else if (this.props.gType === 5) {
            return <div className="GraphEditor">
                {this.title()}
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayShadow={this.props.gDisplayShadow}
            gIsPublished={this.props.gIsPublished}
            updateGraph={this.props.updateGraph}
                />
                <JXGBoard
            id={'editing-graph'}
            width={562.5}
            height={300}
            gType={this.props.gType}
            gA1={this.props.gA1}
            gA2={this.props.gA2}
            gLine1Label={this.props.gLine1Label}
            gLine2Label={this.props.gLine2Label}
            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                />
                <ConsumptionLeisureEditor
            gA1={this.props.gA1}
            gA1Editable={this.props.gA1Editable}
            gA2={this.props.gA2}
            gA2Editable={this.props.gA2Editable}
            gLine1Label={this.props.gLine1Label}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}
            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            isInstructor={true}
            updateGraph={this.props.updateGraph}
                />

                <button type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleSaveGraph.bind(this)}>Save</button>

                </form>
                </div>;
        } else if (this.props.gType === 7) {
            return <div className="GraphEditor">
                {this.title()}
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayShadow={this.props.gDisplayShadow}
            gIsPublished={this.props.gIsPublished}
            updateGraph={this.props.updateGraph}
                />
                <JXGBoard
            id={'editing-graph'}
            width={562.5}
            height={300}
            gType={this.props.gType}
            gA1={this.props.gA1}
            gA2={this.props.gA2}
            gA3={this.props.gA3}
            gA4={this.props.gA4}
            gLine1Label={this.props.gLine1Label}
            gLine2Label={this.props.gLine2Label}
            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                />
                <ConsumptionSavingEditor
            gA1={this.props.gA1}
            gA1Editable={this.props.gA1Editable}
            gA2={this.props.gA2}
            gA2Editable={this.props.gA2Editable}
            gA3={this.props.gA3}
            gA3Editable={this.props.gA3Editable}
            gA4={this.props.gA4}
            gA4Editable={this.props.gA4Editable}
            gLine1Label={this.props.gLine1Label}
            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            isInstructor={true}
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
                {this.title()}
                <form>
                    <CommonGraphEditor
                         gTitle={this.props.gTitle}
                         gInstructorNotes={this.props.gInstructorNotes}
                         gDescription={this.props.gDescription}
                         gNeedsSubmit={this.props.gNeedsSubmit}
                         gDisplayFeedback={this.props.gDisplayFeedback}
                         gShowIntersection={this.props.gShowIntersection}
                         gDisplayShadow={this.props.gDisplayShadow}
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
                         gLine1OffsetX={this.props.gLine1OffsetX}
                         gLine1OffsetY={this.props.gLine1OffsetY}
                         gLine2OffsetX={this.props.gLine2OffsetX}
                         gLine2OffsetY={this.props.gLine2OffsetY}
                         gShowIntersection={this.props.gShowIntersection}
                         gIntersectionLabel={this.props.gIntersectionLabel}
                         gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                         gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                        gCobbDouglasA={this.props.gCobbDouglasA}
                        gCobbDouglasAName={this.props.gCobbDouglasAName}
                        gCobbDouglasL={this.props.gCobbDouglasL}
                        gCobbDouglasLName={this.props.gCobbDouglasLName}
                        gCobbDouglasK={this.props.gCobbDouglasK}
                        gCobbDouglasKName={this.props.gCobbDouglasKName}
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
                                min={0}
                                max={20}
                                showOverrideCheckbox={true}
                                overrideLabel='Vertical'
                                overrideValue={999}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                        <div className="col-sm-2">
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
                                    min={-20}
                                    max={0}
                                    value={this.props.gLine2Slope}
                                    showOverrideCheckbox={true}
                                    overrideLabel='Vertical'
                                    overrideValue={-999}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       className="form-control form-control-sm"
                                       type="text"
                                       maxLength="60"
                                       />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       className="form-control form-control-sm"
                                       type="text"
                                       maxLength="60"
                                       />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       maxLength="60"
                                       value={this.props.gXAxisLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       maxLength="60"
                                       value={this.props.gYAxisLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       maxLength="60"
                                       value={this.props.gIntersectionLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       maxLength="60"
                                       value={this.props.gIntersectionHorizLineLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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
                                       maxLength="60"
                                       value={this.props.gIntersectionVertLineLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                        <div className="col-sm-2">
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

                    <hr />
                    <h4>Feedback</h4>

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
    gDisplayShadow: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

    gIsPublished: PropTypes.bool,
    gDisplayFeedback: PropTypes.bool,
    gCorrectFeedback: PropTypes.string,
    gIncorrectFeedback: PropTypes.string,
    gInstructorNotes: PropTypes.string,
    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,
    gLine2Label: PropTypes.string.isRequired,
    gLine2LabelEditable: PropTypes.bool,
    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeEditable: PropTypes.bool,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2SlopeEditable: PropTypes.bool,
    gLine1OffsetX: PropTypes.number.isRequired,
    gLine1OffsetY: PropTypes.number.isRequired,
    gLine2OffsetX: PropTypes.number.isRequired,
    gLine2OffsetY: PropTypes.number.isRequired,
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

    gAlpha: PropTypes.number,

    gA1: PropTypes.number,
    gA1Editable: PropTypes.bool,
    gA2: PropTypes.number,
    gA2Editable: PropTypes.bool,
    gA3: PropTypes.number,
    gA3Editable: PropTypes.bool,
    gA4: PropTypes.number,
    gA4Editable: PropTypes.bool,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasAEditable: PropTypes.bool,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasLEditable: PropTypes.bool,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasKEditable: PropTypes.bool,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaEditable: PropTypes.bool,
    gCobbDouglasCorrectScenario: PropTypes.number,
    gCobbDouglasYName: PropTypes.string,

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
