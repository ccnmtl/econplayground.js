import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as vega from 'vega';
import * as vegaTooltip from 'vega-tooltip';
import './App.css';

/**
 * Based on renderer.js from vega-editor.
 */
class VegaRenderer extends React.Component {
    static propTypes = {
        vegaSpec: PropTypes.object,
        renderer: PropTypes.string
    }

    renderVega(props) {
        this.refs.chart.style.width =
            this.refs.chart.getBoundingClientRect().width + 'px';
        let runtime;
        let view;
        try {
            runtime = vega.parse(props.vegaSpec);
            view = new vega.View(runtime)
                .logLevel(vega.Warn)
                .initialize(this.refs.chart)
                .renderer(props.renderer);

            view.hover();
            view.run();
        } catch (err) {
            throw err;
        }
        this.refs.chart.style.width = 'auto';
        if (this.props.tooltip) {
            vegaTooltip.vega(view);
        }
        //window.VEGA_DEBUG.view = view;
    }

    componentDidMount() {
        this.renderVega(this.props);
    }

    componentDidUpdate() {
        this.renderVega(this.props);
    }

    renderChart() {
        return (
                <div className='chart-container'>
                <div className='chart'>
                <div ref='chart'>
                </div>
                {this.props.tooltip ? <div id='vis-tooltip' className='vg-tooltip'></div> : null}
            </div>
                </div>
        );
    }

    render() {
        if (this.props.errorPane) {
            return (
                    <div>
                    {this.renderChart()}
                    </div>
            );
        } else {
            return (
                this.renderChart()
            );
        }
    }
}

class App extends Component {
    render() {
        const vega = {
            "$schema": "https://vega.github.io/schema/vega/v3.0.json",
            "width": 500,
            "height": 200,
            "padding": 5,

            "signals": [
                {
                    "name": "interpolate",
                    "value": "linear",
                    "bind": {
                        "input": "select",
                        "options": [
                            "basis",
                            "cardinal",
                            "catmull-rom",
                            "linear",
                            "monotone",
                            "natural",
                            "step",
                            "step-after",
                            "step-before"
                        ]
                    }
                }
            ],

            "data": [
                {
                    "name": "table",
                    "values": [
                        {"x": 0, "y": 28, "c":0}, {"x": 0, "y": 20, "c":1},
                        {"x": 1, "y": 43, "c":0}, {"x": 1, "y": 35, "c":1},
                        {"x": 2, "y": 81, "c":0}, {"x": 2, "y": 10, "c":1},
                        {"x": 3, "y": 19, "c":0}, {"x": 3, "y": 15, "c":1},
                        {"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
                        {"x": 5, "y": 24, "c":0}, {"x": 5, "y": 28, "c":1},
                        {"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
                        {"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
                        {"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
                        {"x": 9, "y": 49, "c":0}, {"x": 9, "y": 25, "c":1}
                    ]
                }
            ],

            "scales": [
                {
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": "table", "field": "x"}
                },
                {
                    "name": "y",
                    "type": "linear",
                    "range": "height",
                    "nice": true,
                    "zero": true,
                    "domain": {"data": "table", "field": "y"}
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": "category",
                    "domain": {"data": "table", "field": "c"}
                }
            ],

            "axes": [
                {"orient": "bottom", "scale": "x"},
                {"orient": "left", "scale": "y"}
            ],

            "marks": [
                {
                    "type": "group",
                    "from": {
                        "facet": {
                            "name": "series",
                            "data": "table",
                            "groupby": "c"
                        }
                    },
                    "marks": [
                        {
                            "type": "line",
                            "from": {"data": "series"},
                            "encode": {
                                "enter": {
                                    "x": {"scale": "x", "field": "x"},
                                    "y": {"scale": "y", "field": "y"},
                                    "stroke": {"scale": "color", "field": "c"},
                                    "strokeWidth": {"value": 2}
                                },
                                "update": {
                                    "interpolate": {"signal": "interpolate"},
                                    "fillOpacity": {"value": 1}
                                },
                                "hover": {
                                    "fillOpacity": {"value": 0.5}
                                }
                            }
                        }
                    ]
                }
            ]
        };
        return (
            <div className="App">
            <h2>econplayground</h2>
            <div className="App-container">
            <VegaRenderer vegaSpec={vega} renderer={'svg'} />
            </div>
            </div>
        );
    }
}

export default App;
