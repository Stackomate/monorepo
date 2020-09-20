import { BidirectionalTupleSet } from '../src/data-structures'

describe('BidirectionalTupleSet', () => {
  describe('new', () => {
    it('should create a new BidirectionalTupleSet', () => {
      let btsMap: BidirectionalTupleSet<string, string>
      btsMap = new BidirectionalTupleSet()
      expect(btsMap.size).toEqual(0)
      expect(btsMap.has('a')).toBe(false)
      expect(btsMap.get('a')).toEqual(new Set())
      expect(btsMap.has('a', 'b')).toBe(false)
      expect(btsMap.has('a', 'c')).toBe(false)
      expect([...btsMap]).toEqual([])

      let btsMap2: BidirectionalTupleSet<string, string> = new BidirectionalTupleSet([['a', 'b']])
      expect(btsMap2.size).toEqual(1)
      expect(btsMap2.has('a')).toBe(true)
      expect(btsMap2.get('a')).toEqual(new Set(['b']))
      expect(btsMap2.has('a', 'b')).toBe(true)
      expect(btsMap2.has('a', 'c')).toBe(false)
      expect([...btsMap2]).toEqual([['a', 'b']])

      let btsMap3 = new BidirectionalTupleSet([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
      expect(btsMap3.size).toEqual(3)
      expect(btsMap3.has('a')).toBe(true)
      expect(btsMap3.get('a')).toEqual(new Set(['b']))
      expect(btsMap3.has('a', 'b')).toBe(true)
      expect(btsMap3.has('a', 'c')).toBe(false)
      expect(btsMap3.has('inexistent')).toBe(false)
      expect(btsMap3.get('inexistent')).toEqual(new Set())
      expect(btsMap3.has('inexistent', 'any')).toBe(false)
      expect(btsMap3.has('c')).toBe(true)
      expect(btsMap3.get('c')).toEqual(new Set(['d']))
      expect(btsMap3.has('c', 'd')).toBe(true)
      expect(btsMap3.has('c', 'f')).toBe(false)
      expect(btsMap3.has('e')).toBe(true)
      expect(btsMap3.get('e')).toEqual(new Set(['f']))
      expect(btsMap3.has('e', 'f')).toBe(true)
      expect(btsMap3.has('e', 'g')).toBe(false)
      expect([...btsMap3]).toEqual([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
    })

    it('should not throw when adding existing value', () => {
      let btsMap: BidirectionalTupleSet<string, string> = new BidirectionalTupleSet();
      expect(btsMap.size).toBe(0);
      expect([...btsMap]).toEqual([]);
      expect(() => btsMap.add('some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => btsMap.add('some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => btsMap.add('some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(1);
      expect([...btsMap]).toEqual([['some key', 'some value']]);
      expect(() => btsMap.delete('some key', 'some value')).not.toThrow();
      expect(btsMap.size).toBe(0);
      expect([...btsMap]).toEqual([]);      
      expect(() => btsMap.add('key2', 'value2')).not.toThrow();
      expect([...btsMap]).toEqual([['key2', 'value2']]);
      expect(btsMap.size).toBe(1);      
      expect(() => btsMap.add('key3', 'value2')).not.toThrow();
      expect(btsMap.size).toBe(2);      
      expect([...btsMap]).toEqual([['key2', 'value2'], ['key3', 'value2']]);
      expect(() => btsMap.delete('key2', 'inexistent')).not.toThrow();
      expect(btsMap.size).toBe(2);      
      expect([...btsMap]).toEqual([['key2', 'value2'], ['key3', 'value2']]);
      expect(() => btsMap.delete('key2')).not.toThrow();
      expect([...btsMap]).toEqual([['key3', 'value2']]);
      expect(btsMap.size).toBe(1);      
      expect(() => btsMap.delete('key2')).not.toThrow();
      expect([...btsMap]).toEqual([['key3', 'value2']]);
      expect(btsMap.size).toBe(1);    
      expect(() => btsMap.add('key3', 'value4')).not.toThrow();
      expect(btsMap.size).toBe(2);            
      expect([...btsMap]).toEqual([['key3', 'value2'], ['key3', 'value4']]);
      expect(() => btsMap.delete('key3')).not.toThrow();
      expect(btsMap.size).toBe(0);            
      expect([...btsMap]).toEqual([]);
      /* TODO: Add more tests */            
    })
  })

  describe('add', () => {
    it('should add a tuple in empty TupleSet', () => {
      let btsMap = new BidirectionalTupleSet<string, string>()
      expect(btsMap.size).toBe(0)
      expect(btsMap.has('c')).toBe(false)
      expect(btsMap.has('c', 'd')).toBe(false)
      expect([...btsMap]).toEqual([])

      expect(() => btsMap.add('key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect(btsMap.has('c')).toBe(false)
      expect(btsMap.has('c', 'd')).toBe(false)
      expect(btsMap.has('key')).toBe(true)
      expect(btsMap.has('key', 'value')).toBe(true)
      expect(btsMap.has('key', 'inexistent')).toBe(false)
      expect([...btsMap]).toEqual([['key', 'value']])
    })

    it('should add items in non-empty TupleSet', () => {
      let btsMap = new BidirectionalTupleSet([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(btsMap.size).toBe(3)
      expect(btsMap.has('firstKey')).toBe(true)
      expect(btsMap.has('firstKey', 'firstValue')).toBe(true)
      expect(btsMap.has('firstKey', 'inexistent')).toBe(false)
      expect(btsMap.has('firstValue')).toBe(false)
      expect(btsMap.has('secondKey')).toBe(true)
      expect(btsMap.has('secondKey', 'firstValue')).toBe(false)
      expect(btsMap.has('secondKey', 'inexistent')).toBe(false)
      expect(btsMap.has('secondKey', 'secondValue')).toBe(true)
      expect(btsMap.has('secondValue')).toBe(false)
      expect(btsMap.has('thirdKey')).toBe(true)
      expect(btsMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(btsMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(btsMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(btsMap.has('thirdValue')).toBe(false)
      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(btsMap.inverseHas('firstKey')).toBe(false)
      expect(btsMap.inverseHas('secondKey')).toBe(false)
      expect(btsMap.inverseHas('thirdKey')).toBe(false)
      expect(btsMap.inverseHas('firstValue')).toBe(true)
      expect(btsMap.inverseHas('secondValue')).toBe(true)
      expect(btsMap.inverseHas('thirdValue')).toBe(true)

      expect(() => btsMap.add('key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(4)
      expect(btsMap.has('firstKey')).toBe(true)
      expect(btsMap.has('firstKey', 'firstValue')).toBe(true)
      expect(btsMap.has('firstKey', 'inexistent')).toBe(false)
      expect(btsMap.has('firstValue')).toBe(false)
      expect(btsMap.has('secondKey')).toBe(true)
      expect(btsMap.has('secondKey', 'firstValue')).toBe(false)
      expect(btsMap.has('secondKey', 'inexistent')).toBe(false)
      expect(btsMap.has('secondKey', 'secondValue')).toBe(true)
      expect(btsMap.has('secondValue')).toBe(false)
      expect(btsMap.has('thirdKey')).toBe(true)
      expect(btsMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(btsMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(btsMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(btsMap.has('thirdValue')).toBe(false)
      expect(btsMap.has('key')).toBe(true)
      expect(btsMap.has('key', 'value')).toBe(true)
      expect(btsMap.has('value')).toBe(false)

      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value']
      ])
      expect(btsMap.inverseHas('firstKey')).toBe(false)
      expect(btsMap.inverseHas('secondKey')).toBe(false)
      expect(btsMap.inverseHas('thirdKey')).toBe(false)
      expect(btsMap.inverseHas('firstValue')).toBe(true)
      expect(btsMap.inverseHas('secondValue')).toBe(true)
      expect(btsMap.inverseHas('thirdValue')).toBe(true)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(true)

      /* Insert key and value inverted */
      expect(() => btsMap.add('value', 'key')).not.toThrow()
      expect(btsMap.size).toBe(5)
      expect(btsMap.has('firstKey')).toBe(true)
      expect(btsMap.has('firstKey', 'firstValue')).toBe(true)
      expect(btsMap.has('firstKey', 'inexistent')).toBe(false)
      expect(btsMap.has('firstValue')).toBe(false)
      expect(btsMap.has('secondKey')).toBe(true)
      expect(btsMap.has('secondKey', 'firstValue')).toBe(false)
      expect(btsMap.has('secondKey', 'inexistent')).toBe(false)
      expect(btsMap.has('secondKey', 'secondValue')).toBe(true)
      expect(btsMap.has('secondValue')).toBe(false)
      expect(btsMap.has('thirdKey')).toBe(true)
      expect(btsMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(btsMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(btsMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(btsMap.has('thirdValue')).toBe(false)
      expect(btsMap.has('key')).toBe(true)
      expect(btsMap.has('key', 'inexistent')).toBe(false)
      expect(btsMap.has('key', 'value')).toBe(true)
      expect(btsMap.has('value')).toBe(true)
      expect(btsMap.has('value', 'inexistent')).toBe(false)
      expect(btsMap.has('value', 'key')).toBe(true)

      expect([...btsMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value'],
        ['value', 'key']
      ])
      expect(btsMap.inverseHas('key')).toBe(true)
      expect(btsMap.inverseHas('value')).toBe(true)
    })
  })

  describe('delete', () => {
    it('does not throw in empty Map', () => {
      let btsMap = new BidirectionalTupleSet<string, string>();
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])

      expect(() => btsMap.delete('key')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)

      expect(() => btsMap.delete('key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)
    })

    it('does not throw for non-empty Map', () => {
      let btsMap = new BidirectionalTupleSet([['a', 'b']])
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(true)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)

      expect(() => btsMap.delete('key')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(true)

      expect(() => btsMap.delete('key', 'value')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['a', 'b']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(true)
    })

    it('deletes for non-empty Map', () => {
      let btsMap = new BidirectionalTupleSet([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(btsMap.size).toBe(2)
      expect([...btsMap]).toEqual([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(new Map(btsMap).size).toEqual(2)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(true)
      expect(btsMap.inverseHas('c')).toBe(false)
      expect(btsMap.inverseHas('d')).toBe(true)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)

      expect(() => btsMap.delete('a', 'b')).not.toThrow()
      expect(btsMap.size).toBe(1)
      expect([...btsMap]).toEqual([['c', 'd']])
      expect(new Map(btsMap).size).toEqual(1)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(false)
      expect(btsMap.inverseHas('c')).toBe(false)
      expect(btsMap.inverseHas('d')).toBe(true)

      expect(() => btsMap.delete('c')).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(new Map(btsMap).size).toEqual(0)
      expect(btsMap.inverseHas('key')).toBe(false)
      expect(btsMap.inverseHas('value')).toBe(false)
      expect(btsMap.inverseHas('a')).toBe(false)
      expect(btsMap.inverseHas('b')).toBe(false)
      expect(btsMap.inverseHas('c')).toBe(false)
      expect(btsMap.inverseHas('d')).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return [object BidirectionalTupleSet] when converted to string', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(() => btsMap.add(1, 2)).not.toThrow()

      expect(`String test: ${btsMap}`).toEqual('String test: [object BidirectionalTupleSet]')
    })
  })

  describe('first keys', () => {
    it('should contain all registered second keys in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([...btsMap.firstKeys()]).toEqual([])
      expect(() => btsMap.add(3, 4)).not.toThrow()
      expect(() => btsMap.add(5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([...btsMap.firstKeys()]).toEqual([3, 5])
    })
  })

  describe('second keys', () => {
    it('should contain all registered second keys in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([...btsMap.secondKeys()]).toEqual([])
      expect(() => btsMap.add(3, 4)).not.toThrow()
      expect(() => btsMap.add(5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([...btsMap.secondKeys()]).toEqual([4, 6])
    })
  })

  describe('entries', () => {
    it('should contain all registered [key1, key2] pairs in iterator', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([...btsMap.entries()]).toEqual([])
      expect(() => btsMap.add(3, 4)).not.toThrow()
      expect(() => btsMap.add(5, 6)).not.toThrow()
      expect(btsMap.size).toBe(2)
      expect([...btsMap.entries()]).toEqual([
        [3, 4],
        [5, 6]
      ])
      expect(() => btsMap.add(3, 8)).not.toThrow()
      expect(btsMap.size).toBe(3)
      expect([...btsMap.entries()]).toEqual([
        [3, 4],
        [3, 8],
        [5, 6]
      ])
    })
  })

  describe('clear', () => {
    it('should not throw for empty BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(() => btsMap.add(1, 2)).not.toThrow();
      expect(() => btsMap.add(3, 4)).not.toThrow();
      expect(btsMap.size).toBe(2)
      expect(() => btsMap.clear()).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap.toInverseMap()]).toEqual([])
      expect([...btsMap]).toEqual([])
    })

    it('should erase for non-empty BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>([
        [1, 2],
        [3, 4]
      ])
      expect(btsMap.size).toBe(2)
      expect([...btsMap]).toEqual([
        [1, 2],
        [3, 4]
      ])
      expect(btsMap.has(1)).toBe(true)
      expect(btsMap.has(1, 2)).toBe(true)
      expect(btsMap.inverseHas(2)).toBe(true)
      expect(btsMap.has(3)).toBe(true)
      expect(btsMap.has(3, 4)).toBe(true)
      expect(btsMap.inverseHas(4)).toBe(true)
      expect(() => btsMap.clear()).not.toThrow()
      expect(btsMap.size).toBe(0)
      expect([...btsMap]).toEqual([])
      expect(btsMap.has(1)).toBe(false)
      expect(btsMap.has(1, 2)).toBe(false)
      expect(btsMap.inverseHas(2)).toBe(false)
      expect(btsMap.has(3)).toBe(false)
      expect(btsMap.has(3, 4)).toBe(false)
      expect(btsMap.inverseHas(4)).toBe(false)
    })
  })

  describe('forEach', () => {
    it('loops through BidirectionalTupleSet', () => {
      let btsMap = new BidirectionalTupleSet<number, number>([
        [1, 2],
        [3, 4]
      ])
      let result: [number, number, BidirectionalTupleSet<number, number>][] = []
      expect(() =>
        btsMap.forEach(([key1, key2], map) => {
          result.push([key2, key1, map])
        })
      ).not.toThrow()
      expect(result).toEqual([
        [2, 1, btsMap],
        [4, 3, btsMap]
      ])
    })
  })

  describe('invert', () => {
    it('inverts BidirectionalTupleSet', () => {
      let bijEmpty = new BidirectionalTupleSet<number, string>([])
      let invertedEmpty = bijEmpty.invert()
      expect([...invertedEmpty]).toEqual([])

      let btsMap = new BidirectionalTupleSet<number, string>([
        [1, 'a'],
        [3, 'b']
      ])
      let inverted = btsMap.invert()
      expect([...inverted]).toEqual([
        ['a', 1],
        ['b', 3]
      ])
    })
  })
})
