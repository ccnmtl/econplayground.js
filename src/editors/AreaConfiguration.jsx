import React from 'react';
import PropTypes from 'prop-types';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class AreaConfiguration extends React.Component {
    render() {
        const me = this;
        return (
            <>
                <h2>Surpluses</h2>
                <div className="form-row">
                    <div className="form-group">
                        {['A', 'B', 'C', 'A + B', 'B + C'].map(function(el, idx) {
                            return (
                                <div className="form-check form-check-inline" key={idx}>
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={`gAreaConfiguration-${idx}`}
                                            name="gAreaConfiguration"
                                            onChange={handleFormUpdate.bind(me)}
                                            checked={me.props.gAreaConfiguration === idx}
                                            value={idx}
                                        />
                                        {el}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    id="gIsAreaDisplayed"
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleFormUpdate.bind(this)}
                                    checked={this.props.gIsAreaDisplayed} />
                                Show Area Shadow
                            </label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

AreaConfiguration.propTypes = {
    gAreaConfiguration: PropTypes.number.isRequired,
    gIsAreaDisplayed: PropTypes.bool.isRequired,
    updateGraph: PropTypes.func.isRequired
};
