import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2'
import RangeEditor from '../RangeEditor';
import {handleFormUpdate} from '../utils';

export default class ConsumptionLeisureEditor extends React.Component {
    render() {
        // I'm using K for the x-intercept's value just as a general
        // place to store this number.
        // TODO: I've learned that these graph values should really be
        // consolidated in the model and called something like
        //   n1, n2, n3, n4, n5, etc.
        // Instead of named values like gCobbDouglasA and gY. Each graph type
        // can then use these arbitrary slots as needed.
        const tex = 'y = (' + this.props.gA1 + ' - x)ω';

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
                            <label htmlFor="gOmega">
                                &omega;
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
                {(this.props.isInstructor || this.props.gIntersectionLabelEditable) &&
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
                }
                <div className="col-sm-2">
                {this.props.isInstructor &&
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
                }
                    </div>
                </div>
            </div>
        );
    }
}

ConsumptionLeisureEditor.propTypes = {
    gIntersectionLabel: PropTypes.string,
    gIntersectionLabelEditable: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionHorizLineLabelEditable: PropTypes.bool,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersectionVertLineLabelEditable: PropTypes.bool,

    gA1: PropTypes.number.isRequired,
    gA1Editable: PropTypes.bool.isRequired,
    gA2: PropTypes.number.isRequired,
    gA2Editable: PropTypes.bool.isRequired,

    gLine1Label: PropTypes.string.isRequired,
    gLine1LabelEditable: PropTypes.bool,

    isInstructor: PropTypes.bool.isRequired
}
