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

let applyDefaults = function(obj, defaults) {
    let o = {};
    for (var key in obj) {
        if (typeof obj[key] === 'undefined') {
            o[key] = defaults[key];
        } else {
            o[key] = obj[key];
        }
    }
    return o;
};

class Graph {
    constructor(board, options, defaults) {
        if (typeof defaults === 'undefined') {
            defaults = {
                gShowIntersection: true,
                gLine1Label1: '',
                gLine1Label2: '',
                gLine1Slope: -1,
                gLine2Slope: 1
            };
        }

        if (typeof options === 'undefined') {
            options = {};
        }

        this.options = applyDefaults(options, defaults);
        this.board = board;
    }
    make() {
        // unimplemented
    }
}

class DemandSupplyGraph extends Graph {
    make() {
        this.board.create('point', [2.5, 2.5], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [3.5, 2.5 + this.options.gLine1Slope], {
            name: 'b',
            size: 0,
            withLabel: false
        });
        let l1 = this.board.create('line', ['a', 'b'], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });

        this.board.create('point', [2.5, 2.5], {
            name: 'c', size: 0, withLabel: false});
        this.board.create('point', [3.5, 2.5 + this.options.gLine2Slope], {
            name: 'd',
            size: 0,
            withLabel: false
        });
        let l2 = this.board.create('line', ['c', 'd'], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeColor: 'steelblue',
            strokeWidth: 2
        });

        if (this.options.gShowIntersection) {
            let i = this.board.create('intersection', [l1, l2, 0], {
                name: this.options.intersectLabel || ''
            });

            let p1 = this.board.create('point', [0, i.Y()], {
                size: 0,
                name: this.options.yIntersectLabel || '',
                fixed: true
            });
            this.board.create('line', [p1, i], {
                dash: 1,
                strokeColor: 'black',
                strokeWidth: 1,
                straightLast: false
            });

            let p2 = this.board.create('point', [i.X(), 0], {
                size: 0,
                name: this.options.xIntersectLabel || '',
                fixed: true
            });
            this.board.create('line', [p2, i], {
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
    }
}

let mkDemandSupply = function(board, options) {
    let g = new DemandSupplyGraph(board, options);
    g.make();
};

class LaborMarketGraph extends Graph {
    make() {
        let f = function(x) {
            return (-Math.log2(x)) + 2;
        };

        let l1 = functionUtils.plot(this.board, f, {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: 'rgb(255, 127, 14)'
        });

        this.board.create('point', [0, 0], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [5, 5], {
            name: 'b', size: 0, withLabel: false});
        let l2 = this.board.create('line', ['a', 'b'], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeColor: 'steelblue',
            strokeWidth: 2
        });

        if (this.options.gShowIntersection) {
            let i = this.board.create('intersection', [l1, l2, 0], {
                withLabel: false});

            let p1 = this.board.create('point', [0, i.Y()], {
                size: 0,
                withLabel: false,
                fixed: true
            });
            this.board.create('line', [p1, i], {
                dash: 1,
                strokeColor: 'black',
                strokeWidth: 1,
                straightLast: false
            });

            let p2 = this.board.create('point', [i.X(), 0], {
                size: 0,
                withLabel: false,
                fixed: true
            });
            this.board.create('line', [p2, i], {
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
    }
}

let mkLaborMarket = function(board, options) {
    let g = new LaborMarketGraph(board, options);
    g.make();
};

class LaborMarketPerfectlyInelasticGraph extends Graph {
    make() {
        let f = function(x) {
            return (-Math.log2(x)) + 2;
        };

        functionUtils.plot(this.board, f, {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: 'rgb(255, 127, 14)'
        });

        this.board.create('point', [2.5, 0], {name: 'a', size: 0, withLabel: false});
        this.board.create('point', [2.5, 5], {name: 'b', size: 0, withLabel: false});
        this.board.create('line', ['a', 'b'], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeColor: 'steelblue',
            strokeWidth: 2
        });
    }
}

let mkLaborMarketPerfectlyInelastic = function(board, options) {
    let g = new LaborMarketPerfectlyInelasticGraph(board, options);
    g.make();
};

class CobbDouglasGraph extends Graph {
    make() {
        let f = function(x) {
            return 2.01 * ((x ** 0.75) * (x ** -0.25));
        };

        functionUtils.plot(this.board, f, {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: 'steelBlue'
        });
    }
}

let mkCobbDouglas = function(board, options) {
    let g = new CobbDouglasGraph(board, options);
    g.make();
};

class LaborSupplyGraph extends Graph {
    make() {
        this.board.create('point', [0, 5], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [5, 0], {
            name: 'b', size: 0, withLabel: false});
        this.board.create('line', ['a', 'b'], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });
    }
}

let mkLaborSupply = function(board, options) {
    let g = new LaborSupplyGraph(board, options);
    g.make();
};

class ConsumptionSavingGraph extends Graph {
    make() {
        this.board.create('point', [0, 5], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [5, 0], {
            name: 'b', size: 0, withLabel: false});
        this.board.create('line', ['a', 'b'], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });
    }
}

let mkConsumptionSaving = function(board, options) {
    let g = new ConsumptionSavingGraph(board, options);
    g.make();
};

class SavingInvestmentGraph extends Graph {
    make() {
        this.board.create('point', [0, 5], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [5, 0], {
            name: 'b', size: 0, withLabel: false});
        this.board.create('line', ['a', 'b'], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });

        this.board.create('point', [0, 0], {
            name: 'c', size: 0, withLabel: false});
        this.board.create('point', [5, 5], {
            name: 'd', size: 0, withLabel: false});
        this.board.create('line', ['c', 'd'], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeColor: 'steelblue',
            strokeWidth: 2
        });
    }
}

let mkSavingInvestment = function(board, options) {
    let g = new SavingInvestmentGraph(board, options);
    g.make();
};

class MoneyMarketGraph extends Graph {
    make() {
        this.board.create('point', [0, 5], {
            name: 'a', size: 0, withLabel: false});
        this.board.create('point', [5, 0], {
            name: 'b', size: 0, withLabel: false});
        this.board.create('line', ['a', 'b'], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });

        this.board.create('point', [0, 0], {
            name: 'c', size: 0, withLabel: false});
        this.board.create('point', [5, 5], {
            name: 'd', size: 0, withLabel: false});
        this.board.create('line', ['c', 'd'], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeColor: 'steelblue',
            strokeWidth: 2
        });
    }
}

let mkMoneyMarket = function(board, options) {
    let g = new MoneyMarketGraph(board, options);
    g.make();
};

export const graphTypes = [
    mkDemandSupply, mkLaborMarket,
    mkLaborMarketPerfectlyInelastic, mkCobbDouglas,
    mkLaborSupply, mkConsumptionSaving,
    mkSavingInvestment, mkMoneyMarket
];
