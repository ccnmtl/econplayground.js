import React from 'react';
import PropTypes from 'prop-types';
import JXGBoard from './JXGBoard.js';
import './GraphEditor.css';

export default class GraphEditor extends React.Component {
    render() {
        if (!this.props.showing) {
            return <span></span>;
        }
        return (
            <div className="GraphEditor">
                <form>
                    <div className="form-group">
                        <label htmlFor="graph-title">
                            Title
                        </label>
                        <input id="graph-title"
                               className="form-control"
                               type="text" />
                    </div>

                    <JXGBoard
                         id={'editing-graph'}
                         type={this.props.graph}
                         showIntersection={this.props.showIntersection} />

                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                 className="form-check-input"
                                 type="checkbox"
                                 onChange={this.handleDisplayIntersectionChange.bind(this)}
                                 defaultChecked={this.props.showIntersection} />
                            Display intersection
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="x-axis-label">
                                X-axis label:
                            </label>
                            <input id="x-axis-label"
                                   className="form-control"
                                   type="text"
                                   onChange={this.handleXAxisChange.bind(this)} />
                        </div>

                        <div className="col">
                            <label htmlFor="y-axis-label">
                                Y-axis label:
                            </label>
                            <input id="y-axis-label"
                                   className="form-control"
                                   type="text"
                                   onChange={this.handleYAxisChange.bind(this)} />
                        </div>
                    </div>

                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.handleSaveGraph.bind(this)}
                            >Save</button>
                </form>
            </div>
        )
    }
    handleXAxisChange() {
    }
    handleYAxisChange() {
    }
    handleDisplayIntersectionChange(e) {
        this.props.updateDisplayIntersection(e.target.checked);
    }
    handleSaveGraph() {
        this.props.saveGraph();
    }
}

GraphEditor.propTypes = {
    showIntersection: PropTypes.bool,
    graph: PropTypes.number,
    updateDisplayIntersection: PropTypes.func.isRequired,
    updateGraph: PropTypes.func.isRequired,
    saveGraph: PropTypes.func.isRequired,
    showing: PropTypes.bool.isRequired
}
