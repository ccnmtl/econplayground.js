import React from 'react';
import PropTypes from 'prop-types';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ADASEditor extends React.Component {
    render() {
        return (
            <div>
                {this.props.displaySliders && (
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
                    </div>
                )}

                {this.props.displaySliders && (
                    <div className="form-row">
                        <div className="col-sm-4">
                            <label htmlFor="gLine3Slope">
                                Red line slope
                            </label>
                            <RangeEditor
                                dataId="gLine3Slope"
                                value={this.props.gLine3Slope}
                                min={-5}
                                max={5}
                                showOverrideCheckbox={true}
                                overrideLabel='Vertical'
                                overrideValue={999}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                )}

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

            {this.props.isInstructor && (
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
            )}

            {this.props.displayLabels && (
                <div className="row">
                    <EditableControl
                        id="gLine1Label"
                        name="Orange line"
                        value={this.props.gLine1Label}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gLine2Label"
                        name="Blue line"
                        value={this.props.gLine2Label}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                </div>
            )}

            {this.props.displayLabels && (
                <div className="row">
                    <EditableControl
                        id="gLine3Label"
                        name="Red line"
                        value={this.props.gLine3Label}
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
                        name="X-axis"
                        value={this.props.gXAxisLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gYAxisLabel"
                        name="Y-axis"
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
                        id="gIntersectionLabel"
                        name="Orange-Blue intersection"
                        value={this.props.gIntersectionLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersection2Label"
                        name="Blue-Red intersection"
                        value={this.props.gIntersection2Label}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                    </div>
            )}

            {this.props.displayLabels && (
                <div className="row">
                    <EditableControl
                        id="gIntersection3Label"
                        name="Orange-Red intersection"
                        value={this.props.gIntersection3Label}
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
                        name="Orange-Blue intersection horizontal"
                        value={this.props.gIntersectionHorizLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersectionVertLineLabel"
                        name="Orange-Blue intersection vertical"
                        value={this.props.gIntersectionVertLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                    </div>
            )}

            {this.props.displayLabels && (
                <div className="row">
                    <EditableControl
                        id="gIntersection2HorizLineLabel"
                        name="Blue-Red intersection horizontal"
                        value={this.props.gIntersection2HorizLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersection2VertLineLabel"
                        name="Blue-Red intersection vertical"
                        value={this.props.gIntersection2VertLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                    </div>
            )}

            {this.props.displayLabels && (
                <div className="row">
                    <EditableControl
                        id="gIntersection3HorizLineLabel"
                        name="Orange-Red intersection horizontal"
                        value={this.props.gIntersection3HorizLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersection3VertLineLabel"
                        name="Orange-Red intersection vertical"
                        value={this.props.gIntersection3VertLineLabel}
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

ADASEditor.propTypes = {
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersection2HorizLineLabel: PropTypes.string.isRequired,
    gIntersection2VertLineLabel: PropTypes.string.isRequired,
    gIntersection3HorizLineLabel: PropTypes.string.isRequired,
    gIntersection3VertLineLabel: PropTypes.string.isRequired,

    gXAxisLabel: PropTypes.string.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,

    gA1: PropTypes.number.isRequired,
    gA2: PropTypes.number.isRequired,

    gLine1Slope: PropTypes.number.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine3Slope: PropTypes.number.isRequired,
    gLine3Label: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
