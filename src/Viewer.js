import React, { Component } from 'react';
import GraphEditor from './GraphEditor';
import GraphViewer from './GraphViewer';
import { exportGraph, importGraph, defaultGraph } from './GraphMapping';
import { authedFetch, getSubmission } from './utils';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.graphId = window.location.pathname.split('/')[2];

        this.state = {
            choice: null,
            value: '',
            submission: null
        };

        Object.assign(this.state, defaultGraph);

        // TODO: clean up this regex
        if (window.location.href.match(/submitted=1/)) {
            this.state.alertText = 'Submitted.';
        }
    }

    render() {
        if (window.EconPlayground.isInstructor) {
            return <div>
                <div className="alert alert-info"
            hidden={this.state.alertText ? false : true}
            role="alert">
                {this.state.alertText}
            </div>
                <GraphEditor
            ref={(ge) => { this.ge = ge; }}
            showing={true}
            gId={this.state.gId}
            gTitle={this.state.gTitle}
            gDescription={this.state.gDescription}
            gInstructorNotes={this.state.gInstructorNotes}
            gType={this.state.gType}
            gNeedsSubmit={this.state.gNeedsSubmit}
            gShowIntersection={this.state.gShowIntersection}
            gDisplayShadow={this.state.gDisplayShadow}
            gIntersectionLabel={this.state.gIntersectionLabel}
            gIntersectionLabelEditable={this.state.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.state.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.state.gIntersectionVertLineLabelEditable}
            gIsPublished={this.state.gIsPublished}
            gDisplayFeedback={this.state.gDisplayFeedback}
            gCorrectFeedback={this.state.gCorrectFeedback}
            gIncorrectFeedback={this.state.gIncorrectFeedback}
            gLine1Label={this.state.gLine1Label}
            gLine1LabelEditable={this.state.gLine1LabelEditable}
            gLine2Label={this.state.gLine2Label}
            gLine2LabelEditable={this.state.gLine2LabelEditable}
            gLine1Slope={this.state.gLine1Slope}
            gLine1SlopeEditable={this.state.gLine1SlopeEditable}
            gLine2Slope={this.state.gLine2Slope}
            gLine2SlopeEditable={this.state.gLine2SlopeEditable}
            gXAxisLabel={this.state.gXAxisLabel}
            gXAxisLabelEditable={this.state.gXAxisLabelEditable}
            gYAxisLabel={this.state.gYAxisLabel}
            gYAxisLabelEditable={this.state.gYAxisLabelEditable}
            gLine1OffsetX={this.state.gLine1OffsetX}
            gLine1OffsetY={this.state.gLine1OffsetY}
            gLine2OffsetX={this.state.gLine2OffsetX}
            gLine2OffsetY={this.state.gLine2OffsetY}
            gAlpha={this.state.gAlpha}
            gOmega={this.state.gOmega}
            gA={this.state.gA}
            gK={this.state.gK}
            gR={this.state.gR}
            gY1={this.state.gY1}
            gY2={this.state.gY2}
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine1IncreaseScore={this.state.gLine1IncreaseScore}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1DecreaseScore={this.state.gLine1DecreaseScore}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            gLine2IncreaseScore={this.state.gLine2IncreaseScore}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2DecreaseScore={this.state.gLine2DecreaseScore}

            gCobbDouglasA={this.state.gCobbDouglasA}
            gCobbDouglasAName={this.state.gCobbDouglasAName}
            gCobbDouglasAEditable={this.state.gCobbDouglasAEditable}
            gCobbDouglasL={this.state.gCobbDouglasL}
            gCobbDouglasLName={this.state.gCobbDouglasLName}
            gCobbDouglasLEditable={this.state.gCobbDouglasLEditable}
            gCobbDouglasK={this.state.gCobbDouglasK}
            gCobbDouglasKName={this.state.gCobbDouglasKName}
            gCobbDouglasKEditable={this.state.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
            gCobbDouglasAlphaEditable={this.state.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.state.gCobbDouglasYName}
            gCobbDouglasCorrectScenario={this.state.gCobbDouglasCorrectScenario}

            updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
            updateGraph={this.handleGraphUpdate.bind(this)}
            saveGraph={this.handleSaveGraph.bind(this)} />
                </div>;
        } else {
            return <div>
                <div className="alert alert-info"
            hidden={this.state.alertText ? false : true}
            role="alert">
                {this.state.alertText}
            </div>
                <GraphViewer
            ref={(gv) => { this.gv = gv; }}
            gId={this.state.gId}
            gTitle={this.state.gTitle}
            gDescription={this.state.gDescription}
            gType={this.state.gType}
            gNeedsSubmit={this.state.gNeedsSubmit}
            gShowIntersection={this.state.gShowIntersection}
            gDisplayShadow={this.state.gDisplayShadow}
            gIntersectionLabel={this.state.gIntersectionLabel}
            gIntersectionLabelEditable={this.state.gIntersectionLabelEditable}
            gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
            gIntersectionHorizLineLabelEditable={this.state.gIntersectionHorizLineLabelEditable}
            gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
            gIntersectionVertLineLabelEditable={this.state.gIntersectionVertLineLabelEditable}
            gDisplayFeedback={this.state.gDisplayFeedback}
            gLine1Label={this.state.gLine1Label}
            gLine1LabelEditable={this.state.gLine1LabelEditable}
            gLine2Label={this.state.gLine2Label}
            gLine2LabelEditable={this.state.gLine2LabelEditable}
            gLine1Slope={this.state.gLine1Slope}
            gLine1SlopeInitial={this.state.gLine1SlopeInitial}
            gLine1SlopeEditable={this.state.gLine1SlopeEditable}
            gLine2Slope={this.state.gLine2Slope}
            gLine2SlopeInitial={this.state.gLine2SlopeInitial}
            gLine2SlopeEditable={this.state.gLine2SlopeEditable}
            gXAxisLabel={this.state.gXAxisLabel}
            gXAxisLabelEditable={this.state.gXAxisLabelEditable}
            gYAxisLabel={this.state.gYAxisLabel}
            gYAxisLabelEditable={this.state.gYAxisLabelEditable}
            gLine1OffsetX={this.state.gLine1OffsetX}
            gLine1OffsetY={this.state.gLine1OffsetY}
            gLine1OffsetXInitial={this.state.gLine1OffsetXInitial}
            gLine1OffsetYInitial={this.state.gLine1OffsetYInitial}
            gLine2OffsetX={this.state.gLine2OffsetX}
            gLine2OffsetY={this.state.gLine2OffsetY}
            gLine2OffsetXInitial={this.state.gLine2OffsetXInitial}
            gLine2OffsetYInitial={this.state.gLine2OffsetYInitial}
            gAlpha={this.state.gAlpha}
            gOmega={this.state.gOmega}
            gA={this.state.gA}
            gK={this.state.gK}
            gR={this.state.gR}
            gY1={this.state.gY1}
            gY2={this.state.gY2}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1DecreaseScore={this.state.gLine1DecreaseScore}
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine1IncreaseScore={this.state.gLine1IncreaseScore}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2DecreaseScore={this.state.gLine2DecreaseScore}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            gLine2IncreaseScore={this.state.gLine2IncreaseScore}

            gCobbDouglasA={this.state.gCobbDouglasA}
            gCobbDouglasAInitial={this.state.gCobbDouglasAInitial}
            gCobbDouglasAName={this.state.gCobbDouglasAName}
            gCobbDouglasAEditable={this.state.gCobbDouglasAEditable}
            gCobbDouglasL={this.state.gCobbDouglasL}
            gCobbDouglasLInitial={this.state.gCobbDouglasLInitial}
            gCobbDouglasLName={this.state.gCobbDouglasLName}
            gCobbDouglasLEditable={this.state.gCobbDouglasLEditable}
            gCobbDouglasK={this.state.gCobbDouglasK}
            gCobbDouglasKInitial={this.state.gCobbDouglasKInitial}
            gCobbDouglasKName={this.state.gCobbDouglasKName}
            gCobbDouglasKEditable={this.state.gCobbDouglasKEditable}
            gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
            gCobbDouglasAlphaInitial={this.state.gCobbDouglasAlphaInitial}
            gCobbDouglasAlphaEditable={this.state.gCobbDouglasAlphaEditable}
            gCobbDouglasYName={this.state.gCobbDouglasYName}

            submission={this.state.submission}
            updateGraph={this.handleGraphUpdate.bind(this)}
            choice={this.state.choice}
            value={this.state.value}
                />
                </div>;
        }
    }

    componentDidMount() {
        // Load graph and submission data
        const me = this;
        this.getGraph().then(function() {
            return me.getSubmission();
        }).then(function(s) {
            me.setState({submission: s});
        });

        // Add graph feedback event handlers
        document.addEventListener('l1up', function() {
            me.handleCase1();
        });
        document.addEventListener('l1down', function() {
            me.handleCase2();
        });
        document.addEventListener('l2up', function() {
            me.handleCase3();
        });
        document.addEventListener('l2down', function() {
            me.handleCase4();
        });
        document.addEventListener('l1initial', function() {
            me.handleInitial();
        });
        document.addEventListener('l2initial', function() {
            me.handleInitial();
        });

        document.addEventListener('l1offset', function(e) {
            const offset = e.detail;
            me.setState({
                gLine1OffsetX: offset.x,
                gLine1OffsetY: offset.y
            });
        });
        document.addEventListener('l2offset', function(e) {
            const offset = e.detail;
            me.setState({
                gLine2OffsetX: offset.x,
                gLine2OffsetY: offset.y
            });
        });
    }

    getGraph() {
        const me = this;
        return authedFetch(`/api/graphs/${this.graphId}/`).then(
            function(response) {
                return response.json();
            }).then(function(json) {
                importGraph(json, me);
            });
    }

    getSubmission() {
        return getSubmission(this.state.gId);
    }

    handleSaveGraph() {
        let data = exportGraph(this.state);
        data.author = window.EconPlayground.user;

        const me = this;
        authedFetch('/api/graphs/' + this.graphId + '/',
                    'put',
                    JSON.stringify(data))
            .then(function(response) {
                if (response.status === 200) {
                    me.setState({
                        alertText: 'Graph saved'
                    });

                    window.scrollTo(0, 0);
                } else {
                    me.setState({
                        alertText: response.statusText
                    });
                    window.scrollTo(0, 0);
                }
            });
    }
    handleGraphUpdate(obj) {
        this.setState(obj);
    }
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
    handleCase1() {
        this.setState({
            choice: 1,
            value: this.state.gLine1IncreaseScore.toString()
        });
    }
    handleCase2() {
        this.setState({
            choice: 2,
            value: this.state.gLine1DecreaseScore.toString()
        });
    }
    handleCase3() {
        this.setState({
            choice: 3,
            value: this.state.gLine2IncreaseScore.toString()
        });
    }
    handleCase4() {
        this.setState({
            choice: 4,
            value: this.state.gLine2DecreaseScore.toString()
        });
    }
    handleInitial() {
        this.setState({value: '0'});
    }
}

export default Viewer;
