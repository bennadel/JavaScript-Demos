import { DEFAULT_OUTLET_NAME } from './constants';
import { ListWrapper, StringMapWrapper } from './facade/collection';
import { NumberWrapper, isBlank, isPresent, stringify } from './facade/lang';
export class Tree {
    constructor(root) {
        this._root = root;
    }
    get root() { return this._root.value; }
    parent(t) {
        let p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    }
    children(t) {
        let n = _findNode(t, this._root);
        return isPresent(n) ? n.children.map(t => t.value) : null;
    }
    firstChild(t) {
        let n = _findNode(t, this._root);
        return isPresent(n) && n.children.length > 0 ? n.children[0].value : null;
    }
    pathFromRoot(t) { return _findPath(t, this._root, []).map(s => s.value); }
    contains(tree) { return _contains(this._root, tree._root); }
}
export class UrlTree extends Tree {
    constructor(root) {
        super(root);
    }
}
export class RouteTree extends Tree {
    constructor(root) {
        super(root);
    }
}
export function rootNode(tree) {
    return tree._root;
}
function _findNode(expected, c) {
    if (expected === c.value)
        return c;
    for (let cc of c.children) {
        let r = _findNode(expected, cc);
        if (isPresent(r))
            return r;
    }
    return null;
}
function _findPath(expected, c, collected) {
    collected.push(c);
    if (expected === c.value)
        return collected;
    for (let cc of c.children) {
        let r = _findPath(expected, cc, ListWrapper.clone(collected));
        if (isPresent(r))
            return r;
    }
    return null;
}
function _contains(tree, subtree) {
    if (tree.value !== subtree.value)
        return false;
    for (let subtreeNode of subtree.children) {
        let s = tree.children.filter(child => child.value === subtreeNode.value);
        if (s.length === 0)
            return false;
        if (!_contains(s[0], subtreeNode))
            return false;
    }
    return true;
}
export class TreeNode {
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }
}
export class UrlSegment {
    constructor(segment, parameters, outlet) {
        this.segment = segment;
        this.parameters = parameters;
        this.outlet = outlet;
    }
    toString() {
        let outletPrefix = isBlank(this.outlet) ? '' : `${this.outlet}:`;
        return `${outletPrefix}${this.segment}${_serializeParams(this.parameters)}`;
    }
}
function _serializeParams(params) {
    let res = '';
    StringMapWrapper.forEach(params, (v /** TODO #9100 */, k /** TODO #9100 */) => res += `;${k}=${v}`);
    return res;
}
export class RouteSegment {
    constructor(urlSegments, parameters, outlet, type, componentFactory) {
        this.urlSegments = urlSegments;
        this.parameters = parameters;
        this.outlet = outlet;
        this._type = type;
        this._componentFactory = componentFactory;
    }
    getParam(param) {
        return isPresent(this.parameters) ? this.parameters[param] : null;
    }
    getParamAsNumber(param) {
        return isPresent(this.parameters) ? NumberWrapper.parseFloat(this.parameters[param]) : null;
    }
    get type() { return this._type; }
    get stringifiedUrlSegments() { return this.urlSegments.map(s => s.toString()).join('/'); }
}
export function createEmptyRouteTree(type) {
    let root = new RouteSegment([new UrlSegment('', {}, null)], {}, DEFAULT_OUTLET_NAME, type, null);
    return new RouteTree(new TreeNode(root, []));
}
export function serializeRouteSegmentTree(tree) {
    return _serializeRouteSegmentTree(tree._root);
}
function _serializeRouteSegmentTree(node) {
    let v = node.value;
    let children = node.children.map(c => _serializeRouteSegmentTree(c)).join(', ');
    return `${v.outlet}:${v.stringifiedUrlSegments}(${stringify(v.type)}) [${children}]`;
}
export function equalUrlSegments(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i].segment != b[i].segment)
            return false;
        if (a[i].outlet != b[i].outlet)
            return false;
        if (!StringMapWrapper.equals(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
export function routeSegmentComponentFactory(a) {
    return a._componentFactory;
}
//# sourceMappingURL=segments.js.map