import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import commonmark from 'commonmark';
import ADASEditor from './editors/ADASEditor';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import DemandSupplyEditor from './editors/DemandSupplyEditor';
import NonLinearDemandSupplyEditor from './editors/NonLinearDemandSupplyEditor';
import ExportGraphButton from './ExportGraphButton';
import ResetGraphButton from './ResetGraphButton';
import JXGBoard from './JXGBoard';
import Feedback from './Feedback';
import {authedFetch, getOrCreateSubmission} from './utils';

/**
 * This component is used to view an econgraph object.
 */
export default class GraphViewer extends React.Component {
    render() {
        let action = '';
        if (window.EconPlayground && window.EconPlayground.LTIPostGrade) {
            action = window.EconPlayground.LTIPostGrade;
        }

        let successUrl = '/';
        if (window.EconPlayground && window.EconPlayground.EmbedSuccess) {
            successUrl = window.EconPlayground.EmbedSuccess;
        }

        let launchUrl = '';
        if (window.EconPlayground && window.EconPlayground.EmbedLaunchUrl) {
            launchUrl = window.EconPlayground.EmbedLaunchUrl;
        }

        let isInstructor = false;
        if (window.EconPlayground && window.EconPlayground.isInstructor) {
            isInstructor = window.EconPlayground.isInstructor;
        }

        const displayLabels = isInstructor ||
              this.props.gAssignmentType === 0 ||
              this.props.gAssignmentType === 1;

        const displaySliders = isInstructor ||
              this.props.gAssignmentType === 0 ||
              this.props.gAssignmentType === 2;

        const token = Cookies.get('csrftoken');

        let initialState = {};

        let key = '';
        for (key in this.props) {
            if (key.endsWith('Initial')) {
                initialState[key.replace(/Initial$/, '')] = this.props[key];
            }
        }

        let titleEl = <h5></h5>;
        let descriptionEl = <p></p>;

        if (!window.EconPlayground.hideTitleAndDescription) {
            titleEl = <h5>{this.props.gTitle}</h5>;
        }

        if (!window.EconPlayground.hideTitleAndDescription && this.props.gDescription) {
            const reader = new commonmark.Parser();
            const writer = new commonmark.HtmlRenderer();
            const parsed = reader.parse(this.props.gDescription);
            const description = writer.render(parsed);

            descriptionEl = <p dangerouslySetInnerHTML={{__html:description}}></p>;
        }

        if (this.props.gType === 0) {
            // Demand-Supply
            return (
                <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                    <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                        <input type="hidden" name="score" value={this.props.value} />
                        <input type="hidden" name="next" value={successUrl} />
                        <input type="hidden" name="launchUrl" value={launchUrl} />
                        <JXGBoard
                            id={'editing-graph'}
                            width={562.5}
                            height={300}
                            submission={this.props.submission}
                            shadow={!isInstructor}

                            gType={this.props.gType}
                            gLine1Label={this.props.gLine1Label}
                            gLine2Label={this.props.gLine2Label}
                            gXAxisLabel={this.props.gCobbDouglasLName}
                            gYAxisLabel={this.props.gCobbDouglasYName}
                            gLine1Slope={this.props.gLine1Slope}
                            gLine1SlopeInitial={this.props.gLine1SlopeInitial}
                            gLine2Slope={this.props.gLine2Slope}
                            gLine2SlopeInitial={this.props.gLine2SlopeInitial}
                            gLine1OffsetX={this.props.gLine1OffsetX}
                            gLine1OffsetXInitial={this.props.gLine1OffsetXInitial}
                            gLine1OffsetY={this.props.gLine1OffsetY}
                            gLine1OffsetYInitial={this.props.gLine1OffsetYInitial}
                            gLine2OffsetX={this.props.gLine2OffsetX}
                            gLine2OffsetXInitial={this.props.gLine2OffsetXInitial}
                            gLine2OffsetY={this.props.gLine2OffsetY}
                            gLine2OffsetYInitial={this.props.gLine2OffsetYInitial}
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gShowIntersection={this.props.gShowIntersection}
                            gDisplayShadow={this.props.gDisplayShadow}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gCobbDouglasA={this.props.gCobbDouglasA}
                            gCobbDouglasAInitial={this.props.gCobbDouglasAInitial}
                            gCobbDouglasAName={this.props.gCobbDouglasAName}
                            gCobbDouglasL={this.props.gCobbDouglasL}
                            gCobbDouglasLInitial={this.props.gCobbDouglasLInitial}
                            gCobbDouglasLName={this.props.gCobbDouglasLName}
                            gCobbDouglasK={this.props.gCobbDouglasK}
                            gCobbDouglasKInitial={this.props.gCobbDouglasKInitial}
                            gCobbDouglasKName={this.props.gCobbDouglasKName}
                            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                            gCobbDouglasAlphaInitial={this.props.gCobbDouglasAlphaInitial}
                            gCobbDouglasYName={this.props.gCobbDouglasYName}
                            />

                        <DemandSupplyEditor
                            isInstructor={isInstructor}
                            displayLabels={displayLabels}
                            displaySliders={displaySliders}
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

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

                        <ExportGraphButton />

                        <hr style={{
                                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }} />

                        <button className="btn btn-primary btn-sm"
                                disabled={!this.props.choice}
                                style={{
                                    marginTop: '1em',
                                    display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                                }}
                                type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.props.gType === 1) {
            return (
                <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                    <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                        <input type="hidden" name="score" value={this.props.value} />
                        <input type="hidden" name="next" value={successUrl} />
                        <input type="hidden" name="launchUrl" value={launchUrl} />
                        <JXGBoard
                            id={'editing-graph'}
                            width={562.5}
                            height={300}
                            submission={this.props.submission}
                            shadow={!isInstructor}

                            gType={this.props.gType}
                            gLine1Label={this.props.gLine1Label}
                            gLine2Label={this.props.gLine2Label}
                            gXAxisLabel={this.props.gCobbDouglasLName}
                            gYAxisLabel={this.props.gCobbDouglasYName}
                            gLine1Slope={this.props.gLine1Slope}
                            gLine1SlopeInitial={this.props.gLine1SlopeInitial}
                            gLine2Slope={this.props.gLine2Slope}
                            gLine2SlopeInitial={this.props.gLine2SlopeInitial}
                            gLine1OffsetX={this.props.gLine1OffsetX}
                            gLine1OffsetXInitial={this.props.gLine1OffsetXInitial}
                            gLine1OffsetY={this.props.gLine1OffsetY}
                            gLine1OffsetYInitial={this.props.gLine1OffsetYInitial}
                            gLine2OffsetX={this.props.gLine2OffsetX}
                            gLine2OffsetXInitial={this.props.gLine2OffsetXInitial}
                            gLine2OffsetY={this.props.gLine2OffsetY}
                            gLine2OffsetYInitial={this.props.gLine2OffsetYInitial}
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gShowIntersection={this.props.gShowIntersection}
                            gDisplayShadow={this.props.gDisplayShadow}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gCobbDouglasA={this.props.gCobbDouglasA}
                            gCobbDouglasAInitial={this.props.gCobbDouglasAInitial}
                            gCobbDouglasAName={this.props.gCobbDouglasAName}
                            gCobbDouglasL={this.props.gCobbDouglasL}
                            gCobbDouglasLInitial={this.props.gCobbDouglasLInitial}
                            gCobbDouglasLName={this.props.gCobbDouglasLName}
                            gCobbDouglasK={this.props.gCobbDouglasK}
                            gCobbDouglasKInitial={this.props.gCobbDouglasKInitial}
                            gCobbDouglasKName={this.props.gCobbDouglasKName}
                            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                            gCobbDouglasAlphaInitial={this.props.gCobbDouglasAlphaInitial}
                            gCobbDouglasYName={this.props.gCobbDouglasYName}
                            />

                        <NonLinearDemandSupplyEditor
                            isInstructor={isInstructor}
                            displayLabels={displayLabels}
                            displaySliders={displaySliders}
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

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

                        <ExportGraphButton />

                        <hr style={{
                                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }} />

                        <button className="btn btn-primary btn-sm"
                                disabled={!this.props.choice}
                                style={{
                                    marginTop: '1em',
                                    display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                                }}
                                type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.props.gType === 3) {
            return (
                <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                    <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                        <input type="hidden" name="score" value={this.props.value} />
                        <input type="hidden" name="next" value={successUrl} />
                        <input type="hidden" name="launchUrl" value={launchUrl} />
                        <JXGBoard
                            id={'editing-graph'}
                            width={562.5}
                            height={300}
                            submission={this.props.submission}
                            shadow={!isInstructor}

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
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gShowIntersection={this.props.gShowIntersection}
                            gDisplayShadow={this.props.gDisplayShadow}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gCobbDouglasA={this.props.gCobbDouglasA}
                            gCobbDouglasAInitial={this.props.gCobbDouglasAInitial}
                            gCobbDouglasAName={this.props.gCobbDouglasAName}
                            gCobbDouglasL={this.props.gCobbDouglasL}
                            gCobbDouglasLInitial={this.props.gCobbDouglasLInitial}
                            gCobbDouglasLName={this.props.gCobbDouglasLName}
                            gCobbDouglasK={this.props.gCobbDouglasK}
                            gCobbDouglasKInitial={this.props.gCobbDouglasKInitial}
                            gCobbDouglasKName={this.props.gCobbDouglasKName}
                            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                            gCobbDouglasAlphaInitial={this.props.gCobbDouglasAlphaInitial}
                            gCobbDouglasYName={this.props.gCobbDouglasYName}
                            />

                        <Feedback
                            choice={this.props.choice}
                            submission={this.props.submission}
                            isSubmitted={!!this.props.submission}
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gDisplayFeedback={this.props.gDisplayFeedback}
                            gLine1FeedbackIncrease={this.props.gLine1FeedbackIncrease}
                            gLine1FeedbackDecrease={this.props.gLine1FeedbackDecrease}
                            gLine2FeedbackIncrease={this.props.gLine2FeedbackIncrease}
                            gLine2FeedbackDecrease={this.props.gLine2FeedbackDecrease} />

                        <CobbDouglasEditor
                            isInstructor={isInstructor}
                            displayLabels={displayLabels}
                            displaySliders={displaySliders}
                            gCobbDouglasA={this.props.gCobbDouglasA}
                            gCobbDouglasAName={this.props.gCobbDouglasAName}
                            gCobbDouglasL={this.props.gCobbDouglasL}
                            gCobbDouglasLName={this.props.gCobbDouglasLName}
                            gCobbDouglasK={this.props.gCobbDouglasK}
                            gCobbDouglasKName={this.props.gCobbDouglasKName}
                            gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                            gCobbDouglasYName={this.props.gCobbDouglasYName}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

                        <ExportGraphButton />

                        <hr style={{
                                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }} />

                        <button className="btn btn-primary btn-sm"
                                disabled={!this.props.choice}
                                style={{
                                    marginTop: '1em',
                                    display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                                }}
                                type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.props.gType === 5) {

            return (
                <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                    <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                        <input type="hidden" name="score" value={this.props.value} />
                        <input type="hidden" name="next" value={successUrl} />
                        <input type="hidden" name="launchUrl" value={launchUrl} />
                        <JXGBoard
                            id={'editing-graph'}
                            width={562.5}
                            height={300}
                            submission={this.props.submission}
                            shadow={!isInstructor}

                            gType={this.props.gType}
                            gA1={this.props.gA1}
                            gA1Initial={this.props.gA1Initial}
                            gA2={this.props.gA2}
                            gA2Initial={this.props.gA2Initial}
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
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gShowIntersection={this.props.gShowIntersection}
                            gDisplayShadow={this.props.gDisplayShadow}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                            />


                        <ConsumptionLeisureEditor
                            isInstructor={isInstructor}
                            displayLabels={displayLabels}
                            displaySliders={displaySliders}
                            gA1={this.props.gA1}
                            gA2={this.props.gA2}
                            gLine1Label={this.props.gLine1Label}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            gXAxisLabel={this.props.gXAxisLabel}
                            gYAxisLabel={this.props.gYAxisLabel}

                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

                        <ExportGraphButton />

                        <hr style={{
                                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }} />

                        <button className="btn btn-primary btn-sm"
                                disabled={!this.props.choice}
                                style={{
                                    marginTop: '1em',
                                    display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                                }}
                                type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.props.gType === 7) {
            // Consumption-Saving
            return (
                <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                    <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                        <input type="hidden" name="score" value={this.props.value} />
                        <input type="hidden" name="next" value={successUrl} />
                        <input type="hidden" name="launchUrl" value={launchUrl} />
                        <JXGBoard
                            id={'editing-graph'}
                            width={562.5}
                            height={300}
                            submission={this.props.submission}
                            shadow={!isInstructor}

                            gType={this.props.gType}
                            gA1={this.props.gA1}
                            gA1Initial={this.props.gA1Initial}
                            gA2={this.props.gA2}
                            gA2Initial={this.props.gA2Initial}
                            gA3={this.props.gA3}
                            gA3Initial={this.props.gA3Initial}
                            gA4={this.props.gA4}
                            gA4Initial={this.props.gA4Initial}
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
                            gNeedsSubmit={this.props.gNeedsSubmit}
                            gShowIntersection={this.props.gShowIntersection}
                            gDisplayShadow={this.props.gDisplayShadow}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}
                            />


                        <ConsumptionSavingEditor
                            isInstructor={isInstructor}
                            displayLabels={displayLabels}
                            displaySliders={displaySliders}
                            gA1={this.props.gA1}
                            gA2={this.props.gA2}
                            gA3={this.props.gA3}
                            gA4={this.props.gA4}
                            gLine1Label={this.props.gLine1Label}
                            gShowIntersection={this.props.gShowIntersection}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                            gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

                        <ExportGraphButton />

                        <hr style={{
                                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }} />

                        <button className="btn btn-primary btn-sm"
                                disabled={!this.props.choice}
                                style={{
                                    marginTop: '1em',
                                    display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                                }}
                                type="submit">Submit</button>
                    </form>
                </div>
            );
        } else if (this.props.gType === 8) {
            // Aggregate Demand - Aggregate Supply
            return <div className="GraphViewer">
                    {titleEl}
                    {descriptionEl}
                <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                <input type="hidden" name="score" value={this.props.value} />
                <input type="hidden" name="next" value={successUrl} />
                <input type="hidden" name="launchUrl" value={launchUrl} />
                <JXGBoard
            id={'editing-graph'}
            shadow={!isInstructor}
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
            gLine1SlopeInitial={this.props.gLine1SlopeInitial}
            gLine2Slope={this.props.gLine2Slope}
            gLine2SlopeInitial={this.props.gLine2SlopeInitial}
            gLine3Slope={this.props.gLine3Slope}
            gLine3SlopeInitial={this.props.gLine3SlopeInitial}
            gLine1OffsetX={this.props.gLine1OffsetX}
            gLine1OffsetY={this.props.gLine1OffsetY}
            gLine1OffsetXInitial={this.props.gLine1OffsetXInitial}
            gLine1OffsetYInitial={this.props.gLine1OffsetYInitial}
            gLine2OffsetX={this.props.gLine2OffsetX}
            gLine2OffsetY={this.props.gLine2OffsetY}
            gLine2OffsetXInitial={this.props.gLine2OffsetXInitial}
            gLine2OffsetYInitial={this.props.gLine2OffsetYInitial}
            gLine3OffsetX={this.props.gLine3OffsetX}
            gLine3OffsetY={this.props.gLine3OffsetY}
            gLine3OffsetXInitial={this.props.gLine3OffsetXInitial}
            gLine3OffsetYInitial={this.props.gLine3OffsetYInitial}
            gDisplayIntersection1={this.props.gDisplayIntersection1}
            gDisplayIntersection1Initial={this.props.gDisplayIntersection1Initial}
            gIntersectionLabel={this.props.gIntersectionLabel}
            gDisplayIntersection2={this.props.gDisplayIntersection2}
            gDisplayIntersection2Initial={this.props.gDisplayIntersection2Initial}
            gIntersection2Label={this.props.gIntersection2Label}
            gDisplayIntersection3={this.props.gDisplayIntersection3}
            gDisplayIntersection3Initial={this.props.gDisplayIntersection3Initial}
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
            gLine3Slope={this.props.gLine3Slope}
            gLine3Label={this.props.gLine3Label}
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

            displayLabels={displayLabels}
            displaySliders={displaySliders}
            isInstructor={isInstructor}
            updateGraph={this.props.updateGraph}
                />

                <ResetGraphButton
            initialState={initialState}
            updateGraph={this.props.updateGraph} />

                <ExportGraphButton />

                <button className="btn btn-primary btn-sm"
            disabled={!this.props.choice}
            style={{
                marginTop: '1em',
                display: (!isInstructor && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
            }}
            type="submit">Submit</button>
                </form>
                </div>;
        } else {
            return <div>Unknown graph type: {this.props.gType}</div>;
        }
    }
    createSubmission(data) {
        const me = this;
        return authedFetch('/api/submissions/', 'post', JSON.stringify(data))
            .then(function(response) {
                if (response.status === 201) {
                    me.setState({
                        alertText: response.statusText
                    });
                    window.scrollTo(0, 0);
                } else {
                    me.setState({
                        alertText: response.statusText
                    });
                    window.scrollTo(0, 0);
                    throw 'Submission not created';
                }
            });
    }
    handleSubmit(event) {
        // Make the Submission obj in Django, then submit to Canvas
        // with LTI.
        event.preventDefault();
        const form = event.target;
        getOrCreateSubmission({
            graph: this.props.gId,
            choice: this.props.choice,
            score: this.props.value
        }).then(function() {
            form.submit();
        });
    }
}

GraphViewer.propTypes = {
    gId: PropTypes.number,
    gTitle: PropTypes.string,
    gDescription: PropTypes.string,
    gNeedsSubmit: PropTypes.bool,
    gAssignmentType: PropTypes.number.isRequired,

    gShowIntersection: PropTypes.bool.isRequired,
    gDisplayIntersection1: PropTypes.bool.isRequired,
    gDisplayIntersection1Initial: PropTypes.bool.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gDisplayIntersection2: PropTypes.bool.isRequired,
    gDisplayIntersection2Initial: PropTypes.bool.isRequired,
    gIntersection2Label: PropTypes.string.isRequired,
    gDisplayIntersection3: PropTypes.bool.isRequired,
    gDisplayIntersection3Initial: PropTypes.bool.isRequired,
    gIntersection3Label: PropTypes.string.isRequired,
    gDisplayShadow: PropTypes.bool.isRequired,

    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersection2HorizLineLabel: PropTypes.string,
    gIntersection2VertLineLabel: PropTypes.string,
    gIntersection3HorizLineLabel: PropTypes.string,
    gIntersection3VertLineLabel: PropTypes.string,

    gDisplayFeedback: PropTypes.bool,

    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine3Label: PropTypes.string.isRequired,

    gXAxisLabel: PropTypes.string,
    gYAxisLabel: PropTypes.string,
    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeInitial: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gLine2SlopeInitial: PropTypes.number,
    gLine3Slope: PropTypes.number,
    gLine3SlopeInitial: PropTypes.number,

    gLine1OffsetX: PropTypes.number.isRequired,
    gLine1OffsetY: PropTypes.number.isRequired,
    gLine1OffsetXInitial: PropTypes.number,
    gLine1OffsetYInitial: PropTypes.number,
    gLine2OffsetX: PropTypes.number.isRequired,
    gLine2OffsetY: PropTypes.number.isRequired,
    gLine2OffsetXInitial: PropTypes.number,
    gLine2OffsetYInitial: PropTypes.number,
    gLine3OffsetX: PropTypes.number.isRequired,
    gLine3OffsetY: PropTypes.number.isRequired,
    gLine3OffsetXInitial: PropTypes.number,
    gLine3OffsetYInitial: PropTypes.number,

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
    gType: PropTypes.number,

    gAlpha: PropTypes.number,

    gA1: PropTypes.number,
    gA1Initial: PropTypes.number,
    gA2: PropTypes.number,
    gA2Initial: PropTypes.number,
    gA3: PropTypes.number,
    gA3Initial: PropTypes.number,
    gA4: PropTypes.number,
    gA4Initial: PropTypes.number,

    gA: PropTypes.number,
    gK: PropTypes.number,
    gR: PropTypes.number,
    gY1: PropTypes.number,
    gY2: PropTypes.number,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAInitial: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLInitial: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKInitial: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaInitial: PropTypes.number,
    gCobbDouglasYName: PropTypes.string,

    submission: PropTypes.object,
    updateGraph: PropTypes.func.isRequired,
    choice: PropTypes.number,
    value: PropTypes.string
};
