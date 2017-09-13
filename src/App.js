import React, { Component } from 'react';
import BackButton from './BackButton.js';
import GraphEditor from './GraphEditor.js';
import GraphPicker from './GraphPicker.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,

            // Graph options
            gType: null,
            gShowIntersection: true,
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
            type: this.state.gType,
            showIntersection: this.state.gShowIntersection,
            xAxisLabel: this.state.gXAxisLabel,
            yAxisLabel: this.state.gYAxisLabel
        };
    }
    handleSaveGraph() {
    }
    handleGraphUpdate(type) {
        this.setState({gType: type});
    }
    updateDisplayIntersection(checked) {
        this.setState({gShowIntersection: checked});
    }
}

export default App;
