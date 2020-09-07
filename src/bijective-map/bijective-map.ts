/**
 * BijectiveMap is similar to a Map, but it does not allow for a value to be registered by two keys.
 * This means the key => value mapping will always be bijective.
 * NOTE: This is currently a MUTABLE structure.
 */
export class BijectiveMap<K, V> {
  /** Internal Map representing t1 => t2 relationships */
  private _normalMap: Map<K, V> = new Map()

  /** Set for storing registered values. */
  private _values: Set<V> = new Set()

  /** Create a new BijectiveMap.
   * Accepts an iterable for initial values.
   */
  constructor(iterable: Iterable<[K, V]> = []) {
    for (let [key, value] of iterable) {
      this.set(key, value)
    }
  }

  /**
   * Set a key => value bijective mapping.
   * @param key Key
   * @param value Value
   */
  public set(key: K, value: V): BijectiveMap<K, V> {
    /* If value has already been declared, throw error */
    if (this._values.has(value)) {
      throw new Error('Value has already been registered for another key.')
    }
    this._normalMap.set(key, value)
    this._values.add(value)

    return this
  }

  /** Iterator for BijectiveMap. Uses Native Map's default iterator. */
  [Symbol.iterator]() {
    return this._normalMap[Symbol.iterator]()
  }

  /** Method to convert BijectiveMap to string representation. */
  toString() {
    return '[object BijectiveMap]'
  }

  /** Returns iterator containing only Keys of the Map */
  public keys() {
    return this._normalMap.keys()
  }

  /** Returns iterator containing only Values of the Map */
  public values() {
    return this._normalMap.values()
  }

  /**
   * If provided 1 argument, checks if Map has the key.
   * If provided 2 arguments, checks if Map has key and value.
   * @param firstItem First object in the tuple
   * @param secondItem Optional, second object in the tuple
   */
  public has(...args: [K] | [K, V]): boolean {
    switch (args.length) {
      case 1:
        const key = args[0]
        return this._normalMap.has(key)
      case 2:
        const [k, v] = args
        return this._normalMap.has(k) && this._normalMap.get(k) === v
    }
  }

  /**
   * Gets the registered value for a given key.
   * @param key Key to be accessed. If does not exist, returns undefined.
   */
  public get(key: K) {
    return this._normalMap.get(key)
  }

  /**
   * Clears BijectiveMap keys and values.
   */
  public clear() {
    this._normalMap.clear()
    this._values.clear()
    return this
  }

  /** Returns iterator with [Key, Value] pairs */
  public entries() {
    return this._normalMap.entries()
  }

  /** Loop through BijectiveMap items */
  public forEach(callbackfn: (value: V, key: K, map: BijectiveMap<K, V>) => void, thisArg?: any) {
    this._normalMap.forEach((value, key) => callbackfn(value, key, this), thisArg)
  }

  /** Checks whether some value has already been registered in the BijectiveMap */
  public hasValue(value: V) {
    return this._values.has(value)
  }

  /**
   * If provided 1 argument, will delete key from BijectiveMap (if registered)
   * If provided 2 arguments, will only delete key if key => value is registered.
   * @param args Array representing tuple arguments.
   */
  public delete(...args: [K] | [K, V]): BijectiveMap<K, V> {
    switch (args.length) {
      case 1:
        /* Delete the t1 key from normalMap */
        let k = args[0]
        /* Remove value from values */
        if (this._normalMap.has(k)) {
          let v = this._normalMap.get(k) as V
          this._values.delete(v)

          /* Remove key */
          this._normalMap.delete(k)
        }
        return this
      case 2:
        const [key, value] = args
        if (this._normalMap.has(key) && this._normalMap.get(key) === value) {
          this._values.delete(value)
          this._normalMap.delete(key)
        }
        return this
    }
  }

  /** Returns new Bijective Map with inverted keys and values */
  invert() {
    return new BijectiveMap([...this.entries()].map(([value, key]) => [key, value]))
  }

  /**
   * Get the total number of relationships stored.
   */
  get size() {
    return this._normalMap.size
  }
}
