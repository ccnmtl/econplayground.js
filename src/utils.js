/**
 * A wrapper for `fetch` that passes along auth credentials.
 */
const authedFetch = function(url, method = 'get', data = null) {
    const elt = document.getElementById('csrf-token');
    const token = elt ? elt.getAttribute('content') : '';
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': token
        },
        body: data,
        credentials: 'same-origin'
    });
};

const getAssessment = function(graphId) {
    return authedFetch(`/api/assessments/${graphId}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Not found';
            }
        });
};

const getGraphId = function(urlpath) {
    let m = urlpath.match(/^\/?course\/\d+\/graph\/(\d+)\/?/);
    if (m && m.length > 1) {
        return forceNumber(m[1]);
    }

    m = urlpath.match(/^\/?graph\/(\d+)\/?/);
    if (m && m.length > 1) {
        return forceNumber(m[1]);
    }

    return null;
};

const getCohortId = function(urlpath) {
    const m = urlpath.match(/^\/?course\/(\d+)\/?.*/);
    if (m && m.length > 1) {
        return forceNumber(m[1]);
    }
    return null;
};

const getTopics = function(cohortId) {
    return authedFetch(`/api/cohorts/${cohortId}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Not found';
            }
        });
};

/**
 * Returns a Promise containing the submission for the current user
 * and given graph id, if it exists.
 */
const getSubmission = function(graphId) {
    return authedFetch(`/api/submissions/${graphId}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Not found';
            }
        });
};

const createSubmission = function(data) {
    return authedFetch('/api/submissions/', 'post', JSON.stringify(data))
        .then(function(response) {
            if (response.status === 201) {
                // TODO: propagate message up to UI
                return response.json();
            } else {
                throw 'Submission not created';
            }
        });
};

const getOrCreateSubmission = function(data) {
    return authedFetch(`/api/submissions/${data.graph}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                return createSubmission(data);
            }
        });
};

const getL1SubmissionOffset = function() {
    return 0;
};

const getL2SubmissionOffset = function() {
    return 0;
};

/**
 * Propagate a form update to a callback.
 */
const handleFormUpdate = function(e) {
    let obj = {};

    // Use the element's id as the attribute name, and fall
    // back to data-id.
    let id = e.target.id || e.target.dataset.id || e.target.name;

    if (e.target.type === 'radio') {
        id = e.target.name || e.target.id || e.target.dataset.id;
    }

    switch(e.target.type) {
        case 'checkbox':
        case 'radio':
            if (e.target.className.includes('override')) {
                obj[id] = parseFloat(e.target.dataset.override);
            } else if (
                e.target.type !== 'checkbox' &&
                    typeof e.target.value !== 'undefined') {
                obj[id] = forceNumber(e.target.value);
            } else {
                obj[id] = e.target.checked;
            }
            break;
        case 'number':
        case 'range':
            obj[id] = parseFloat(e.target.value);
            break;
        case 'select-one':
            obj[id] = parseInt(e.target.value, 10);
            break;
        case 'textarea':
            obj[id] = e.target.value;
            break;
        default:
            obj[id] = e.target.value;
    }

    if (typeof obj['gNeedsSubmit'] === 'number') {
        // Cast gNeedsSubmit to a boolean, in case it's a number (0 or
        // 1).
        obj['gNeedsSubmit'] = !!parseInt(obj['gNeedsSubmit'], 10);
    }

    this.props.updateGraph(obj);
};

/*
 * Given a line's slope and y-intercept, return its
 * y-offset at x-value n.
 */
const getOffset = function(slope, y, n) {
    const xpos = (slope * n) + y;
    return xpos - n;
};

/*
 * Force a value into a float that will be acceptable to the Django
 * API's DecimalFields. This is currently capped to 4 decimal places.
 */
const forceFloat = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return Math.round(n * 10000) / 10000;
};

const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};

const displayGraphType = function(gType) {
    let name = '';
    switch (gType) {
        case 0:
            name = 'Linear Demand and Supply';
            break;
        case 1:
            name = 'Non-Linear Demand and Supply';
            break;
        case 3:
            name = 'Cobb-Douglas Production Function';
            break;
        case 5:
            name = 'Consumption-Leisure: Constraint';
            break;
        case 7:
            name = 'Consumption-Saving: Constraint';
            break;
        case 8:
            name = 'Linear Demand and Supply: 3 Functions';
            break;
        default:
            break;
    }
    return name;
};

const getError = function(obj) {
    let o = null;
    for (o in obj) {
        return `${o}: ${obj[o]}`;
    }

    return 'An error occurred.';
};

export {
    authedFetch, getAssessment, getGraphId, getCohortId, getTopics,
    getSubmission, createSubmission, getOrCreateSubmission,
    getL1SubmissionOffset, getL2SubmissionOffset, handleFormUpdate,
    getOffset, forceFloat, forceNumber, displayGraphType, getError
};
