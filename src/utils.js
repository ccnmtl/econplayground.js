import Cookies from 'js-cookie';

/**
 * A wrapper for `fetch` that passes along auth credentials.
 */
let authedFetch = function(url, method = 'get', data = null) {
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

/**
 * Returns a Promise containing the submission for the current user
 * and given graph id, if it exists.
 */
let getSubmission = function(graphId) {
    return authedFetch(`/api/submissions/${graphId}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw 'Not found';
            }
        });
};

let createSubmission = function(data) {
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

let getOrCreateSubmission = function(data) {
    return authedFetch(`/api/submissions/${data.graph}/`)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                return createSubmission(data);
            }
        });
};

let getL1SubmissionOffset = function(submission) {
    if (!submission) {
        return 0;
    }

    if (submission.choice === 1) {
        return 1;
    } else if (submission.choice === 2) {
        return -1;
    }
    return 0;
};

let getL2SubmissionOffset = function(submission) {
    if (!submission) {
        return 0;
    }

    if (submission.choice === 3) {
        return 1;
    } else if (submission.choice === 4) {
        return -1;
    }
    return 0;
};

/**
 * Propagate a form update to a callback.
 */
let handleFormUpdate = function(e) {
    let obj = {};

    // Use the element's id as the attribute name, and fall
    // back to data-id.
    const id = e.target.id || e.target.dataset.id || e.target.name;

    switch(e.target.type) {
        case 'checkbox':
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

    this.props.updateGraph(obj);
};

/*
 * Given a line's slope and y-intercept, return its
 * y-offset at x-value n.
 */
let getOffset = function(slope, y, n) {
    const xpos = (slope * n) + y;
    return xpos - n;
};

/*
 * Exports a float value that will be acceptable to the Django API's
 * DecimalFields. This is currently capped to 2 decimal places.
 */
let exportFloat = function(n) {
    n = Number(n)
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return Math.round(n * 100) / 100;
};

let displayGraphType = function(gType) {
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
            name = 'Optimal Individual Choice';
            break;
        default:
            break;
    }
    return name;
};

export {
    authedFetch, getSubmission, createSubmission, getOrCreateSubmission,
    getL1SubmissionOffset, getL2SubmissionOffset, handleFormUpdate,
    getOffset, exportFloat, displayGraphType
};
