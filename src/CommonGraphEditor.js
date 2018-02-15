import React from 'react';
import PropTypes from 'prop-types';
import {handleFormUpdate} from './utils';

/**
 * This component contains the form fields common to all graph types,
 * like title, description, etc.
 */
export default class CommonGraphEditor extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="graph-title">
                                Title
                            </label>
                            <input id="gTitle"
                                   onChange={handleFormUpdate.bind(this)}
                                   value={this.props.gTitle}
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="140"
                                   />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="graph-instructor-notes">
                                Instructor Notes
                            </label>
                            <textarea id="gInstructorNotes"
                                      onChange={handleFormUpdate.bind(this)}
                                      value={this.props.gInstructorNotes}
                                      className="form-control form-control-sm" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="graph-description">
                                Description
                            </label>
                            <textarea id="gDescription"
                                      onChange={handleFormUpdate.bind(this)}
                                      value={this.props.gDescription}
                                      className="form-control form-control-sm" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                     id="gNeedsSubmit"
                                     className="form-check-input"
                                     type="checkbox"
                                     onChange={handleFormUpdate.bind(this)}
                                     checked={this.props.gNeedsSubmit} />
                                Requires submission
                            </label>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                     id="gDisplayFeedback"
                                     className="form-check-input"
                                     type="checkbox"
                                     onChange={handleFormUpdate.bind(this)}
                                     checked={this.props.gDisplayFeedback} />
                                Display feedback
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                     id="gShowIntersection"
                                     className="form-check-input"
                                     type="checkbox"
                                     onChange={handleFormUpdate.bind(this)}
                                     checked={this.props.gShowIntersection} />
                                Display intersection
                            </label>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                     id="gIsPublished"
                                     className="form-check-input"
                                     type="checkbox"
                                     onChange={handleFormUpdate.bind(this)}
                                     checked={this.props.gIsPublished} />
                                Published
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                     id="gDisplayShadow"
                                     className="form-check-input"
                                     type="checkbox"
                                     onChange={handleFormUpdate.bind(this)}
                                     checked={this.props.gDisplayShadow} />
                                Display shadow on student view
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CommonGraphEditor.propTypes = {
    gTitle: PropTypes.string,
    gInstructorNotes: PropTypes.string,
    gDescription: PropTypes.string,
    gNeedsSubmit: PropTypes.bool,
    gDisplayFeedback: PropTypes.bool,
    gShowIntersection: PropTypes.bool,
    gDisplayShadow: PropTypes.bool,
    gIsPublished: PropTypes.bool,

    updateGraph: PropTypes.func.isRequired
}
