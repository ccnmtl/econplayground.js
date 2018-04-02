import React from 'react';
import PropTypes from 'prop-types';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ADASEditor extends React.Component {
    render() {
        return (
            <div>
                <div className="form-row">
                    <div className="col-sm-4">
                        <label htmlFor="gLine1Slope">
                            Orange line slope
                        </label>
                        <RangeEditor
                            dataId="gLine1Slope"
                            value={this.props.gLine1Slope}
                            min={0}
                            max={5}
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

                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gLine2Slope">
                                Blue line slope
                            </label>
                            <RangeEditor
                                dataId="gLine2Slope"
                                min={-5}
                                max={0}
                                value={this.props.gLine2Slope}
                                showOverrideCheckbox={true}
                                overrideLabel='Vertical'
                                overrideValue={-999}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine2SlopeEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine2SlopeEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-sm-4">
                        <label htmlFor="gLine3Slope">
                            Red line slope
                        </label>
                        <RangeEditor
                            dataId="gLine3Slope"
                            value={this.props.gLine3Slope}
                            min={0}
                            max={5}
                            showOverrideCheckbox={true}
                            overrideLabel='Vertical'
                            overrideValue={999}
                            handler={handleFormUpdate.bind(this)} />
                    </div>
                    <div className="col-sm-2">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine3SlopeEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine3SlopeEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gDisplayIntersection1"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gDisplayIntersection1} />
                                Show Orange-Blue intersection
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gDisplayIntersection2"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gDisplayIntersection2} />
                                Show Blue-Red intersection
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gDisplayIntersection3"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gDisplayIntersection3} />
                                Show Orange-Red intersection
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine1Dashed"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine1Dashed} />
                                Orange line dashed?
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine2Dashed"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine2Dashed} />
                                Blue line dashed?
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gLine3Dashed"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine3Dashed} />
                                Red line dashed?
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gLine1Label">

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
                            <label htmlFor="gLine2Label">
                                Red line label
                            </label>
                            <input id="gLine3Label"
                                   value={this.props.gLine3Label}
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
                                    id="gLine3LabelEditable"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gLine3LabelEditable} />
                                Student editable
                            </label>
                        </div>
                    </div>
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

ADASEditor.propTypes = {
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

    gLine1Slope: PropTypes.number.isRequired,
    gLine1SlopeEditable: PropTypes.bool.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2SlopeEditable: PropTypes.bool.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine2LabelEditable: PropTypes.bool.isRequired,
    gLine3Slope: PropTypes.number.isRequired,
    gLine3SlopeEditable: PropTypes.bool.isRequired,
    gLine3Label: PropTypes.string.isRequired,
    gLine3LabelEditable: PropTypes.bool.isRequired,

    isInstructor: PropTypes.bool.isRequired
};
