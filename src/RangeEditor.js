import React from 'react';
import PropTypes from 'prop-types';

export default class RangeEditor extends React.Component {
    render() {
        return <div className="slope-editor row">
            <div className="col">
            <input
        className="form-control form-control-sm"
        data-id={this.props.dataId}
        type="range"
        onChange={this.props.handler}
        value={this.props.value}
        step="0.01"
        min={this.props.min}
        max={this.props.max}
            />
            </div>

        {!this.props.hideNumber &&
         <div className="col-4">
         <input
         className="form-control form-control-sm"
         data-id={this.props.dataId}
         type="number"
         onChange={this.props.handler}
         value={this.props.value}
         step="0.01"
         min={this.props.min}
         max={this.props.max}
         />
         </div>
        }
            </div>;
    }
}

RangeEditor.defaultProps = {
    min: -5,
    max: 5,
    hideNumber: false
};

RangeEditor.propTypes = {
    dataId: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    hideNumber: PropTypes.bool
};
