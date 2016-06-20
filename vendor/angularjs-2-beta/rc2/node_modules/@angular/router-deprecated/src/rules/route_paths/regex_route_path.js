"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var route_path_1 = require('./route_path');
function computeNumberOfRegexGroups(regex) {
    // cleverly compute regex groups by appending an alternative empty matching
    // pattern and match against an empty string, the resulting match still
    // receives all the other groups
    var test_regex = lang_1.RegExpWrapper.create(regex + '|');
    var matcher = lang_1.RegExpWrapper.matcher(test_regex, '');
    var match = lang_1.RegExpMatcherWrapper.next(matcher);
    return match.length;
}
var RegexRoutePath = (function () {
    function RegexRoutePath(_reString, _serializer, _groupNames) {
        this._reString = _reString;
        this._serializer = _serializer;
        this._groupNames = _groupNames;
        this.terminal = true;
        this.specificity = '2';
        this.hash = this._reString;
        this._regex = lang_1.RegExpWrapper.create(this._reString);
        if (this._groupNames != null) {
            var groups = computeNumberOfRegexGroups(this._reString);
            if (groups != _groupNames.length) {
                throw new core_1.BaseException("Regex group names [" + this._groupNames.join(',') + "] must contain names for each matching group and a name for the complete match as its first element of regex '" + this._reString + "'. " + groups + " group names are expected.");
            }
        }
    }
    RegexRoutePath.prototype.matchUrl = function (url) {
        var urlPath = url.toString();
        var params = {};
        var matcher = lang_1.RegExpWrapper.matcher(this._regex, urlPath);
        var match = lang_1.RegExpMatcherWrapper.next(matcher);
        if (lang_1.isBlank(match)) {
            return null;
        }
        for (var i = 0; i < match.length; i += 1) {
            params[this._groupNames != null ? this._groupNames[i] : i.toString()] = match[i];
        }
        return new route_path_1.MatchedUrl(urlPath, [], params, [], null);
    };
    RegexRoutePath.prototype.generateUrl = function (params) { return this._serializer(params); };
    RegexRoutePath.prototype.toString = function () { return this._reString; };
    return RegexRoutePath;
}());
exports.RegexRoutePath = RegexRoutePath;
//# sourceMappingURL=regex_route_path.js.map