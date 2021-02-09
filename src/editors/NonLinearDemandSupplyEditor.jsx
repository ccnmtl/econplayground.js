import React from 'react';
import PropTypes from 'prop-types';
import {MathComponent} from 'mathjax-react';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import AreaConfiguration from './AreaConfiguration';
import {handleFormUpdate} from '../utils';

export default class NonLinearDemandSupplyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.mathjaxOptions = {
            jax: ['input/TeX', 'output/CommonHTML'],
            displayAlign: 'left',
            messageStyle: 'none'
        };
    }
    render() {
        const func1 = String.raw`MP_N = (1 - \alpha)${this.props.gCobbDouglasAName}${this.props.gCobbDouglasKName}^\alpha N^{-\alpha}`;
        const func2 = String.raw`MP_${this.props.gCobbDouglasKName} = \alpha ${this.props.gCobbDouglasAName}${this.props.gCobbDouglasKName}^{\alpha - 1} N^{1 - \alpha}`;
        return (
            <>
                {this.props.isInstructor && !this.props.hideFunctionChoice && (
                    <React.Fragment>
                        <h2>Function</h2>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           type="radio"
                                           name="gFunctionChoice"
                                           id="gFunctionChoice1"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={0}
                                           checked={this.props.gFunctionChoice === 0} />

                                    <label className="form-check-label" htmlFor="gFunctionChoice1">
                                        <MathComponent tex={func1} />
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           type="radio"
                                           name="gFunctionChoice"
                                           id="gFunctionChoice2"
                                           onChange={handleFormUpdate.bind(this)}
                                           value={1}
                                           checked={this.props.gFunctionChoice === 1} />
                                    <label className="form-check-label" htmlFor="gFunctionChoice2">
                                        <MathComponent tex={func2} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </React.Fragment>
                )}
                {this.props.displaySliders && (
                    <React.Fragment>
                        <h2>Slope</h2>
                        <div className="form-row">
                            <div className="col-sm-4">
                                <label htmlFor="gLine1Slope">
                                    Orange line slope
                                </label>
                                <RangeEditor
                                    dataId="gLine1Slope"
                                    value={this.props.gLine1Slope}
                                    showOverrideButton={true}
                                    overrideLabel='Vertical'
                                    overrideValue={999}
                                    showOverride2Button={true}
                                    override2Label='Horizontal'
                                    override2Value={0}
                                    handler={handleFormUpdate.bind(this)} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="gCobbDouglasA">
                                    {this.props.isInstructor ? (
                                        <input type="text"
                                            name="gCobbDouglasAName"
                                            maxLength="1"
                                            size="1"
                                            className="form-control form-control-sm"
                                            value={this.props.gCobbDouglasAName}
                                            onChange={handleFormUpdate.bind(this)}
                                        />
                                    ) : (
                                        this.props.gCobbDouglasAName
                                    )}
                                </label>
                                <RangeEditor
                                    dataId="gCobbDouglasA"
                                    value={this.props.gCobbDouglasA}
                                    handler={handleFormUpdate.bind(this)}
                                    min={0.1}
                                    max={5} />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="gCobbDouglasK">
                                    {this.props.gFunctionChoice === 1 && 'N'}
                                    {this.props.gFunctionChoice !== 1 &&
                                     (this.props.isInstructor ? (
                                        <input type="text"
                                               name="gCobbDouglasKName"
                                               maxLength="1"
                                               size="1"
                                               className="form-control form-control-sm"
                                               value={this.props.gCobbDouglasKName}
                                               onChange={handleFormUpdate.bind(this)}
                                        />
                                    ) : (
                                        this.props.gCobbDouglasKName
                                    ))}
                                </label>
                                <RangeEditor
                                    dataId="gCobbDouglasK"
                                    value={this.props.gCobbDouglasK}
                                    handler={handleFormUpdate.bind(this)}
                                    min={0.1}
                                    max={5} />
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

                            <EditableControl
                                id="gLine2Label"
                                name="Blue line label"
                                value={this.props.gLine2Label}
                                valueEditable={true}
                                isInstructor={this.props.isInstructor}
                                updateGraph={this.props.updateGraph}
                            />
                        </div>
                        <hr/>
                    </React.Fragment>
                )}

                {this.props.displayLabels && (
                    <div className="row">
                        <EditableControl
                            id="gIntersectionLabel"
                            name="Intersection point label"
                            value={this.props.gIntersectionLabel}
                            valueEditable={true}
                            isInstructor={this.props.isInstructor}
                            updateGraph={this.props.updateGraph}
                        />
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
                )}

                {this.props.showAUC && (
                    <AreaConfiguration
                        displayLabels={this.props.displayLabels}
                        gAreaConfiguration={this.props.gAreaConfiguration}
                        gIsAreaDisplayed={this.props.gIsAreaDisplayed}

                        gAreaAName={this.props.gAreaAName}
                        gAreaBName={this.props.gAreaBName}
                        gAreaCName={this.props.gAreaCName}

                        updateGraph={this.props.updateGraph}
                    />
                )}
            </>
        );
    }
}

NonLinearDemandSupplyEditor.propTypes = {
    updateGraph: PropTypes.func.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,

    gCobbDouglasA: PropTypes.number.isRequired,
    gCobbDouglasAName: PropTypes.string.isRequired,
    gCobbDouglasK: PropTypes.number.isRequired,
    gCobbDouglasKName: PropTypes.string.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine2Label: PropTypes.string.isRequired,
    gLine1Slope: PropTypes.number.isRequired,

    gFunctionChoice: PropTypes.number.isRequired,
    hideFunctionChoice: PropTypes.bool,

    gAreaConfiguration: PropTypes.number,
    gIsAreaDisplayed: PropTypes.bool,

    gAreaAName: PropTypes.string,
    gAreaBName: PropTypes.string,
    gAreaCName: PropTypes.string,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired,
    showAUC: PropTypes.bool.isRequired
};
