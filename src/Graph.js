/**
 * Graph.js
 *
 * Each graph type is a sub-class of the common Graph class.
 */

import { defaultGraph } from './GraphMapping';
import { forceFloat, getOffset } from './utils';


const applyDefaults = function(obj, defaults) {
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
            defaults = defaultGraph;
        }

        if (typeof options === 'undefined') {
            options = {};
        }

        // Line 1 and line 2
        this.l1 = null;
        this.l1Color = 'rgb(255, 127, 14)';
        this.l2 = null;
        this.l2Color = 'steelblue';
        this.shadowColor = 'rgb(200, 200, 200)';

        this.options = applyDefaults(options, defaults);

        this.areLinesFixed = this.options.locked ||
            this.options.isSubmitted ||
            (this.options.interactionType === 2);

        this.board = board;
    }
    resetLine1() {
        if (!this.l1) {
            return;
        }
        this.l1.point1.moveTo([
            2.5,
            2.5 + this.options.gLine1OffsetY]);
        this.l1.point2.moveTo([
            3.5,
            2.5 + this.options.gLine1OffsetY +
                this.options.gLine1Slope]);
    }
    resetLine2() {
        if (!this.l2) {
            return;
        }
        this.l2.point1.moveTo([
            2.5,
            2.5 + this.options.gLine2OffsetY]);
        this.l2.point2.moveTo([
            3.5,
            2.5 + this.options.gLine2OffsetY +
                this.options.gLine2Slope]);
    }
    /**
     * Handle common initialization that happens after the custom
     * make() step.
     */
    postMake() {
        // Make two white lines to block the curves from displaying
        // below 0. A more straightforward way to do this would be
        // better.
        this.board.create('line', [[-0.2, 0], [-0.2, 5]], {
            dash: 0,
            highlight: false,
            fixed: true,
            strokeColor: 'white',
            strokeWidth: this.board.canvasWidth / 25.5,
            straightFirst: true,
            straightLast: true
        });
        this.board.create('line', [[0, -0.2], [5, -0.2]], {
            dash: 0,
            highlight: false,
            fixed: true,
            strokeColor: 'white',
            strokeWidth: this.board.canvasWidth / 25.5,
            straightFirst: true,
            straightLast: true
        });

        const me = this;

        if (
            this.l1 && (typeof this.l1.getRise === 'function') &&
                !this.options.isSubmitted
        ) {
            this.initialL1Y = this.l1.getRise();

            if (window.EconPlayground.isInstructor) {
                this.l1.on('mouseup', function() {
                    const offset = getOffset(
                        me.l1.getSlope(), me.l1.getRise(), 2.5);
                    const offsetEvt = new CustomEvent('l1offset', {
                        detail: {
                            x: 0,
                            y: offset
                        }
                    });
                    document.dispatchEvent(offsetEvt);
                });
            } else {
                this.l1.on('mouseup', function() {
                    // Only do this line reset functionality if this
                    // is a submittable graph. Otherwise, students
                    // should be able to play freely.
                    if (me.options.gNeedsSubmit) {
                        me.resetLine2();
                    }

                    if (this.getRise() > me.initialL1Y) {
                        document.dispatchEvent(new Event('l1up'));
                    } else if (this.getRise() < me.initialL1Y) {
                        document.dispatchEvent(new Event('l1down'));
                    } else {
                        document.dispatchEvent(new Event('l1initial'));
                    }

                    const offset = getOffset(
                        me.l1.getSlope(), me.l1.getRise(), 2.5);
                    const offsetEvt = new CustomEvent('l1offset', {
                        detail: {
                            x: 0,
                            y: offset
                        }
                    });
                    document.dispatchEvent(offsetEvt);
                });
            }
        }

        if (
            this.l2 && (typeof this.l2.getRise === 'function') &&
                !this.options.isSubmitted
        ) {
            this.initialL2Y = this.l2.getRise();

            if (window.EconPlayground.isInstructor) {
                this.l2.on('mouseup', function() {
                    const offset = getOffset(
                        me.l2.getSlope(), me.l2.getRise(), 2.5);
                    const offsetEvt = new CustomEvent('l2offset', {
                        detail: {
                            x: 0,
                            y: offset
                        }
                    });
                    document.dispatchEvent(offsetEvt);
                });
            } else {
                this.l2.on('mouseup', function() {
                    // Only do this line reset functionality if this
                    // is a submittable graph. Otherwise, students
                    // should be able to play freely.
                    if (me.options.gNeedsSubmit) {
                        me.resetLine1();
                    }

                    if (this.getRise() > me.initialL2Y) {
                        document.dispatchEvent(new Event('l2up'));
                    } else if (this.getRise() < me.initialL2Y) {
                        document.dispatchEvent(new Event('l2down'));
                    } else {
                        document.dispatchEvent(new Event('l2initial'));
                    }

                    const offset = getOffset(
                        me.l2.getSlope(), me.l2.getRise(), 2.5);
                    const offsetEvt = new CustomEvent('l2offset', {
                        detail: {
                            x: 0,
                            y: offset
                        }
                    });
                    document.dispatchEvent(offsetEvt);
                });
            }
        }
    }
    /**
     * Updates the intersection point at i.
     */
    updateIntersection(i, p1, p2) {
        p1.moveTo([0, i.Y()]);
        p2.moveTo([i.X(), 0]);
    }
    /**
     * Set up intersection display for l1 and l2.
     *
     * i is the intersection, and p1 and p2 are its X and Y
     * intercepts.
     */
    showIntersection(l1, l2, isShadow) {
        let i = this.board.create('intersection', [l1, l2, 0], {
            name: this.options.gIntersectionLabel || '',
            withLabel: !isShadow,
            fixed: true,
            highlight: false,
            showInfobox: false,
            size: 1,
            fillColor: isShadow ? 'rgb(150, 150, 150)' : 'red',
            strokeColor: isShadow ? 'rgb(150, 150, 150)' : 'red'
        });

        let p1 = this.board.create('point', [0, i.Y()], {
            size: 0,
            name: this.options.gIntersectionHorizLineLabel || '',
            withLabel: !isShadow,
            fixed: true,
            highlight: false,
            showInfobox: false
        });
        this.board.create('line', [p1, i], {
            dash: 1,
            highlight: false,
            strokeColor: 'black',
            strokeWidth: isShadow ? 0.5 : 1,
            straightFirst: false,
            straightLast: false,
            layer: 4
        });

        let p2 = this.board.create('point', [i.X(), 0], {
            size: 0,
            name: this.options.gIntersectionVertLineLabel || '',
            withLabel: !isShadow,
            fixed: true,
            highlight: false,
            showInfobox: false
        });
        this.board.create('line', [p2, i], {
            dash: 1,
            highlight: false,
            strokeColor: 'black',
            strokeWidth: isShadow ? 0.5 : 1,
            straightFirst: false,
            straightLast: false,
            layer: 4
        });

        if (!isShadow) {
            // Keep the dashed intersection lines perpendicular to the axes.
            const me = this;
            l1.on('up', function() {
                me.updateIntersection(i, p1, p2);
            });
            l1.on('drag', function() {
                me.updateIntersection(i, p1, p2);
            });
            l2.on('up', function() {
                me.updateIntersection(i, p1, p2);
            });
            l2.on('drag', function() {
                me.updateIntersection(i, p1, p2);
            });
        }
    }
    make() {
        // unimplemented
    }
}

