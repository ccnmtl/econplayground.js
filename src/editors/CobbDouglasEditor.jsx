import React from 'react';
import PropTypes from 'prop-types';
import {MathComponent} from 'mathjax-react';
import RangeEditor from '../form-components/RangeEditor';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class CobbDouglasEditor extends React.Component {
    render() {
        let tex = String.raw`= ${this.props.gCobbDouglasAName}${this.props.gCobbDouglasKName}^\alpha ${this.props.gCobbDouglasLName}^{1 - \alpha}`;

        if (!this.props.isInstructor) {
            tex = String.raw`${this.props.gCobbDouglasYName} ${tex}`;
        }

        return (
            <div>
                <h2>Function</h2>
                This is a projection of the Cobb-Douglas function
                with {this.props.gCobbDouglasLName} plotted along
                the X-axis.
                <div className="form-inline">
                    {this.props.isInstructor && (
                        <input type="text"
                            className="form-control form-control-sm mr-2"
                            name="gCobbDouglasYName"
                            value={this.props.gCobbDouglasYName}
                            maxLength="1"
                            size="1"
                            onChange={handleFormUpdate.bind(this)}
                        />
                    )}
                    <MathComponent tex={tex} />
                </div>
                <hr/>

                {this.props.displaySliders && (
                    <React.Fragment>
                        <h2>Slope</h2>
                        <div className="row">
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
                                    min={0} />
                            </div>

                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="gCobbDouglasK">
                                        {this.props.isInstructor ? (
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
                                        )}
                                    </label>
                                    <RangeEditor
                                        dataId="gCobbDouglasK"
                                        value={this.props.gCobbDouglasK}
                                        handler={handleFormUpdate.bind(this)}
                                        min={0} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}

                {this.props.displaySliders && (
                    <React.Fragment>
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
                                    max={1}
                                    showMinMax={true}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label htmlFor="gCobbDouglasL">
                                    {this.props.isInstructor ? (
                                        <input type="text"
                                            name="gCobbDouglasLName"
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
                        </div>
                        <hr/>
                    </React.Fragment>
                )}

                {this.props.displayLabels && (
                    <React.Fragment>
                        <h2>Label</h2>
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
                    </React.Fragment>
                )}
            </div>
        );
    }
}

CobbDouglasEditor.propTypes = {
    gCobbDouglasA: PropTypes.number.isRequired,
    gCobbDouglasAName: PropTypes.string.isRequired,
    gCobbDouglasL: PropTypes.number.isRequired,
    gCobbDouglasLName: PropTypes.string.isRequired,
    gCobbDouglasK: PropTypes.number.isRequired,
    gCobbDouglasKName: PropTypes.string.isRequired,
    gCobbDouglasAlpha: PropTypes.number.isRequired,
    gCobbDouglasYName: PropTypes.string.isRequired,
    gIntersectionLabel: PropTypes.string.isRequired,

    displayLabels: PropTypes.bool.isRequired,
    displaySliders: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired
};
