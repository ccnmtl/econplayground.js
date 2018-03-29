import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionLeisureEditor extends React.Component {
    render() {
        const tex = 'y = (' + this.props.gA1 + ' - x)w';

        return (
            <div>
                {this.props.isInstructor &&
                    (<MathJax.Context
                            script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML"
                            input="tex"
                            options={{
                                displayAlign: 'left',
                                messageStyle: 'none'
                            }}>
                            <MathJax.Node>{tex}</MathJax.Node>
                        </MathJax.Context>
                )}
                <div className="row">
                {(this.props.isInstructor || this.props.gA1Editable) &&
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
                }
                <div className="col-sm-2">
                {this.props.isInstructor &&
                 <div className="form-check">
                 <label className="form-check-label">
                 <input
                 id="gA1Editable"
                 className="form-check-input"
                 type="checkbox"
                 onChange={handleFormUpdate.bind(this)}
                 checked={this.props.gA1Editable} />
                 Student editable
                 </label>
                 </div>
                }
            </div>

                <div className="col-sm-4">
                {(this.props.isInstructor || this.props.gA2Editable) &&
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
                }
                    </div>
                <div className="col-sm-2">
                {this.props.isInstructor &&
                 <div className="form-check">
                 <label className="form-check-label">
                 <input
                 id="gA2Editable"
                 className="form-check-input"
                 type="checkbox"
                 onChange={handleFormUpdate.bind(this)}
                 checked={this.props.gA2Editable} />
                 Student editable
                 </label>
                 </div>
                }
            </div>
                </div>

                <div className="row">
                <EditableControl
            id="gLine1Label"
            name="Orange line label"
            value={this.props.gLine1Label}
            valueEditable={this.props.gLine1LabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />
                </div>

                <div className="row">
                <EditableControl
            id="gXAxisLabel"
            name="X-axis label"
            value={this.props.gXAxisLabel}
            valueEditable={this.props.gXAxisLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />

                <EditableControl
            id="gYAxisLabel"
            name="Y-axis label"
            value={this.props.gYAxisLabel}
            valueEditable={this.props.gYAxisLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />
                </div>

                <div className="row">
                <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Horizontal intersection label"
            value={this.props.gIntersectionHorizLineLabel}
            valueEditable={this.props.gIntersectionHorizLineLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />

                <EditableControl
            id="gIntersectionVertLineLabel"
            name="Vertical intersection label"
            value={this.props.gIntersectionVertLineLabel}
            valueEditable={this.props.gIntersectionVertLineLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />
                </div>

                </div>
        );
    }
}

ConsumptionLeisureEditor.propTypes = {
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionLabelEditable: PropTypes.bool.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabelEditable: PropTypes.bool.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabelEditable: PropTypes.bool.isRequired,

    gXAxisLabel: PropTypes.string.isRequired,
    gXAxisLabelEditable: PropTypes.bool.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,
    gYAxisLabelEditable: PropTypes.bool.isRequired,

    gA1: PropTypes.number.isRequired,
    gA1Editable: PropTypes.bool.isRequired,
    gA2: PropTypes.number.isRequired,
    gA2Editable: PropTypes.bool.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool.isRequired,

    isInstructor: PropTypes.bool.isRequired
}
