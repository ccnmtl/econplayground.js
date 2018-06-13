import React from 'react';
import PropTypes from 'prop-types';
import {handleFormUpdate} from '../utils';

/**
 * This component contains the form fields for assignment type,
 * and visibility settings.
 */
export default class CommonGraphSettings extends React.Component {
    render() {
        return (
            <div>
                <h2>Assignment Type</h2>
                <div className="form-group">
                    <label htmlFor="gAssignmentType">
                        Type
                    </label>
                    <select id="gAssignmentType"
                        className="custom-select"
                        onChange={handleFormUpdate.bind(this)}
                        value={this.props.gAssignmentType}>
                        <option value="0">Template graph assignment</option>
                        <option value="1">Labeling assignment</option>
                        <option value="2">Modification assignment</option>
                    </select>
                </div>
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
                <hr/>
            </div>
        );
    }
}

CommonGraphSettings.propTypes = {
    gAssignmentType: PropTypes.number.isRequired,
    gNeedsSubmit: PropTypes.bool.isRequired,
    gDisplayFeedback: PropTypes.bool.isRequired,
    gShowIntersection: PropTypes.bool.isRequired,
    gDisplayShadow: PropTypes.bool.isRequired,
    gIsPublished: PropTypes.bool.isRequired,

    updateGraph: PropTypes.func.isRequired
}
