import Cookies from 'js-cookie';

/**
 * A wrapper for `fetch` that passes along auth credentials.
 */
const authedFetch = function(url, method = 'get', data = null) {
    const token = Cookies.get('csrftoken');
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

const getTopics = function() {
    return authedFetch('/api/topics/')
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
    const id = e.target.id || e.target.dataset.id || e.target.name;

    switch(e.target.type) {
        case 'checkbox':
        case 'radio':
            if (e.target.className.includes('override')) {
                obj[id] = parseFloat(e.target.dataset.override);
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
 * API's DecimalFields. This is currently capped to 2 decimal places.
 */
const forceFloat = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return Math.round(n * 100) / 100;
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
            name = 'Cobb-Douglas';
            break;
        case 5:
            name = 'Consumption-Leisure';
            break;
        case 7:
            name = 'Consumption-Saving';
            break;
        case 8:
            name = 'Aggregate Demand - Aggregate Supply';
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
    authedFetch, getAssessment, getTopics,
    getSubmission, createSubmission, getOrCreateSubmission,
    getL1SubmissionOffset, getL2SubmissionOffset, handleFormUpdate,
    getOffset, forceFloat, displayGraphType, getError
};
