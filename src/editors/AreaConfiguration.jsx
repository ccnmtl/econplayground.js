import React from 'react';
import PropTypes from 'prop-types';
import EditableControl from '../form-components/EditableControl';
import {handleFormUpdate} from '../utils';

export default class AreaConfiguration extends React.Component {
    render() {
        const me = this;
        return (
            <>
            <h2>Areas</h2>
                {this.props.displayLabels && (
                    <>
                        <div className="form-row">
                            <EditableControl
                                id="gAreaAName"
                                name="Area A label"
                                value={this.props.gAreaAName}
                                valueEditable={true}
                                isInstructor={true}
                                updateGraph={this.props.updateGraph}/>

                            <EditableControl
                                id="gAreaBName"
                                name="Area B label"
                                value={this.props.gAreaBName}
                                valueEditable={true}
                                isInstructor={true}
                                updateGraph={this.props.updateGraph}/>
                        </div>

                        <div className="form-row">
                            <EditableControl
                                id="gAreaCName"
                                name="Area C label"
                                value={this.props.gAreaCName}
                                valueEditable={true}
                                isInstructor={true}
                                updateGraph={this.props.updateGraph}/>
                        </div>
                    </>
                )}

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
    displayLabels: PropTypes.bool.isRequired,

    gAreaConfiguration: PropTypes.number.isRequired,
    gIsAreaDisplayed: PropTypes.bool.isRequired,

    gAreaAName: PropTypes.string.isRequired,
    gAreaBName: PropTypes.string.isRequired,
    gAreaCName: PropTypes.string.isRequired,

    updateGraph: PropTypes.func.isRequired
};
