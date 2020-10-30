import React from 'react';
import PropTypes from 'prop-types';

export default class AUCDisplay extends React.Component {
    render() {
        if (this.props.areaA && this.props.areaB && this.props.areaC) {
            return (
                <div>
                    Area A: {this.props.areaA}&nbsp;
                    area B: {this.props.areaB}&nbsp;
                    Area C: {this.props.areaC}
                </div>
            )
        } else {
            return null;
        }

    }
}

AUCDisplay.propTypes = {
    areaA: PropTypes.number,
    areaB: PropTypes.number,
    areaC: PropTypes.number,
}
