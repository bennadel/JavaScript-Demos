import { UrlPathWithParams, UrlSegment, UrlTree } from './url_tree';
export declare abstract class UrlSerializer {
    abstract parse(url: string): UrlTree;
    abstract serialize(tree: UrlTree): string;
}
export declare class DefaultUrlSerializer implements UrlSerializer {
    parse(url: string): UrlTree;
    serialize(tree: UrlTree): string;
}
export declare function serializePaths(segment: UrlSegment): string;
export declare function serializePath(path: UrlPathWithParams): string;
