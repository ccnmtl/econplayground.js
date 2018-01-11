import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    getFeedback(choice) {
        if (!this.props.gDisplayFeedback) {
            return '';
        }

        let msg = '';
        switch (choice) {
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
        return msg;
    }
    render() {
        if (this.props.gNeedsSubmit && !this.props.submission) {
            return null;
        }

        let msg = '';

        if (this.props.submission) {
            msg = this.getFeedback(this.props.submission.choice);
        } else if (this.props.choice) {
            msg = this.getFeedback(this.props.choice);
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
    choice: PropTypes.number,
    submission: PropTypes.object,
    gDisplayFeedback: PropTypes.bool,
    gNeedsSubmit: PropTypes.bool,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string
};
