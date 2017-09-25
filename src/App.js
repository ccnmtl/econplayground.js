import React, { Component } from 'react';
import Cookies from 'js-cookie';
import BackButton from './BackButton.js';
import GraphEditor from './GraphEditor.js';
import GraphPicker from './GraphPicker.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            user: null,

            // Graph options
            gType: null,
            gShowIntersection: true,
            gLine1Slope: null,
            gLine2Slope: null,
            gLine1Label: '',
            gLine2Label: '',
            gXAxisLabel: '',
            gYAxisLabel: ''
        };
    }
    render() {
        return (
            <div className="App">
                <h2>econplayground</h2>
                <div className="App-container" ref={(test) => { this.test = test; }}>
                    <div ref={(clickme) => { this.clickme = clickme; }}></div>
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
                         gLine1Label={this.state.gLine1Label}
                         gLine2Label={this.state.gLine2Label}
                         updateDisplayIntersection={this.updateDisplayIntersection.bind(this)}
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
    /**
     * Returns the current graph settings as a persistable JSON object.
     */
    exportGraph() {
        return {
            graph_type: this.state.gType,
            show_intersection: this.state.gShowIntersection,
            line_1_slope: this.state.gLine1Slope,
            line_2_slope: this.state.gLine2Slope,
            line_1_label: this.state.gLine1Label,
            line_2_label: this.state.gLine2Label,
            x_axis_label: this.state.gXAxisLabel,
            y_axis_label: this.state.gYAxisLabel
        };
    }
    handleSaveGraph(title) {
        let data = this.exportGraph();
        data.author = window.EconPlayground.user;
        data.title = title;

        const token = Cookies.get('csrftoken');

        fetch('/api/graphs/', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': token
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        });
    }
    handleGraphUpdate(obj) {
        this.setState(obj);
    }
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
}

export default App;
