import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class ConsumptionSavingEditor extends React.Component {
    render() {
        const tex = 'c_2 = y_2 + (1 + r) (y_1 + W - c_1)';

        return (
            <div>
                {this.props.isInstructor &&
                        <React.Fragment>
                            <h2>Function</h2>
                            <div className="row">
                                (<MathJax.Context
                                    script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML"
                                    input="tex"
                                    options={{
                                        displayAlign: 'left',
                                        messageStyle: 'none'
                                    }}>
                                    <MathJax.Node>{tex}</MathJax.Node>
                                </MathJax.Context>
                                )
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
            </div>
        );
    }
}

ConsumptionSavingEditor.propTypes = {
    gShowIntersection: PropTypes.bool.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gA1: PropTypes.number.isRequired,
    gA2: PropTypes.number.isRequired,
    gA3: PropTypes.number.isRequired,
    gA4: PropTypes.number.isRequired,

    gLine1Label: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
