/*
  Arquivo inspirado no pacote http-status-codes
  https://www.npmjs.com/package/http-status-codes
*/
const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

/*
  Material consultado sobre exports
  https://www.freecodecamp.org/news/node-module-exports-explained-with-javascript-export-function-examples/
*/
module.exports = {
  StatusCodes,
};