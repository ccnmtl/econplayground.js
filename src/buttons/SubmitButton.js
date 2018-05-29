import React from 'react';
import PropTypes from 'prop-types';

export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '#'
        };
    }
    render() {
        return <React.Fragment>
            <hr style={{
                display: (this.props.gNeedsSubmit && !this.props.submission) ? 'inherit' : 'none'
            }} />

            <button className="btn btn-primary btn-sm"
        style={{
            marginTop: '1em',
            display: (!this.props.isInstructor && !this.props.submission) ? 'inherit' : 'none'
        }}
        type="submit">Submit</button>

            </React.Fragment>;
    }
    onClick(evt) {
    }
}

SubmitButton.propTypes = {
    onClick: PropTypes.func,
    gNeedsSubmit: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired,
    submission: PropTypes.obj
};
