import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard';
import Feedback from './Feedback';

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
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gLine1Slope={this.props.gLine1Slope}
                         gLine2Slope={this.props.gLine2Slope}
                         gLineMovement={this.props.gLineMovement}
                         gNeedsSubmit={this.props.gNeedsSubmit}
                         gShowIntersection={this.props.gShowIntersection} />

                    <Feedback
                         value={this.props.value}
                         gLine1FeedbackDecrease={this.props.gLine1FeedbackDecrease}
                         gLine1FeedbackIncrease={this.props.gLine1FeedbackIncrease}
                         gLine2FeedbackDecrease={this.props.gLine2FeedbackDecrease}
                         gLine2FeedbackIncrease={this.props.gLine2FeedbackIncrease} />

                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="gLine1Slope">
                                Orange line slope
                            </label>
                            <input id="gLine1Slope"
                                   onChange={this.handleFormUpdate.bind(this)}
                                   className="form-control form-control-sm"
                                   value={this.props.gLine1Slope}
                                   type="number" step="0.01" />
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Blue line slope
                                </label>
                                <input id="gLine2Slope"
                                       onChange={this.handleFormUpdate.bind(this)}
                                       className="form-control form-control-sm"
                                       value={this.props.gLine2Slope}
                                       type="number" step="0.01" />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <select id="gLineMovement"
                            className="form-control"
                            onChange={this.handleFormUpdate.bind(this)}>
                        <option>(Choose line movement)</option>
                        <option value="0">Move orange line up</option>
                        <option value="1">Move orange line down</option>
                        <option value="2">Move blue line up</option>
                        <option value="3">Move blue line down</option>
                    </select>

                    <button className="btn btn-primary"
                            style={{
                                marginTop: '1em',
                                display: this.props.gNeedsSubmit ? 'inherit' : 'none'
                            }}
                            type="submit">Submit</button>
                </form>
            </div>
        )
    }
    handleFormUpdate(e) {
        let obj = {};

        switch(e.target.type) {
        case 'checkbox':
            obj[e.target.id] = e.target.checked;
            break;
        case 'number':
            obj[e.target.id] = parseFloat(e.target.value);
            break;
        default:
            if (e.target.id === 'gLineMovement') {
                obj[e.target.id] = parseInt(e.target.value, 10);
            } else {
                obj[e.target.id] = e.target.value;
            }
        }

        this.props.updateGraph(obj);
    }
    createSubmission(data) {
        const token = Cookies.get('csrftoken');
        const me = this;
        return fetch('/api/submissions/', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': token
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }).then(function(response) {
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
        this.createSubmission({
            graph: this.props.gId,
            choice: this.props.value
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
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string,
    gLineMovement: PropTypes.number,
    gType: PropTypes.number,
    updateGraph: PropTypes.func.isRequired,
    value: PropTypes.string
};
