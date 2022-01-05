
export class BinaryTreeNode<T> {
    constructor(
        public value: T,
        public left: BinaryTreeNode<T> | null = null,
        public right: BinaryTreeNode<T> | null = null
    ) { };
}
