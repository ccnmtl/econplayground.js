/**
 * graphTypes.js
 *
 * These routines create the basic econ graph types in jsxgraph.
 */

let mkDemandSupplyGraph = function(board) {
    board.create('point', [-1, 1], {name: 'A', size: 4});
    board.create('point', [1, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });

    board.create('point', [-1, -1], {name: 'C', size: 4});
    board.create('point', [1, 1], {name: 'D', size: 4});
    board.create('line', ['C', 'D'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkLaborMarketGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkLaborMarketPerfectlyInelasticGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkCobbDouglasGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkLaborSupplyGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkConsumptionSavingGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkSavingInvestmentGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkMoneyMarketGraph = function(board) {
    board.create('point', [-2, 1], {name: 'A', size: 4});
    board.create('point', [2, -1], {name: 'B', size: 4});
    board.create('line', ['A', 'B'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

export const graphTypes = [
    mkDemandSupplyGraph, mkLaborMarketGraph,
    mkLaborMarketPerfectlyInelasticGraph, mkCobbDouglasGraph,
    mkLaborSupplyGraph, mkConsumptionSavingGraph,
    mkSavingInvestmentGraph, mkMoneyMarketGraph
];
