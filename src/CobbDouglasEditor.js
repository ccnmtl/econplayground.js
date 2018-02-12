import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax'
import RangeEditor from './RangeEditor';
import {handleFormUpdate} from './utils';

export default class CobbDouglasEditor extends React.Component {
    render() {
        // eslint thinks these \a characters are unnecessary escapes,
        // but it's actually latex syntax.
        /* eslint-disable */
        let tex = '= ' + this.props.gCobbDouglasAName +
            this.props.gCobbDouglasKName +
            '^α' + this.props.gCobbDouglasLName +
            '^{1 - α}';
        /* eslint-enable */

        if (!this.props.isInstructor) {
            tex = this.props.gCobbDouglasYName + ' ' + tex;
        }

        return (
            <div>
                <div>
                    This is a projection of the Cobb-Douglas function
                    with {this.props.gCobbDouglasLName} plotted along
                    the X-axis.
                    <div className="form-inline">
                        {this.props.isInstructor && (
                            <input type="text"
                                   className="form-control form-control-sm mr-2"
                                   data-id="gCobbDouglasYName"
                                   value={this.props.gCobbDouglasYName}
                                   maxLength="1"
                                   size="1"
                                   onChange={handleFormUpdate.bind(this)}
                                   />
                        )}
                        <MathJax.Context
                            script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML"
                            input="tex"
                            options={{
                                displayAlign: 'left'
                            }}>
                            <MathJax.Node>{tex}</MathJax.Node>
                        </MathJax.Context>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="gCobbDouglasA">
                            {this.props.isInstructor ? (
                                <input type="text"
                                       id="gCobbDouglasAName"
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
            min={0} />
                </div>

                <div className="col-sm-2">
                {this.props.isInstructor &&
                 <div className="form-check">
                 <label className="form-check-label">
                 <input
                 id="gCobbDouglasAEditable"
                 className="form-check-input"
                 type="checkbox"
                 onChange={handleFormUpdate.bind(this)}
                 checked={this.props.gCobbDouglasAEditable} />
                 Student editable
                 </label>
                 </div>
                }
            </div>

                <div className="col-sm-4">
                <div className="form-group">
                <label htmlFor="gCobbDouglasK">
                {this.props.isInstructor ? (
                    <input type="text"
                           id="gCobbDouglasKName"
                           maxLength="1"
                           size="1"
                           className="form-control form-control-sm"
                           value={this.props.gCobbDouglasKName}
                           onChange={handleFormUpdate.bind(this)}
                           />
                ) : (
                    this.props.gCobbDouglasKName
                )}
            </label>
                <RangeEditor
            dataId="gCobbDouglasK"
            value={this.props.gCobbDouglasK}
            handler={handleFormUpdate.bind(this)}
            min={0} />
                </div>
                </div>
                <div className="col-sm-2">
                {this.props.isInstructor &&
                 <div className="form-check">
                 <label className="form-check-label">
                 <input
                 id="gCobbDouglasKEditable"
                 className="form-check-input"
                 type="checkbox"
                 onChange={handleFormUpdate.bind(this)}
                 checked={this.props.gCobbDouglasKEditable} />
                 Student editable
                 </label>
                 </div>
                }
            </div>
                </div>

                <div className="row">
                <div className="col-sm-4">
                <label htmlFor="gCobbDouglasAlpha">
                &alpha;
            </label>
                <RangeEditor
            dataId="gCobbDouglasAlpha"
            value={this.props.gCobbDouglasAlpha}
            handler={handleFormUpdate.bind(this)}
            min={0}
            max={1} />
                </div>
                <div className="col-sm-2">
                {this.props.isInstructor &&
                 <div className="form-check">
                 <label className="form-check-label">
                 <input
                 id="gCobbDouglasAlphaEditable"
                 className="form-check-input"
                 type="checkbox"
                 onChange={handleFormUpdate.bind(this)}
                 checked={this.props.gCobbDouglasAlphaEditable} />
                 Student editable
                 </label>
                 </div>
                }
            </div>

                <div className="col-sm-4">
                <label htmlFor="gCobbDouglasL">
                {this.props.isInstructor ? (
                    <input type="text"
                           id="gCobbDouglasLName"
                           maxLength="1"
                           size="1"
                           className="form-control form-control-sm"
                           value={this.props.gCobbDouglasLName}
                           onChange={handleFormUpdate.bind(this)}
                           />
                ) : (
                    this.props.gCobbDouglasLName
                )}
            </label>
                <RangeEditor
            dataId="gCobbDouglasL"
            value={this.props.gCobbDouglasL}
            handler={handleFormUpdate.bind(this)}
            min={0}
            max={10} />
                {this.props.isInstructor && (
                    <small className="form-text text-muted ml-sm-2">
                        This variable is plotted along the X-axis.
                    </small>
                )}
            </div>
                <div className="col-sm-2">
                {this.props.isInstructor && (
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                id="gCobbDouglasLEditable"
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleFormUpdate.bind(this)}
                                checked={this.props.gCobbDouglasLEditable} />
                            Student editable
                        </label>
                    </div>
                )}
            </div>
                </div>



            {this.props.isInstructor && (
                <div>
                    <hr />
                    <h4>Feedback</h4>
                    <div className="row">
                        <div className="col-sm-4 mb-4">
                            <label htmlFor="gCobbDouglasCorrectScenario">
                                Correct student scenario
                            </label>
                            <select
                                id="gCobbDouglasCorrectScenario"
                                name="gCobbDouglasCorrectScenario"
                                className="custom-select form-control-sm"
                                value={this.props.gCobbDouglasCorrectScenario}
                                onChange={handleFormUpdate.bind(this)}>
                                <option value="0">{this.props.gCobbDouglasAName} increased</option>
                                <option value="1">{this.props.gCobbDouglasAName} decreased</option>
                                <option value="2">{this.props.gCobbDouglasKName} increased</option>
                                <option value="3">{this.props.gCobbDouglasKName} decreased</option>
                                <option value="4">&alpha; increased</option>
                                <option value="5">&alpha; decreased</option>
                                <option value="6">{this.props.gCobbDouglasLName} increased</option>
                                <option value="7">{this.props.gCobbDouglasLName} decreased</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 mb-4">
                            <label htmlFor="gCorrectFeedback">
                                Correct student feedback
                            </label>
                            <textarea
                                id="gCorrectFeedback"
                                name="gCorrectFeedback"
                                className="form-control form-control-sm"
                                onChange={handleFormUpdate.bind(this)}>
                                {this.props.gCorrectFeedback}
                            </textarea>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <label htmlFor="gIncorrectFeedback">
                                Incorrect student feedback
                            </label>
                            <textarea
                                id="gIncorrectFeedback"
                                name="gIncorrectFeedback"
                                className="form-control form-control-sm"
                                onChange={handleFormUpdate.bind(this)}>
                                {this.props.gIncorrectFeedback}
                            </textarea>
                        </div>
                    </div>
                </div>
            )}

            </div>
        );
    }
}

CobbDouglasEditor.propTypes = {
    gTitle: PropTypes.string,
    gType: PropTypes.number,
    gCorrectFeedback: PropTypes.string,
    gIncorrectFeedback: PropTypes.string,
    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasAEditable: PropTypes.bool,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasLEditable: PropTypes.bool,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasKEditable: PropTypes.bool,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaEditable: PropTypes.bool,
    gCobbDouglasYName: PropTypes.string,
    gCobbDouglasCorrectScenario: PropTypes.number,

    isInstructor: PropTypes.bool.isRequired
}
