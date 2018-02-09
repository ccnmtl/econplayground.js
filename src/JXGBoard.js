/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import JXG from 'jsxgraph';
import {graphTypes} from './Graph';
import {getL1SubmissionOffset, getL2SubmissionOffset} from './utils';

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.style = {
            // The defaults provided here are used by the GraphPicker
            width: this.props.width || 450,
            height: this.props.height || 240
        };
    }

    renderJXBoard(options) {
        // Don't render JSXGraph in jest. This should be possible since I'm
        // using jsdom, but jsxgraph can't find the element when I try and
        // initialize it like this:
        //
        // const div = document.createElement('div');
        // div.setAttribute('id', 'id-test');
        // ReactDOM.render(
        //     <JXGBoard
        //          id={'id-test'}
        //          gType={0}
        //          gShowIntersection={true} />,
        //     div);
        //
        if (typeof process !== 'undefined' &&
            process.env.NODE_ENV === 'test'
           ) {
            return;
        }

        if (this.board) {
            JXG.JSXGraph.freeBoard(this.board);
        }

        let xAxisLabel = '';
        if (options.gType === 3) {
            xAxisLabel = options.gCobbDouglasLName;
        } else {
            xAxisLabel = options.gXAxisLabel ? options.gXAxisLabel : 'x';
        }

        let board = JXG.JSXGraph.initBoard(
            this.id, {
                axis: true,
                defaultAxes: {
                    x: {
                        name: xAxisLabel,
                        label: {
                            offset: [440, -12]
                        },
                        withLabel: options.gXAxisLabel ? true : false,
                        ticks: {
                            visible: false
                        },
                        layer: 9
                    },
                    y: {
                        name: options.gYAxisLabel ? options.gYAxisLabel : 'y',
                        label: {
                            offset: [-12, 260]
                        },
                        withLabel: options.gYAxisLabel ? true : false,
                        ticks: {
                            visible: false
                        },
                        layer: 9
                    }
                },
                keepAspectRatio: true,
                showCopyright: false,
                showZoom: false,
                showReload: false,
                showNavigation: false,
                boundingbox: [-0.4, 5, 5, -0.4]
            });

        this.board = board;

        if (typeof options.gType === 'number') {
            graphTypes[options.gType](board, {
                gShowIntersection: (
                    typeof options.gShowIntersection === 'undefined') ?
                    true :
                    options.gShowIntersection,
                gIntersectionLabel: options.gIntersectionLabel,
                gIntersectionHorizLineLabel: options.gIntersectionHorizLineLabel,
                gIntersectionVertLineLabel: options.gIntersectionVertLineLabel,
                gXAxisLabel: options.gXAxisLabel,
                gYAxisLabel: options.gYAxisLabel,
                gLine1Label: options.gLine1Label,
                gLine2Label: options.gLine2Label,
                gLine1Slope: options.gLine1Slope,
                gLine2Slope: options.gLine2Slope,
                gLine1Offset: options.gLine1Offset,
                gLine1OffsetX: options.gLine1OffsetX,
                gLine1OffsetY: options.gLine1OffsetY,
                gLine2Offset: options.gLine2Offset,
                gLine2OffsetX: options.gLine2OffsetX,
                gLine2OffsetY: options.gLine2OffsetY,
                gAlpha: options.gAlpha,
                gCobbDouglasA: options.gCobbDouglasA,
                gCobbDouglasAInitial: options.gCobbDouglasAInitial,
                gCobbDouglasAName: options.gCobbDouglasAName,
                gCobbDouglasL: options.gCobbDouglasL,
                gCobbDouglasLInitial: options.gCobbDouglasLInitial,
                gCobbDouglasLName: options.gCobbDouglasLName,
                gCobbDouglasK: options.gCobbDouglasK,
                gCobbDouglasKInitial: options.gCobbDouglasKInitial,
                gCobbDouglasKName: options.gCobbDouglasKName,
                gCobbDouglasAlpha: options.gCobbDouglasAlpha,
                gCobbDouglasAlphaInitial: options.gCobbDouglasAlphaInitial,
                gNeedsSubmit: options.gNeedsSubmit,
                l1SubmissionOffset: getL1SubmissionOffset(options.submission),
                l2SubmissionOffset: getL2SubmissionOffset(options.submission),
                submission: options.submission,
                isSubmitted: options.isSubmitted,
                locked: this.props.locked,
                shadow: this.props.shadow
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const updateProps = [
            'gType',
            'gShowIntersection',
            'gIntersectionLabel',
            'gIntersectionHorizLineLabel',
            'gIntersectionVertLineLabel',
            'gXAxisLabel',
            'gYAxisLabel',
            'gLine1Label',
            'gLine2Label',
            'gLine1Slope',
            'gLine2Slope',
            'gLine1Offset',
            'gLine1OffsetX',
            'gLine1OffsetY',
            'gLine2Offset',
            'gLine2OffsetX',
            'gLine2OffsetY',
            'gAlpha',
            'gCobbDouglasA',
            'gCobbDouglasAInitial',
            'gCobbDouglasAName',
            'gCobbDouglasL',
            'gCobbDouglasLInitial',
            'gCobbDouglasLName',
            'gCobbDouglasK',
            'gCobbDouglasKInitial',
            'gCobbDouglasKName',
            'gCobbDouglasAlpha',
            'gCobbDouglasAlphaInitial',
            'gNeedsSubmit',
            'submission',
            'shadow'
        ];

        let needsUpdate = false;
        for (let i = 0; i < updateProps.length; i++) {
            let prop = updateProps[i];
            if (this.props[prop] !== nextProps[prop]) {
                needsUpdate = true;
                break;
            }
        }

        if (needsUpdate) {
            this.renderJXBoard({
                gType: nextProps.gType,
                gShowIntersection: nextProps.gShowIntersection,
                gIntersectionLabel: nextProps.gIntersectionLabel,

                gIntersectionHorizLineLabel:
                nextProps.gIntersectionHorizLineLabel,

                gIntersectionVertLineLabel:
                nextProps.gIntersectionVertLineLabel,

                gLine1Label: nextProps.gLine1Label,
                gLine2Label: nextProps.gLine2Label,
                gXAxisLabel: nextProps.gXAxisLabel,
                gYAxisLabel: nextProps.gYAxisLabel,
                gLine1Slope: nextProps.gLine1Slope,
                gLine2Slope: nextProps.gLine2Slope,
                gLine1Offset: nextProps.gLine1Offset,
                gLine1OffsetX: nextProps.gLine1OffsetX,
                gLine1OffsetY: nextProps.gLine1OffsetY,
                gLine2Offset: nextProps.gLine2Offset,
                gLine2OffsetX: nextProps.gLine2OffsetX,
                gLine2OffsetY: nextProps.gLine2OffsetY,
                gAlpha: nextProps.gAlpha,
                gCobbDouglasA: nextProps.gCobbDouglasA,
                gCobbDouglasAInitial: nextProps.gCobbDouglasAInitial,
                gCobbDouglasAName: nextProps.gCobbDouglasAName,
                gCobbDouglasL: nextProps.gCobbDouglasL,
                gCobbDouglasLInitial: nextProps.gCobbDouglasLInitial,
                gCobbDouglasLName: nextProps.gCobbDouglasLName,
                gCobbDouglasK: nextProps.gCobbDouglasK,
                gCobbDouglasKInitial: nextProps.gCobbDouglasKInitial,
                gCobbDouglasKName: nextProps.gCobbDouglasKName,
                gCobbDouglasAlpha: nextProps.gCobbDouglasAlpha,
                gCobbDouglasAlphaInitial: nextProps.gCobbDouglasAlphaInitial,
                gNeedsSubmit: nextProps.gNeedsSubmit,

                l1SubmissionOffset: getL1SubmissionOffset(nextProps.submission),
                l2SubmissionOffset: getL2SubmissionOffset(nextProps.submission),
                submission: nextProps.submission,
                isSubmitted: !!nextProps.submission,

                shadow: nextProps.shadow
            });
        }
    }

    componentDidMount() {
        this.renderJXBoard({
            gType: this.props.gType,
            gShowIntersection: this.props.gShowIntersection,
            gIntersectionLabel: this.props.gIntersectionLabel,
            gIntersectionHorizLineLabel: this.props.gIntersectionHorizLineLabel,
            gIntersectionVertLineLabel: this.props.gIntersectionVertLineLabel,
            gLine1Label: this.props.gLine1Label,
            gLine2Label: this.props.gLine2Label,
            gXAxisLabel: this.props.gXAxisLabel,
            gYAxisLabel: this.props.gYAxisLabel,
            gLine1Slope: this.props.gLine1Slope,
            gLine2Slope: this.props.gLine2Slope,
            gLine1Offset: this.props.gLine1Offset,
            gLine1OffsetX: this.props.gLine1OffsetX,
            gLine1OffsetY: this.props.gLine1OffsetY,
            gLine2Offset: this.props.gLine2Offset,
            gLine2OffsetX: this.props.gLine2OffsetX,
            gLine2OffsetY: this.props.gLine2OffsetY,
            gAlpha: this.props.gAlpha,
            gCobbDouglasA: this.props.gCobbDouglasA,
            gCobbDouglasAInitial: this.props.gCobbDouglasAInitial,
            gCobbDouglasAName: this.props.gCobbDouglasAName,
            gCobbDouglasL: this.props.gCobbDouglasL,
            gCobbDouglasLInitial: this.props.gCobbDouglasLInitial,
            gCobbDouglasLName: this.props.gCobbDouglasLName,
            gCobbDouglasK: this.props.gCobbDouglasK,
            gCobbDouglasKInitial: this.props.gCobbDouglasKInitial,
            gCobbDouglasKName: this.props.gCobbDouglasKName,
            gCobbDouglasAlpha: this.props.gCobbDouglasAlpha,
            gCobbDouglasAlphaInitial: this.props.gCobbDouglasAlphaInitial,
            gNeedsSubmit: this.props.gNeedsSubmit,
            l1SubmissionOffset: getL1SubmissionOffset(this.props.submission),
            l2SubmissionOffset: getL2SubmissionOffset(this.props.submission),
            submission: this.props.submission,
            isSubmitted: !!this.props.submission,
            shadow: this.props.shadow
        });
    }

    // called only if shouldComponentUpdate returns true
    // for rendering the JSXGraph board div and any child elements
    render() {
        return (
            <div id={this.id} className="jxgbox" style={this.style}>
            </div>
        );
    }
}

JXGBoard.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    submission: PropTypes.object,
    shadow: PropTypes.bool,

    gShowIntersection: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionVertLineLabel: PropTypes.string,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gXAxisLabel: PropTypes.string,
    gYAxisLabel: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gLine1Offset: PropTypes.number,
    gLine1OffsetX: PropTypes.number,
    gLine1OffsetY: PropTypes.number,
    gLine2Offset: PropTypes.number,
    gLine2OffsetX: PropTypes.number,
    gLine2OffsetY: PropTypes.number,
    gAlpha: PropTypes.number,
    gNeedsSubmit: PropTypes.bool,
    gType: PropTypes.number,

    gCobbDouglasA: PropTypes.number,
    gCobbDouglasAInitial: PropTypes.number,
    gCobbDouglasAName: PropTypes.string,
    gCobbDouglasL: PropTypes.number,
    gCobbDouglasLInitial: PropTypes.number,
    gCobbDouglasLName: PropTypes.string,
    gCobbDouglasK: PropTypes.number,
    gCobbDouglasKInitial: PropTypes.number,
    gCobbDouglasKName: PropTypes.string,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaInitial: PropTypes.number,

    id: PropTypes.string.isRequired,
    locked: PropTypes.bool
};
