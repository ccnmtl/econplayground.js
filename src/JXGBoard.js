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

        let board = JXG.JSXGraph.initBoard(
            this.id, {
                axis: true,
                defaultAxes: {
                    x: {
                        name: options.gXAxisLabel ? options.gXAxisLabel : 'x',
                        label: {
                            offset: [440, 20]
                        },
                        withLabel: options.gXAxisLabel ? true : false,
                        ticks: {
                            visible: false
                        }
                    },
                    y: {
                        name: options.gYAxisLabel ? options.gYAxisLabel : 'y',
                        label: {
                            offset: [5, 260]
                        },
                        withLabel: options.gYAxisLabel ? true : false,
                        ticks: {
                            visible: false
                        }
                    }
                },
                keepAspectRatio: true,
                showCopyright: false,
                showZoom: false,
                showReload: false,
                showNavigation: false,
                boundingbox: [-0.2, 5, 5, -0.2]
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
                gLine1Label: options.gLine1Label,
                gLine2Label: options.gLine2Label,
                gLine1Slope: options.gLine1Slope,
                gLine2Slope: options.gLine2Slope,
                gLine1Offset: options.gLine1Offset,
                gLine2Offset: options.gLine2Offset,
                l1SubmissionOffset: getL1SubmissionOffset(options.submission),
                l2SubmissionOffset: getL2SubmissionOffset(options.submission),
                submission: options.submission,
                isSubmitted: options.isSubmitted
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
            'gLine1Label',
            'gLine2Label',
            'gLine1Slope',
            'gLine2Slope',
            'gLine1Offset',
            'gLine2Offset',
            'submission'
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
                gLine2Offset: nextProps.gLine2Offset,
                l1SubmissionOffset: getL1SubmissionOffset(nextProps.submission),
                l2SubmissionOffset: getL2SubmissionOffset(nextProps.submission),
                submission: nextProps.submission,
                isSubmitted: !!nextProps.submission
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
            gLine2Offset: this.props.gLine2Offset,
            l1SubmissionOffset: getL1SubmissionOffset(this.props.submission),
            l2SubmissionOffset: getL2SubmissionOffset(this.props.submission),
            submission: this.props.submission,
            isSubmitted: !!this.props.submission
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
    gLine2Offset: PropTypes.number,
    gType: PropTypes.number,
    id: PropTypes.string.isRequired
};
