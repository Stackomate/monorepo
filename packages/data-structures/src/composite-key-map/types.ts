import { CompositeKeyNode } from "../precompile-output/composite-key-node";

export type FnCompositeKeyMapArg<Y, Z, A> = (a: CompositeKeyNode<Y, Z>) => A;