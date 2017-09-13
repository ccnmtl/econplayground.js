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
            graphType: null,
            showIntersection: true
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
                         graphType={this.state.graphType}
                         showIntersection={this.state.showIntersection}
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
    onSelectGraph(graphType) {
        this.setState({
            step: 1,
            graphType: graphType
        });
    }
    handleSaveGraph() {
        // TODO: xhr request
    }
    handleGraphUpdate(graphType) {
        this.setState({graphType: graphType});
    }
    updateDisplayIntersection(checked) {
        this.setState({showIntersection: checked});
    }
}

export default App;
