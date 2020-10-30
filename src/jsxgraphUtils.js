const shapeOptions = {
    withLabel: false,
    fixed: true,
    draggable: false,
    isDraggable: false,
    vertices: {
        visible: false
    }
};

/**
 * Given a board and an array of points,
 * draw a label at the center of these points.
 */
const drawLabel = function(board, points, text) {
    const group = board.create('group', points);
    const center = group._update_centroid_center();

    board.create('text', [center[0], center[1], text]);
};

/**
 * Draw a polygon with the given points and options on the board,
 * for the AUC (area under curve) feature.
 *
 * Returns the new polygon
 */
const drawPolygon = function(board, points, name, color) {
    const p = board.create('polygon', points, {
        fillColor: color,
        highlightFillColor: color,
        ...shapeOptions
    });

    drawLabel(board, points, name);

    return p;
};

export {
    drawLabel, drawPolygon
};
