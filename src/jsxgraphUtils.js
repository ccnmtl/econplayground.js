/**
 * Given a board and an array of points,
 * draw a label at the center of these points.
 */
const drawLabel = function(board, points, text) {
    const group = board.create('group', points);
    const center = group._update_centroid_center();

    board.create('text', [center[0], center[1], text]);
};

export {
    drawLabel
};
