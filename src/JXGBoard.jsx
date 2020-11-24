/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import JXG from 'jsxgraph';
import {graphTypes, mkNonLinearDemandSupply} from './Graph';
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
        switch (options.gType) {
            case 1:
                // Non-linear demand-supply
                xAxisLabel = 'N';
                yAxisLabel = 'MP<sub>N</sub>';

                if (options.gFunctionChoice === 1) {
                    xAxisLabel = options.gCobbDouglasKName;
                    yAxisLabel = `MP<sub>${options.gCobbDouglasKName}</sub>`;
                }

                if (this.props.locked) {
                    options.gCobbDouglasA = 3.4;
                    options.gCobbDouglasK = 2.3;
                    options.gLine2OffsetX = 0.5;
                    options.gLine2OffsetY = -0.8;
                }
                break;
            case 3:
                xAxisLabel = options.gCobbDouglasLName;
                yAxisLabel = options.gYAxisLabel || options.gCobbDouglasYName;
                break;
            case 5:
                if (this.props.locked) {
                    options.gA1 = 4;
                    options.gA2 = 1;
                }
                xAxisLabel = options.gXAxisLabel ? options.gXAxisLabel : 'x';
                yAxisLabel = options.gYAxisLabel ? options.gYAxisLabel : 'y';
                break;
            case 7:
            case 11:
                // Consumption-Saving
                xAxisLabel = 'c_1';
                yAxisLabel = 'c_2';
                if (this.props.locked) {
                    options.gA1 = 4;
                    options.gA2 = 1;
                }
                break;
            default:
                xAxisLabel = options.gXAxisLabel ? options.gXAxisLabel : 'x';
                yAxisLabel = options.gYAxisLabel ? options.gYAxisLabel : 'y';
                break;
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
                            offset: [(options.gType === 1) ? 0 : -5, 260]
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

        window.board = this.board = board;

        let board2 = null;
        if (options.gType === 12) {
            board2 = JXG.JSXGraph.initBoard(
                this.id + '-2', {
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
                                offset: [0, 260]
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
        }

        if (typeof options.gType === 'number') {
            let graphParams = {
                gShowIntersection: options.gShowIntersection,
                gDisplayIntersection1: options.gDisplayIntersection1,
                gDisplayIntersection1Initial: options.gDisplayIntersection1Initial,
                gIntersectionLabel: options.gIntersectionLabel,
                gDisplayIntersection2: options.gDisplayIntersection2,
                gDisplayIntersection2Initial: options.gDisplayIntersection2Initial,
                gIntersection2Label: options.gIntersection2Label,
                gDisplayIntersection3: options.gDisplayIntersection3,
                gDisplayIntersection3Initial: options.gDisplayIntersection3Initial,
                gIntersection3Label: options.gIntersection3Label,

                gDisplayShadow: options.gDisplayShadow,
                gIntersectionHorizLineLabel: options.gIntersectionHorizLineLabel,
                gIntersectionVertLineLabel: options.gIntersectionVertLineLabel,
                gIntersection2HorizLineLabel: options.gIntersection2HorizLineLabel,
                gIntersection2VertLineLabel: options.gIntersection2VertLineLabel,
                gIntersection3HorizLineLabel: options.gIntersection3HorizLineLabel,
                gIntersection3VertLineLabel: options.gIntersection3VertLineLabel,
                gXAxisLabel: options.gXAxisLabel,
                gYAxisLabel: options.gYAxisLabel,
                gLine1Label: options.gLine1Label,
                gLine2Label: options.gLine2Label,
                gLine3Label: options.gLine3Label,
                gLine1Slope: options.gLine1Slope,
                gLine1SlopeInitial: options.gLine1SlopeInitial,
                gLine2Slope: options.gLine2Slope,
                gLine2SlopeInitial: options.gLine2SlopeInitial,
                gLine3Slope: options.gLine3Slope,
                gLine3SlopeInitial: options.gLine3SlopeInitial,
                gLine1OffsetX: options.gLine1OffsetX,
                gLine1OffsetY: options.gLine1OffsetY,
                gLine1OffsetXInitial: options.gLine1OffsetXInitial,
                gLine1OffsetYInitial: options.gLine1OffsetYInitial,
                gLine2OffsetX: options.gLine2OffsetX,
                gLine2OffsetY: options.gLine2OffsetY,
                gLine2OffsetXInitial: options.gLine2OffsetXInitial,
                gLine2OffsetYInitial: options.gLine2OffsetYInitial,
                gLine3OffsetX: options.gLine3OffsetX,
                gLine3OffsetY: options.gLine3OffsetY,
                gLine3OffsetXInitial: options.gLine3OffsetXInitial,
                gLine3OffsetYInitial: options.gLine3OffsetYInitial,
                gLine1Dashed: options.gLine1Dashed,
                gLine2Dashed: options.gLine2Dashed,
                gLine3Dashed: options.gLine3Dashed,
                gAlpha: options.gAlpha,
                gA1: options.gA1,
                gA1Initial: options.gA1Initial,
                gA2: options.gA2,
                gA2Initial: options.gA2Initial,
                gA3: options.gA3,
                gA3Initial: options.gA3Initial,
                gA4: options.gA4,
                gA4Initial: options.gA4Initial,
                gA5: options.gA5,
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

                gFunctionChoice: options.gFunctionChoice,
                gNeedsSubmit: options.gNeedsSubmit,
                l1SubmissionOffset: getL1SubmissionOffset(options.submission),
                l2SubmissionOffset: getL2SubmissionOffset(options.submission),
                submission: options.submission,
                isSubmitted: options.isSubmitted,
                locked: this.props.locked,
                shadow: this.props.shadow,
                handleAreaUpdate: this.props.handleAreaUpdate
            };

            if (options.gType !== 1) {
                graphParams = {
                    gCobbDouglasAlpha: options.gCobbDouglasAlpha,
                    gCobbDouglasAlphaInitial: options.gCobbDouglasAlphaInitial,
                    ...graphParams
                };
            }

            // If this is a joint graph, alter the graph ID constructor
            // to be that of the top graph we're rendering.
            const graphId = options.gType === 12 ? 3 : options.gType;

            graphTypes[graphId](board, graphParams);

            // On the Cobb-Douglas NLDS joint graph type, also
            // initialize the second board to be a NLDS graph.
            if (options.gType === 12) {
                mkNonLinearDemandSupply(board2, {
                    gShowIntersection: options.gShowIntersection,
                    gDisplayIntersection1: options.gDisplayIntersection1,
                    gDisplayIntersection1Initial: options.gDisplayIntersection1Initial,
                    gIntersectionLabel: options.gIntersectionLabel,

                    gDisplayShadow: options.gDisplayShadow,
                    gIntersectionHorizLineLabel: options.gIntersectionHorizLineLabel,
                    gIntersectionVertLineLabel: options.gIntersectionVertLineLabel,
                    gXAxisLabel: options.gXAxisLabel,
                    gYAxisLabel: options.gYAxisLabel,
                    gLine1Label: options.gLine1Label,
                    gLine2Label: options.gLine2Label,
                    gLine1Slope: options.gLine1Slope,
                    gLine1SlopeInitial: options.gLine1SlopeInitial,

                    gLine1OffsetX: options.gLine1OffsetX,
                    gLine1OffsetY: options.gLine1OffsetY,
                    gLine1OffsetXInitial: options.gLine1OffsetXInitial,
                    gLine1OffsetYInitial: options.gLine1OffsetYInitial,

                    // Line 2 is not draggable for now.
                    gLine2OffsetX: 0,
                    gLine2OffsetY: 0,
                    gLine2OffsetXInitial: 0,
                    gLine2OffsetYInitial: 0,

                    gAlpha: options.gAlpha,
                    gA1: options.gA1,
                    gA1Initial: options.gA1Initial,
                    gA2: options.gA2,
                    gA2Initial: options.gA2Initial,
                    gA3: options.gA3,
                    gA3Initial: options.gA3Initial,
                    gA4: options.gA4,
                    gA4Initial: options.gA4Initial,
                    gA5: options.gA5,
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
                    gFunctionChoice: options.gFunctionChoice,
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
    }

    componentDidUpdate(prevProps) {
        const updateProps = [
            'gType',
            'gShowIntersection',
            'gDisplayIntersection1',
            'gDisplayIntersection1Initial',
            'gIntersectionLabel',
            'gDisplayIntersection2',
            'gDisplayIntersection2Initial',
            'gIntersection2Label',
            'gDisplayIntersection3',
            'gDisplayIntersection3Initial',
            'gIntersection3Label',
            'gDisplayShadow',
            'gIntersectionHorizLineLabel',
            'gIntersectionVertLineLabel',
            'gIntersection2HorizLineLabel',
            'gIntersection2VertLineLabel',
            'gIntersection3HorizLineLabel',
            'gIntersection3VertLineLabel',
            'gXAxisLabel',
            'gYAxisLabel',
            'gLine1Label',
            'gLine2Label',
            'gLine3Label',
            'gLine1Slope',
            'gLine1Slopeinitial',
            'gLine2Slope',
            'gLine3Slope',
            'gLine1OffsetX',
            'gLine1OffsetY',
            'gLine1OffsetXInitial',
            'gLine1OffsetYInitial',
            'gLine2OffsetX',
            'gLine2OffsetY',
            'gLine2OffsetXInitial',
            'gLine2OffsetYInitial',
            'gLine3OffsetX',
            'gLine3OffsetY',
            'gLine3OffsetXInitial',
            'gLine3OffsetYInitial',
            'gLine1Dashed',
            'gLine2Dashed',
            'gLine3Dashed',
            'gAlpha',
            'gA1', 'gA1Initial',
            'gA2', 'gA2Initial',
            'gA3', 'gA3Initial',
            'gA4', 'gA4Initial',
            'gA5',
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
            'gFunctionChoice',
            'gNeedsSubmit',
            'submission',
            'shadow'
        ];

        let needsUpdate = false;
        for (let i = 0; i < updateProps.length; i++) {
            let prop = updateProps[i];
            if (this.props[prop] !== prevProps[prop]) {
                needsUpdate = true;
                break;
            }
        }

        if (needsUpdate) {
            this.renderJXBoard({
                gType: this.props.gType,
                gShowIntersection: this.props.gShowIntersection,
                gDisplayIntersection1: this.props.gDisplayIntersection1,
                gDisplayIntersection1Initial: this.props.gDisplayIntersection1Initial,
                gIntersectionLabel: this.props.gIntersectionLabel,
                gDisplayIntersection2: this.props.gDisplayIntersection2,
                gDisplayIntersection2Initial: this.props.gDisplayIntersection2Initial,
                gIntersection2Label: this.props.gIntersection2Label,
                gDisplayIntersection3: this.props.gDisplayIntersection3,
                gDisplayIntersection3Initial: this.props.gDisplayIntersection3Initial,
                gIntersection3Label: this.props.gIntersection3Label,
                gDisplayShadow: this.props.gDisplayShadow,

                gIntersectionHorizLineLabel:
                this.props.gIntersectionHorizLineLabel,
                gIntersectionVertLineLabel:
                this.props.gIntersectionVertLineLabel,

                gIntersection2HorizLineLabel:
                this.props.gIntersection2HorizLineLabel,
                gIntersection2VertLineLabel:
                this.props.gIntersection2VertLineLabel,

                gIntersection3HorizLineLabel:
                this.props.gIntersection3HorizLineLabel,
                gIntersection3VertLineLabel:
                this.props.gIntersection3VertLineLabel,

                gLine1Label: this.props.gLine1Label,
                gLine2Label: this.props.gLine2Label,
                gLine3Label: this.props.gLine3Label,
                gXAxisLabel: this.props.gXAxisLabel,
                gYAxisLabel: this.props.gYAxisLabel,
                gLine1Slope: this.props.gLine1Slope,
                gLine1SlopeInitial: this.props.gLine1SlopeInitial,
                gLine2Slope: this.props.gLine2Slope,
                gLine2SlopeInitial: this.props.gLine2SlopeInitial,
                gLine3Slope: this.props.gLine3Slope,
                gLine3SlopeInitial: this.props.gLine3SlopeInitial,
                gLine1OffsetX: this.props.gLine1OffsetX,
                gLine1OffsetY: this.props.gLine1OffsetY,
                gLine1OffsetXInitial: this.props.gLine1OffsetXInitial,
                gLine1OffsetYInitial: this.props.gLine1OffsetYInitial,
                gLine2OffsetX: this.props.gLine2OffsetX,
                gLine2OffsetY: this.props.gLine2OffsetY,
                gLine2OffsetXInitial: this.props.gLine2OffsetXInitial,
                gLine2OffsetYInitial: this.props.gLine2OffsetYInitial,
                gLine3OffsetX: this.props.gLine3OffsetX,
                gLine3OffsetY: this.props.gLine3OffsetY,
                gLine3OffsetXInitial: this.props.gLine3OffsetXInitial,
                gLine3OffsetYInitial: this.props.gLine3OffsetYInitial,
                gLine1Dashed: this.props.gLine1Dashed,
                gLine2Dashed: this.props.gLine2Dashed,
                gLine3Dashed: this.props.gLine3Dashed,
                gAlpha: this.props.gAlpha,
                gA1: this.props.gA1,
                gA1Initial: this.props.gA1Initial,
                gA2: this.props.gA2,
                gA2Initial: this.props.gA2Initial,
                gA3: this.props.gA3,
                gA3Initial: this.props.gA3Initial,
                gA4: this.props.gA4,
                gA4Initial: this.props.gA4Initial,
                gA5: this.props.gA5,
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
                gFunctionChoice: this.props.gFunctionChoice,
                gNeedsSubmit: this.props.gNeedsSubmit,

                l1SubmissionOffset: getL1SubmissionOffset(this.props.submission),
                l2SubmissionOffset: getL2SubmissionOffset(this.props.submission),
                submission: this.props.submission,
                isSubmitted: !!this.props.submission,

                shadow: this.props.shadow
            });
        }
    }

    componentDidMount() {
        this.renderJXBoard({
            gType: this.props.gType,
            gShowIntersection: this.props.gShowIntersection,
            gDisplayIntersection1: this.props.gDisplayIntersection1,
            gDisplayIntersection1Initial: this.props.gDisplayIntersection1Initial,
            gIntersectionLabel: this.props.gIntersectionLabel,
            gDisplayIntersection2: this.props.gDisplayIntersection2,
            gDisplayIntersection2Initial: this.props.gDisplayIntersection2Initial,
            gIntersection2Label: this.props.gIntersection2Label,
            gDisplayIntersection3: this.props.gDisplayIntersection3,
            gDisplayIntersection3Initial: this.props.gDisplayIntersection3Initial,
            gIntersection3Label: this.props.gIntersection3Label,
            gDisplayShadow: this.props.gDisplayShadow,
            gIntersectionHorizLineLabel: this.props.gIntersectionHorizLineLabel,
            gIntersectionVertLineLabel: this.props.gIntersectionVertLineLabel,
            gIntersection2HorizLineLabel: this.props.gIntersection2HorizLineLabel,
            gIntersection2VertLineLabel: this.props.gIntersection2VertLineLabel,
            gIntersection3HorizLineLabel: this.props.gIntersection3HorizLineLabel,
            gIntersection3VertLineLabel: this.props.gIntersection3VertLineLabel,
            gLine1Label: this.props.gLine1Label,
            gLine2Label: this.props.gLine2Label,
            gLine3Label: this.props.gLine3Label,
            gXAxisLabel: this.props.gXAxisLabel,
            gYAxisLabel: this.props.gYAxisLabel,
            gLine1Slope: this.props.gLine1Slope,
            gLine1SlopeInitial: this.props.gLine1SlopeInitial,
            gLine2Slope: this.props.gLine2Slope,
            gLine2SlopeInitial: this.props.gLine2SlopeInitial,
            gLine3Slope: this.props.gLine3Slope,
            gLine3SlopeInitial: this.props.gLine3SlopeInitial,
            gLine1OffsetX: this.props.gLine1OffsetX,
            gLine1OffsetY: this.props.gLine1OffsetY,
            gLine1OffsetXInitial: this.props.gLine1OffsetXInitial,
            gLine1OffsetYInitial: this.props.gLine1OffsetYInitial,
            gLine2OffsetX: this.props.gLine2OffsetX,
            gLine2OffsetY: this.props.gLine2OffsetY,
            gLine2OffsetXInitial: this.props.gLine2OffsetXInitial,
            gLine2OffsetYInitial: this.props.gLine2OffsetYInitial,
            gLine3OffsetX: this.props.gLine3OffsetX,
            gLine3OffsetY: this.props.gLine3OffsetY,
            gLine3OffsetXInitial: this.props.gLine3OffsetXInitial,
            gLine3OffsetYInitial: this.props.gLine3OffsetYInitial,
            gLine1Dashed: this.props.gLine1Dashed,
            gLine2Dashed: this.props.gLine2Dashed,
            gLine3Dashed: this.props.gLine3Dashed,
            gAlpha: this.props.gAlpha,
            gA1: this.props.gA1,
            gA1Initial: this.props.gA1Initial,
            gA2: this.props.gA2,
            gA2Initial: this.props.gA2Initial,
            gA3: this.props.gA3,
            gA3Initial: this.props.gA3Initial,
            gA4: this.props.gA4,
            gA4Initial: this.props.gA4Initial,
            gA5: this.props.gA5,
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
            gFunctionChoice: this.props.gFunctionChoice,
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
            <>
                <figure aria-label="The EconPractice graph."
                        id={this.id} className="jxgbox" style={this.style}>
                </figure>

                {this.props.gType === 12 && (
                    <figure aria-label="The EconPractice graph."
                            id={this.id + '-2'}
                            className="jxgbox"
                            style={this.style}>
                    </figure>
                )}
            </>
        );
    }
}

JXGBoard.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    submission: PropTypes.object,
    shadow: PropTypes.bool,

    gShowIntersection: PropTypes.bool,
    gDisplayIntersection1: PropTypes.bool,
    gDisplayIntersection1Initial: PropTypes.bool,
    gIntersectionLabel: PropTypes.string,
    gDisplayIntersection2: PropTypes.bool,
    gDisplayIntersection2Initial: PropTypes.bool,
    gIntersection2Label: PropTypes.string,
    gDisplayIntersection3: PropTypes.bool,
    gDisplayIntersection3Initial: PropTypes.bool,
    gIntersection3Label: PropTypes.string,

    gDisplayShadow: PropTypes.bool,
    gIntersectionHorizLineLabel: PropTypes.string,
    gIntersectionVertLineLabel: PropTypes.string,
    gIntersection2HorizLineLabel: PropTypes.string,
    gIntersection2VertLineLabel: PropTypes.string,
    gIntersection3HorizLineLabel: PropTypes.string,
    gIntersection3VertLineLabel: PropTypes.string,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gLine3Label: PropTypes.string,
    gXAxisLabel: PropTypes.string,
    gYAxisLabel: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine1SlopeInitial: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gLine2SlopeInitial: PropTypes.number,
    gLine3Slope: PropTypes.number,
    gLine3SlopeInitial: PropTypes.number,
    gLine1OffsetX: PropTypes.number,
    gLine1OffsetY: PropTypes.number,
    gLine1OffsetXInitial: PropTypes.number,
    gLine1OffsetYInitial: PropTypes.number,
    gLine2OffsetX: PropTypes.number,
    gLine2OffsetY: PropTypes.number,
    gLine2OffsetXInitial: PropTypes.number,
    gLine2OffsetYInitial: PropTypes.number,
    gLine3OffsetX: PropTypes.number,
    gLine3OffsetY: PropTypes.number,
    gLine3OffsetXInitial: PropTypes.number,
    gLine3OffsetYInitial: PropTypes.number,
    gLine1Dashed: PropTypes.bool,
    gLine2Dashed: PropTypes.bool,
    gLine3Dashed: PropTypes.bool,

    gAlpha: PropTypes.number,

    gA1: PropTypes.number,
    gA1Initial: PropTypes.number,
    gA2: PropTypes.number,
    gA2Initial: PropTypes.number,
    gA3: PropTypes.number,
    gA3Initial: PropTypes.number,
    gA4: PropTypes.number,
    gA4Initial: PropTypes.number,
    gA5: PropTypes.number,

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

    gFunctionChoice: PropTypes.number,

    id: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    handleAreaUpdate: PropTypes.func
};
