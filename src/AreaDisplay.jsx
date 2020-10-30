import React from 'react';
import PropTypes from 'prop-types';

export default class AreaDisplay extends React.Component {
    render() {
        if (this.props.areaA && this.props.areaB && this.props.areaC) {
            return (
                <div>
                    Area A: {this.props.areaA}&nbsp;
                    Area B: {this.props.areaB}&nbsp;
                    Area C: {this.props.areaC}
                </div>
            );
        } else {
            return null;
        }
    }
}

AreaDisplay.propTypes = {
    areaA: PropTypes.number,
    areaB: PropTypes.number,
    areaC: PropTypes.number
}
