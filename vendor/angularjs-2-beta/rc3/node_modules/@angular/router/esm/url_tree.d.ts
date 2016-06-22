export declare function createEmptyUrlTree(): UrlTree;
export declare function containsTree(container: UrlTree, containee: UrlTree, exact: boolean): boolean;
export declare class UrlTree {
    root: UrlSegment;
    queryParams: {
        [key: string]: string;
    };
    fragment: string;
    constructor(root: UrlSegment, queryParams: {
        [key: string]: string;
    }, fragment: string);
    toString(): string;
}
export declare class UrlSegment {
    pathsWithParams: UrlPathWithParams[];
    children: {
        [key: string]: UrlSegment;
    };
    parent: UrlSegment;
    constructor(pathsWithParams: UrlPathWithParams[], children: {
        [key: string]: UrlSegment;
    });
    toString(): string;
}
export declare class UrlPathWithParams {
    path: string;
    parameters: {
        [key: string]: string;
    };
    constructor(path: string, parameters: {
        [key: string]: string;
    });
    toString(): string;
}
export declare function equalPathsWithParams(a: UrlPathWithParams[], b: UrlPathWithParams[]): boolean;
export declare function equalPath(a: UrlPathWithParams[], b: UrlPathWithParams[]): boolean;
export declare function mapChildren(segment: UrlSegment, fn: (v: UrlSegment, k: string) => UrlSegment): {
    [name: string]: UrlSegment;
};
export declare function mapChildrenIntoArray<T>(segment: UrlSegment, fn: (v: UrlSegment, k: string) => T[]): T[];
