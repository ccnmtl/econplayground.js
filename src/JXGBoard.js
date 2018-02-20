/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import JXG from 'jsxgraph';
import {graphTypes} from './Graph';
import {getL1SubmissionOffset, getL2SubmissionOffset} from './utils';

/**
 * The JXGBoard component manages JSXGraph's Board class, which
 * is used to create the graph scene.
 *
 * https://jsxgraph.org/docs/symbols/JXG.Board.html
 */
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
        let yAxisLabel = '';
        if (options.gType === 3) {
            xAxisLabel = options.gCobbDouglasLName;
            yAxisLabel = options.gYAxisLabel || options.gCobbDouglasYName;
        } else if (options.gType === 1) {
            // Non-linear demand-supply
            xAxisLabel = 'N';
            yAxisLabel = 'MP<sub>n</sub>';
            if (this.props.locked) {
                options.gCobbDouglasA = 3.4;
                options.gCobbDouglasK = 2.3;
                options.gLine2OffsetX = 0.5;
                options.gLine2OffsetY = -0.8;
            }
        } else {
            xAxisLabel = options.gXAxisLabel ? options.gXAxisLabel : 'x';
            yAxisLabel = options.gYAxisLabel ? options.gYAxisLabel : 'y';
        }

        let board = JXG.JSXGraph.initBoard(
            this.id, {
                axis: true,
                defaultAxes: {
                    x: {
                        name: xAxisLabel,
                        label: {
                            offset: [400, -12]
                        },
                        withLabel: xAxisLabel ? true : false,
                        ticks: {
                            visible: false
                        },
                        layer: 9
                    },
                    y: {
                        name: yAxisLabel,
                        label: {
                            offset: [(options.gType === 1) ? -1 : -5, 260]
                        },
                        withLabel: yAxisLabel ? true : false,
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
                gShowIntersection: options.gShowIntersection,
                gDisplayShadow: options.gDisplayShadow,
                gIntersectionLabel: options.gIntersectionLabel,
                gIntersectionHorizLineLabel: options.gIntersectionHorizLineLabel,
                gIntersectionVertLineLabel: options.gIntersectionVertLineLabel,
                gXAxisLabel: options.gXAxisLabel,
                gYAxisLabel: options.gYAxisLabel,
                gLine1Label: options.gLine1Label,
                gLine2Label: options.gLine2Label,
                gLine1Slope: options.gLine1Slope,
                gLine1SlopeInitial: options.gLine1SlopeInitial,
                gLine2Slope: options.gLine2Slope,
                gLine1OffsetX: options.gLine1OffsetX,
                gLine1OffsetY: options.gLine1OffsetY,
                gLine1OffsetXInitial: options.gLine1OffsetXInitial,
                gLine1OffsetYInitial: options.gLine1OffsetYInitial,
                gLine2OffsetX: options.gLine2OffsetX,
                gLine2OffsetY: options.gLine2OffsetY,
                gLine2OffsetXInitial: options.gLine2OffsetXInitial,
                gLine2OffsetYInitial: options.gLine2OffsetYInitial,
                gAlpha: options.gAlpha,
                gOmega: options.gOmega,
                gA: options.gA,
                gK: options.gK,
                gR: options.gR,
                gY1: options.gY1,
                gY2: options.gY2,
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
            'gDisplayShadow',
            'gIntersectionLabel',
            'gIntersectionHorizLineLabel',
            'gIntersectionVertLineLabel',
            'gXAxisLabel',
            'gYAxisLabel',
            'gLine1Label',
            'gLine2Label',
            'gLine1Slope',
            'gLine1Slopeinitial',
            'gLine2Slope',
            'gLine1OffsetX',
            'gLine1OffsetY',
            'gLine1OffsetXInitial',
            'gLine1OffsetYInitial',
            'gLine2OffsetX',
            'gLine2OffsetY',
            'gLine2OffsetXInitial',
            'gLine2OffsetYInitial',
            'gAlpha',
            'gOmega',
            'gA',
            'gK',
            'gR',
            'gY1',
            'gY2',
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
                gDisplayShadow: nextProps.gDisplayShadow,
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
                gLine1SlopeInitial: nextProps.gLine1SlopeInitial,
                gLine2Slope: nextProps.gLine2Slope,
                gLine1OffsetX: nextProps.gLine1OffsetX,
                gLine1OffsetY: nextProps.gLine1OffsetY,
                gLine1OffsetXInitial: nextProps.gLine1OffsetXInitial,
                gLine1OffsetYInitial: nextProps.gLine1OffsetYInitial,
                gLine2OffsetX: nextProps.gLine2OffsetX,
                gLine2OffsetY: nextProps.gLine2OffsetY,
                gLine2OffsetXInitial: nextProps.gLine2OffsetXInitial,
                gLine2OffsetYInitial: nextProps.gLine2OffsetYInitial,
                gAlpha: nextProps.gAlpha,
                gOmega: nextProps.gOmega,
                gA: nextProps.gA,
                gK: nextProps.gK,
                gR: nextProps.gR,
                gY1: nextProps.gY1,
                gY2: nextProps.gY2,
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
            gDisplayShadow: this.props.gDisplayShadow,
            gIntersectionLabel: this.props.gIntersectionLabel,
            gIntersectionHorizLineLabel: this.props.gIntersectionHorizLineLabel,
            gIntersectionVertLineLabel: this.props.gIntersectionVertLineLabel,
            gLine1Label: this.props.gLine1Label,
            gLine2Label: this.props.gLine2Label,
            gXAxisLabel: this.props.gXAxisLabel,
            gYAxisLabel: this.props.gYAxisLabel,
            gLine1Slope: this.props.gLine1Slope,
            gLine1SlopeInitial: this.props.gLine1SlopeInitial,
            gLine2Slope: this.props.gLine2Slope,
            gLine1OffsetX: this.props.gLine1OffsetX,
            gLine1OffsetY: this.props.gLine1OffsetY,
            gLine1OffsetXInitial: this.props.gLine1OffsetXInitial,
            gLine1OffsetYInitial: this.props.gLine1OffsetYInitial,
            gLine2OffsetX: this.props.gLine2OffsetX,
            gLine2OffsetY: this.props.gLine2OffsetY,
            gLine2OffsetXInitial: this.props.gLine2OffsetXInitial,
            gLine2OffsetYInitial: this.props.gLine2OffsetYInitial,
            gAlpha: this.props.gAlpha,
            gOmega: this.props.gOmega,
            gA: this.props.gA,
            gK: this.props.gK,
            gR: this.props.gR,
            gY1: this.props.gY1,
            gY2: this.props.gY2,
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
    gDisplayShadow: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionVertLineLabel: PropTypes.string,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gXAxisLabel: PropTypes.string,
    gYAxisLabel: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine1SlopeInitial: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gLine1OffsetX: PropTypes.number,
    gLine1OffsetY: PropTypes.number,
    gLine1OffsetXInitial: PropTypes.number,
    gLine1OffsetYInitial: PropTypes.number,
    gLine2OffsetX: PropTypes.number,
    gLine2OffsetY: PropTypes.number,
    gLine2OffsetXInitial: PropTypes.number,
    gLine2OffsetYInitial: PropTypes.number,
    gAlpha: PropTypes.number,
    gOmega: PropTypes.number,
    gA: PropTypes.number,
    gK: PropTypes.number,
    gR: PropTypes.number,
    gY1: PropTypes.number,
    gY2: PropTypes.number,
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
    gCobbDouglasYName: PropTypes.string,
    gCobbDouglasAlpha: PropTypes.number,
    gCobbDouglasAlphaInitial: PropTypes.number,

    id: PropTypes.string.isRequired,
    locked: PropTypes.bool
};
