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
            gLine1LabelEditable={this.props.gLine1LabelEditable}
            gLine2Label={this.props.gLine2Label}
            gLine2LabelEditable={this.props.gLine2LabelEditable}
            gCobbDouglasA={this.props.gCobbDouglasA}
            gCobbDouglasAEditable={this.props.gCobbDouglasAEditable}
            gCobbDouglasK={this.props.gCobbDouglasK}
            gCobbDouglasKEditable={this.props.gCobbDouglasKEditable}
            gLine1Slope={this.props.gLine1Slope}
            gLine1SlopeEditable={this.props.gLine1SlopeEditable}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.props.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.props.gIntersectionVertLineLabelEditable}
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
            gLine1LabelEditable={this.props.gLine1LabelEditable}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.props.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.props.gIntersectionVertLineLabelEditable}

            gXAxisLabel={this.props.gXAxisLabel}
            gXAxisLabelEditable={this.props.gXAxisLabelEditable}
            gYAxisLabel={this.props.gYAxisLabel}
            gYAxisLabelEditable={this.props.gYAxisLabelEditable}

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
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gShowIntersection={this.props.gShowIntersection}
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
            gLine1LabelEditable={this.props.gLine1LabelEditable}
            gShowIntersection={this.props.gShowIntersection}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.props.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.props.gIntersectionVertLineLabelEditable}
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
        } else if (this.props.gType === 8) {
            // Aggregate Demand - Aggregate Supply
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
            gDisplayIntersection1={this.props.gDisplayIntersection1}
            gDisplayIntersection2={this.props.gDisplayIntersection2}
            gDisplayIntersection3={this.props.gDisplayIntersection3}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gShowIntersection={this.props.gShowIntersection}
                />
                <ADASEditor
            gXAxisLabel={this.props.gXAxisLabel}
            gXAxisLabelEditable={this.props.gXAxisLabelEditable}
            gYAxisLabel={this.props.gYAxisLabel}
            gYAxisLabelEditable={this.props.gYAxisLabelEditable}
            gA1={this.props.gA1}
            gA1Editable={this.props.gA1Editable}
            gA2={this.props.gA2}
            gA2Editable={this.props.gA2Editable}
            gA3={this.props.gA3}
            gA3Editable={this.props.gA3Editable}
            gA4={this.props.gA4}
            gA4Editable={this.props.gA4Editable}
            gLine1Slope={this.props.gLine1Slope}
            gLine1SlopeEditable={this.props.gLine1SlopeEditable}
            gLine1Label={this.props.gLine1Label}
            gLine1LabelEditable={this.props.gLine1LabelEditable}
            gLine2Slope={this.props.gLine2Slope}
            gLine2SlopeEditable={this.props.gLine2SlopeEditable}
            gLine2Label={this.props.gLine2Label}
            gLine2LabelEditable={this.props.gLine2LabelEditable}
            gLine3Label={this.props.gLine3Label}
            gLine3LabelEditable={this.props.gLine3LabelEditable}
            gLine3Slope={this.props.gLine3Slope}
            gLine3SlopeEditable={this.props.gLine3SlopeEditable}
            gShowIntersection={this.props.gShowIntersection}
            gDisplayIntersection1={this.props.gDisplayIntersection1}
            gDisplayIntersection2={this.props.gDisplayIntersection2}
            gDisplayIntersection3={this.props.gDisplayIntersection3}
            gLine1Dashed={this.props.gLine1Dashed}
            gLine2Dashed={this.props.gLine2Dashed}
            gLine3Dashed={this.props.gLine3Dashed}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.props.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.props.gIntersectionVertLineLabelEditable}
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
                                max={5}
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
                                    min={-5}
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
                        <EditableControl
                            id="gLine1Label"
                            name="Orange line label"
                            value={this.props.gLine1Label}
                            valueEditable={this.props.gLine1LabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gLine2Label"
                            name="Blue line label"
                            value={this.props.gLine2Label}
                            valueEditable={this.props.gLine2LabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gXAxisLabel"
                            name="X-axis label"
                            value={this.props.gXAxisLabel}
                            valueEditable={this.props.gXAxisLabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gYAxisLabel"
                            name="Y-axis label"
                            value={this.props.gYAxisLabel}
                            valueEditable={this.props.gYAxisLabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionLabel"
                            name="Intersection point label"
                            value={this.props.gIntersectionLabel}
                            valueEditable={this.props.gIntersectionLabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionHorizLineLabel"
                            name="Intersection&apos;s horizontal line label"
                            value={this.props.gIntersectionHorizLineLabel}
                            valueEditable={this.props.gIntersectionHorizLineLabelEditable}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                            />

                        <EditableControl
                            id="gIntersectionVertLineLabel"
                            name="Intersection&apos;s vertical line label"
                            value={this.props.gIntersectionVertLineLabel}
                            valueEditable={this.props.gIntersectionVertLineLabelEditable}
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
    gDisplayIntersection2: PropTypes.bool.isRequired,
    gDisplayIntersection3: PropTypes.bool.isRequired,
    gDisplayShadow: PropTypes.bool.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionLabelEditable: PropTypes.bool.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabelEditable: PropTypes.bool.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabelEditable: PropTypes.bool.isRequired,

    gIsPublished: PropTypes.bool.isRequired,
    gDisplayFeedback: PropTypes.bool.isRequired,
    gCorrectFeedback: PropTypes.string,
    gIncorrectFeedback: PropTypes.string,
    gInstructorNotes: PropTypes.string.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine2LabelEditable: PropTypes.bool.isRequired,
    gLine3Label: PropTypes.string.isRequired,
    gLine3LabelEditable: PropTypes.bool.isRequired,
    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeEditable: PropTypes.bool.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2SlopeEditable: PropTypes.bool.isRequired,
    gLine3Slope: PropTypes.number.isRequired,
    gLine3SlopeEditable: PropTypes.bool.isRequired,
    gLine1OffsetX: PropTypes.number.isRequired,
    gLine1OffsetY: PropTypes.number.isRequired,
    gLine2OffsetX: PropTypes.number.isRequired,
    gLine2OffsetY: PropTypes.number.isRequired,
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
    gXAxisLabelEditable: PropTypes.bool.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,
    gYAxisLabelEditable: PropTypes.bool.isRequired,
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
};
