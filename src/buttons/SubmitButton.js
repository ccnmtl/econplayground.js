import React from 'react';
import PropTypes from 'prop-types';

export default class SubmitButton extends React.Component {
    render() {
        const hasAssessment = !!this.props.assessment &&
              this.props.assessment.length !== 0;

        if (!hasAssessment) {
            return null;
        }

        return <React.Fragment>
            <div>
            <hr />
            <button className="btn btn-primary btn-sm"
                style={{
                    marginTop: '1em',
                    display: (!this.props.isInstructor && !this.props.submission) ?
                'inherit' : 'none'
                }}
                type="submit">Submit</button>
            </div>
        </React.Fragment>;
    }
}

SubmitButton.propTypes = {
    onClick: PropTypes.func,
    gNeedsSubmit: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired,
    submission: PropTypes.object,
    assessment: PropTypes.array.isRequired
};
