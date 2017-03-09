var Logger = (function () {
    function Logger(options) {
        this.options = options;
        this.options = options || {};
    }
    Logger.prototype.log = function (msg) {
        console.log("TypeScript", "[Info]", msg);
    };
    Logger.prototype.error = function (msg) {
        console.error("TypeScript", "[Error]", msg);
    };
    Logger.prototype.warn = function (msg) {
        console.warn("TypeScript", "[Warning]", msg);
    };
    Logger.prototype.debug = function (msg) {
        if (this.options.debug) {
            console.log("TypeScript", msg);
        }
    };
    return Logger;
}());
export default Logger;
