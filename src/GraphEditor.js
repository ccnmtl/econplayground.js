import React from 'react';
import PropTypes from 'prop-types';
import ADASEditor from './editors/ADASEditor';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import NonLinearDemandSupplyEditor from './editors/NonLinearDemandSupplyEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import CommonGraphEditor from './editors/CommonGraphEditor';
import JXGBoard from './JXGBoard';
import EditableControl from './form-components/EditableControl';
import RangeEditor from './form-components/RangeEditor';
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
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
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
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasYName={this.props.gCobbDouglasYName}

                />
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gAssignmentType={this.props.gAssignmentType}
            gNeedsSubmit={this.props.gNeedsSubmit}
            gDisplayFeedback={this.props.gDisplayFeedback}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayShadow={this.props.gDisplayShadow}
            gIsPublished={this.props.gIsPublished}
            updateGraph={this.props.updateGraph}
                />
                        </div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <NonLinearDemandSupplyEditor
            displayLabels={true}
            displaySliders={true}
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
                    </div>
                  </div>

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
            gAssignmentType={this.props.gAssignmentType}
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
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                />
                <CobbDouglasEditor
            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAName={this.props.gCobbDouglasAName}
            gCobbDouglasL={this.props.gCobbDouglasL}
            gCobbDouglasLName={this.props.gCobbDouglasLName}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKName={this.props.gCobbDouglasKName}
            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
            gCobbDouglasYName={this.props.gCobbDouglasYName}
            gCobbDouglasCorrectScenario={this.props.gCobbDouglasCorrectScenario}
            gIntersectionLabel={this.props.gIntersectionLabel}

            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            displayLabels={true}
            displaySliders={true}
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
            gAssignmentType={this.props.gAssignmentType}
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
            gA2={this.props.gA2}
            gLine1Label={this.props.gLine1Label}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}

            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            displayLabels={true}
            displaySliders={true}
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
            gAssignmentType={this.props.gAssignmentType}
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
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gShowIntersection={this.props.gShowIntersection}
                />
                <ConsumptionSavingEditor
            gA1={this.props.gA1}
            gA2={this.props.gA2}
            gA3={this.props.gA3}
            gA4={this.props.gA4}
            gLine1Label={this.props.gLine1Label}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            displayLabels={true}
            displaySliders={true}
            isInstructor={true}
            updateGraph={this.props.updateGraph}
                />

                <button type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleSaveGraph.bind(this)}>Save</button>

                </form>
                </div>;
        } else if (this.props.gType === 8) {
            // Aggregate Demand - Aggregate Supply
            return <div className="GraphEditor">
                {this.title()}
                <form>
                <CommonGraphEditor
            gTitle={this.props.gTitle}
            gInstructorNotes={this.props.gInstructorNotes}
            gDescription={this.props.gDescription}
            gAssignmentType={this.props.gAssignmentType}
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
            gLine3Label={this.props.gLine3Label}
            gLine1Dashed={this.props.gLine1Dashed}
            gLine2Dashed={this.props.gLine2Dashed}
            gLine3Dashed={this.props.gLine3Dashed}
            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}
            gLine1Slope={this.props.gLine1Slope}
            gLine2Slope={this.props.gLine2Slope}
            gLine3Slope={this.props.gLine3Slope}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gLine3OffsetX={this.props.gLine3OffsetX}
            gLine3OffsetY={this.props.gLine3OffsetY}
            gDisplayIntersection1={this.props.gDisplayIntersection1}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gDisplayIntersection2={this.props.gDisplayIntersection2}
            gIntersection2Label={this.props.gIntersection2Label}
            gDisplayIntersection3={this.props.gDisplayIntersection3}
            gIntersection3Label={this.props.gIntersection3Label}

            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersection2HorizLineLabel={this.props.gIntersection2HorizLineLabel}
            gIntersection2VertLineLabel={this.props.gIntersection2VertLineLabel}
            gIntersection3HorizLineLabel={this.props.gIntersection3HorizLineLabel}
            gIntersection3VertLineLabel={this.props.gIntersection3VertLineLabel}
            gShowIntersection={this.props.gShowIntersection}
                />
                <ADASEditor
            gXAxisLabel={this.props.gXAxisLabel}
            gYAxisLabel={this.props.gYAxisLabel}
            gA1={this.props.gA1}
            gA2={this.props.gA2}
            gA3={this.props.gA3}
            gA4={this.props.gA4}
            gLine1Slope={this.props.gLine1Slope}
            gLine1Label={this.props.gLine1Label}
            gLine2Slope={this.props.gLine2Slope}
            gLine2Label={this.props.gLine2Label}
            gLine3Label={this.props.gLine3Label}
            gLine3Slope={this.props.gLine3Slope}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayIntersection1={this.props.gDisplayIntersection1}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gDisplayIntersection2={this.props.gDisplayIntersection2}
            gIntersection2Label={this.props.gIntersection2Label}
            gDisplayIntersection3={this.props.gDisplayIntersection3}
            gIntersection3Label={this.props.gIntersection3Label}
            gLine1Dashed={this.props.gLine1Dashed}
            gLine2Dashed={this.props.gLine2Dashed}
            gLine3Dashed={this.props.gLine3Dashed}

            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersection2HorizLineLabel={this.props.gIntersection2HorizLineLabel}
            gIntersection2VertLineLabel={this.props.gIntersection2VertLineLabel}
            gIntersection3HorizLineLabel={this.props.gIntersection3HorizLineLabel}
            gIntersection3VertLineLabel={this.props.gIntersection3VertLineLabel}

            gCorrectFeedback={this.props.gCorrectFeedback}
            gIncorrectFeedback={this.props.gIncorrectFeedback}

            displayLabels={true}
            displaySliders={true}
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
                         gAssignmentType={this.props.gAssignmentType}
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
                                max={5}
                                showOverrideButton={true}
                                overrideLabel='Vertical'
                                overrideValue={999}
                                showOverride2Button={true}
                                override2Label='Horizontal'
                                override2Value={0}
                                handler={handleFormUpdate.bind(this)} />
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Blue line slope
                                </label>
                                <RangeEditor
                                    dataId="gLine2Slope"
                                    min={-5}
                                    max={0}
                                    value={this.props.gLine2Slope}
                                    showOverrideButton={true}
                                    overrideLabel='Vertical'
                                    overrideValue={-999}
                                    showOverride2Button={true}
                                    override2Label='Horizontal'
                                    override2Value={0}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gLine1Label"
                            name="Orange line label"
                            value={this.props.gLine1Label}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gLine2Label"
                            name="Blue line label"
                            value={this.props.gLine2Label}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gXAxisLabel"
                            name="X-axis label"
                            value={this.props.gXAxisLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gYAxisLabel"
                            name="Y-axis label"
                            value={this.props.gYAxisLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionLabel"
                            name="Intersection point label"
                            value={this.props.gIntersectionLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionHorizLineLabel"
                            name="Intersection&apos;s horizontal line label"
                            value={this.props.gIntersectionHorizLineLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gIntersectionVertLineLabel"
                            name="Intersection&apos;s vertical line label"
                            value={this.props.gIntersectionVertLineLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
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

    gShowIntersection: PropTypes.bool.isRequired,
    gDisplayIntersection1: PropTypes.bool.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gDisplayIntersection2: PropTypes.bool.isRequired,
    gIntersection2Label: PropTypes.string.isRequired,
    gDisplayIntersection3: PropTypes.bool.isRequired,
    gIntersection3Label: PropTypes.string.isRequired,
    gDisplayShadow: PropTypes.bool.isRequired,

    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersection2HorizLineLabel: PropTypes.string.isRequired,
    gIntersection2VertLineLabel: PropTypes.string.isRequired,
    gIntersection3HorizLineLabel: PropTypes.string.isRequired,
    gIntersection3VertLineLabel: PropTypes.string.isRequired,

    gIsPublished: PropTypes.bool.isRequired,
    gDisplayFeedback: PropTypes.bool.isRequired,
    gCorrectFeedback: PropTypes.string,
    gIncorrectFeedback: PropTypes.string,
    gInstructorNotes: PropTypes.string.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine3Label: PropTypes.string.isRequired,
    gLine1Slope: PropTypes.number.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine3Slope: PropTypes.number.isRequired,
    gLine1OffsetX: PropTypes.number.isRequired,
    gLine1OffsetY: PropTypes.number.isRequired,
    gLine2OffsetX: PropTypes.number.isRequired,
    gLine2OffsetY: PropTypes.number.isRequired,
    gLine3OffsetX: PropTypes.number.isRequired,
    gLine3OffsetY: PropTypes.number.isRequired,
    gLine1Dashed: PropTypes.bool.isRequired,
    gLine2Dashed: PropTypes.bool.isRequired,
    gLine3Dashed: PropTypes.bool.isRequired,

    gLine1FeedbackIncrease: PropTypes.string,
    gLine1IncreaseScore: PropTypes.number,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1DecreaseScore: PropTypes.number,
    gLine2FeedbackIncrease: PropTypes.string,
    gLine2IncreaseScore: PropTypes.number,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2DecreaseScore: PropTypes.number,
    gXAxisLabel: PropTypes.string.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,
    gType: PropTypes.number,
    gAssignmentType: PropTypes.number,
    gNeedsSubmit: PropTypes.bool,

    gAlpha: PropTypes.number,

    gA1: PropTypes.number,
    gA2: PropTypes.number,
    gA3: PropTypes.number,
    gA4: PropTypes.number,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasCorrectScenario: PropTypes.number,
    gCobbDouglasYName: PropTypes.string,

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
};
