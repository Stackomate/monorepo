import { BinarySearchTree } from "./binary-search-tree"
import { createBinarySearchTreeBatcher } from "./binary-search-tree-batcher"
import { BinaryTreeNode } from "./binary-tree-node"
import { btrAdd, btrInorderIterator, btrIsEmpty, _btrIsEmpty } from "./tree-operations"

describe('Binary Tree exports - mutable', () => {
    describe('add', () => {
        it('should add initial value to the node', () => {
            let tree = new BinarySearchTree();
            let batcher = createBinarySearchTreeBatcher(tree);
            expect(batcher.currentValue).toBe(tree);
            expect(_btrIsEmpty(batcher)).toBe(true);
            expect(batcher.currentValue.root).toBe(null);
            batcher.run(
                btrAdd(1)
            )
            expect(_btrIsEmpty(batcher)).toBe(false);            
            expect(batcher.currentValue.root).not.toBe(null);
            let rootNode = (batcher.currentValue.root as BinaryTreeNode<number>);
            expect(rootNode.value).toBe(1);
            expect(rootNode.left).toBe(null);
            expect(rootNode.right).toBe(null);

            /* add 0 to the tree */ 
            batcher.run(
                btrAdd(0)
            )
            expect(_btrIsEmpty(batcher)).toBe(false);            
            expect(batcher.currentValue.root).not.toBe(null);
            rootNode = (batcher.currentValue.root as BinaryTreeNode<number>);
            expect(rootNode.value).toBe(1);
            expect(rootNode.left).not.toBe(null);
            expect((rootNode.left as BinaryTreeNode<number>).value).toBe(0);
            expect(rootNode.right).toBe(null);

        })
    })

    describe('inOrder iterator', () => {
        it('should return correct order of elements', () => {
            let items = [1, 0, 2, 4, 3, 6, 5, 8, 7, 9, 32, 11, 15, 16];
            let tree = new BinarySearchTree();
            /* Needs to use true here */
            let batcher = createBinarySearchTreeBatcher(tree, true);
            for (let item of items) {
                batcher.run(
                    btrAdd(item)
                )
            }
            console.log([...btrInorderIterator(tree.root)])
        })
    })
})