import React from 'react';
import PropTypes from 'prop-types';
import {graphTypes} from './graphTypes.js';

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.style = {width: 405, height: 200};
    }

    renderJXBoard(options) {
        // The jsxgraph npm package is out of date so I'm including
        // this package globally for now.
        if (!window.JXG) {
            return;
        }

        if (this.board) {
            window.JXG.JSXGraph.freeBoard(this.board);
        }

        let board = window.JXG.JSXGraph.initBoard(
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
                boundingbox: [-0.5, 5, 5, -0.5]
            });

        this.board = board;

        graphTypes[this.props.gType || 0](board, {
            gShowIntersection: (
                typeof options.gShowIntersection === 'undefined') ?
                true :
                options.gShowIntersection
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.gShowIntersection !== nextProps.gShowIntersection) {
            this.renderJXBoard({
                gShowIntersection: nextProps.gShowIntersection
            });
        }
    }

    componentDidMount() {
        this.renderJXBoard({
            gShowIntersection: this.props.gShowIntersection
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
    gType: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
};