class DemandSupplyGraph extends Graph {
    make() {
        const me = this;

        if (this.options.shadow && this.options.gDisplayShadow) {
            // Display the initial curves set by the instructor.
            const f1Shadow = function(x) {
                const slope = me.options.gLine1SlopeInitial || 1;
                return x * slope;
            }

            const l1fShadow = this.board.create(
                'functiongraph',
                [f1Shadow, -30, 30], {
                    withLabel: false,
                    strokeWidth: 2,
                    strokeColor: this.shadowColor,
                    highlight: false,
                    fixed: true,
                    layer: 4
                });

            const fShadow = function(x) {
                const slope = me.options.gLine2SlopeInitial || -1;
                return x * slope + 5;
            };

            const lfShadow = this.board.create(
                'functiongraph',
                [fShadow, -30, 30], {
                    withLabel: false,
                    strokeWidth: 2,
                    strokeColor: this.shadowColor,
                    highlight: false,
                    fixed: true,
                    layer: 4
                });

            l1fShadow.setPosition(window.JXG.COORDS_BY_USER, [
                forceFloat(this.options.gLine1OffsetXInitial),
                forceFloat(this.options.gLine1OffsetYInitial)
            ]);
            lfShadow.setPosition(window.JXG.COORDS_BY_USER, [
                forceFloat(this.options.gLine2OffsetXInitial),
                forceFloat(this.options.gLine2OffsetYInitial)
            ]);
            // This is necessary, because otherwise the setPosition call
            // won't have an effect until the graph is interacted with.
            l1fShadow.fullUpdate(true);
            lfShadow.fullUpdate(true);

            this.showIntersection(l1fShadow, lfShadow, true);
        }

        this.l1 = this.board.create(
            'line',
            [
                [2.5, 2.5 + this.options.gLine1OffsetY +
                 this.options.l1SubmissionOffset],
                [3.5, 2.5 + this.options.gLine1OffsetY +
                 this.options.gLine1Slope + this.options.l1SubmissionOffset]
            ], {
                name: this.options.gLine1Label,
                withLabel: true,
                label: { position: 'rt', offset: [-10, -20] },
                strokeColor: this.l1Color,
                strokeWidth: 2,
                fixed: this.areLinesFixed
            });

        this.l2 = this.board.create(
            'line',
            [
                [2.5, 2.5 + this.options.gLine2OffsetY +
                 this.options.l2SubmissionOffset],
                [3.5, 2.5 + this.options.gLine2OffsetY +
                 this.options.gLine2Slope + this.options.l2SubmissionOffset]
            ], {
                name: this.options.gLine2Label,
                withLabel: true,
                label: { position: 'rt', offset: [0, 35] },
                strokeColor: this.l2Color,
                strokeWidth: 2,
                fixed: this.areLinesFixed
            });

        if (this.options.gShowIntersection) {
            this.showIntersection(this.l1, this.l2);
        }
    }
}

