import React from 'react';
import PropTypes from 'prop-types';
import * as vega from 'vega';

/**
 * Based on renderer.js from vega-editor.
 */
export default class VegaRenderer extends React.Component {
    static propTypes = {
        vegaSpec: PropTypes.object,
        renderer: PropTypes.string
    };

    renderVega(props) {
        this.chart.style.width =
            this.chart.getBoundingClientRect().width + 'px';
        let runtime;
        let view;
        try {
            runtime = vega.parse(props.vegaSpec);
            view = new vega.View(runtime)
                .logLevel(vega.Warn)
                .initialize(this.chart)
                .renderer(props.renderer);

            view.hover();
            view.run();
        } catch (err) {
            throw err;
        }
        this.chart.style.width = 'auto';
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
                    <div ref={(c) => { this.chart = c; }}>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderChart()
        );
    }
}
