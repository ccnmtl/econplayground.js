import React from 'react';
import PropTypes from 'prop-types';
import ADASEditor from './editors/ADASEditor';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import NonLinearDemandSupplyEditor from './editors/NonLinearDemandSupplyEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import DemandSupplyEditor from './editors/DemandSupplyEditor';
import CommonGraphEditor from './editors/CommonGraphEditor';
import CommonGraphSettings from './editors/CommonGraphSettings';
import JXGBoard from './JXGBoard';
import {displayGraphType} from './utils';

export default class GraphEditor extends React.Component {
    title() {
        return <h2>{displayGraphType(this.props.gType)}</h2>;
    }
    render() {
        if (!this.props.showing) {
            return null;
        }
        if (this.props.gType === 0) {
            // Demand-Supply
            return (
                <div className="GraphEditor">
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
                                <CommonGraphEditor
                                    gTitle={this.props.gTitle}
                                    gInstructorNotes={this.props.gInstructorNotes}
                                    gDescription={this.props.gDescription}
                                    updateGraph={this.props.updateGraph}
                                    />
                                {this.props.gId &&
                                    <div className="form-group">
                                            <a href={"/graph/" + this.props.gId + "/public/"}
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
                                    updateGraph={this.props.updateGraph}
                                />

                        </div>
                    </div>
                    <hr/>
                    <button type="button"
                        className="btn btn-primary btn-sm"
                        onClick={this.handleSaveGraph.bind(this)}>Save</button>
                    {this.props.gId &&
                            <a role="button"
                                className="btn btn-danger btn-sm float-md-right"
                                href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                        </form>
                    </div>
            );
        } else if (this.props.gType === 1) {
            // Non-Linear Demand Supply
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
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <CommonGraphSettings
                                gAssignmentType={this.props.gAssignmentType}
                                gNeedsSubmit={this.props.gNeedsSubmit}
                                gDisplayFeedback={this.props.gDisplayFeedback}
                                gShowIntersection={this.props.gShowIntersection}
                                gDisplayShadow={this.props.gDisplayShadow}
                                gIsPublished={this.props.gIsPublished}
                                updateGraph={this.props.updateGraph}
                            />
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

                    </div>
                </div>
                <hr/>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.handleSaveGraph.bind(this)}>Save</button>
                {this.props.gId &&
                        <a role="button"
                            className="btn btn-danger btn-sm float-md-right"
                            href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                    </form>
                </div>;
        } else if (this.props.gType === 3) {
            // Cobb-Douglas
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
                            <CommonGraphEditor
                                gTitle={this.props.gTitle}
                                gInstructorNotes={this.props.gInstructorNotes}
                                gDescription={this.props.gDescription}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <CommonGraphSettings
                                gAssignmentType={this.props.gAssignmentType}
                                gNeedsSubmit={this.props.gNeedsSubmit}
                                gDisplayFeedback={this.props.gDisplayFeedback}
                                gShowIntersection={this.props.gShowIntersection}
                                gDisplayShadow={this.props.gDisplayShadow}
                                gIsPublished={this.props.gIsPublished}
                                updateGraph={this.props.updateGraph}
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
                                gIntersectionLabel={this.props.gIntersectionLabel}

                                gCorrectFeedback={this.props.gCorrectFeedback}
                                gIncorrectFeedback={this.props.gIncorrectFeedback}

                                displayLabels={true}
                                displaySliders={true}
                                isInstructor={true}
                                updateGraph={this.props.updateGraph}
                            />

                    </div>
                </div>
            </form>
            <hr/>
            <button type="button"
                className="btn btn-primary btn-sm"
                onClick={this.handleSaveGraph.bind(this)}>Save</button>
            {this.props.gId &&
                    <a role="button"
                        className="btn btn-danger btn-sm float-md-right"
                        href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                </div>;
        } else if (this.props.gType === 5) {
            // Consumption Leisure
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

                    </div>
                </div>
                <hr/>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.handleSaveGraph.bind(this)}>Save</button>
                {this.props.gId &&
                        <a role="button"
                            className="btn btn-danger btn-sm float-md-right"
                            href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                    </form>
                </div>;
        } else if (this.props.gType === 7) {
            // Consumption Savings
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
                            <CommonGraphEditor
                                gTitle={this.props.gTitle}
                                gInstructorNotes={this.props.gInstructorNotes}
                                gDescription={this.props.gDescription}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <CommonGraphSettings
                                gAssignmentType={this.props.gAssignmentType}
                                gNeedsSubmit={this.props.gNeedsSubmit}
                                gDisplayFeedback={this.props.gDisplayFeedback}
                                gShowIntersection={this.props.gShowIntersection}
                                gDisplayShadow={this.props.gDisplayShadow}
                                gIsPublished={this.props.gIsPublished}
                                updateGraph={this.props.updateGraph}
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
                        </div>
                    </div>
                    <hr/>
                    <button type="button"
                        className="btn btn-primary btn-sm"
                        onClick={this.handleSaveGraph.bind(this)}>Save</button>
                    {this.props.gId &&
                            <a role="button"
                                className="btn btn-danger btn-sm float-md-right"
                                href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                        </form>
                    </div>;
        } else if (this.props.gType === 8) {
            // Aggregate Demand - Aggregate Supply
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
                                gInstructorNotes={this.props.gInstructorNotes}
                                gDescription={this.props.gDescription}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <CommonGraphSettings
                                gAssignmentType={this.props.gAssignmentType}
                                gNeedsSubmit={this.props.gNeedsSubmit}
                                gDisplayFeedback={this.props.gDisplayFeedback}
                                gShowIntersection={this.props.gShowIntersection}
                                gDisplayShadow={this.props.gDisplayShadow}
                                gIsPublished={this.props.gIsPublished}
                                updateGraph={this.props.updateGraph}
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

                    </div>
                </div>
                <hr/>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.handleSaveGraph.bind(this)}>Save</button>
                {this.props.gId &&
                        <a role="button"
                            className="btn btn-danger btn-sm float-md-right"
                            href={"/graph/" + this.props.gId + "/delete/"}>Delete Graph</a>}
                    </form>
                </div>;
        } else {
            return <div>Unknown graph type: {this.props.gType}</div>;
        }
    }
    handleSaveGraph() {
        this.props.saveGraph();
    }
}

GraphEditor.propTypes = {
    gId: PropTypes.number,
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

    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
};
