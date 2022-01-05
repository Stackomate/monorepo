/* We will probably need two versions, one that's mutable and another immutable
otherwise index will be necessary by batcher to index itself */ 

/**
 * Composite Key Node representing an entry in the Composite Key Map
 */
export class CompositeKeyNode<K, V> {
    constructor(
        /**
         * Only truthy is node is leaf of some assigned path
         */
        public isKey: boolean = false,

        /** Holds assigned values for assigned paths */
        public value: V | undefined = undefined,

        /** Map of children that contain node as part of the path */
        public children: Map<K, CompositeKeyNode<K, V>> = new Map()
    ) {}
}