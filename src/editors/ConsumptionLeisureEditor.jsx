import React from 'react';
import PropTypes from 'prop-types';
import {MathComponent} from 'mathjax-react';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionLeisureEditor extends React.Component {
    render() {
        let tex = '';
        if (this.props.gType === 15) {
            tex = String.raw`c = (${this.props.gA1} - x)w(1 - ${this.props.gA4})`;
        } else {
            tex = String.raw`c = (${this.props.gA1} - x)w`;
        }

        return (
            <div>
                {this.props.isInstructor &&
                        <React.Fragment>
                            <h2>Function</h2>
                            <div className="row">
                                <MathComponent tex={tex} />
                            </div>
                            <hr/>
                        </React.Fragment>
                }

                {this.props.displaySliders && (
                    <React.Fragment>
                        <h2>Slope</h2>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="gA1">
                                        Horizontal intercept value <strong>T</strong>
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
                                        Real Wage <strong>w</strong>
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

                        {this.props.gType === 15 && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="gA3">
                                            Rel. Preference <strong>α</strong>
                                        </label>
                                        <RangeEditor
                                            id="gA3"
                                            dataId="gA3"
                                            value={this.props.gA3}
                                            min={0.00001}
                                            max={0.99999}
                                            handler={handleFormUpdate.bind(this)} />
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="gA4">
                                            Tax Rate <strong>t</strong>
                                        </label>
                                        <RangeEditor
                                            id="gA4"
                                            dataId="gA4"
                                            value={this.props.gA4}
                                            min={0}
                                            max={0.99999}
                                            handler={handleFormUpdate.bind(this)} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr/>
                    </React.Fragment>
                )}

                {this.props.displayLabels && (
                    <React.Fragment>
                        <h2>Labels</h2>
                        <div className="row">
                            <EditableControl
                                id="gLine1Label"
                                name="Orange line label"
                                value={this.props.gLine1Label}
                                valueEditable={true}
                                isInstructor={this.props.isInstructor}
                                updateGraph={this.props.updateGraph}
                            />
                            {this.props.gType === 15 && (
                                <EditableControl
                                    id="gIntersectionLabel"
                                    name="Optimal point label"
                                    value={this.props.gIntersectionLabel}
                                    valueEditable={true}
                                    isInstructor={this.props.isInstructor}
                                    updateGraph={this.props.updateGraph}
                                />
                            )}
                        </div>
                    </React.Fragment>
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

                {this.props.gType === 15 && this.props.displayLabels && (
                    <div className="row">
                        <EditableControl
                            id="gIntersection2HorizLineLabel"
                            name="Optimal point&apos;s horizontal line label"
                            value={this.props.gIntersection2HorizLineLabel}
                            valueEditable={true}
                            isInstructor={this.props.isInstructor}
                            updateGraph={this.props.updateGraph}
                        />

                        <EditableControl
                            id="gIntersection2VertLineLabel"
                            name="Optimal point&apos;s vertical line label"
                            value={this.props.gIntersection2VertLineLabel}
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
    gType: PropTypes.number.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gIntersection2HorizLineLabel: PropTypes.string,
    gIntersection2VertLineLabel: PropTypes.string,

    gXAxisLabel: PropTypes.string.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,

    gA1: PropTypes.number.isRequired,
    gA2: PropTypes.number.isRequired,
    gA3: PropTypes.number,
    gA4: PropTypes.number,

    gLine1Label: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
