import { ckmGet, ckmHas, ckmRemove, ckmSet, _ckmFromArray } from "../composite-key-map";
import { apply } from "../data-structures";
import { log, pipe, tap } from "../precompile-output/tap-fn";

let map = _ckmFromArray([
    [['a'], 1],
    [['a', 'b'], 2],
    [['x'], 3],
    [['x', 'y'], 4],
  ]);
  
  let r = apply(
    map,
    pipe(ckmSet(['m'], 12)),
    tap(ckmGet(['m'])),
    tap(log("a" as "a", 12), log()),  
    ckmHas(['m']),     
    (j) => j,
  );

  let s = apply(
    map,
    tap(ckmHas(['m']), log()),
    tap(ckmHas(['a']), log()),
    tap(ckmHas(['a', 'b']), log()),
    tap(ckmHas(['a', 'c']), log()),
    ckmSet(['m'], 12),
    tap(ckmHas(['m'])),
    tap(ckmGet(['a', 'c']), log()),
    tap(ckmGet(['x']), log()),
    tap(ckmGet(['x', 'y']), log()),
    ckmRemove(['x']),
    tap(ckmGet(['x']), log()),
    tap(ckmGet(['x', 'y']), log())
  );