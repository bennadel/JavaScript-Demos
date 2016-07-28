/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class Tree<T> {
    constructor(root: TreeNode<T>);
    readonly root: T;
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
