import React from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends React.Component {
    render() {
        if (this.props.value) {
            let msg = '';
            switch (this.props.value) {
            case '1':
                msg = this.props.gLine1FeedbackDecrease;
                break;
            case '2':
                msg = this.props.gLine1FeedbackIncrease;
                break;
            case '3':
                msg = this.props.gLine2FeedbackDecrease;
                break;
            case '4':
                msg = this.props.gLine2FeedbackIncrease;
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
    value: PropTypes.string,
    gLine1FeedbackDecrease: PropTypes.string,
    gLine1FeedbackIncrease: PropTypes.string,
    gLine2FeedbackDecrease: PropTypes.string,
    gLine2FeedbackIncrease: PropTypes.string
};
