import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionSavingEditor extends React.Component {
    render() {
        const tex = 'c_2 = y_2 + (1 + r) (y_1 + W - c_1)';

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
                <div className="col-sm-6">
                </div>
                <div className="col-sm-4">
                <div className="form-check">
                <label className="form-check-label">
                <input
            id="gShowIntersection"
            className="form-check-input"
            type="checkbox"
            onChange={handleFormUpdate.bind(this)}
            checked={this.props.gShowIntersection} />
                Show endowment point
            </label>
                </div>
                </div>
                </div>

                <div className="row">
                {(this.props.isInstructor || this.props.gA1Editable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA1">
                                y<sub>1</sub>
                            </label>
                            <RangeEditor
                                id="gA1"
                                dataId="gA1"
                                value={this.props.gA1}
                                min={-5}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
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
                )}
            </div>

                {(this.props.isInstructor || this.props.gA2Editable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA2">
                                y<sub>2</sub>
                            </label>
                            <RangeEditor
                                id="gA2"
                                dataId="gA2"
                                value={this.props.gA2}
                                min={-5}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
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
                )}
            </div>
                </div>

                <div className="row">
                {(this.props.isInstructor || this.props.gA3Editable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA3">
                                W
                            </label>
                            <RangeEditor
                                id="gA3"
                                dataId="gA3"
                                value={this.props.gA3}
                                min={-5}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                        </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                id="gA3Editable"
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleFormUpdate.bind(this)}
                                checked={this.props.gA3Editable} />
                            Student editable
                        </label>
                    </div>
                )}
            </div>

                {(this.props.isInstructor || this.props.gA4Editable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA4">
                                r
                            </label>
                            <RangeEditor
                                id="gA4"
                                dataId="gA4"
                                value={this.props.gA4}
                                min={0}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                id="gA4Editable"
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleFormUpdate.bind(this)}
                                checked={this.props.gA4Editable} />
                            Student editable
                        </label>
                    </div>
                )}
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
            id="gIntersectionLabel"
            name="Endowment point label"
            value={this.props.gIntersectionLabel}
            valueEditable={this.props.gIntersectionLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />
                </div>

                <div className="row">
                <EditableControl
            id="gIntersectionHorizLineLabel"
            name="Endowment point&apos;s horizontal line label"
            value={this.props.gIntersectionHorizLineLabel}
            valueEditable={this.props.gIntersectionHorizLineLabelEditable}
            isInstructor={this.props.isInstructor}
            updateGraph={this.props.updateGraph}
                />

                <EditableControl
            id="gIntersectionVertLineLabel"
            name="Endowment point&apos;s vertical line label"
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

ConsumptionSavingEditor.propTypes = {
    gShowIntersection: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabelEditable: PropTypes.bool.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabelEditable: PropTypes.bool.isRequired,

    gA1: PropTypes.number.isRequired,
    gA1Editable: PropTypes.bool.isRequired,
    gA2: PropTypes.number.isRequired,
    gA2Editable: PropTypes.bool.isRequired,
    gA3: PropTypes.number.isRequired,
    gA3Editable: PropTypes.bool.isRequired,
    gA4: PropTypes.number.isRequired,
    gA4Editable: PropTypes.bool.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,

    isInstructor: PropTypes.bool.isRequired
}
