import { describe, expect, test } from '@jest/globals'
const sumFunc = require('../sum')
test('adds 1 + 2 to equal 3', () => {
  expect(sumFunc(1, 2)).toBe(3)
})

/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('use jsdom and set the URL in this test file', () => {
  expect(window.location.href).toBe('https://jestjs.io/')
})
