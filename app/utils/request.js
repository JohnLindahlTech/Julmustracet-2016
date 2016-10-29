import 'whatwg-fetch';
import auth from '../containers/auth/auth';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const token = auth.getToken();
  const headers = Object.assign({}, defaultHeaders, options.headers, { Authorization: token });
  const newOpts = Object.assign({}, options, { headers });
  return fetch(url, newOpts)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }));
}


export function post(url, data, options = {}) {
  const body = data ? JSON.stringify(data) : undefined;
  const newOpts = Object.assign({}, options, {
    method: 'post',
    body,
  });
  return request(url, newOpts);
}

export function get(url, options = {}) {
  const newOpts = Object.assign({}, options, { method: 'get' });
  return request(url, newOpts);
}

export function put(url, data, options = {}) {
  const body = data ? JSON.stringify(data) : undefined;
  const newOpts = Object.assign({}, options, {
    method: 'put',
    body,
  });
  return request(url, newOpts);
}

export function del(url, options = {}) {
  const newOpts = Object.assign({}, options, { method: 'delete' });
  return request(url, newOpts);
}
