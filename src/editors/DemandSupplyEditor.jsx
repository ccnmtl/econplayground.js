import React from 'react';
import PropTypes from 'prop-types';
import EditableControl from '../form-components/EditableControl';
import RangeEditor from '../form-components/RangeEditor';
import {handleFormUpdate} from '../utils';

export default class DemandSupplyEditor extends React.Component {
    render() {
        return <React.Fragment>
            {this.props.displaySliders && (
                <div>
                    <h2>Slope</h2>
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
                                showOverrideButton={true}
                                overrideLabel='Vertical'
                                overrideValue={999}
                                showOverride2Button={true}
                                override2Label='Horizontal'
                                override2Value={0}
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
                                    showOverrideButton={true}
                                    overrideLabel='Vertical'
                                    overrideValue={-999}
                                    showOverride2Button={true}
                                    override2Label='Horizontal'
                                    override2Value={0}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
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
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                        <EditableControl
                            id="gLine2Label"
                            name="Blue line label"
                            value={this.props.gLine2Label}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gXAxisLabel"
                            name="X-axis label"
                            value={this.props.gXAxisLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                        <EditableControl
                            id="gYAxisLabel"
                            name="Y-axis label"
                            value={this.props.gYAxisLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionLabel"
                            name="Intersection point label"
                            value={this.props.gIntersectionLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                    </div>

                    <div className="row">
                        <EditableControl
                            id="gIntersectionHorizLineLabel"
                            name="Intersection&apos;s horizontal line label"
                            value={this.props.gIntersectionHorizLineLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                        <EditableControl
                            id="gIntersectionVertLineLabel"
                            name="Intersection&apos;s vertical line label"
                            value={this.props.gIntersectionVertLineLabel}
                            valueEditable={true}
                            isInstructor={true}
                            updateGraph={this.props.updateGraph}/>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>;
    }
}

DemandSupplyEditor.propTypes = {
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gXAxisLabel: PropTypes.string.isRequired,
    gYAxisLabel: PropTypes.string.isRequired,

    gLine1Slope: PropTypes.number.isRequired,
    gLine1Label: PropTypes.string.isRequired,
    gLine2Slope: PropTypes.number.isRequired,
    gLine2Label: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
