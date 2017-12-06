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

export {
    authedFetch, getSubmission, createSubmission, getOrCreateSubmission,
    getL1SubmissionOffset, getL2SubmissionOffset
};
