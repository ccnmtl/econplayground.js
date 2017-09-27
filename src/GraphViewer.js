import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';

/**
 * This component is used to view an econgraph object.
 */
export default class GraphViewer extends React.Component {
    render() {
        return (
            <div className="GraphViewer">
                <form>
                    <div className="form-group">
                        <label htmlFor="graph-title">
                            Title
                        </label>
                        <h4>Graph Viewer</h4>
                    </div>

                    <JXGBoard
                         id={'editing-graph'}
                         gType={this.props.gType}
                         gLine1Label={this.props.gLine1Label}
                         gLine2Label={this.props.gLine2Label}
                         gLine1Slope={this.props.gLine1Slope}
                         gLine2Slope={this.props.gLine2Slope}
                         gShowIntersection={this.props.gShowIntersection} />

                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="gLine1Slope">
                                Line 1 slope
                            </label>
                            <input id="gLine1Slope"
                                   className="form-control"
                                   type="number" step="0.01" />
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="gLine2Slope">
                                    Line 2 slope
                                </label>
                                <input id="gLine2Slope"
                                       className="form-control"
                                       type="number" step="0.01" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

GraphViewer.propTypes = {
    gShowIntersection: PropTypes.bool,
    gLine1Label: PropTypes.string,
    gLine2Label: PropTypes.string,
    gLine1Slope: PropTypes.number,
    gLine2Slope: PropTypes.number,
    gType: PropTypes.number
}
