import React from 'react';
import PropTypes from 'prop-types';
import { btnStep } from '../utils';

/**
 * RangeEditor is a re-usable component that creates an <input> with
 * type="range". Also, it optionally displays an "override" checkbox
 * to allow the user to override that value.
 */
export default class RangeEditor extends React.Component {
    render() {
        return <React.Fragment>
            <div className="form-row slider-wrapper">
                <div className="d-inline">
                    <div className="d-inline">
                        {this.props.showMinMax && (
                            <div className="d-inline">
                                {this.props.min}
                            </div>
                        )}
                        <label className="mb-0" htmlFor={this.props.id}>

                            <em>{this.props.itemlabel}</em>
                            <input
                                className="d-inline form-control-range form-control-sm"
                                id={this.props.id}
                                data-id={this.props.dataId}
                                type="range"
                                onChange={this.props.handler}
                                value={this.props.value}
                                step={this.props.step || 0.01}
                                min={this.props.min}
                                max={this.props.max}
                            />
                        </label>
                        {this.props.showMinMax && (
                            <div className="d-inline">
                                {this.props.max}
                            </div>
                        )}
                    </div>
                    <div className='ml-1 row'>
                        <button
                            className="btn btn-primary"
                            id={this.props.id}
                            data-id={this.props.dataId}
                            type="button"
                            onClick={this.props.handler}
                            value={
                                btnStep(
                                    this.props.value,
                                    -1,
                                    this.props.step * 10 || 0.1,
                                    this.props.min,
                                    this.props.max)
                            }
                        >&lt;&lt;&lt;</button>
                        <button
                            className="btn btn-info ml-2"
                            id={this.props.id}
                            data-id={this.props.dataId}
                            type="button"
                            onClick={this.props.handler}
                            value={
                                btnStep(
                                    this.props.value,
                                    -1,
                                    this.props.step || 0.01,
                                    this.props.min,
                                    this.props.max)
                            }
                        >&lt;</button>
                        <button
                            className="btn btn-info ml-2"
                            id={this.props.id}
                            data-id={this.props.dataId}
                            type="button"
                            onClick={this.props.handler}
                            value={
                                btnStep(
                                    this.props.value,
                                    1,
                                    this.props.step || 0.01,
                                    this.props.min,
                                    this.props.max)
                            }
                        >&gt;</button>
                        <button
                            className="btn btn-primary ml-2"
                            id={this.props.id}
                            data-id={this.props.dataId}
                            type="button"
                            onClick={this.props.handler}
                            value={
                                btnStep(
                                    this.props.value,
                                    1,
                                    this.props.step * 10 || 0.1,
                                    this.props.min,
                                    this.props.max)
                            }
                        >&gt;&gt;&gt;</button>
                    </div>
                </div>
                <div className="input-group">
                    {this.props.showOverrideButton && (
                        <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input
                                    data-id={this.props.dataId}
                                    data-override={this.props.overrideValue}
                                    className="form-check-input override"
                                    type="radio"
                                    onChange={this.props.handler}
                                    checked={this.props.value === this.props.overrideValue} />
                                {this.props.overrideLabel}
                            </label>
                        </div>
                    )}
                    {this.props.showOverride2Button && (
                        <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input
                                    data-id={this.props.dataId}
                                    data-override={this.props.override2Value}
                                    className="form-check-input override"
                                    type="radio"
                                    onChange={this.props.handler}
                                    checked={this.props.value === this.props.override2Value} />
                                {this.props.override2Label}
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>;
    }
}

RangeEditor.defaultProps = {
    itemlabel: '',
    min: -5,
    max: 5,
    showOverrideButton: false,
    overrideLabel: '',
    overrideValue: 0,
    showOverride2Button: false,
    override2Label: '',
    override2Value: 0,
    showMinMax: false
};

RangeEditor.propTypes = {
    id: PropTypes.string,
    dataId: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    showOverrideButton: PropTypes.bool,
    itemlabel: PropTypes.string,
    overrideLabel: PropTypes.string,
    overrideValue: PropTypes.number,
    showOverride2Button: PropTypes.bool,
    override2Label: PropTypes.string,
    override2Value: PropTypes.number,
    showMinMax: PropTypes.bool
};
