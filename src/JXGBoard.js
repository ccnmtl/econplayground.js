import React from 'react';
import PropTypes from 'prop-types';
import {graphTypes} from './graphTypes.js';

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.style = {width: 405, height: 200};
        //this.state = {board: null};
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

        graphTypes[this.props.type || 0](board, {
            showIntersection: (
                typeof options.showIntersection === 'undefined') ?
                true :
                options.showIntersection
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.showIntersection !== nextProps.showIntersection) {
            this.renderJXBoard({
                showIntersection: nextProps.showIntersection
            });
        }
    }

    componentDidMount() {
        this.renderJXBoard({
            showIntersection: this.props.showIntersection
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
    showIntersection: PropTypes.bool,
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
};
