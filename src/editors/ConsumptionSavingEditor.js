import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from '../RangeEditor';
import {handleFormUpdate} from '../utils';

export default class ConsumptionSavingEditor extends React.Component {
    render() {
        const tex = 'c_2 = y_2 + (1 + r) (y_1 + ω - c_1)';

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
                    <div className="col-sm-2">
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
                    </div>

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
                    <div className="col-sm-2">
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
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA3">
                                &omega;
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
                    <div className="col-sm-2">
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
                    </div>

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
                    <div className="col-sm-2">
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
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gLine1Label">
                                Orange line label
                            </label>
                            <input id="gLine1Label"
                                   value={this.props.gLine1Label}
                                   onChange={handleFormUpdate.bind(this)}
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine1LabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine1LabelEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gIntersectionLabel">
                                Intersection point label:
                            </label>
                            <input id="gIntersectionLabel"
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   value={this.props.gIntersectionLabel}
                                   onChange={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gIntersectionLabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gIntersectionLabelEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gIntersectionHorizLineLabel">
                                Intersection&apos;s horizontal line label:
                            </label>
                            <input id="gIntersectionHorizLineLabel"
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   value={this.props.gIntersectionHorizLineLabel}
                                   onChange={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gIntersectionHorizLineLabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gIntersectionHorizLineLabelEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gIntersectionVertLineLabel">
                                Intersection&apos;s vertical line label:
                            </label>
                            <input id="gIntersectionVertLineLabel"
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   value={this.props.gIntersectionVertLineLabel}
                                   onChange={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gIntersectionVertLineLabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gIntersectionVertLineLabelEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ConsumptionSavingEditor.propTypes = {
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

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
