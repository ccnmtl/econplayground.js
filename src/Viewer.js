import React, { Component } from 'react';
import GraphEditor from './GraphEditor';
import GraphViewer from './GraphViewer';
import { exportGraph, importGraph } from './Graph';
import { authedFetch } from './utils';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.graphId = window.location.pathname.split('/')[2];

        this.state = {
            // Graph options
            gId: null,
            gType: null,
            gNeedsSubmit: null,
            gShowIntersection: true,
            gLine1Slope: 1,
            gLine2Slope: -1,
            gLine1Label: '',
            gLine2Label: '',
            gXAxisLabel: '',
            gYAxisLabel: '',
            gLine1FeedbackIncrease: '',
            gLine1FeedbackDecrease: '',
            gLine2FeedbackIncrease: '',
            gLine2FeedbackDecrease: '',
            gLineMovement: null,

            value: '',
            submitted: false,
            submission: null
        };
    }

    render() {
        if (window.EconPlayground.is_staff) {
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
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine1Slope={this.state.gLine1Slope}
            gLine2Slope={this.state.gLine2Slope}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1DecreaseScore={this.state.gLine1DecreaseScore}
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine1IncreaseScore={this.state.gLine1IncreaseScore}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2DecreaseScore={this.state.gLine2DecreaseScore}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            gLine2IncreaseScore={this.state.gLine2IncreaseScore}
            updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
            updateGraph={this.handleGraphUpdate.bind(this)}
            saveGraph={this.handleSaveGraph.bind(this)} />
                </div>;
        } else {
            return <GraphViewer
            ref={(gv) => { this.gv = gv; }}
            gId={this.state.gId}
            gTitle={this.state.gTitle}
            gDescription={this.state.gDescription}
            gType={this.state.gType}
            gNeedsSubmit={this.state.gNeedsSubmit}
            gShowIntersection={this.state.gShowIntersection}
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine1Slope={this.state.gLine1Slope}
            gLine2Slope={this.state.gLine2Slope}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1DecreaseScore={this.state.gLine1DecreaseScore}
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine1IncreaseScore={this.state.gLine1IncreaseScore}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2DecreaseScore={this.state.gLine2DecreaseScore}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            gLine2IncreaseScore={this.state.gLine2IncreaseScore}
            gLineMovement={this.state.gLineMovement}
            updateGraph={this.handleGraphUpdate.bind(this)}
            value={this.state.value}
                />;
        }
    }

    componentDidMount() {
        // Load graph and submission data
        const me = this;
        this.getGraph().then(function() {
            return me.getSubmission();
        }).then(function(s) {
            me.setState({'submission': s});
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
        const me = this;
        return authedFetch('/api/submissions/').then(function(response) {
            return response.json();
        }).then(function(json) {
            let submission = null;
            json.some(function(e) {
                if (e.graph === me.state.gId) {
                    submission = e;
                    return true;
                }
            });
            return submission;
        });
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
        this.setState({value: '1'});
    }
    handleCase2() {
        this.setState({value: '2'});
    }
    handleCase3() {
        this.setState({value: '3'});
    }
    handleCase4() {
        this.setState({value: '4'});
    }
    handleInitial() {
        this.setState({value: ''});
    }
}

export default Viewer;
