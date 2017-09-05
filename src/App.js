import React, { Component } from 'react';
import GraphPicker from './GraphPicker.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPickingGraphType: false
        };
    }
    render() {
        return (
            <div className="App">
                <h2>econplayground</h2>
                <div className="App-container">
                    <GraphPicker />
                </div>
            </div>
        );
    }
}

export default App;
