import React from 'react';
import PropTypes from 'prop-types';

let mkDemandSupplyGraph = function(board) {
    board.create('point', [-1, 1], {name: 'A', size: 4});
    board.create('point',[1, -1], {name:'B', size: 4});
    board.create('line',['A', 'B'], {
        strokeColor:'rgb(255, 127, 14)', strokeWidth: 2
    });

    board.create('point', [-1, -1], {name: 'C', size: 4});
    board.create('point',[1, 1], {name:'D', size: 4});
    board.create('line',['C', 'D'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkLaborMarketGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkLaborMarketPerfectlyInelasticGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkCobbDouglasGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkLaborSupplyGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkConsumptionSavingGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkSavingInvestmentGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

let mkMoneyMarketGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point',[2, -1], {name:'B', size:4});
    board.create('line',['A', 'B'], {
        strokeColor:'steelblue', strokeWidth: 2
    });
};

const graphs = [
    mkDemandSupplyGraph, mkLaborMarketGraph,
    mkLaborMarketPerfectlyInelasticGraph, mkCobbDouglasGraph,
    mkLaborSupplyGraph, mkConsumptionSavingGraph,
    mkSavingInvestmentGraph, mkMoneyMarketGraph
];

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {board: null};
        this.defaultStyle = {width: 405, height: 200};
    }

    //called only after initial render
    componentDidMount() {
        // The jsxgraph npm package is out of date so I'm including
        // this package globally for now.
        if (!window.JXG) {
            return;
        }

        let board = window.JXG.JSXGraph.initBoard(this.id, {
            boundingbox: [-3, 10, 3, -3]
        });

        graphs[this.props.type || 0](board);

        this.setState({board: board});
    }

    // called only if shouldComponentUpdate returns true
    // for rendering the JSXGraph board div and any child elements
    render() {
        var style = this.defaultStyle;

        return (
            <div id={this.id} className="jxgbox" style={style}>
            </div>
        );
    }
}

JXGBoard.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
};
