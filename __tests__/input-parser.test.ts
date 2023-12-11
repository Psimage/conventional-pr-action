import { parseJsonList } from '../src/input-parser'

describe('parseJsonList function', () => {
  it('should parse a valid JSON list', () => {
    const jsonList = '["item1", "item2", "item3"]'
    const result = parseJsonList(jsonList)
    expect(result).toEqual(['item1', 'item2', 'item3'])
  })

  it('should parse a valid JSON list with numbers', () => {
    const jsonList = '[1, 2, 3]'
    const result = parseJsonList(jsonList)
    expect(result).toEqual([1, 2, 3])
  })

  it('should parse a valid JSON list with mixed types', () => {
    const jsonList = '[1, "two", true]'
    const result = parseJsonList(jsonList)
    expect(result).toEqual([1, 'two', true])
  })

  it('should throw an error for invalid JSON input', () => {
    const invalidJson = 'invalid-json'
    expect(() => parseJsonList(invalidJson)).toThrow()
  })

  it('should throw an error for JSON input that is not a list', () => {
    const jsonNotList = '{"key": "value"}'
    expect(() => parseJsonList(jsonNotList)).toThrow(
      'Input "{"key": "value"}" is not a JSON list'
    )
  })
})
