/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RequestInfo = function () {
    function RequestInfo(url, method,
    /**
       * Returns the value with which to resolve the request's promise. Only called
       * if the request is successful. Throw from this function to reject the
       * returned Request's promise with the thrown error.
       * Note: The XhrIo passed to this function may be reused after this callback
       * returns. Do not keep a reference to it in any way.
       */
    handler, timeout) {
        this.url = url;
        this.method = method;
        this.handler = handler;
        this.timeout = timeout;
        this.urlParams = {};
        this.headers = {};
        this.body = null;
        this.errorHandler = null;
        /**
         * Called with the current number of bytes uploaded and total size (-1 if not
         * computable) of the request body (i.e. used to report upload progress).
         */
        this.progressCallback = null;
        this.successCodes = [200];
        this.additionalRetryCodes = [];
    }
    return RequestInfo;
}();
exports.RequestInfo = RequestInfo;
//# sourceMappingURL=requestinfo.js.map
