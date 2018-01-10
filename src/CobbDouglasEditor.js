import React from 'react';
import PropTypes from 'prop-types';
import RangeEditor from './RangeEditor';
import {handleFormUpdate} from './utils';

export default class CobbDouglasEditor extends React.Component {
    render() {
        return (
            <div>
                <div>
                    This is a projection of the Cobb-Douglas
                    function with L plotted along the X-axis.
                    <div className="ml-2 mb-2">
                        <img width="120" height="18.33" src="data:image/png;base64,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" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="gCobbDouglasA">
                            A
                        </label>
                        <RangeEditor
                             dataId="gCobbDouglasA"
                             value={this.props.gCobbDouglasA}
                             handler={handleFormUpdate.bind(this)}
                             min={0} />
                    </div>
                    <div className="col-sm-2">
                        <label></label>
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
                    </div>

                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="gCobbDouglasK">
                                K
                            </label>
                            <RangeEditor
                                 dataId="gCobbDouglasK"
                                 value={this.props.gCobbDouglasK}
                                 handler={handleFormUpdate.bind(this)}
                                 min={0} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label></label>
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
                        <label></label>
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
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="gCobbDouglasL">
                            L
                        </label>
                        <RangeEditor
                            dataId="gCobbDouglasL"
                            value={this.props.gCobbDouglasL}
                            handler={handleFormUpdate.bind(this)}
                            min={0}
                            max={10} />
                    </div>
                    <div className="col-sm-2">
                        <label></label>
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
                    </div>
                </div>
            </div>
        );
    }
}

CobbDouglasEditor.propTypes = {
    gTitle: PropTypes.string,
    gType: PropTypes.number,
    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAEditable: PropTypes.bool,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLEditable: PropTypes.bool,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKEditable: PropTypes.bool,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaEditable: PropTypes.bool
}
