/**
 * graphTypes.js
 *
 * These routines create the basic econ graph types in jsxgraph.
 */

/**
 * Some utilities for plotting functions in JSXGraph.
 *
 * Based on:
 *
 *   http://jsxgraph.uni-bayreuth.de/wiki/index.php/Simple_function_plotter
 *
 */
let functionUtils = {};

// Macro function plotter
functionUtils.addCurve = function(board, func, atts) {
    var f = board.create('functiongraph', [func], atts);
    return f;
};

// Simplified plotting of function
functionUtils.plot = function(board, func, atts) {
    if (!atts) {
        return functionUtils.addCurve(board, func, {strokewidth: 2});
    } else {
        return functionUtils.addCurve(board, func, atts);
    }
};


let mkDemandSupply = function(board, options) {
    if (typeof options === 'undefined') {
        options = {
            gShowIntersection: true
        };
    }

    board.create('point', [2.5, 2.5], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 0], {name: 'b', size: 0, withLabel: false});
    let l1 = board.create('line', ['a', 'b'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });

    board.create('point', [0, 0], {name: 'c', size: 0, withLabel: false});
    board.create('point', [5, 5], {name: 'd', size: 0, withLabel: false});
    let l2 = board.create('line', ['c', 'd'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });

    if (options.gShowIntersection) {
        let i = board.create('intersection', [l1, l2, 0], {
            name: options.intersectLabel || ''
        });

        let p1 = board.create('point', [0, i.Y()], {
            size: 0,
            name: options.yIntersectLabel || '',
            fixed: true
        });
        board.create('line', [p1, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightLast: false
        });

        let p2 = board.create('point', [i.X(), 0], {
            size: 0,
            name: options.xIntersectLabel || '',
            fixed: true
        });
        board.create('line', [p2, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightLast: false
        });

        // Keep the dashed lines perpendicular to axes.
        l1.on('drag', function() {
            p1.moveTo([0, i.Y()]);
            p2.moveTo([i.X(), 0]);
        });
        l2.on('drag', function() {
            p1.moveTo([0, i.Y()]);
            p2.moveTo([i.X(), 0]);
        });
    }
};

let mkLaborMarket = function(board, options) {
    if (typeof options === 'undefined') {
        options = {
            gShowIntersection: true
        };
    }

    let f = function(x) {
        return (-Math.log2(x)) + 2;
    };

    let l1 = functionUtils.plot(board, f, {
        strokeWidth: 2,
        strokeColor: 'rgb(255, 127, 14)'
    });

    board.create('point', [0, 0], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 5], {name: 'b', size: 0, withLabel: false});
    let l2 = board.create('line', ['a', 'b'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });

    if (options.gShowIntersection) {
        let i = board.create('intersection', [l1, l2, 0], {withLabel: false});

        let p1 = board.create('point', [0, i.Y()], {
            size: 0,
            withLabel: false,
            fixed: true
        });
        board.create('line', [p1, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightLast: false
        });

        let p2 = board.create('point', [i.X(), 0], {
            size: 0,
            withLabel: false,
            fixed: true
        });
        board.create('line', [p2, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightLast: false
        });

        // Keep the dashed lines perpendicular to axes.
        l1.on('drag', function() {
            p1.moveTo([0, i.Y()]);
            p2.moveTo([i.X(), 0]);
        });
        l2.on('drag', function() {
            p1.moveTo([0, i.Y()]);
            p2.moveTo([i.X(), 0]);
        });
    }
};

let mkLaborMarketPerfectlyInelastic = function(board) {
    let f = function(x) {
        return (-Math.log2(x)) + 2;
    };

    functionUtils.plot(board, f, {
        strokeWidth: 2,
        strokeColor: 'rgb(255, 127, 14)'
    });

    board.create('point', [2.5, 0], {name: 'a', size: 0, withLabel: false});
    board.create('point', [2.5, 5], {name: 'b', size: 0, withLabel: false});
    board.create('line', ['a', 'b'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkCobbDouglas = function(board) {
    let f = function(x) {
        return 2.01 * ((x ** 0.75) * (x ** -0.25));
    };

    functionUtils.plot(board, f, {
        strokeWidth: 2,
        strokeColor: 'steelBlue'
    });
};

let mkLaborSupply = function(board) {
    board.create('point', [0, 5], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 0], {name: 'b', size: 0, withLabel: false});
    board.create('line', ['a', 'b'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });
};

let mkConsumptionSaving = function(board) {
    board.create('point', [0, 5], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 0], {name: 'b', size: 0, withLabel: false});
    board.create('line', ['a', 'b'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });
};

let mkSavingInvestment = function(board) {
    board.create('point', [0, 5], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 0], {name: 'b', size: 0, withLabel: false});
    board.create('line', ['a', 'b'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });

    board.create('point', [0, 0], {name: 'c', size: 0, withLabel: false});
    board.create('point', [5, 5], {name: 'd', size: 0, withLabel: false});
    board.create('line', ['c', 'd'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

let mkMoneyMarket = function(board) {
    board.create('point', [0, 5], {name: 'a', size: 0, withLabel: false});
    board.create('point', [5, 0], {name: 'b', size: 0, withLabel: false});
    board.create('line', ['a', 'b'], {
        strokeColor: 'rgb(255, 127, 14)',
        strokeWidth: 2
    });

    board.create('point', [0, 0], {name: 'c', size: 0, withLabel: false});
    board.create('point', [5, 5], {name: 'd', size: 0, withLabel: false});
    board.create('line', ['c', 'd'], {
        strokeColor: 'steelblue',
        strokeWidth: 2
    });
};

export const graphTypes = [
    mkDemandSupply, mkLaborMarket,
    mkLaborMarketPerfectlyInelastic, mkCobbDouglas,
    mkLaborSupply, mkConsumptionSaving,
    mkSavingInvestment, mkMoneyMarket
];
