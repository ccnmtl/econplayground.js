import React from 'react';
import PropTypes from 'prop-types';
import ADASEditor from './editors/ADASEditor';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import CobbDouglasNLDSEditor from './editors/CobbDouglasNLDSEditor';
import NonLinearDemandSupplyEditor from './editors/NonLinearDemandSupplyEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import DemandSupplyEditor from './editors/DemandSupplyEditor';
import CommonGraphEditor from './editors/CommonGraphEditor';
import CommonGraphSettings from './editors/CommonGraphSettings';
import JXGBoard from './JXGBoard';
import {displayGraphType, handleFormUpdate, getCohortId} from './utils';

const BOARD_WIDTH = 540;
const BOARD_HEIGHT = 300;

export default class GraphEditor extends React.Component {
    title() {
        return (
            <div>
                <h1>{displayGraphType(this.props.gType)}</h1>
                <p className="lead text-secondary">
                    Add and modify the information of your graph.
                </p>
            </div>
        );
    }
    render() {
        if (!this.props.showing) {
            return null;
        }

        const courseId = getCohortId(window.location.pathname);

        const editRow = (
            <div className="row">
                <div className="ml-3 mr-2">
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.handleSaveGraph.bind(this)}>Save</button>
                </div>
                <button onClick={this.handleSaveAndViewGraph.bind(this)}
                        type="button"
                        className="btn btn-secondary">Save and View</button>
                {this.props.gId &&
                 <div className="ml-auto mr-2">
                     <a role="button"
                        className="btn btn-primary float-md-right"
                        title="Clone Graph"
                        href={`/course/${courseId}/graph/${this.props.gId}/clone/`}>
                         <svg height="32" className="mr-1 octicon octicon-repo-clone" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M15 0H9v7c0 .55.45 1 1 1h1v1h1V8h3c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 7h-1V6h1v1zm4 0h-3V6h3v1zm0-2h-4V1h4v4zM4 5H3V4h1v1zm0-2H3V2h1v1zM2 1h6V0H1C.45 0 0 .45 0 1v12c0 .55.45 1 1 1h2v2l1.5-1.5L6 16v-2h5c.55 0 1-.45 1-1v-3H2V1zm9 10v2H6v-1H3v1H1v-2h10zM3 8h1v1H3V8zm1-1H3V6h1v1z"></path></svg>
                         Clone Graph
                     </a>
                 </div>
                 }
                {this.props.gId &&
                 <div className="mr-3">
                     <a role="button"
                        className="btn btn-danger float-md-right"
                        title="Delete Graph"
                        href={`/course/${courseId}/graph/${this.props.gId}/delete/`}>
                         <svg height="32" className="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="24" aria-hidden="true"><path fillRule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                         Delete Graph
                     </a>
                 </div>
                }
            </div>
        );

        let leftSide = null;
        let rightSide = null;

