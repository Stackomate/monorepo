import { createArrayBatcher } from "../array";
import { Batcher } from "../batcher";
import { getValue } from "../utils";

/* We will probably need two versions, one that's mutable and another immutable
otherwise index will be necessary by batcher to index itself */ 

export class CompositeIndexNode<K, V> {
    constructor(
        public isKey: boolean = false,
        /* This should only exist for Map Indexes when isKey is true */
        public value: V | undefined = undefined,
        public children: Map<K, CompositeIndexNode<K, V>> = new Map()
    ) {}
}