"use strict";
var node = require("enhanced-resolve/lib/node");
function makeResolver(options) {
    return node.create.sync(options.resolve);
}
module.exports = makeResolver;
