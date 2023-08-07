---
title: "Simplify repetitive Jest test cases with test.each"
date: "2019-05-06"
description: Use jest's test.each helper to avoid repetitive logic.
type: general
---

> You can read that post on [dev.to](https://dev.to/bgord/simplify-repetitive-jest-test-cases-with-test-each-310m).

### Problem

From time to time, I run into a situation, where most of my test cases follow a similar sequence of steps. This scenario most often happens while unit testing helpers/utility functions. Given certain arguments, check if the actual result is equal to the expected result. Over and over again. As the number of cases grows, the test suite can get bloated.

Contrived example ahead:

```js
const add = (a, b) => a + b

describe("'add' utility", () => {
  it("given 2 and 2 as arguments, returns 4", () => {
    const result = add(2, 2)
    expect(result).toEqual(4)
  })
  it("given -2 and -2 as arguments, returns -4", () => {
    const result = add(-2, -2)
    expect(result).toEqual(-4)
  })
  it("given 2 and -2 as arguments, returns 0", () => {
    const result = add(2, -2)
    expect(result).toEqual(0)
  })
})
```

### Solution

I thought about an abstraction to avoid this kind of boilerplate, and after a few google searches, I found the [test.each](https://jestjs.io/docs/en/api#testeachtable-name-fn-timeout) Jest utility.

This helper encourages you to create the array of `cases`, where you store arguments and expected results, and then iterate through the entire array to run the tested function and assert the results.

Example with `test.each`:

```js
const add = (a, b) => a + b

const cases = [
  [2, 2, 4],
  [-2, -2, -4],
  [2, -2, 0],
]

describe("'add' utility", () => {
  test.each(cases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = add(firstArg, secondArg)
      expect(result).toEqual(expectedResult)
    }
  )
})
```

### Notes

**Benefits**:

- easier to add new tests cases
- less boilerplate

**Possible drawback**:

- more abstractions, some people may find it unnecessary

I find it worthwhile to write a comment about the items of the `cases` array to increase readability and reduce mental effort.

```js
// first argument, second argument, expected result
const cases = [
  [2, 2, 4],
  [-2, -2, -4],
  [2, -2, 0],
]
```
