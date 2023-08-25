const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([2])).toBe(2)
  })

  test('of many is calculated right', () => {
    expect(average([1,2,3,3,5])).toBe(2.8)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})