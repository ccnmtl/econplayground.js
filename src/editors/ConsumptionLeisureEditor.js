import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionLeisureEditor extends React.Component {
    render() {
        const tex = 'y = (' + this.props.gA1 + ' - x)w';

        return (
            <div>
                <h2>Function</h2>
                <div className="row">
                    {this.props.isInstructor &&
                            (<MathJax.Context
                                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML"
                                input="tex"
                                options={{
                                    displayAlign: 'left',
                                    messageStyle: 'none'
                                }}>
                                <MathJax.Node>{tex}</MathJax.Node>
                            </MathJax.Context>
                            )}
                        </div>
                        <hr/>

                        <h2>Slope</h2>
                        {this.props.displaySliders && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="gA1">
                                            Horizontal intercept value
                                        </label>
                                        <RangeEditor
                                            id="gA1"
                                            dataId="gA1"
                                            value={this.props.gA1}
                                            min={0}
                                            max={9}
                                            handler={handleFormUpdate.bind(this)} />
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="gA2">
                                            Real Wage w
                                        </label>
                                        <RangeEditor
                                            id="gA2"
                                            dataId="gA2"
                                            value={this.props.gA2}
                                            min={0.01}
                                            max={5}
                                            handler={handleFormUpdate.bind(this)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <hr/>
                        <h2>Labels</h2>
                        {this.props.displayLabels && (
                            <div className="row">
                                <EditableControl
                                    id="gLine1Label"
                                    name="Orange line label"
                                    value={this.props.gLine1Label}
                                    valueEditable={true}
                                    isInstructor={this.props.isInstructor}
                                    updateGraph={this.props.updateGraph}
                                />
                            </div>
                        )}

                        {this.props.displayLabels && (
                            <div className="row">
                                <EditableControl
                                    id="gXAxisLabel"
                                    name="X-axis label"
                                    value={this.props.gXAxisLabel}
                                    valueEditable={true}
                                    isInstructor={this.props.isInstructor}
                                    updateGraph={this.props.updateGraph}
                                />

                            <EditableControl
                                id="gYAxisLabel"
                                name="Y-axis label"
                                value={this.props.gYAxisLabel}
                                valueEditable={true}
                                isInstructor={this.props.isInstructor}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        )}

                        {this.props.displayLabels && (
                            <div className="row">
                                <EditableControl
                                    id="gIntersectionHorizLineLabel"
                                    name="Horizontal intersection label"
                                    value={this.props.gIntersectionHorizLineLabel}
                                    valueEditable={true}
                                    isInstructor={this.props.isInstructor}
                                    updateGraph={this.props.updateGraph}
                                />

                            <EditableControl
                                id="gIntersectionVertLineLabel"
                                name="Vertical intersection label"
                                value={this.props.gIntersectionVertLineLabel}
                                valueEditable={true}
                                isInstructor={this.props.isInstructor}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        )}

                    </div>
        );
    }
}

ConsumptionLeisureEditor.propTypes = {
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gXAxisLabel: PropTypes.string.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,

    gA1: PropTypes.number.isRequired,
    gA2: PropTypes.number.isRequired,

    gLine1Label: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
