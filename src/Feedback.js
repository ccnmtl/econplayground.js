import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    render() {
        if (this.props.gNeedsSubmit && !this.props.submission) {
            return null;
        }

        let msg = '';

        if (this.props.submission) {
            switch (this.props.submission.choice) {
            case 1:
                msg = this.props.gLine1FeedbackIncrease;
                break;
            case 2:
                msg = this.props.gLine1FeedbackDecrease;
                break;
            case 3:
                msg = this.props.gLine2FeedbackIncrease;
                break;
            case 4:
                msg = this.props.gLine2FeedbackDecrease;
                break;
            }
            msg = 'Submitted. ' + msg;
        }

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
    gNeedsSubmit: PropTypes.bool,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string
};
