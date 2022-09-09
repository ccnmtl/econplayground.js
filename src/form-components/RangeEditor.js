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
                <label className="mb-0 w-100" htmlFor={this.props.id}>
                    <em>{this.props.itemlabel}</em>
                    <div className="d-inline w-100">
                        {this.props.showMinMax && (
<<<<<<< HEAD
                        <div className="position-absolute l-0">
                            {this.props.min}
                        </div>
                        )}
                        <input
                            className="d-inline form-control-range form-control-sm w-90 mt-2"
                            aria-details={this.props.note}
                            id={this.props.id}
                            data-id={this.props.dataId}
                            type="range"
                            onChange={this.props.handler}
                            value={this.props.value}
                            step={this.props.step || 0.01}
                            min={this.props.min}
                            max={this.props.max}
                        />
                        {this.props.showMinMax && (
                        <div className="d-inline position-absolute r-0">
                            {this.props.max}
                        </div>
                        )}
=======
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
>>>>>>> 4627406 (A few changes for new button format)
                    </div>
                </label>
                <div className='ml-2 mb-2 row shift-up'>
                    <button
                        className="btn btn-primary ml-2 w-20"
                        aria-label={"Decrease by " + (Number(this.props.step) * 10 || 0.1)}
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
                        className="btn btn-info ml-2 w-20"
                        aria-label={"Decrease by " + (Number(this.props.step) || 0.01)}
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
                        className="btn btn-info ml-2 w-20"
                        aria-label={"Increase by " + (Number(this.props.step) || 0.01)}
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
                        className="btn btn-primary ml-2 w-20"
                        aria-label={"Increase by " + (Number(this.props.step) * 10 || 0.1)}
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
                <small className="form-text text-muted ml-sm-2">
                    {this.props.note}
                </small>
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
    showMinMax: PropTypes.bool,
    note: PropTypes.string,
    showNote: PropTypes.bool
};
