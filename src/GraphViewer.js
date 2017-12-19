import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard';
import Feedback from './Feedback';
import SlopeEditor from './SlopeEditor';
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

        let isStaff = false;
        if (window.EconPlayground && window.EconPlayground.isStaff) {
            isStaff = window.EconPlayground.isStaff.toLowerCase() === 'true';
        }

        const token = Cookies.get('csrftoken');

        return (
            <div className="GraphViewer">
                <h5>{this.props.gTitle}</h5>
                <p>{this.props.gDescription}</p>
                <form onSubmit={this.handleSubmit.bind(this)} action={action} method="post">
                    <input type="hidden" name="csrfmiddlewaretoken" value={token} />
                    <input type="hidden" name="score" value={this.props.value} />
                    <input type="hidden" name="next" value={successUrl} />
                    <JXGBoard
                         id={'editing-graph'}
                         width={562.5}
                         height={300}
                         submission={this.props.submission}
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gXAxisLabel={this.props.gXAxisLabel}
                         gYAxisLabel={this.props.gYAxisLabel}
                         gLine1Slope={this.props.gLine1Slope}
                         gLine2Slope={this.props.gLine2Slope}
                         gLine1Offset={this.props.gLine1Offset}
                         gLine2Offset={this.props.gLine2Offset}
                         gNeedsSubmit={this.props.gNeedsSubmit}
                         gShowIntersection={this.props.gShowIntersection} />

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

                    <div className="form-row">
                        <div className={"col " + (this.props.gLine1SlopeEditable ? '' : 'd-none')}>
                            <label htmlFor="gLine1Slope">
                                Orange line slope
                            </label>
                            <SlopeEditor
                                 dataId="gLine1Slope"
                                 value={this.props.gLine1Slope}
                                 handler={handleFormUpdate.bind(this)} />
                        </div>

                        <div className={"col " + (this.props.gLine2SlopeEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Blue line slope
                                </label>
                                <SlopeEditor
                                     dataId="gLine2Slope"
                                     value={this.props.gLine2Slope}
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
                                       className="form-control form-control-sm" type="text" />
                            </div>
                        </div>
                        <div className={"col " + (this.props.gLine2LabelEditable ? '' : 'd-none')}>
                            <div className="form-group">
                                <label htmlFor="gLine2Label">
                                    Blue line label
                                </label>
                                <input id="gLine2Label"
                                       value={this.props.gLine2Label}
                                       className="form-control form-control-sm" type="text" />
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
                                       value={this.props.gXAxisLabel} />
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
                                       value={this.props.gYAxisLabel} />
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
                                       value={this.props.gIntersectionLabel}
                                       onChange={handleFormUpdate.bind(this)} />
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
                                       value={this.props.gIntersectionVertLineLabel}
                                       onChange={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <hr style={{
                            display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                        }} />

                    <button className="btn btn-primary btn-sm"
                            style={{
                                marginTop: '1em',
                                display: (!isStaff && this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
                            }}
                            type="submit">Submit</button>
                </form>
            </div>
        )
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
    gLine1SlopeEditable: PropTypes.bool,
    gLine2Slope: PropTypes.number,
    gLine2SlopeEditable: PropTypes.bool,
    gLine1Offset: PropTypes.number,
    gLine2Offset: PropTypes.number,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine1IncreaseScore: PropTypes.number,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1DecreaseScore: PropTypes.number,
    gLine2FeedbackIncrease: PropTypes.string,
    gLine2IncreaseScore: PropTypes.number,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2DecreaseScore: PropTypes.number,
    gType: PropTypes.number,
    submission: PropTypes.object,
    updateGraph: PropTypes.func.isRequired,
    choice: PropTypes.number,
    value: PropTypes.string
};
