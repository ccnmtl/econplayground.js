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
                gLine2Slope: 1,
                gLineMovement: null
            };
        }

        if (typeof options === 'undefined') {
            options = {};
        }

        // Line 1 and line 2
        this.l1 = null;
        this.l2 = null;

        this.options = applyDefaults(options, defaults);
        this.board = board;
    }
    /**
     * Handle initialization that happens after the custom make() step.
     */
    postMake() {
        if (!this.l1 || !this.l2) {
            return;
        }

        this.initialL1Y = this.l1.getRise();
        this.initialL2Y = this.l2.getRise();

        this.l1.on('mouseup', function() {
            // TODO: emit event for each case
            // let event = new Event('linemove');
            // me.board.dispatchEvent(event);
            /*if (this.getRise() > me.initialL1Y) {

            } else if (this.getRise() < me.initialL1Y) {

            } else {

            }*/
        });
        this.l2.on('mouseup', function() {
            /*if (this.getRise() > me.initialL2Y) {

            } else if (this.getRise() < me.initialL2Y) {

            } else {

            }*/
        });
    }
    /**
     * Updates the intersection point at this.i.
     *
     * Expects this.i and this.p1, this.p2 to be set.
     */
    updateIntersection() {
        this.p1.moveTo([0, this.i.Y()]);
        this.p2.moveTo([this.i.X(), 0]);
    }
    /**
     * Set up intersection display for l1 and l2.
     *
     * Sets this.i, this.p1, and this.p2.
     */
    showIntersection(l1, l2) {
        let i = this.board.create('intersection', [l1, l2, 0], {
            name: this.options.intersectLabel || '',
            fixed: true,
            showInfobox: false
        });
        this.i = i;

        let p1 = this.board.create('point', [0, i.Y()], {
            size: 0,
            name: this.options.yIntersectLabel || '',
            fixed: true,
            showInfobox: false
        });
        this.p1 = p1;
        this.board.create('line', [p1, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightFirst: false,
            straightLast: false
        });

        let p2 = this.board.create('point', [i.X(), 0], {
            size: 0,
            name: this.options.xIntersectLabel || '',
            fixed: true,
            showInfobox: false
        });
        this.p2 = p2;
        this.board.create('line', [p2, i], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightFirst: false,
            straightLast: false
        });

        // Keep the dashed intersection lines perpendicular to the axes.
        const me = this;
        l1.on('up', function() {
            me.updateIntersection();
        });
        l1.on('drag', function() {
            me.updateIntersection();
        });
        l2.on('up', function() {
            me.updateIntersection();
        });
        l2.on('drag', function() {
            me.updateIntersection();
        });
    }
    make() {
        // unimplemented
    }
}

class DemandSupplyGraph extends Graph {
    make() {
        let l1 = this.board.create(
            'line',
            [[2.5, 2.5], [3.5, 2.5 + this.options.gLine1Slope]], {
                name: this.options.gLine1Label,
                withLabel: true,
                label: { position: 'rt', offset: [-10, -20] },
                strokeColor: 'rgb(255, 127, 14)',
                strokeWidth: 2,
                snapToGrid: true
            });
        this.l1 = l1;

        let l2 = this.board.create(
            'line',
            [[2.5, 2.5], [3.5, 2.5 + this.options.gLine2Slope]], {
                name: this.options.gLine2Label,
                withLabel: true,
                label: { position: 'rt', offset: [0, 20] },
                strokeColor: 'steelblue',
                strokeWidth: 2,
                snapToGrid: true
            });
        this.l2 = l2;

        // TODO: move line position based on gLineMovement

        if (this.options.gShowIntersection) {
            this.showIntersection(l1, l2);
        }
    }
}

let mkDemandSupply = function(board, options) {
    let g = new DemandSupplyGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class LaborMarketGraph extends Graph {
    make() {
        let f = function(x) {
            return 1 / x;
        };

        let l1 = functionUtils.plot(this.board, f, {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: 'rgb(255, 127, 14)'
        });

        let l2 = this.board.create('line', [[0, 0], [5, 5]], {
            name: this.options.gLine2Label,
            withLabel: true,
            label: { position: 'rt', offset: [10, -20] },
            strokeColor: 'steelblue',
            strokeWidth: 2,
            snapToGrid: true
        });

        if (this.options.gShowIntersection) {
            this.showIntersection(l1, l2);
        }
    }
}

let mkLaborMarket = function(board, options) {
    let g = new LaborMarketGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class LaborMarketPerfectlyInelasticGraph extends Graph {
    make() {
        let f = function(x) {
            return 1 / x;
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
            strokeWidth: 2,
            snapToGrid: true
        });
    }
}

let mkLaborMarketPerfectlyInelastic = function(board, options) {
    let g = new LaborMarketPerfectlyInelasticGraph(board, options);
    g.make();
    g.postMake();
    return g;
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
    g.postMake();
    return g;
};

class LaborSupplyGraph extends Graph {
    make() {
        this.board.create('line', [[0, 5], [5, 0]], {
            name: this.options.gLine1Label,
            withLabel: true,
            label: { position: 'rt', offset: [-10, 20] },
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });
    }
}

let mkLaborSupply = function(board, options) {
    let g = new LaborSupplyGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class ConsumptionSavingGraph extends Graph {
    make() {
        this.board.create('line', [[0, 5], [5, 0]], {
            name: this.options.gLine1Label,
            withLabel: true,
            label: { position: 'rt', offset: [-10, 20] },
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });
    }
}

let mkConsumptionSaving = function(board, options) {
    let g = new ConsumptionSavingGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class SavingInvestmentGraph extends Graph {
    make() {
        this.board.create('line', [[0, 5], [5, 0]], {
            name: this.options.gLine1Label,
            withLabel: true,
            label: { position: 'rt', offset: [-10, 20] },
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });

        this.board.create('line', [[0, 0], [5, 5]], {
            name: this.options.gLine2Label,
            withLabel: true,
            label: { position: 'rt', offset: [0, 0] },
            strokeColor: 'steelblue',
            strokeWidth: 2
        });
    }
}

let mkSavingInvestment = function(board, options) {
    let g = new SavingInvestmentGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class MoneyMarketGraph extends Graph {
    make() {
        this.board.create('line', [[0, 5], [5, 0]], {
            name: this.options.gLine1Label,
            withLabel: true,
            label: { position: 'rt', offset: [-10, 20] },
            strokeColor: 'rgb(255, 127, 14)',
            strokeWidth: 2
        });

        this.board.create('line', [[0, 0], [5, 5]], {
            name: this.options.gLine2Label,
            withLabel: true,
            label: { position: 'rt', offset: [0, 0] },
            strokeColor: 'steelblue',
            strokeWidth: 2
        });
    }
}

let mkMoneyMarket = function(board, options) {
    let g = new MoneyMarketGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

export const graphTypes = [
    mkDemandSupply, mkLaborMarket,
    mkLaborMarketPerfectlyInelastic, mkCobbDouglas,
    mkLaborSupply, mkConsumptionSaving,
    mkSavingInvestment, mkMoneyMarket
];