        if (this.props.gType === 0 || this.props.gType === 9) {
            // Demand-Supply, possibly AUC (area under curve)
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
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

                               gAreaConfiguration={this.props.gAreaConfiguration}
                               gIsAreaDisplayed={this.props.gIsAreaDisplayed}
                               gAreaAName={this.props.gAreaAName}
                               gAreaBName={this.props.gAreaBName}
                               gAreaCName={this.props.gAreaCName}
                           />
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               updateGraph={this.props.updateGraph}
                           />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;

            rightSide = <DemandSupplyEditor
                            displayLabels={true}
                            displaySliders={true}
                            isInstructor={true}
                            gLine1Label={this.props.gLine1Label}
                            gLine2Label={this.props.gLine2Label}
                            gLine1Slope={this.props.gLine1Slope}
                            gLine2Slope={this.props.gLine2Slope}
                            gLine1OffsetX={this.props.gLine1OffsetX}
                            gLine1OffsetY={this.props.gLine1OffsetY}
                            gLine2OffsetX={this.props.gLine2OffsetX}
                            gLine2OffsetY={this.props.gLine2OffsetY}
                            gXAxisLabel={this.props.gXAxisLabel}
                            gYAxisLabel={this.props.gYAxisLabel}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gAreaConfiguration={this.props.gAreaConfiguration}
                            gIsAreaDisplayed={this.props.gIsAreaDisplayed}

                            gAreaAName={this.props.gAreaAName}
                            gAreaBName={this.props.gAreaBName}
                            gAreaCName={this.props.gAreaCName}

                            showAUC={this.props.gType === 9}
                            updateGraph={this.props.updateGraph}
                />;
        } else if (this.props.gType === 13) {
            // Horizontal Joint Graph: two Linear Demand-Supply graphs
            return (
                <div className="GraphEditor">
                    {this.title()}
                    <form>
                        <div className="row">
                            <JXGBoard
                                id={'editing-graph'}
                                width={BOARD_WIDTH}
                                height={BOARD_HEIGHT}
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
                            />

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <h2>Scenario</h2>
                                <div className="form-group">
                                    <label htmlFor="gTitle">
                                        Title
                                    </label>
                                    <input id="gTitle"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gTitle}
                                           className="form-control form-control-sm"
                                           type="text"
                                           maxLength="140"
                                    />
                                </div>

                                <CommonGraphEditor
                                    gTitle={this.props.gTitle}
                                    gSummary={this.props.gSummary}
                                    gInstructorNotes={this.props.gInstructorNotes}
                                    gInstructions={this.props.gInstructions}
                                    updateGraph={this.props.updateGraph}
                                />

                                {this.props.gId &&
                                 <div className="form-group">
                                     <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                        title="Student View"
                                        className="btn btn-secondary">Student View</a>
                                 </div>
                                }
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <CommonGraphSettings
                                    gAssignmentType={this.props.gAssignmentType}
                                    gNeedsSubmit={this.props.gNeedsSubmit}
                                    gDisplayFeedback={this.props.gDisplayFeedback}
                                    gShowIntersection={this.props.gShowIntersection}
                                    gDisplayShadow={this.props.gDisplayShadow}
                                    gIsPublished={this.props.gIsPublished}
                                    gIsFeatured={this.props.gIsFeatured}
                                    gTopic={this.props.gTopic}
                                    updateGraph={this.props.updateGraph}
                                />
                                <DemandSupplyEditor
                                    displayLabels={true}
                                    displaySliders={true}
                                    isInstructor={true}
                                    gLine1Label={this.props.gLine1Label}
                                    gLine2Label={this.props.gLine2Label}
                                    gLine1Slope={this.props.gLine1Slope}
                                    gLine2Slope={this.props.gLine2Slope}
                                    gLine1OffsetX={this.props.gLine1OffsetX}
                                    gLine1OffsetY={this.props.gLine1OffsetY}
                                    gLine2OffsetX={this.props.gLine2OffsetX}
                                    gLine2OffsetY={this.props.gLine2OffsetY}
                                    gXAxisLabel={this.props.gXAxisLabel}
                                    gYAxisLabel={this.props.gYAxisLabel}
                                    gIntersectionLabel={this.props.gIntersectionLabel}
                                    gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                                    gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                                    gAreaConfiguration={this.props.gAreaConfiguration}
                                    gIsAreaDisplayed={this.props.gIsAreaDisplayed}

                                    gAreaAName={this.props.gAreaAName}
                                    gAreaBName={this.props.gAreaBName}
                                    gAreaCName={this.props.gAreaCName}

                                    showAUC={this.props.gType === 9}
                                    updateGraph={this.props.updateGraph}
                                />
                            </div>
                        </div>
                        <hr/>
                        {editRow}
                    </form>
                </div>
            );
        } else if (this.props.gType === 14) {
            // Horizontal Joint Graph: two Non-Linear Demand-Supply graphs
            return (
                <div className="GraphEditor">
                    {this.title()}
                    <form>
                        <div className="row">
                            <JXGBoard
                                id={'editing-graph'}
                                width={BOARD_WIDTH}
                                height={BOARD_HEIGHT}
                                gType={this.props.gType}
                                gCobbDouglasA={this.props.gCobbDouglasA}
                                gCobbDouglasK={this.props.gCobbDouglasK}
                                gCobbDouglasAName={this.props.gCobbDouglasAName}
                                gCobbDouglasKName={this.props.gCobbDouglasKName}

                                gNName={this.props.gNName}
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

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <h2>Scenario</h2>
                                <div className="form-group">
                                    <label htmlFor="gTitle">
                                        Title
                                    </label>
                                    <input id="gTitle"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gTitle}
                                           className="form-control form-control-sm"
                                           type="text"
                                           maxLength="140"
                                    />
                                </div>

                                <CommonGraphEditor
                                    gTitle={this.props.gTitle}
                                    gSummary={this.props.gSummary}
                                    gInstructorNotes={this.props.gInstructorNotes}
                                    gInstructions={this.props.gInstructions}
                                    updateGraph={this.props.updateGraph}
                                />

                                {this.props.gId &&
                                 <div className="form-group">
                                     <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                        title="Student View"
                                        className="btn btn-secondary">Student View</a>
                                 </div>
                                }
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <NonLinearDemandSupplyEditor
                                    displayLabels={true}
                                    displaySliders={true}
                                    isInstructor={true}
                                    gLine1Label={this.props.gLine1Label}
                                    gLine2Label={this.props.gLine2Label}
                                    gCobbDouglasA={this.props.gCobbDouglasA}
                                    gCobbDouglasAName={this.props.gCobbDouglasAName}
                                    gCobbDouglasK={this.props.gCobbDouglasK}
                                    gCobbDouglasKName={this.props.gCobbDouglasKName}
                                    gNName={this.props.gNName}
                                    gLine1Slope={this.props.gLine1Slope}
                                    gLine1OffsetX={this.props.gLine1OffsetX}
                                    gLine1OffsetY={this.props.gLine1OffsetY}
                                    gLine2OffsetX={this.props.gLine2OffsetX}
                                    gLine2OffsetY={this.props.gLine2OffsetY}
                                    gIntersectionLabel={this.props.gIntersectionLabel}
                                    gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                                    gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                                    gFunctionChoice={this.props.gFunctionChoice}
                                    hideFunctionChoice={true}

                                    gAreaConfiguration={this.props.gAreaConfiguration}
                                    gIsAreaDisplayed={this.props.gIsAreaDisplayed}

                                    gAreaAName={this.props.gAreaAName}
                                    gAreaBName={this.props.gAreaBName}
                                    gAreaCName={this.props.gAreaCName}

                                    showAUC={this.props.gType === 10}

                                    updateGraph={this.props.updateGraph}
                                />
                                <CommonGraphSettings
                                    gAssignmentType={this.props.gAssignmentType}
                                    gNeedsSubmit={this.props.gNeedsSubmit}
                                    gDisplayFeedback={this.props.gDisplayFeedback}
                                    gShowIntersection={this.props.gShowIntersection}
                                    gDisplayShadow={this.props.gDisplayShadow}
                                    gIsPublished={this.props.gIsPublished}
                                    gIsFeatured={this.props.gIsFeatured}
                                    gTopic={this.props.gTopic}
                                    updateGraph={this.props.updateGraph}
                                />
                            </div>
                        </div>
                        <hr/>
                        {editRow}
                    </form>
                </div>
            );
        } else if (this.props.gType === 1 || this.props.gType === 10) {
            // Non-Linear Demand Supply, possibly AUC (area under curve)
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
                               gType={this.props.gType}
                               gLine1Label={this.props.gLine1Label}
                               gLine2Label={this.props.gLine2Label}
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
                               gNName={this.props.gNName}
                               gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                               gCobbDouglasYName={this.props.gCobbDouglasYName}
                               gFunctionChoice={this.props.gFunctionChoice}

                               gAreaConfiguration={this.props.gAreaConfiguration}
                               gIsAreaDisplayed={this.props.gIsAreaDisplayed}
                               gAreaAName={this.props.gAreaAName}
                               gAreaBName={this.props.gAreaBName}
                               gAreaCName={this.props.gAreaCName}
                           />
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               updateGraph={this.props.updateGraph} />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;
            rightSide = <NonLinearDemandSupplyEditor
                            displayLabels={true}
                            displaySliders={true}
                            isInstructor={true}
                            gLine1Label={this.props.gLine1Label}
                            gLine2Label={this.props.gLine2Label}
                            gCobbDouglasA={this.props.gCobbDouglasA}
                            gCobbDouglasAName={this.props.gCobbDouglasAName}
                            gCobbDouglasK={this.props.gCobbDouglasK}
                            gCobbDouglasKName={this.props.gCobbDouglasKName}

                            gNName={this.props.gNName}

                            gLine1Slope={this.props.gLine1Slope}
                            gLine1OffsetX={this.props.gLine1OffsetX}
                            gLine1OffsetY={this.props.gLine1OffsetY}
                            gLine2OffsetX={this.props.gLine2OffsetX}
                            gLine2OffsetY={this.props.gLine2OffsetY}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                            gFunctionChoice={this.props.gFunctionChoice}

                            gAreaConfiguration={this.props.gAreaConfiguration}
                            gIsAreaDisplayed={this.props.gIsAreaDisplayed}

                            gAreaAName={this.props.gAreaAName}
                            gAreaBName={this.props.gAreaBName}
                            gAreaCName={this.props.gAreaCName}

                            showAUC={this.props.gType === 10}

                            updateGraph={this.props.updateGraph}
                        />;
        } else if (this.props.gType === 3 || this.props.gType === 12) {
            // Cobb-Douglas
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
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
                               gFunctionChoice={this.props.gFunctionChoice}
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
                               gNName={this.props.gNName}
                               gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                           />
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               updateGraph={this.props.updateGraph} />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;
            rightSide = <>
                            {this.props.gType === 3 && (
                                <CobbDouglasEditor
                                    gCobbDouglasA={this.props.gCobbDouglasA}
                                    gCobbDouglasAName={this.props.gCobbDouglasAName}
                                    gCobbDouglasL={this.props.gCobbDouglasL}
                                    gCobbDouglasLName={this.props.gCobbDouglasLName}
                                    gCobbDouglasK={this.props.gCobbDouglasK}
                                    gCobbDouglasKName={this.props.gCobbDouglasKName}
                                    gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                                    gCobbDouglasYName={this.props.gCobbDouglasYName}
                                    gIntersectionLabel={this.props.gIntersectionLabel}

                                    displayLabels={true}
                                    displaySliders={true}
                                    isInstructor={true}
                                    updateGraph={this.props.updateGraph}
                                />
                            )}
                            {this.props.gType === 12 && (
                                <CobbDouglasNLDSEditor
                                    displayLabels={true}
                                    displaySliders={true}
                                    isInstructor={true}
                                    gLine1Label={this.props.gLine1Label}
                                    gLine2Label={this.props.gLine2Label}
                                    gCobbDouglasA={this.props.gCobbDouglasA}
                                    gCobbDouglasAName={this.props.gCobbDouglasAName}
                                    gCobbDouglasK={this.props.gCobbDouglasK}
                                    gCobbDouglasKName={this.props.gCobbDouglasKName}
                                    gCobbDouglasL={this.props.gCobbDouglasL}
                                    gCobbDouglasLName={this.props.gCobbDouglasLName}
                                    gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                                    gCobbDouglasYName={this.props.gCobbDouglasYName}
                                    gNName={this.props.gNName}
                                    gLine1Slope={this.props.gLine1Slope}
                                    gLine1OffsetX={this.props.gLine1OffsetX}
                                    gLine1OffsetY={this.props.gLine1OffsetY}
                                    gLine2OffsetX={this.props.gLine2OffsetX}
                                    gLine2OffsetY={this.props.gLine2OffsetY}
                                    gIntersectionLabel={this.props.gIntersectionLabel}
                                    gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                                    gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                                    gFunctionChoice={this.props.gFunctionChoice}

                                    gAreaConfiguration={this.props.gAreaConfiguration}
                                    gIsAreaDisplayed={this.props.gIsAreaDisplayed}
                                    showAUC={false}

                                    updateGraph={this.props.updateGraph}
                                />
                            )}
                        </>;
        } else if (this.props.gType === 5 || this.props.gType === 15) {
            // Consumption Leisure: Contraint and Optimal Choice
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
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
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               gAssignmentType={this.props.gAssignmentType}
                               gNeedsSubmit={this.props.gNeedsSubmit}
                               gDisplayFeedback={this.props.gDisplayFeedback}
                               gShowIntersection={this.props.gShowIntersection}
                               gDisplayShadow={this.props.gDisplayShadow}
                               gIsPublished={this.props.gIsPublished}
                               gIsFeatured={this.props.gIsFeatured}
                               updateGraph={this.props.updateGraph} />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;
            rightSide = <ConsumptionLeisureEditor
                            gA1={this.props.gA1}
                            gA2={this.props.gA2}
                            gLine1Label={this.props.gLine1Label}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gXAxisLabel={this.props.gXAxisLabel}
                            gYAxisLabel={this.props.gYAxisLabel}

                            displayLabels={true}
                            displaySliders={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                        />;
        } else if (this.props.gType === 7 || this.props.gType === 11) {
            // Consumption Savings
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
                               gType={this.props.gType}
                               gA1={this.props.gA1}
                               gA2={this.props.gA2}
                               gA3={this.props.gA3}
                               gA4={this.props.gA4}
                               gA5={this.props.gA5}
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
                               gIntersection2Label={this.props.gIntersection2Label}
                               gIntersection2HorizLineLabel={this.props.gIntersection2HorizLineLabel}
                               gIntersection2VertLineLabel={this.props.gIntersection2VertLineLabel}
                               gIntersection3HorizLineLabel={this.props.gIntersection3HorizLineLabel}
                               gIntersection3VertLineLabel={this.props.gIntersection3VertLineLabel}
                               gShowIntersection={this.props.gShowIntersection}
                           />
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               updateGraph={this.props.updateGraph} />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;
            rightSide = <ConsumptionSavingEditor
                            gType={this.props.gType}
                            gA1={this.props.gA1}
                            gA2={this.props.gA2}
                            gA3={this.props.gA3}
                            gA4={this.props.gA4}
                            gA5={this.props.gA5}
                            gLine1Label={this.props.gLine1Label}
                            gLine2Label={this.props.gLine2Label}
                            gShowIntersection={this.props.gShowIntersection}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gIntersection2Label={this.props.gIntersection2Label}
                            gIntersection2HorizLineLabel={this.props.gIntersection2HorizLineLabel}
                            gIntersection2VertLineLabel={this.props.gIntersection2VertLineLabel}
                            gIntersection3HorizLineLabel={this.props.gIntersection3HorizLineLabel}
                            gIntersection3VertLineLabel={this.props.gIntersection3VertLineLabel}

                            displayLabels={true}
                            displaySliders={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                        />;
        } else if (this.props.gType === 8) {
            // Aggregate Demand - Aggregate Supply
            leftSide = <>
                           <JXGBoard
                               id={'editing-graph'}
                               width={BOARD_WIDTH}
                               height={BOARD_HEIGHT}
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
                           <CommonGraphEditor
                               gTitle={this.props.gTitle}
                               gSummary={this.props.gSummary}
                               gInstructorNotes={this.props.gInstructorNotes}
                               gInstructions={this.props.gInstructions}
                               updateGraph={this.props.updateGraph} />
                           {this.props.gId &&
                            <div className="form-group">
                                <a href={`/course/${courseId}/graph/` + this.props.gId + "/public/"}
                                   title="Student View"
                                   className="btn btn-secondary">Student View</a>
                            </div>
                           }
                       </>;
            rightSide = <ADASEditor
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

                            displayLabels={true}
                            displaySliders={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}
                        />;
        }

        return (
            <div className="GraphEditor">
                {this.title()}
                <form>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="sticky-top">
                                <h2>Scenario</h2>
                                <div className="form-group">
                                    <label htmlFor="gTitle">
                                        Title
                                    </label>
                                    <input id="gTitle"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={this.props.gTitle}
                                           className="form-control form-control-sm"
                                           type="text"
                                           maxLength="140"
                                    />
                                </div>
                                {leftSide}
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <CommonGraphSettings
                                gAssignmentType={this.props.gAssignmentType}
                                gNeedsSubmit={this.props.gNeedsSubmit}
                                gDisplayFeedback={this.props.gDisplayFeedback}
                                gShowIntersection={this.props.gShowIntersection}
                                gDisplayShadow={this.props.gDisplayShadow}
                                gIsPublished={this.props.gIsPublished}
                                gIsFeatured={this.props.gIsFeatured}
                                gTopic={this.props.gTopic}
                                updateGraph={this.props.updateGraph}
                            />
                            {rightSide}
                        </div>
                    </div>
                    <hr/>
                    {editRow}
                </form>
            </div>
        );
    }
    handleSaveGraph() {
        this.props.saveGraph();
    }
    handleSaveAndViewGraph() {
        this.props.saveAndViewGraph();
    }
}

GraphEditor.propTypes = {
    gId: PropTypes.number,
    gTitle: PropTypes.string,
    gSummary: PropTypes.string,
    gInstructions: PropTypes.string,
    gTopic: PropTypes.number,

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
    gIsFeatured: PropTypes.bool.isRequired,
    gDisplayFeedback: PropTypes.bool.isRequired,
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
    gCobbDouglasYName: PropTypes.string,

    gNName: PropTypes.string,

    gFunctionChoice: PropTypes.number,

    gAreaConfiguration: PropTypes.number,
    gIsAreaDisplayed: PropTypes.bool,

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    saveAndViewGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
};
