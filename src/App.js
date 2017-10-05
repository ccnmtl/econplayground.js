import React, { Component } from 'react';
import Cookies from 'js-cookie';
import BackButton from './BackButton';
import GraphEditor from './GraphEditor';
import GraphPicker from './GraphPicker';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            user: null,
            alertText: null,

            // Graph options
            gType: null,
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
        return (
            <div className="App">
                <h2>econplayground</h2>
                <div className="App-container" ref={(test) => { this.test = test; }}>
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
                         gLine1Label={this.state.gLine1Label}
                         gLine2Label={this.state.gLine2Label}
                         gLine1Slope={this.state.gLine1Slope}
                         gLine2Slope={this.state.gLine2Slope}
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
            title: this.state.gTitle,
            description: this.state.gDescription,
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

        const me = this;
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

export default App;
