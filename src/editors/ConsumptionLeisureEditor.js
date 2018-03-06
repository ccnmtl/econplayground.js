import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from '../RangeEditor';
import {handleFormUpdate} from '../utils';

export default class ConsumptionLeisureEditor extends React.Component {
    render() {
        const tex = 'y = (' + this.props.gA1 + ' - x)w';

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
                {(this.props.isInstructor || this.props.gA1Editable) &&
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gA1">
                                X-intercept&apos;s value
                            </label>
                            <RangeEditor
                                id="gA1"
                                dataId="gA1"
                                value={this.props.gA1}
                                min={0}
                                max={9}
                                handler={handleFormUpdate.bind(this)} />
                        </div>
                 </div>
                }
                <div className="col-sm-2">
                {this.props.isInstructor &&
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
                }
            </div>

                <div className="col-sm-4">
                {(this.props.isInstructor || this.props.gA2Editable) &&
                        <div className="form-group">
                            <label htmlFor="gA2">
                                w
                            </label>
                            <RangeEditor
                                id="gA2"
                                dataId="gA2"
                                value={this.props.gA2}
                                min={0.01}
                                max={5}
                                handler={handleFormUpdate.bind(this)} />
                 </div>
                }
                    </div>
                <div className="col-sm-2">
                {this.props.isInstructor &&
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
                }
            </div>
                </div>

                <div className="row">
                {(this.props.isInstructor || this.props.gLine1LabelEditable) &&
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
                }
                <div className="col-sm-2">
                {this.props.isInstructor &&
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
                }
                    </div>
                </div>

                <div className="row">
                {(this.props.isInstructor || this.props.gIntersectionHorizLineLabelEditable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gIntersectionHorizLineLabel">
                                Horizontal intersection label
                            </label>
                            <input id="gIntersectionHorizLineLabel"
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   value={this.props.gIntersectionHorizLineLabel}
                                   onChange={handleFormUpdate.bind(this)} />
                        </div>
                 </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
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
                )}
            </div>

            {(this.props.isInstructor || this.props.gIntersectionVertLineLabelEditable) && (
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="gIntersectionVertLineLabel">
                            Vertical intersection label
                        </label>
                        <input id="gIntersectionVertLineLabel"
                               className="form-control form-control-sm"
                               type="text"
                               maxLength="60"
                               value={this.props.gIntersectionVertLineLabel}
                               onChange={handleFormUpdate.bind(this)} />
                    </div>
                </div>
            )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                id="gIntersectionVertLineLabelEditable"
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleFormUpdate.bind(this)}
                                checked={this.props.gIntersectionVertLabelEditable} />
                            Student editable
                        </label>
                    </div>
                )}
            </div>
                </div>

                </div>
        );
    }
}

ConsumptionLeisureEditor.propTypes = {
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string.isRequired,
    gIntersectionHorizLineLabelEditable: PropTypes.bool.isRequired,
    gIntersectionVertLineLabel: PropTypes.string.isRequired,
    gIntersectionVertLineLabelEditable: PropTypes.bool.isRequired,

    gA1: PropTypes.number.isRequired,
    gA1Editable: PropTypes.bool.isRequired,
    gA2: PropTypes.number.isRequired,
    gA2Editable: PropTypes.bool.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,

    isInstructor: PropTypes.bool.isRequired
}
