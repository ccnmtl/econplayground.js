import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    render() {
        if (this.props.feedback) {
            return <div className="alert alert-primary" role="alert">
                {this.props.feedback}
            </div>;
        }

        return null;
    }
}

Feedback.propTypes = {
    feedback: PropTypes.string
};
