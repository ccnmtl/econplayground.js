import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from './RangeEditor';
import {handleFormUpdate} from './utils';

export default class NonLinearDemandSupplyEditor extends React.Component {
    render() {
        const tex = 'MP_N = (1 - α)AK^α N^{-α}';
        return (
            <div>
                <MathJax.Context
                    script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML"
                    input="tex"
                    options={{
                        displayAlign: 'left'
                    }}>
                    <MathJax.Node>{tex}</MathJax.Node>
                </MathJax.Context>
                <div className="form-row">
                    <div className="col-sm-4">
                        <label htmlFor="gLine1Slope">
                            Orange line slope
                        </label>
                        <RangeEditor
                            dataId="gLine1Slope"
                            value={this.props.gLine1Slope}
                            showOverrideCheckbox={true}
                            overrideLabel='Vertical'
                            overrideValue={999}
                            handler={handleFormUpdate.bind(this)} />
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine1SlopeEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine1SlopeEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="gCobbDouglasA">
                            A
                        </label>
                        <RangeEditor
                            dataId="gCobbDouglasA"
                            value={this.props.gCobbDouglasA}
                            handler={handleFormUpdate.bind(this)}
                            min={0.1}
                            max={5} />
                    </div>
                    <div className="col">
                        <label htmlFor="gCobbDouglasK">
                            K
                        </label>
                        <RangeEditor
                            dataId="gCobbDouglasK"
                            value={this.props.gCobbDouglasK}
                            handler={handleFormUpdate.bind(this)}
                            min={0.1}
                            max={5} />
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

                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gLine2Label">
                                Blue line label
                            </label>
                            <input id="gLine2Label"
                                   value={this.props.gLine2Label}
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
                                    id="gLine2LabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine2LabelEditable} />
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

NonLinearDemandSupplyEditor.propTypes = {
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasK: PropTypes.number,

    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,
    gLine2Label: PropTypes.string.isRequired,
    gLine2LabelEditable: PropTypes.bool,
    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeEditable: PropTypes.bool,

    isInstructor: PropTypes.bool.isRequired
}
