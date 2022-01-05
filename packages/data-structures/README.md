# Data-structures

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://www.travis-ci.com/Stackomate/data-structures.svg?branch=master)](https://www.travis-ci.com/Stackomate/data-structures)

A collection of useful data-structures for Typescript Development.

## Usage

1. `npm i @stackomate/data-structures`
2. Import desired data-structure into your project. See examples below:


## Composite Key Map

* **Documentation:** [CompositeKeyMap](./classes/composite_key_map_composite_key_node.compositekeynode.html)

A map that allows multiple ordered keys (composite key) to be mapped to some value.
Keys are stored as pointers that contain maps to the child keys.
**Important:** Order of iteration is not preserved for the keys


### Examples
```
[root] => 10
[root, 'a'] => 20
[root, 'b', 'c'] => 30 (note that root.b is not a key) 
```



## BijectiveMap

* **Documentation:** [BijectiveMap](./classes/bijectivemap.html)

A stricter type of map that only allows Bijective (one-to-one) relationships.

![Bijection Mapping Example](https://upload.wikimedia.org/wikipedia/commons/a/a5/Bijection.svg)

(Credit: [Wikipedia](https://commons.wikimedia.org/wiki/File:Bijection.svg))

* Example: *Create a mapping of usernames to their respective IDs* ([CodeSandbox](https://codesandbox.io/s/stackomate-bijective-map-zntoe))


```typescript
import {BijectiveMap} from '@stackomate/data-structures';
const usernameID = new BijectiveMap<string, number>();
usernameID.set('Kyle', 1);
usernameID.set('Mary', 2);
usernameID.set('John', 1); // Error: 'Value has already been registered for another key.' 
```

* `BijectiveMap`s allow for inversion:
```typescript
let idUsername = usernameID.invert(); // 1 => 'Kyle', 2 => 'Mary'
```

