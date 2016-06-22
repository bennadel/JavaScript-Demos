export declare class Tree<T> {
    _root: TreeNode<T>;
    constructor(root: TreeNode<T>);
    root: T;
    parent(t: T): T;
    children(t: T): T[];
    firstChild(t: T): T;
    siblings(t: T): T[];
    pathFromRoot(t: T): T[];
    contains(tree: Tree<T>): boolean;
}
export declare class TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
    constructor(value: T, children: TreeNode<T>[]);
    toString(): string;
}
