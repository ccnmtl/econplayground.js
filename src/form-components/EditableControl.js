import React from 'react';
import PropTypes from 'prop-types';
import {handleFormUpdate} from '../utils';

/**
 * EditableControl
 *
 * An abstraction for the "Editable Control" idea. This control is
 * always available on the instructor side, and optionally for the
 * student as well.
 */
export default class EditableControl extends React.Component {
    render() {
        return (
            <React.Fragment>
                {(this.props.isInstructor || this.props.valueEditable) && (
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor={this.props.id}>
                                {this.props.name}
                            </label>
                            <input id={this.props.id}
                                   className="form-control form-control-sm"
                                   type="text"
                                   maxLength="60"
                                   value={this.props.value}
                                   onChange={handleFormUpdate.bind(this)} />
                        </div>
                    </div>
                )}
                <div className="col-sm-2">
                {this.props.isInstructor && (
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                id={`${this.props.id}Editable`}
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleFormUpdate.bind(this)}
                                checked={this.props.valueEditable} />
                            Student editable
                        </label>
                    </div>
                )}
            </div>
                </React.Fragment>
        );
    }
}

EditableControl.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isInstructor: PropTypes.bool.isRequired,
    valueEditable: PropTypes.bool.isRequired
}