const mkDemandSupply = function(board, options) {
    let g = new DemandSupplyGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class NonLinearDemandSupplyGraph extends Graph {
    make() {
        const me = this;
        const alpha = 0.3;

        if (this.options.shadow && this.options.gDisplayShadow) {
            // Display the initial curves set by the instructor.
            const f1Shadow = function(x) {
                const slope = me.options.gLine1SlopeInitial || 1;
                return (x - 2.5) * slope + 2.5;
            }

            const l1fShadow = this.board.create(
                'functiongraph',
                [f1Shadow, -30, 30], {
                    withLabel: false,
                    strokeWidth: 2,
                    strokeColor: this.shadowColor,
                    highlight: false,
                    fixed: true,
                    layer: 4
                });

            const fShadow = function(x) {
                return (1 - alpha) *
                    (me.options.gCobbDouglasAInitial *
                     me.options.gCobbDouglasKInitial ** alpha) *
                    (x ** -alpha);
            };

            const lfShadow = this.board.create(
                'functiongraph',
                [fShadow, -30, 30], {
                    withLabel: false,
                    strokeWidth: 2,
                    strokeColor: this.shadowColor,
                    highlight: false,
                    fixed: true,
                    layer: 4
                });

            l1fShadow.setPosition(window.JXG.COORDS_BY_USER, [
                forceFloat(this.options.gLine1OffsetXInitial),
                forceFloat(this.options.gLine1OffsetYInitial)
            ]);
            lfShadow.setPosition(window.JXG.COORDS_BY_USER, [
                forceFloat(this.options.gLine2OffsetXInitial),
                forceFloat(this.options.gLine2OffsetYInitial)
            ]);
            // This is necessary, because otherwise the setPosition call
            // won't have an effect until the graph is interacted with.
            l1fShadow.fullUpdate(true);
            lfShadow.fullUpdate(true);

            this.showIntersection(l1fShadow, lfShadow, true);
        }

        const f1 = function(x) {
            const slope = me.options.gLine1Slope || 1;
            return (x - 2.5) * slope + 2.5;
        };

        this.l1 = this.board.create('functiongraph', [f1, -30, 30], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: this.l1Color,
            fixed: this.areLinesFixed
        });

        const f = function(x) {
            return (1 - alpha) *
                (me.options.gCobbDouglasA *
                 me.options.gCobbDouglasK ** alpha) *
                (x ** -alpha);
        };

        this.l2 = this.board.create('functiongraph', [f, -30, 30], {
            name: this.options.gLine2Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: this.l2Color,
            fixed: this.areLinesFixed
        });

        this.l1.setPosition(window.JXG.COORDS_BY_USER, [
            forceFloat(this.options.gLine1OffsetX),
            forceFloat(this.options.gLine1OffsetY)
        ]);
        this.l2.setPosition(window.JXG.COORDS_BY_USER, [
            forceFloat(this.options.gLine2OffsetX),
            forceFloat(this.options.gLine2OffsetY)
        ]);

        // This is necessary, because otherwise the setPosition call
        // won't have an effect until the graph is interacted with.
        this.l1.fullUpdate(true);
        this.l2.fullUpdate(true);

        this.l1.on('mouseup', function() {
            const xOffset = me.l1.transformations[0].matrix[1][0];
            const yOffset = me.l1.transformations[0].matrix[2][0];
            const offsetEvt = new CustomEvent('l1offset', {
                detail: {
                    x: xOffset,
                    y: yOffset
                }
            });
            document.dispatchEvent(offsetEvt);
        });

        this.l2.on('mouseup', function() {
            const xOffset = me.l2.transformations[0].matrix[1][0];
            const yOffset = me.l2.transformations[0].matrix[2][0];
            const offsetEvt = new CustomEvent('l2offset', {
                detail: {
                    x: xOffset,
                    y: yOffset
                }
            });
            document.dispatchEvent(offsetEvt);
        });

        if (this.options.gShowIntersection) {
            this.showIntersection(this.l1, this.l2);
        }
    }
}

