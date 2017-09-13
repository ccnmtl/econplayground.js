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
            // The graph type (e.g. 1, 2, 3, 4)
            graph: null,
            showIntersection: true
        };
    }
    render() {
        return (
            <div className="App">
                <h2>econplayground</h2>
                <div className="App-container">
                    <BackButton
                         showing={this.state.step !== 0}
                         onClick={this.reset.bind(this)} />
                    <GraphPicker
                         showing={this.state.step === 0}
                         onSelectGraph={this.onSelectGraph.bind(this)} />
                    <GraphEditor
                         showing={this.state.step === 1}
                         graph={this.state.graph}
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
    onSelectGraph(graph) {
        this.setState({
            step: 1,
            graph: graph
        });
    }
    handleSaveGraph() {
        // TODO: xhr request
    }
    handleGraphUpdate(graph) {
        this.setState({graph: graph});
    }
    updateDisplayIntersection(checked) {
        this.setState({showIntersection: checked});
    }
}

export default App;
