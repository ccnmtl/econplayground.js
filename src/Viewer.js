import React, { Component } from 'react';
import GraphViewer from './GraphViewer.js';

class Viewer extends Component {
    constructor(props) {
        super(props);

        // TODO
        this.graphId = 11;

        this.state = {
            // Graph options
            gType: 0,
            gShowIntersection: true,
            gLine1Slope: 1,
            gLine2Slope: -1,
            gLine1Label: '',
            gLine2Label: '',
            gXAxisLabel: '',
            gYAxisLabel: ''
        };
    }

    render() {
        return <div>
            <GraphViewer
        ref={(gv) => { this.gv = gv; }}
        gType={this.state.gType}
        gShowIntersection={this.state.gShowIntersection}
        gLine1Label={this.state.gLine1Label}
        gLine2Label={this.state.gLine2Label}
        gLine1Slope={this.state.gLine1Slope}
        gLine2Slope={this.state.gLine2Slope}
        updateGraph={this.handleGraphUpdate.bind(this)}
            />
            </div>;
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

    handleGraphUpdate(obj) {
        this.setState(obj);
    }
}

export default Viewer;
