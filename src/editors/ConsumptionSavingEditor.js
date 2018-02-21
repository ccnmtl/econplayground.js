import React from 'react';
import PropTypes from 'prop-types';
import RangeEditor from '../RangeEditor';
import {handleFormUpdate} from '../utils';

export default class ConsumptionSavingEditor extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gK">
                                r
                            </label>
                            <RangeEditor
                                id="gK"
                                dataId="gK"
                                value={this.props.gK}
                                min={0}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
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
                            <label htmlFor="gOmega">
                                &omega;
                            </label>
                            <RangeEditor
                                id="gOmega"
                                dataId="gOmega"
                                value={this.props.gOmega}
                                min={0.01}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
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

    gOmega: PropTypes.number.isRequired,
    gK: PropTypes.number.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,

    isInstructor: PropTypes.bool.isRequired
}
