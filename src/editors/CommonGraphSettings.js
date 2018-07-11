import React from 'react';
import PropTypes from 'prop-types';
import {getTopics, handleFormUpdate} from '../utils';

/**
 * This component contains the form fields for assignment type,
 * and visibility settings.
 */
export default class CommonGraphSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        };

        const me = this;
        getTopics().then(function(topics) {
            me.setState({topics: topics});
        });
    }
    render() {
        return (
            <div>
                <h2>Assignment</h2>
                <div className="form-group">
                    <label htmlFor="gAssignmentType">
                        Type
                    </label>
                    <select id="gAssignmentType"
                        className="custom-select form-control-sm"
                        onChange={handleFormUpdate.bind(this)}
                        value={this.props.gAssignmentType}>
                        <option value="0">Template graph assignment</option>
                        <option value="1">Labeling assignment</option>
                        <option value="2">Modification assignment</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gTopic">
                        Topic
                    </label>
                    <select id="gTopic"
                        className="custom-select form-control-sm"
                        onChange={handleFormUpdate.bind(this)}
                            value={this.props.gTopic || 0}>
                        <option value="0">---</option>
                        {this.state.topics.map(e => (
                            <option key={e.pk} value={e.pk}>{e.name}</option>
                        ))}
            </select>
                <small className="form-text text-muted">
                <a href="/admin/main/topic/" target="_blank">Manage topics</a>
                </small>
                </div>
                <div className="form-group">
                    <label htmlFor="gNeedsSubmit">
                Assessment Type
                    </label>
                    <select id="gNeedsSubmit"
                        className="custom-select form-control-sm"
                        onChange={handleFormUpdate.bind(this)}
                        value={(this.props.gNeedsSubmit ? 1 : 0)}>
                <option value={0}>Practice assessment</option>
                <option value={1}>LTI Assessment</option>
                    </select>
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
                            id="gIsFeatured"
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleFormUpdate.bind(this)}
                            checked={this.props.gIsFeatured} />
                        Featured
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
                <div>
                    <a target="_blank"
                       role="button"
                       className="btn btn-sm btn-primary mt-2"
                       href="/admin/main/assessment/">
                        Feedback and Assessment editor
                    </a>
                    <small className="form-text text-muted">
                        <a href="/admin/doc/models/main.assessment/" target="_blank">
                            Assessment info <svg className="octicon octicon-info" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"></path></svg>
                        </a>
                    </small>
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
    gIsFeatured: PropTypes.bool.isRequired,
    gTopic: PropTypes.number,

    updateGraph: PropTypes.func.isRequired
}