const mkNonLinearDemandSupply = function(board, options) {
    let g = new NonLinearDemandSupplyGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class CobbDouglasGraph extends Graph {
    make() {
        const me = this;
        const f = function(x) {
            return me.options.gCobbDouglasA *
                (me.options.gCobbDouglasK ** me.options.gCobbDouglasAlpha) *
                (x ** (1 - me.options.gCobbDouglasAlpha));
        };

        this.board.create('functiongraph', [f], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: this.l1Color
        });

        if (this.options.shadow && this.options.gDisplayShadow) {
            // Display the initial curve set by the instructor.
            const fShadow = function(x) {
                return me.options.gCobbDouglasAInitial *
                    (me.options.gCobbDouglasKInitial **
                     me.options.gCobbDouglasAlphaInitial) *
                    (x ** (1 - me.options.gCobbDouglasAlphaInitial));
            };

            this.board.create('functiongraph', [fShadow, -30, 30], {
                name: this.options.gLine1Label,
                withLabel: false,
                strokeWidth: 2,
                strokeColor: this.shadowColor,
                highlight: false,
                // Under the main line layer
                layer: 4
            });
        }

        const pName = 'F(' + me.options.gCobbDouglasAName + ',' +
              me.options.gCobbDouglasKName + ',' +
              me.options.gCobbDouglasLName + ')';

        let p = this.board.create('point', [
            me.options.gCobbDouglasL,
            f(me.options.gCobbDouglasL)], {
                name: pName,
                fixed: true
            });

        this.board.create('line', [p, [p.X(), 0]], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightFirst: false,
            straightLast: false
        });

        this.board.create('line', [[0, p.Y()], p], {
            dash: 1,
            strokeColor: 'black',
            strokeWidth: 1,
            straightFirst: false,
            straightLast: false
        });
    }
}

const mkCobbDouglas = function(board, options) {
    let g = new CobbDouglasGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class ConsumptionLeisureGraph extends Graph {
    /**
     * This graph displays the function:
     *
     *   y = (n - x)w
     *
     * To store these values, I'm using:
     *
     *   n -> gA1
     *   w -> gA2
     */
    make() {
        const me = this;

        if (this.options.shadow && this.options.gDisplayShadow) {
            const f1Shadow = function(x) {
                return (me.options.gA1Initial - x) * me.options.gA2Initial;
            }

            this.board.create('functiongraph', [f1Shadow, -30, 30], {
                name: this.options.gLine1Label,
                withLabel: false,
                strokeWidth: 2,
                strokeColor: this.shadowColor,
                highlight: false,
                // Under the main line layer
                layer: 4
            });
        }

        const f1 = function(x) {
            return (me.options.gA1 - x) * me.options.gA2;
        };

        this.l1 = this.board.create('functiongraph', [f1, -30, 30], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: this.l1Color,
            // This graph is only moved by its RangeEditors, not by
            // dragging.
            fixed: true,
            highlight: false
        });

        if (this.options.gShowIntersection) {
            this.board.create(
                'intersection',
                [this.l1, this.board.defaultAxes.x, 0], {
                    name: this.options.gIntersectionLabel || '',
                    withLabel: true,
                    fixed: true,
                    highlight: false,
                    showInfobox: false,
                    size: 1,
                    fillColor: 'red',
                    strokeColor: 'red'
                });
        }
    }
}

