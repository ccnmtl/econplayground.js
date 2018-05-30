import React from 'react';
import PropTypes from 'prop-types';
import {handleFormUpdate} from '../utils';

/**
 * This component contains the form fields common to all graph types,
 * like title, description, etc.
 */
export default class CommonGraphEditor extends React.Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="gTitle">
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
                <div className="form-group">
                    <label htmlFor="gInstructorNotes">
                        Instructor Notes
                    </label>
                    <textarea id="gInstructorNotes"
                        onChange={handleFormUpdate.bind(this)}
                        value={this.props.gInstructorNotes}
                        className="form-control form-control-sm" />
                </div>
                <div className="form-group">
                    <label htmlFor="gDescription">
                        Description
                    </label>
                    <textarea id="gDescription"
                        onChange={handleFormUpdate.bind(this)}
                        value={this.props.gDescription}
                        className="form-control form-control-sm" />
                </div>
            </div>
        );
    }
}

CommonGraphEditor.propTypes = {
    gTitle: PropTypes.string.isRequired,
    gInstructorNotes: PropTypes.string.isRequired,
    gDescription: PropTypes.string.isRequired,

    updateGraph: PropTypes.func.isRequired
}
