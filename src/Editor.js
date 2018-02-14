import React, { Component } from 'react';
import BackButton from './BackButton';
import GraphEditor from './GraphEditor';
import GraphPicker from './GraphPicker';
import { exportGraph, defaultGraph } from './GraphMapping';
import { authedFetch } from './utils';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            user: null,
            alertText: null
        };

        Object.assign(this.state, defaultGraph);
    }
    render() {
        return (
            <div className="Editor">
                <div className="Editor-container" ref={(test) => { this.test = test; }}>
                    <div className="alert alert-danger"
                         hidden={this.state.alertText ? false : true}
                         role="alert">
                        {this.state.alertText}
                    </div>
                    <BackButton
                         ref={(backbutton) => { this.backbutton = backbutton; }}
                         showing={this.state.step !== 0}
                         onClick={this.reset.bind(this)} />
                    <GraphPicker
                         ref={(gp) => { this.gp = gp; }}
                         showing={this.state.step === 0}
                         onSelectGraph={this.onSelectGraph.bind(this)} />
                    <GraphEditor
                         ref={(ge) => { this.ge = ge; }}
                        showing={this.state.step === 1}
                        gType={this.state.gType}
                        gShowIntersection={this.state.gShowIntersection}
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
                        gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
                        gLine1DecreaseScore={this.state.gLine1DecreaseScore}
                        gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
                        gLine1IncreaseScore={this.state.gLine1IncreaseScore}
                        gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
                        gLine2DecreaseScore={this.state.gLine2DecreaseScore}
                        gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
                        gLine2IncreaseScore={this.state.gLine2IncreaseScore}

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

                        updateGraph={this.handleGraphUpdate.bind(this)}
                        saveGraph={this.handleSaveGraph.bind(this)} />
                </div>
            </div>
        );
    }
    reset() {
        this.setState({step: 0});
    }
    onSelectGraph(type) {
        this.setState({
            step: 1,
            gType: type
        });
    }
    handleSaveGraph() {
        let data = exportGraph(this.state);
        data.author = window.EconPlayground.user;

        const me = this;
        authedFetch('/api/graphs/', 'post', JSON.stringify(data))
            .then(function(response) {
                if (response.status === 201) {
                    me.setState({
                        alertText: null,
                        step: 2
                    });

                    response.json().then(function(graph) {
                        const url = `/graph/${graph.id}/`;
                        window.location.href = url;
                    });
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
    componentDidMount() {
        const me = this;
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
}

export default Editor;
