export declare function createEmptyUrlTree(): UrlTree;
export declare function containsTree(container: UrlTree, containee: UrlTree, exact: boolean): boolean;
/**
 * A URL in the tree form.
 *
 * @stable
 */
export declare class UrlTree {
    root: UrlSegmentGroup;
    queryParams: {
        [key: string]: string;
    };
    fragment: string;
    toString(): string;
}
/**
 * @stable
 */
export declare class UrlSegmentGroup {
    segments: UrlSegment[];
    children: {
        [key: string]: UrlSegmentGroup;
    };
    parent: UrlSegmentGroup;
    constructor(segments: UrlSegment[], children: {
        [key: string]: UrlSegmentGroup;
    });
    /**
     * Return true if the segment has child segments
     */
    hasChildren(): boolean;
    /**
     * Returns the number of child sements.
     */
    numberOfChildren: number;
    toString(): string;
}
/**
 * @stable
 */
export declare class UrlSegment {
    path: string;
    parameters: {
        [key: string]: string;
    };
    constructor(path: string, parameters: {
        [key: string]: string;
    });
    toString(): string;
}
export declare function equalSegments(a: UrlSegment[], b: UrlSegment[]): boolean;
export declare function equalPath(a: UrlSegment[], b: UrlSegment[]): boolean;
export declare function mapChildrenIntoArray<T>(segment: UrlSegmentGroup, fn: (v: UrlSegmentGroup, k: string) => T[]): T[];
/**
 * Defines a way to serialize/deserialize a url tree.
 *
 * @stable
 */
export declare abstract class UrlSerializer {
    /**
     * Parse a url into a {@link UrlTree}
     */
    abstract parse(url: string): UrlTree;
    /**
     * Converts a {@link UrlTree} into a url
     */
    abstract serialize(tree: UrlTree): string;
}
/**
 * A default implementation of the serialization.
 *
 * @stable
 */
export declare class DefaultUrlSerializer implements UrlSerializer {
    parse(url: string): UrlTree;
    serialize(tree: UrlTree): string;
}
export declare function serializePaths(segment: UrlSegmentGroup): string;
export declare function encode(s: string): string;
export declare function decode(s: string): string;
export declare function serializePath(path: UrlSegment): string;
