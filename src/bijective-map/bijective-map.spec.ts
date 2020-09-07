import { BijectiveMap } from './bijective-map'

describe('BijectiveMap', () => {
  describe('new', () => {
    it('should create a new BijectiveMap', () => {
      let bijMap: BijectiveMap<string, string>
      bijMap = new BijectiveMap()
      expect(bijMap.size).toEqual(0)
      expect(bijMap.has('a')).toBe(false)
      expect(bijMap.get('a')).toBeUndefined()
      expect(bijMap.has('a', 'b')).toBe(false)
      expect(bijMap.has('a', 'c')).toBe(false)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)

      let bijMap2: BijectiveMap<string, string> = new BijectiveMap([['a', 'b']])
      expect(bijMap2.size).toEqual(1)
      expect(bijMap2.has('a')).toBe(true)
      expect(bijMap2.get('a')).toBe('b')
      expect(bijMap2.has('a', 'b')).toBe(true)
      expect(bijMap2.has('a', 'c')).toBe(false)
      expect([...bijMap2]).toEqual([['a', 'b']])
      expect(new Map(bijMap2).size).toEqual(1)
      expect(new Map(bijMap2).get('a')).toEqual('b')

      let bijMap3 = new BijectiveMap([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
      expect(bijMap3.size).toEqual(3)
      expect(bijMap3.has('a')).toBe(true)
      expect(bijMap3.get('a')).toBe('b')
      expect(bijMap3.has('a', 'b')).toBe(true)
      expect(bijMap3.has('a', 'c')).toBe(false)
      expect(bijMap3.has('inexistent')).toBe(false)
      expect(bijMap3.get('inexistent')).toBeUndefined()
      expect(bijMap3.has('inexistent', 'any')).toBe(false)
      expect(bijMap3.has('c')).toBe(true)
      expect(bijMap3.get('c')).toBe('d')
      expect(bijMap3.has('c', 'd')).toBe(true)
      expect(bijMap3.has('c', 'f')).toBe(false)
      expect(bijMap3.has('e')).toBe(true)
      expect(bijMap3.get('e')).toBe('f')
      expect(bijMap3.has('e', 'f')).toBe(true)
      expect(bijMap3.has('e', 'g')).toBe(false)
      expect([...bijMap3]).toEqual([
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f']
      ])
      expect(new Map(bijMap3).size).toEqual(3)
      expect(new Map(bijMap3).get('a')).toEqual('b')
      expect(new Map(bijMap3).get('c')).toEqual('d')
      expect(new Map(bijMap3).get('e')).toEqual('f')
    })

    it('should not create an injectiveMap with repeated values', () => {
      let bijMap: BijectiveMap<string, string>
      expect(
        () =>
          (bijMap = new BijectiveMap([
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'b']
          ]))
      ).toThrowError('Value has already been registered for another key.')
    })
  })

  describe('set', () => {
    it('should set an item in empty Map', () => {
      let bijMap = new BijectiveMap()
      expect(bijMap.size).toBe(0)
      expect(bijMap.has('c')).toBe(false)
      expect(bijMap.has('c', 'd')).toBe(false)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)

      expect(() => bijMap.set('key', 'value')).not.toThrow()
      expect(bijMap.size).toBe(1)
      expect(bijMap.has('c')).toBe(false)
      expect(bijMap.has('c', 'd')).toBe(false)
      expect(bijMap.has('key')).toBe(true)
      expect(bijMap.has('key', 'value')).toBe(true)
      expect(bijMap.has('key', 'inexistent')).toBe(false)
      expect([...bijMap]).toEqual([['key', 'value']])
      expect(new Map(bijMap).size).toEqual(1)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(true)
    })

    it('should set items in non-empty Map', () => {
      let bijMap = new BijectiveMap([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(bijMap.size).toBe(3)
      expect(bijMap.has('firstKey')).toBe(true)
      expect(bijMap.has('firstKey', 'firstValue')).toBe(true)
      expect(bijMap.has('firstKey', 'inexistent')).toBe(false)
      expect(bijMap.has('firstValue')).toBe(false)
      expect(bijMap.has('secondKey')).toBe(true)
      expect(bijMap.has('secondKey', 'firstValue')).toBe(false)
      expect(bijMap.has('secondKey', 'inexistent')).toBe(false)
      expect(bijMap.has('secondKey', 'secondValue')).toBe(true)
      expect(bijMap.has('secondValue')).toBe(false)
      expect(bijMap.has('thirdKey')).toBe(true)
      expect(bijMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(bijMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(bijMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(bijMap.has('thirdValue')).toBe(false)
      expect([...bijMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue']
      ])
      expect(new Map(bijMap).size).toEqual(3)
      expect(bijMap.hasValue('firstKey')).toBe(false)
      expect(bijMap.hasValue('secondKey')).toBe(false)
      expect(bijMap.hasValue('thirdKey')).toBe(false)
      expect(bijMap.hasValue('firstValue')).toBe(true)
      expect(bijMap.hasValue('secondValue')).toBe(true)
      expect(bijMap.hasValue('thirdValue')).toBe(true)

      expect(() => bijMap.set('key', 'value')).not.toThrow()
      expect(bijMap.size).toBe(4)
      expect(bijMap.has('firstKey')).toBe(true)
      expect(bijMap.has('firstKey', 'firstValue')).toBe(true)
      expect(bijMap.has('firstKey', 'inexistent')).toBe(false)
      expect(bijMap.has('firstValue')).toBe(false)
      expect(bijMap.has('secondKey')).toBe(true)
      expect(bijMap.has('secondKey', 'firstValue')).toBe(false)
      expect(bijMap.has('secondKey', 'inexistent')).toBe(false)
      expect(bijMap.has('secondKey', 'secondValue')).toBe(true)
      expect(bijMap.has('secondValue')).toBe(false)
      expect(bijMap.has('thirdKey')).toBe(true)
      expect(bijMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(bijMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(bijMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(bijMap.has('thirdValue')).toBe(false)
      expect(bijMap.has('key')).toBe(true)
      expect(bijMap.has('key', 'value')).toBe(true)
      expect(bijMap.has('value')).toBe(false)

      expect([...bijMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value']
      ])
      expect(new Map(bijMap).size).toEqual(4)
      expect(bijMap.hasValue('firstKey')).toBe(false)
      expect(bijMap.hasValue('secondKey')).toBe(false)
      expect(bijMap.hasValue('thirdKey')).toBe(false)
      expect(bijMap.hasValue('firstValue')).toBe(true)
      expect(bijMap.hasValue('secondValue')).toBe(true)
      expect(bijMap.hasValue('thirdValue')).toBe(true)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(true)

      /* Insert key and value inverted */
      expect(() => bijMap.set('value', 'key')).not.toThrow()
      expect(bijMap.size).toBe(5)
      expect(bijMap.has('firstKey')).toBe(true)
      expect(bijMap.has('firstKey', 'firstValue')).toBe(true)
      expect(bijMap.has('firstKey', 'inexistent')).toBe(false)
      expect(bijMap.has('firstValue')).toBe(false)
      expect(bijMap.has('secondKey')).toBe(true)
      expect(bijMap.has('secondKey', 'firstValue')).toBe(false)
      expect(bijMap.has('secondKey', 'inexistent')).toBe(false)
      expect(bijMap.has('secondKey', 'secondValue')).toBe(true)
      expect(bijMap.has('secondValue')).toBe(false)
      expect(bijMap.has('thirdKey')).toBe(true)
      expect(bijMap.has('thirdKey', 'thirdValue')).toBe(true)
      expect(bijMap.has('thirdKey', 'inexistent')).toBe(false)
      expect(bijMap.has('thirdKey', 'secondValue')).toBe(false)
      expect(bijMap.has('thirdValue')).toBe(false)
      expect(bijMap.has('key')).toBe(true)
      expect(bijMap.has('key', 'inexistent')).toBe(false)
      expect(bijMap.has('key', 'value')).toBe(true)
      expect(bijMap.has('value')).toBe(true)
      expect(bijMap.has('value', 'inexistent')).toBe(false)
      expect(bijMap.has('value', 'key')).toBe(true)

      expect([...bijMap]).toEqual([
        ['firstKey', 'firstValue'],
        ['secondKey', 'secondValue'],
        ['thirdKey', 'thirdValue'],
        ['key', 'value'],
        ['value', 'key']
      ])
      expect(new Map(bijMap).size).toEqual(5)
      expect(bijMap.hasValue('key')).toBe(true)
      expect(bijMap.hasValue('value')).toBe(true)
    })
  })

  describe('delete', () => {
    it('does not throw in empty Map', () => {
      let bijMap = new BijectiveMap()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)

      expect(() => bijMap.delete('key')).not.toThrow()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)

      expect(() => bijMap.delete('key', 'value')).not.toThrow()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)
    })

    it('does not throw for non-empty Map', () => {
      let bijMap = new BijectiveMap([['a', 'b']])
      expect(bijMap.size).toBe(1)
      expect([...bijMap]).toEqual([['a', 'b']])
      expect(new Map(bijMap).size).toEqual(1)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(true)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)

      expect(() => bijMap.delete('key')).not.toThrow()
      expect(bijMap.size).toBe(1)
      expect([...bijMap]).toEqual([['a', 'b']])
      expect(new Map(bijMap).size).toEqual(1)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(true)

      expect(() => bijMap.delete('key', 'value')).not.toThrow()
      expect(bijMap.size).toBe(1)
      expect([...bijMap]).toEqual([['a', 'b']])
      expect(new Map(bijMap).size).toEqual(1)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(true)
    })

    it('deletes for non-empty Map', () => {
      let bijMap = new BijectiveMap([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(bijMap.size).toBe(2)
      expect([...bijMap]).toEqual([
        ['a', 'b'],
        ['c', 'd']
      ])
      expect(new Map(bijMap).size).toEqual(2)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(true)
      expect(bijMap.hasValue('c')).toBe(false)
      expect(bijMap.hasValue('d')).toBe(true)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)

      expect(() => bijMap.delete('a', 'b')).not.toThrow()
      expect(bijMap.size).toBe(1)
      expect([...bijMap]).toEqual([['c', 'd']])
      expect(new Map(bijMap).size).toEqual(1)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(false)
      expect(bijMap.hasValue('c')).toBe(false)
      expect(bijMap.hasValue('d')).toBe(true)

      expect(() => bijMap.delete('c')).not.toThrow()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(new Map(bijMap).size).toEqual(0)
      expect(bijMap.hasValue('key')).toBe(false)
      expect(bijMap.hasValue('value')).toBe(false)
      expect(bijMap.hasValue('a')).toBe(false)
      expect(bijMap.hasValue('b')).toBe(false)
      expect(bijMap.hasValue('c')).toBe(false)
      expect(bijMap.hasValue('d')).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return [object BijectiveMap] when converted to string', () => {
      let bijMap = new BijectiveMap<number, number>()
      expect(() => bijMap.set(1, 2)).not.toThrow()

      expect(`String test: ${bijMap}`).toEqual('String test: [object BijectiveMap]')
    })
  })

  describe('keys', () => {
    it('should contain all registered keys in iterator', () => {
      let bijMap = new BijectiveMap<number, number>()
      expect(bijMap.size).toBe(0)
      expect([...bijMap.keys()]).toEqual([])
      expect(() => bijMap.set(3, 4)).not.toThrow()
      expect(() => bijMap.set(5, 6)).not.toThrow()
      expect(bijMap.size).toBe(2)
      expect([...bijMap.keys()]).toEqual([3, 5])
    })
  })

  describe('values', () => {
    it('should contain all registered values in iterator', () => {
      let bijMap = new BijectiveMap<number, number>()
      expect(bijMap.size).toBe(0)
      expect([...bijMap.values()]).toEqual([])
      expect(() => bijMap.set(3, 4)).not.toThrow()
      expect(() => bijMap.set(5, 6)).not.toThrow()
      expect(bijMap.size).toBe(2)
      expect([...bijMap.values()]).toEqual([4, 6])
    })
  })

  describe('entries', () => {
    it('should contain all registered [key, value] pairs in iterator', () => {
      let bijMap = new BijectiveMap<number, number>()
      expect(bijMap.size).toBe(0)
      expect([...bijMap.entries()]).toEqual([])
      expect(() => bijMap.set(3, 4)).not.toThrow()
      expect(() => bijMap.set(5, 6)).not.toThrow()
      expect(bijMap.size).toBe(2)
      expect([...bijMap.entries()]).toEqual([
        [3, 4],
        [5, 6]
      ])
    })
  })

  describe('clear', () => {
    it('should not throw for empty BijectiveMap', () => {
      let bijMap = new BijectiveMap<number, number>()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(() => bijMap.clear()).not.toThrow()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
    })

    it('should erase for non-empty BijectiveMap', () => {
      let bijMap = new BijectiveMap<number, number>([
        [1, 2],
        [3, 4]
      ])
      expect(bijMap.size).toBe(2)
      expect([...bijMap]).toEqual([
        [1, 2],
        [3, 4]
      ])
      expect(bijMap.has(1)).toBe(true)
      expect(bijMap.has(1, 2)).toBe(true)
      expect(bijMap.hasValue(2)).toBe(true)
      expect(bijMap.has(3)).toBe(true)
      expect(bijMap.has(3, 4)).toBe(true)
      expect(bijMap.hasValue(4)).toBe(true)
      expect(() => bijMap.clear()).not.toThrow()
      expect(bijMap.size).toBe(0)
      expect([...bijMap]).toEqual([])
      expect(bijMap.has(1)).toBe(false)
      expect(bijMap.has(1, 2)).toBe(false)
      expect(bijMap.hasValue(2)).toBe(false)
      expect(bijMap.has(3)).toBe(false)
      expect(bijMap.has(3, 4)).toBe(false)
      expect(bijMap.hasValue(4)).toBe(false)
    })
  })

  describe('forEach', () => {
    it('loops through BijectiveMap', () => {
      let bijMap = new BijectiveMap<number, number>([
        [1, 2],
        [3, 4]
      ])
      let result: [number, number, BijectiveMap<number, number>][] = []
      expect(() =>
        bijMap.forEach((value, key, map) => {
          result.push([value, key, map])
        })
      ).not.toThrow()
      expect(result).toEqual([
        [2, 1, bijMap],
        [4, 3, bijMap]
      ])
    })
  })

  describe('invert', () => {
    it('inverts BijectiveMap', () => {
      let bijEmpty = new BijectiveMap([])
      let invertedEmpty = bijEmpty.invert()
      expect([...invertedEmpty]).toEqual([])

      let bijMap = new BijectiveMap<number, string>([
        [1, 'a'],
        [3, 'b']
      ])
      let inverted = bijMap.invert()
      expect([...inverted]).toEqual([
        ['a', 1],
        ['b', 3]
      ])
    })
  })
})
