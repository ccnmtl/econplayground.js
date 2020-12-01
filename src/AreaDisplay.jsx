import React from 'react';
import PropTypes from 'prop-types';

export default class AreaDisplay extends React.Component {
    render() {
        if (!this.props.areaA && !this.props.areaB && !this.props.areaC) {
            return null;
        }

        return (
            <div>
                {typeof this.props.areaA === 'number' && (
                    <span className="mr-2">
                        Area A: <strong>{this.props.areaA}</strong>
                    </span>
                )}
                {typeof this.props.areaB === 'number' && (
                    <span className="mr-2">
                        Area B: <strong>{this.props.areaB}</strong>
                    </span>
                )}
                {typeof this.props.areaC === 'number' && (
                    <span>
                        Area C: <strong>{this.props.areaC}</strong>
                    </span>
                )}
            </div>
        );
    }
}

AreaDisplay.propTypes = {
    areaA: PropTypes.number,
    areaB: PropTypes.number,
    areaC: PropTypes.number
}
