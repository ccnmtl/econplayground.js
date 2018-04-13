import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class NonLinearDemandSupplyEditor extends React.Component {
    render() {
        const tex = 'MP_N = (1 - α)AK^α N^{-α}';
        return (
            <div>
                {this.props.isInstructor && (
                <MathJax.Context
                    script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML"
                    input="tex"
                    options={{
                        displayAlign: 'left',
                        messageStyle: 'none'
                    }}>
                    <MathJax.Node>{tex}</MathJax.Node>
                </MathJax.Context>
                )}
                <div className="form-row">
                    {(this.props.isInstructor || true) && (
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
                    )}
                </div>

                <div className="row">
                {(this.props.isInstructor || true) && (
                    <div className="col-sm-4">
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
                )}

            {(this.props.isInstructor || true) && (
                <div className="col-sm-4">
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
            )}
            </div>

                <div className="row">
                    <EditableControl
                        id="gLine1Label"
                        name="Orange line label"
                        value={this.props.gLine1Label}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gLine2Label"
                        name="Blue line label"
                        value={this.props.gLine2Label}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                </div>

                <div className="row">
                    <EditableControl
                        id="gIntersectionLabel"
                        name="Intersection point label"
                        value={this.props.gIntersectionLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                </div>

                <div className="row">
                    <EditableControl
                        id="gIntersectionHorizLineLabel"
                        name="Intersection&apos;s horizontal line label"
                        value={this.props.gIntersectionHorizLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />

                    <EditableControl
                        id="gIntersectionVertLineLabel"
                        name="Intersection&apos;s vertical line label"
                        value={this.props.gIntersectionVertLineLabel}
                        valueEditable={true}
                        isInstructor={this.props.isInstructor}
                        updateGraph={this.props.updateGraph}
                        />
                </div>
            </div>
        );
    }
}

NonLinearDemandSupplyEditor.propTypes = {
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gCobbDouglasA: PropTypes.number.isRequired,
    gCobbDouglasK: PropTypes.number.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine1Slope: PropTypes.number.isRequired,

    isInstructor: PropTypes.bool.isRequired
};