const mkConsumptionLeisure = function(board, options) {
    let g = new ConsumptionLeisureGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

class ConsumptionSavingGraph extends Graph {
    /**
     * This graph displays the function:
     *
     *   c2 = y2 + (1 + r)(y1 + W - c1)
     *
     * With c1 plotted as X. To store these values,
     * I'm using:
     *
     *   y1 -> gA1
     *   y2 -> gA2
     *   W -> gA3
     *   r -> gA4
     */
    make() {
        const me = this;

        if (this.options.shadow && this.options.gDisplayShadow) {
            const f1Shadow = function(x) {
                return me.options.gA2Initial + (1 + me.options.gA4Initial) *
                    (me.options.gA1Initial + me.options.gA3Initial - x);
            }

            this.board.create('functiongraph', [f1Shadow, -30, 30], {
                withLabel: false,
                strokeWidth: 2,
                strokeColor: this.shadowColor,
                highlight: false,
                // Under the main line layer
                layer: 4
            });

            if (this.options.gShowIntersection) {
                const p1Shadow = this.board.create('point', [
                    this.options.gA1Initial + this.options.gA3Initial, 0], {
                        name: 'y<sub>1</sub> + W',
                        withLabel: false,
                        size: 1,
                        strokeColor: this.shadowColor,
                        fillColor: this.shadowColor,
                        fixed: true,
                        highlight: false,
                        showInfobox: false
                    });

                const p2Shadow = this.board.create('point', [
                    0, this.options.gA2Initial], {
                        name: 'y<sub>2</sub>',
                        withLabel: false,
                        size: 1,
                        strokeColor: this.shadowColor,
                        fillColor: this.shadowColor,
                        fixed: true,
                        highlight: false,
                        showInfobox: false
                    });

                const l1Shadow = this.board.create('line', [
                    p1Shadow, [p1Shadow.X(), p2Shadow.Y()]], {
                        withLabel: false,
                        straightFirst: false,
                        straightLast: false,
                        dash: 1,
                        strokeColor: this.shadowColor,
                        highlight: false
                    });
                const l2Shadow = this.board.create('line', [
                    p2Shadow, [p1Shadow.X(), p2Shadow.Y()]], {
                        withLabel: false,
                        straightFirst: false,
                        straightLast: false,
                        dash: 1,
                        strokeColor: this.shadowColor,
                        highlight: false
                    });

                this.board.create('intersection', [l1Shadow, l2Shadow], {
                    withLabel: false,
                    size: 1,
                    strokeColor: this.shadowColor,
                    fillColor: this.shadowColor,
                    fixed: true,
                    highlight: false,
                    showInfobox: false
                });
            }
        }

        const f1 = function(x) {
            // c2 = y2 + (1 + r)(y1 + W - c1)
            return me.options.gA2 + (1 + me.options.gA4) *
                (me.options.gA1 + me.options.gA3 - x);
        };

        this.l1 = this.board.create('functiongraph', [f1, -30, 30], {
            name: this.options.gLine1Label,
            withLabel: true,
            strokeWidth: 2,
            strokeColor: this.l1Color,
            // This graph is only moved by its RangeEditors, not by
            // dragging.
            fixed: true,
            highlight: false
        });

        if (this.options.gShowIntersection) {
            const p1 = this.board.create('point', [this.options.gA1 + this.options.gA3, 0], {
                name: 'y<sub>1</sub> + W',
                size: 1,
                fixed: true,
                highlight: false,
                showInfobox: false
            });

            const p2 = this.board.create('point', [0, this.options.gA2], {
                name: 'y<sub>2</sub>',
                size: 1,
                fixed: true,
                highlight: false,
                showInfobox: false
            });

            const l1 = this.board.create('line', [p1, [p1.X(), p2.Y()]], {
                straightFirst: false,
                straightLast: false,
                dash: 1,
                highlight: false,
                strokeColor: 'black'
            });
            const l2 = this.board.create('line', [p2, [p1.X(), p2.Y()]], {
                straightFirst: false,
                straightLast: false,
                dash: 1,
                highlight: false,
                strokeColor: 'black'
            });

            this.board.create('intersection', [l1, l2], {
                name: 'EP',
                size: 1,
                fixed: true,
                highlight: false,
                showInfobox: false
            });
        }
    }
}

const mkConsumptionSaving = function(board, options) {
    let g = new ConsumptionSavingGraph(board, options);
    g.make();
    g.postMake();
    return g;
};

export const graphTypes = [
    // There are some null graph types here because the number of
    // total graphs in the system has been reduced since it was
    // originally designed, and I haven't updated the graph type
    // numerical values to reflect that yet.
    mkDemandSupply, mkNonLinearDemandSupply,
    null, mkCobbDouglas,
    null, mkConsumptionLeisure,
    null, mkConsumptionSaving
];
