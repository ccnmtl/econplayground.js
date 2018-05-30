import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    render() {
        if (this.props.gNeedsSubmit && !this.props.submission) {
            return null;
        }

        let msg = '';

        if (msg) {
            return <div className="alert alert-primary" role="alert">
                {msg}
            </div>;
        }

        return null;
    }
}

Feedback.propTypes = {
    submission: PropTypes.object,
    gDisplayFeedback: PropTypes.bool,
    gNeedsSubmit: PropTypes.bool,
};
