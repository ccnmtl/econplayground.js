import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import commonmark from 'commonmark';
import CobbDouglasEditor from './editors/CobbDouglasEditor';
import ConsumptionLeisureEditor from './editors/ConsumptionLeisureEditor';
import ConsumptionSavingEditor from './editors/ConsumptionSavingEditor';
import ResetGraphButton from './ResetGraphButton';
import JXGBoard from './JXGBoard';
import Feedback from './Feedback';
import RangeEditor from './RangeEditor';
import {
    authedFetch, getOrCreateSubmission, handleFormUpdate
} from './utils';

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

        const token = Cookies.get('csrftoken');

        const initialState = {
            gCobbDouglasA: this.props.gCobbDouglasAInitial,
            gCobbDouglasL: this.props.gCobbDouglasLInitial,
            gCobbDouglasK: this.props.gCobbDouglasKInitial,
            gCobbDouglasAlpha: this.props.gCobbDouglasAlphaInitial,
            gA1: this.props.gA1Initial,
            gA2: this.props.gA2Initial,
            gA3: this.props.gA3Initial,
            gA4: this.props.gA4Initial,
            gLine1OffsetX: this.props.gLine1OffsetXInitial,
            gLine1OffsetY: this.props.gLine1OffsetYInitial,
            gLine2OffsetX: this.props.gLine2OffsetXInitial,
            gLine2OffsetY: this.props.gLine2OffsetYInitial,
            gLine1Slope: this.props.gLine1SlopeInitial,
            gLine2Slope: this.props.gLine2SlopeInitial
        };

        let titleEl = null;
        let descriptionEl = null;

        if (!window.EconPlayground.hideTitleAndDescription && this.props.gDescription) {
            const reader = new commonmark.Parser();
            const writer = new commonmark.HtmlRenderer();
            const parsed = reader.parse(this.props.gDescription);
            const description = writer.render(parsed);

            titleEl = <h5>{this.props.gTitle}</h5>;
            descriptionEl = <p dangerouslySetInnerHTML={{__html:description}}></p>;
        }

        if (this.props.gType === 3) {
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
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

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
                            gA1={this.props.gA1}
                            gA1Editable={this.props.gA1Editable}
                            gA2={this.props.gA2}
                            gA2Editable={this.props.gA2Editable}
                            gLine1Label={this.props.gLine1Label}
                            gLine1LabelEditable={this.props.gLine1LabelEditable}
                            gIntersectionLabel={this.props.gIntersectionLabel}
                            gIntersectionLabelEditable={this.props.gIntersectionLabelEditable}

                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

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

                            updateGraph={this.props.updateGraph}
                            />

                        <ResetGraphButton
                            initialState={initialState}
                            updateGraph={this.props.updateGraph} />

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
        }

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
                        gXAxisLabel={this.props.gXAxisLabel}
                        gYAxisLabel={this.props.gYAxisLabel}
                        gLine1Slope={this.props.gLine1Slope}
                        gLine2Slope={this.props.gLine2Slope}
                        gLine1SlopeInitial={this.props.gLine1SlopeInitial}
                        gLine2SlopeInitial={this.props.gLine2SlopeInitial}
                        gLine1OffsetX={this.props.gLine1OffsetX}
                        gLine1OffsetY={this.props.gLine1OffsetY}
                        gLine1OffsetXInitial={this.props.gLine1OffsetXInitial}
                        gLine1OffsetYInitial={this.props.gLine1OffsetYInitial}
                        gLine2OffsetX={this.props.gLine2OffsetX}
                        gLine2OffsetY={this.props.gLine2OffsetY}
                        gLine2OffsetXInitial={this.props.gLine2OffsetXInitial}
                        gLine2OffsetYInitial={this.props.gLine2OffsetYInitial}
                        gNeedsSubmit={this.props.gNeedsSubmit}
                        gShowIntersection={this.props.gShowIntersection}
                        gDisplayShadow={this.props.gDisplayShadow}
                        gIntersectionLabel={this.props.gIntersectionLabel}
                        gIntersectionHorizLineLabel={this.props.gIntersectionHorizLineLabel}
                        gIntersectionVertLineLabel={this.props.gIntersectionVertLineLabel}

                        gAlpha={this.props.gAlpha}

                        gA1={this.props.gA1}
                        gA1Editable={this.props.gA1Editable}
                        gA2={this.props.gA2}
                        gA2Editable={this.props.gA2Editable}

                        gA={this.props.gA}
                        gK={this.props.gK}
                        gR={this.props.gR}
                        gY1={this.props.gY1}
                        gY2={this.props.gY2}

                        gCobbDouglasA={this.props.gCobbDouglasA}
                        gCobbDouglasAInitial={this.props.gCobbDouglasAInitial}
                        gCobbDouglasL={this.props.gCobbDouglasL}
                        gCobbDouglasLInitial={this.props.gCobbDouglasLInitial}
                        gCobbDouglasK={this.props.gCobbDouglasK}
                        gCobbDouglasKInitial={this.props.gCobbDouglasKInitial}
                        gCobbDouglasAlpha={this.props.gCobbDouglasAlpha}
                        gCobbDouglasAlphaInitial={this.props.gCobbDouglasAlphaInitial}
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

                    <div className={'form-row ' + (this.props.gType !== 3 ? '' : 'd-none')}>
                        <div className={"col " + (this.props.gLine1SlopeEditable ? '' : 'd-none')}>
                            <label htmlFor="gLine1Slope">
                                Orange line slope
                            </label>
                            <RangeEditor
                                dataId="gLine1Slope"
                                value={this.props.gLine1Slope}
                                min={0}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                        </div>

                        <div className={"col " + (this.props.gLine2SlopeEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Blue line slope
                                </label>
                                <RangeEditor
                                    dataId="gLine2Slope"
                                    value={this.props.gLine2Slope}
                                    min={-5}
                                    max={0}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={"col " + (this.props.gLine1LabelEditable ? '' : 'd-none')}>
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
                        <div className={"col " + (this.props.gLine2LabelEditable ? '' : 'd-none')}>
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
                    </div>

                    <div className="row">
                        <div className={"col " + (this.props.gXAxisLabelEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gXAxisLabel">
                                    X-axis label:
                                </label>
                                <input id="gXAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       maxLength="60"
                                       value={this.props.gXAxisLabel}
                                       onChange={handleFormUpdate.bind(this)}
                                       />
                            </div>
                        </div>

                        <div className={"col " + (this.props.gYAxisLabelEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gYAxisLabel">
                                    Y-axis label:
                                </label>
                                <input id="gYAxisLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       maxLength="60"
                                       value={this.props.gYAxisLabel}
                                       onChange={handleFormUpdate.bind(this)}
                                       />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={"col-sm-6 " + (this.props.gIntersectionLabelEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gIntersectionLabel">
                                    Intersection point label:
                                </label>
                                <input id="gIntersectionLabel"
                                       className="form-control form-control-sm"
                                       type="text"
                                       maxLength="60"
                                       value={this.props.gIntersectionLabel}
                                       onChange={handleFormUpdate.bind(this)}
                                       />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={"col " + (this.props.gIntersectionHorizLineLabelEditable ? '' : 'd-none')}>
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

                        <div className={"col " + (this.props.gIntersectionVertLineLabelEditable ? '' : 'd-none')}>
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
                    </div>

                    <ResetGraphButton
                        initialState={initialState}
                        updateGraph={this.props.updateGraph} />

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

    gShowIntersection: PropTypes.bool,
    gDisplayShadow: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

    gDisplayFeedback: PropTypes.bool,
    gLine1Label: PropTypes.string,
    gLine1LabelEditable: PropTypes.bool,
    gLine2Label: PropTypes.string,
    gLine2LabelEditable: PropTypes.bool,
    gXAxisLabel: PropTypes.string,
    gXAxisLabelEditable: PropTypes.bool,
    gYAxisLabel: PropTypes.string,
    gYAxisLabelEditable: PropTypes.bool,
    gLine1Slope: PropTypes.number,
    gLine1SlopeInitial: PropTypes.number,
    gLine1SlopeEditable: PropTypes.bool,
    gLine2Slope: PropTypes.number,
    gLine2SlopeInitial: PropTypes.number,
    gLine2SlopeEditable: PropTypes.bool,
    gLine1OffsetX: PropTypes.number,
    gLine1OffsetY: PropTypes.number,
    gLine1OffsetXInitial: PropTypes.number,
    gLine1OffsetYInitial: PropTypes.number,
    gLine2OffsetX: PropTypes.number,
    gLine2OffsetY: PropTypes.number,
    gLine2OffsetXInitial: PropTypes.number,
    gLine2OffsetYInitial: PropTypes.number,
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
    gA1Editable: PropTypes.bool,
    gA2: PropTypes.number,
    gA2Initial: PropTypes.number,
    gA2Editable: PropTypes.bool,
    gA3: PropTypes.number,
    gA3Initial: PropTypes.number,
    gA3Editable: PropTypes.bool,
    gA4: PropTypes.number,
    gA4Initial: PropTypes.number,
    gA4Editable: PropTypes.bool,

    gA: PropTypes.number,
    gK: PropTypes.number,
    gR: PropTypes.number,
    gY1: PropTypes.number,
    gY2: PropTypes.number,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAInitial: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasAEditable: PropTypes.bool,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLInitial: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasLEditable: PropTypes.bool,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKInitial: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasKEditable: PropTypes.bool,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaInitial: PropTypes.number,
    gCobbDouglasAlphaEditable: PropTypes.bool,
    gCobbDouglasYName: PropTypes.string,

    submission: PropTypes.object,
    updateGraph: PropTypes.func.isRequired,
    choice: PropTypes.number,
    value: PropTypes.string
};
