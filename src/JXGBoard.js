/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import JXG from 'jsxgraph';
import {graphTypes} from './graphTypes.js';

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.style = {width: 600, height: 400};
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
                        ticks: {visible: false}
                    },
                    y: {
                        ticks: {visible: false}
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

        graphTypes[this.props.gType || 0](board, {
            gShowIntersection: (
                typeof options.gShowIntersection === 'undefined') ?
                true :
                options.gShowIntersection,
            gLine1Label: options.gLine1Label,
            gLine2Label: options.gLine2Label,
            gLine1Slope: options.gLine1Slope,
            gLine2Slope: options.gLine2Slope
        });
    }

    componentWillReceiveProps(nextProps) {
        const updateProps = [
            'gShowIntersection',
            'gLine1Label',
            'gLine2Label',
            'gLine1Slope',
            'gLine2Slope'
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
                gShowIntersection: nextProps.gShowIntersection,
                gLine1Label: nextProps.gLine1Label,
                gLine2Label: nextProps.gLine2Label,
                gLine1Slope: nextProps.gLine1Slope,
                gLine2Slope: nextProps.gLine2Slope
            });
        }
    }

    componentDidMount() {
        this.renderJXBoard({
            gShowIntersection: this.props.gShowIntersection,
            gLine1Label: this.props.gLine1Label,
            gLine2Label: this.props.gLine2Label,
            gLine1Slope: this.props.gLine1Slope,
            gLine2Slope: this.props.gLine2Slope
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
    gShowIntersection: PropTypes.bool,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gType: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
};
