import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    render() {
        if (this.props.choice) {
            let msg = '';
            switch (this.props.choice) {
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
            return <div className="alert alert-primary" role="alert">
                {msg}
            </div>;
        } else {
            return null;
        }
    }
}

Feedback.propTypes = {
    choice: PropTypes.number,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string
};
