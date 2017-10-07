import React, { Component } from 'react';
import Cookies from 'js-cookie';
import GraphEditor from './GraphEditor';
import GraphViewer from './GraphViewer';

class Viewer extends Component {
    constructor(props) {
        super(props);

        // TODO
        this.graphId = window.location.pathname.split('/')[2];

        this.state = {
            // Graph options
            gType: 0,
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
            gLine2FeedbackDecrease: ''
        };
    }

    render() {
        if (window.EconPlayground.is_staff) {
            return <GraphEditor
            ref={(ge) => { this.ge = ge; }}
            showing={true}
            gType={this.state.gType}
            gShowIntersection={this.state.gShowIntersection}
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine1Slope={this.state.gLine1Slope}
            gLine2Slope={this.state.gLine2Slope}
            gLine1FeedbackDecrease={this.state.gLine1FeedbackDecrease}
            gLine1FeedbackIncrease={this.state.gLine1FeedbackIncrease}
            gLine2FeedbackDecrease={this.state.gLine2FeedbackDecrease}
            gLine2FeedbackIncrease={this.state.gLine2FeedbackIncrease}
            updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
            updateGraph={this.handleGraphUpdate.bind(this)}
            saveGraph={this.handleSaveGraph.bind(this)}
                />;
        } else {
            return <GraphViewer
            ref={(gv) => { this.gv = gv; }}
            gType={this.state.gType}
            gShowIntersection={this.state.gShowIntersection}
            gLine1Label={this.state.gLine1Label}
            gLine2Label={this.state.gLine2Label}
            gLine1Slope={this.state.gLine1Slope}
            gLine2Slope={this.state.gLine2Slope}
            updateGraph={this.handleGraphUpdate.bind(this)}
                />;
        }
    }

    componentDidMount() {
        this.getGraph();
    }

    getGraph() {
        const me = this;
        fetch(`/api/graphs/${this.graphId}`).then(function(response) {
            return response.json();
        }).then(function(json) {
            me.setState({
                gType: json.graph_type,
                gLine1Label: json.line_1_label,
                gLine2Label: json.line_2_label,
                gLine1Slope: window.parseFloat(json.line_1_slope),
                gLine2Slope: window.parseFloat(json.line_2_slope),
                gShowIntersection: true
            });
        });
    }

    handleSaveGraph(title) {
        let data = this.exportGraph();
        data.author = window.EconPlayground.user;
        data.title = title;

        const token = Cookies.get('csrftoken');

        const me = this;
        fetch('/api/graphs/', {
            method: 'put',
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
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
}

export default Viewer;
