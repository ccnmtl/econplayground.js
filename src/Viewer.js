import React, { Component } from 'react';
import GraphEditor from './GraphEditor';
import GraphViewer from './GraphViewer';
import { exportGraph, importGraph, defaultGraph } from './GraphMapping';
import { authedFetch, getAssessment, getSubmission, getError } from './utils';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.graphId = window.location.pathname.split('/')[2];

        this.state = {
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
            return <React.Fragment>
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
            gAssignmentType={this.state.gAssignmentType}
            gNeedsSubmit={this.state.gNeedsSubmit}
            gShowIntersection={this.state.gShowIntersection}
            gDisplayIntersection1={this.state.gDisplayIntersection1}
            gIntersectionLabel={this.state.gIntersectionLabel}
            gDisplayIntersection2={this.state.gDisplayIntersection2}
            gIntersection2Label={this.state.gIntersection2Label}
            gDisplayIntersection3={this.state.gDisplayIntersection3}
            gIntersection3Label={this.state.gIntersection3Label}
            gDisplayShadow={this.state.gDisplayShadow}
            gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
            gIntersection2HorizLineLabel={this.state.gIntersection2HorizLineLabel}
            gIntersection2VertLineLabel={this.state.gIntersection2VertLineLabel}
            gIntersection3HorizLineLabel={this.state.gIntersection3HorizLineLabel}
            gIntersection3VertLineLabel={this.state.gIntersection3VertLineLabel}
            gIsPublished={this.state.gIsPublished}
            gDisplayFeedback={this.state.gDisplayFeedback}
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine3Label={this.state.gLine3Label}
            gLine1Slope={this.state.gLine1Slope}
            gLine2Slope={this.state.gLine2Slope}
            gLine3Slope={this.state.gLine3Slope}
            gLine1Dashed={this.state.gLine1Dashed}
            gLine2Dashed={this.state.gLine2Dashed}
            gLine3Dashed={this.state.gLine3Dashed}
            gXAxisLabel={this.state.gXAxisLabel}
            gYAxisLabel={this.state.gYAxisLabel}
            gLine1OffsetX={this.state.gLine1OffsetX}
            gLine1OffsetY={this.state.gLine1OffsetY}
            gLine2OffsetX={this.state.gLine2OffsetX}
            gLine2OffsetY={this.state.gLine2OffsetY}
            gLine3OffsetX={this.state.gLine3OffsetX}
            gLine3OffsetY={this.state.gLine3OffsetY}
            gAlpha={this.state.gAlpha}

            gA1={this.state.gA1}
            gA2={this.state.gA2}
            gA3={this.state.gA3}
            gA4={this.state.gA4}

            gA={this.state.gA}
            gK={this.state.gK}
            gR={this.state.gR}
            gY1={this.state.gY1}
            gY2={this.state.gY2}

            gCobbDouglasA={this.state.gCobbDouglasA}
            gCobbDouglasAName={this.state.gCobbDouglasAName}
            gCobbDouglasL={this.state.gCobbDouglasL}
            gCobbDouglasLName={this.state.gCobbDouglasLName}
            gCobbDouglasK={this.state.gCobbDouglasK}
            gCobbDouglasKName={this.state.gCobbDouglasKName}
            gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
            gCobbDouglasYName={this.state.gCobbDouglasYName}

            updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
            updateGraph={this.handleGraphUpdate.bind(this)}
            saveGraph={this.handleSaveGraph.bind(this)}
            saveAndViewGraph={this.handleSaveAndViewGraph.bind(this)} />
                </React.Fragment>;
        } else {
            return <React.Fragment>
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
            gAssignmentType={this.state.gAssignmentType}
            gShowIntersection={this.state.gShowIntersection}
            gDisplayIntersection1={this.state.gDisplayIntersection1}
            gDisplayIntersection1Initial={this.state.gDisplayIntersection1Initial}
            gIntersectionLabel={this.state.gIntersectionLabel}
            gIntersectionLabelInitial={this.state.gIntersectionLabelInitial}
            gDisplayIntersection2={this.state.gDisplayIntersection2}
            gDisplayIntersection2Initial={this.state.gDisplayIntersection2Initial}
            gIntersection2Label={this.state.gIntersection2Label}
            gIntersection2LabelInitial={this.state.gIntersection2LabelInitial}
            gDisplayIntersection3={this.state.gDisplayIntersection3}
            gDisplayIntersection3Initial={this.state.gDisplayIntersection3Initial}
            gIntersection3Label={this.state.gIntersection3Label}
            gIntersection3LabelInitial={this.state.gIntersection3LabelInitial}
            gNeedsSubmit={this.state.gNeedsSubmit}

            gDisplayShadow={this.state.gDisplayShadow}
            gIntersectionHorizLineLabel={this.state.gIntersectionHorizLineLabel}
            gIntersectionVertLineLabel={this.state.gIntersectionVertLineLabel}
            gIntersection2HorizLineLabel={this.state.gIntersection2HorizLineLabel}
            gIntersection2VertLineLabel={this.state.gIntersection2VertLineLabel}
            gIntersection3HorizLineLabel={this.state.gIntersection3HorizLineLabel}
            gIntersection3VertLineLabel={this.state.gIntersection3VertLineLabel}
            gIntersectionHorizLineLabelInitial={this.state.gIntersectionHorizLineLabelInitial}
            gIntersectionVertLineLabelInitial={this.state.gIntersectionVertLineLabelInitial}
            gIntersection2HorizLineLabelInitial={this.state.gIntersection2HorizLineLabelInitial}
            gIntersection2VertLineLabelInitial={this.state.gIntersection2VertLineLabelInitial}
            gIntersection3HorizLineLabelInitial={this.state.gIntersection3HorizLineLabelInitial}
            gIntersection3VertLineLabelInitial={this.state.gIntersection3VertLineLabelInitial}
            gDisplayFeedback={this.state.gDisplayFeedback}
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine3Label={this.state.gLine3Label}
            gLine1LabelInitial={this.state.gLine1LabelInitial}
            gLine2LabelInitial={this.state.gLine2LabelInitial}
            gLine3LabelInitial={this.state.gLine3LabelInitial}
            gLine1Slope={this.state.gLine1Slope}
            gLine1SlopeInitial={this.state.gLine1SlopeInitial}
            gLine2Slope={this.state.gLine2Slope}
            gLine2SlopeInitial={this.state.gLine2SlopeInitial}
            gLine3Slope={this.state.gLine3Slope}
            gLine3SlopeInitial={this.state.gLine3SlopeInitial}
            gLine1Dashed={this.state.gLine1Dashed}
            gLine2Dashed={this.state.gLine2Dashed}
            gLine3Dashed={this.state.gLine3Dashed}
            gXAxisLabel={this.state.gXAxisLabel}
            gYAxisLabel={this.state.gYAxisLabel}
            gXAxisLabelInitial={this.state.gXAxisLabelInitial}
            gYAxisLabelInitial={this.state.gYAxisLabelInitial}
            gLine1OffsetX={this.state.gLine1OffsetX}
            gLine1OffsetY={this.state.gLine1OffsetY}
            gLine1OffsetXInitial={this.state.gLine1OffsetXInitial}
            gLine1OffsetYInitial={this.state.gLine1OffsetYInitial}
            gLine2OffsetX={this.state.gLine2OffsetX}
            gLine2OffsetY={this.state.gLine2OffsetY}
            gLine2OffsetXInitial={this.state.gLine2OffsetXInitial}
            gLine2OffsetYInitial={this.state.gLine2OffsetYInitial}
            gLine3OffsetX={this.state.gLine3OffsetX}
            gLine3OffsetY={this.state.gLine3OffsetY}
            gLine3OffsetXInitial={this.state.gLine3OffsetXInitial}
            gLine3OffsetYInitial={this.state.gLine3OffsetYInitial}
            gAlpha={this.state.gAlpha}

            gA1={this.state.gA1}
            gA1Initial={this.state.gA1Initial}
            gA2={this.state.gA2}
            gA2Initial={this.state.gA2Initial}
            gA3={this.state.gA3}
            gA3Initial={this.state.gA3Initial}
            gA4={this.state.gA4}
            gA4Initial={this.state.gA4Initial}

            gA={this.state.gA}
            gK={this.state.gK}
            gR={this.state.gR}
            gY1={this.state.gY1}
            gY2={this.state.gY2}

            gCobbDouglasA={this.state.gCobbDouglasA}
            gCobbDouglasAInitial={this.state.gCobbDouglasAInitial}
            gCobbDouglasAName={this.state.gCobbDouglasAName}
            gCobbDouglasL={this.state.gCobbDouglasL}
            gCobbDouglasLInitial={this.state.gCobbDouglasLInitial}
            gCobbDouglasLName={this.state.gCobbDouglasLName}
            gCobbDouglasK={this.state.gCobbDouglasK}
            gCobbDouglasKInitial={this.state.gCobbDouglasKInitial}
            gCobbDouglasKName={this.state.gCobbDouglasKName}
            gCobbDouglasAlpha={this.state.gCobbDouglasAlpha}
            gCobbDouglasAlphaInitial={this.state.gCobbDouglasAlphaInitial}
            gCobbDouglasYName={this.state.gCobbDouglasYName}

            assessment={this.state.assessment}
            submission={this.state.submission}
            updateGraph={this.handleGraphUpdate.bind(this)}
            value={this.state.value}
                />
                </React.Fragment>;
        }
    }

    componentDidMount() {
        // Load graph and submission data
        const me = this;


        this.getGraph().then(function() {
            if (me.state.gNeedsSubmit) {
                return me.getSubmission();
            } else {
                return null;
            }
        }).then(function(s) {
            if (s) {
                me.setState({submission: s});
            }
            return getAssessment(me.state.gId);
        }).then(function(a) {
            if (a && a.assessmentrule_set) {
                me.setState({assessment: a.assessmentrule_set});
            }
        }, function() {
            // Assessment not found
        });

        // Add graph feedback event handlers
        document.addEventListener('l1up', function() {
            // TODO
        });
        document.addEventListener('l1down', function() {
        });
        document.addEventListener('l2up', function() {
        });
        document.addEventListener('l2down', function() {
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
        document.addEventListener('l3offset', function(e) {
            const offset = e.detail;
            me.setState({
                gLine3OffsetX: offset.x,
                gLine3OffsetY: offset.y
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

    /**
     * Save the graph to the backend. Returns a promise.
     *
     * If the `chain` param is true, then this function can be used
     * within a promise chain and customized as needed.
     */
    handleSaveGraph(chain = false) {
        let data = exportGraph(this.state);
        data.author = window.EconPlayground.user;

        const me = this;
        return authedFetch(
            `/api/graphs/${this.graphId}/`, 'put', JSON.stringify(data))
            .then(function(response) {
                if (chain) {
                    return response.json();
                }

                if (response.status === 200) {
                    me.setState({
                        alertText: 'Graph saved'
                    });

                    window.scrollTo(0, 0);
                } else {
                    response.json().then(function(d) {
                        me.setState({
                            alertText: getError(d)
                        });
                        window.scrollTo(0, 0);
                    });
                }
            });
    }
    handleSaveAndViewGraph() {
        return this.handleSaveGraph(true)
            .then(function(graph) {
                const url = `/graph/${graph.id}/public/`;
                window.location.href = url;
            });
    }
    handleGraphUpdate(obj) {
        this.setState(obj);
    }
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
    handleInitial() {
        this.setState({value: '0'});
    }
}

export default Viewer;
