import { Operation } from 'fast-json-patch';
import { SEPARATOR } from './Ops';

export const getOriginalIndex = (op: Operation) => Number(op.path.split(SEPARATOR)[1]);
