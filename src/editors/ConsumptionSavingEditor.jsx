import React from 'react';
import PropTypes from 'prop-types';
import {MathComponent} from 'mathjax-react';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionSavingEditor extends React.Component {
    render() {
        const tex = String.raw`c_2 = y_2 + (1 + r) (y_1 + W - c_1)`;

        return (
            <div>
                {this.props.isInstructor &&
                        <React.Fragment>
                            <h2>Function</h2>
                            <div className="row">
                                <MathComponent tex={tex} />
                            </div>
                        </React.Fragment>
                }

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
                <hr/>

                {this.props.displaySliders && (
                    <React.Fragment>
                        <h2>Slope</h2>
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
                                    min={0}
                                    max={5}
                                    handler={handleFormUpdate.bind(this)} />
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
                                    min={0}
                                    max={5}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                )}

                {this.props.displaySliders && (
                    <React.Fragment>
                        <div className="row">
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

                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="gA4">
                                        r
                                    </label>
                                    <RangeEditor
                                        id="gA4"
                                        dataId="gA4"
                                        value={this.props.gA4}
                                        min={-1}
                                        max={10}
                                        handler={handleFormUpdate.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {this.props.displaySliders &&
                 this.props.gType === 11 && (
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="gA5">
                                        β
                                    </label>
                                    <RangeEditor
                                        id="gA5"
                                        dataId="gA5"
                                        value={this.props.gA5}
                                        min={0.01}
                                        max={1}
                                        handler={handleFormUpdate.bind(this)} />
                                </div>
                            </div>
                        </div>
                )}

                {this.props.displaySliders && (
                    <hr/>
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

                            {this.props.gType === 11 && (
                                <EditableControl
                                    id="gLine2Label"
                                    name="Blue line label"
                                    value={this.props.gLine2Label}
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
                            id="gIntersectionLabel"
                            name="Endowment point label"
                            value={this.props.gIntersectionLabel}
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
                            name="Endowment point&apos;s horizontal line label"
                            value={this.props.gIntersectionHorizLineLabel}
                            valueEditable={true}
                            isInstructor={this.props.isInstructor}
                            updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersectionVertLineLabel"
                        name="Endowment point&apos;s vertical line label"
                        value={this.props.gIntersectionVertLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                    />
                </div>
                )}

                {this.props.gType === 11 && this.props.displayLabels && (
                    <div className="row">
                        <EditableControl
                            id="gIntersection2Label"
                            name="Optimal point label"
                            value={this.props.gIntersection2Label}
                            valueEditable={true}
                            isInstructor={this.props.isInstructor}
                            updateGraph={this.props.updateGraph}
                        />
                    </div>
                )}

                {this.props.gType === 11 && this.props.displayLabels && (
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

ConsumptionSavingEditor.propTypes = {
    gType: PropTypes.number.isRequired,

    gShowIntersection: PropTypes.bool.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gIntersection2Label: PropTypes.string,
    gIntersection2HorizLineLabel: PropTypes.string,
    gIntersection2VertLineLabel: PropTypes.string,

    gA1: PropTypes.number.isRequired,
    gA2: PropTypes.number.isRequired,
    gA3: PropTypes.number.isRequired,
    gA4: PropTypes.number.isRequired,
    gA5: PropTypes.number.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
