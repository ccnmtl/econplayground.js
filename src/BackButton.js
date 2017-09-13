import React from 'react';
import PropTypes from 'prop-types';

export default class BackButton extends React.Component {
    render() {
        if (!this.props.showing) {
            return null;
        }
        return (
            <button
                 className="btn btn-default"
                 onClick={this.onClick.bind(this)}>⬅ Back</button>
        )
    }
    onClick() {
        this.props.onClick();
    }
}

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
