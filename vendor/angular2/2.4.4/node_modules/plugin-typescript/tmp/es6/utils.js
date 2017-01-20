import * as ts from "typescript";
export function isAbsolute(filename) {
    return (filename[0] === '/');
}
export function isRelative(filename) {
    return (filename[0] === '.');
}
export function isAmbientImport(filename) {
    return (isAmbient(filename) && !isTypescriptDeclaration(filename));
}
export function isAmbientReference(filename) {
    return (isAmbient(filename) && isTypescriptDeclaration(filename));
}
export function isAmbient(filename) {
    return (!isRelative(filename) && !isAbsolute(filename));
}
var typescriptRegex = /\.tsx?$/i;
export function isTypescript(filename) {
    return typescriptRegex.test(filename);
}
var javascriptRegex = /\.js$/i;
export function isJavaScript(filename) {
    return javascriptRegex.test(filename);
}
var mapRegex = /\.map$/i;
export function isSourceMap(filename) {
    return mapRegex.test(filename);
}
var declarationRegex = /\.d\.tsx?$/i;
export function isTypescriptDeclaration(filename) {
    return declarationRegex.test(filename);
}
var htmlRegex = /\.html$/i;
export function isHtml(filename) {
    return htmlRegex.test(filename);
}
export function tsToJs(tsFile) {
    return tsFile.replace(typescriptRegex, '.js');
}
export function tsToJsMap(tsFile) {
    return tsFile.replace(typescriptRegex, '.js.map');
}
var convertRegex = /\.[^\.]+$/;
export function convertToDts(anyFile) {
    return anyFile.replace(convertRegex, '.d.ts');
}
export function stripDoubleExtension(normalized) {
    var parts = normalized.split('.');
    if (parts.length > 1) {
        var extensions = ["js", "jsx", "ts", "tsx", "json"];
        if (extensions.indexOf(parts[parts.length - 2]) >= 0) {
            return parts.slice(0, -1).join('.');
        }
    }
    return normalized;
}
export function hasError(diags) {
    return diags.some(function (diag) { return (diag.category === ts.DiagnosticCategory.Error); });
}
