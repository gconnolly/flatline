# flatline\_Λ\_Λ\_Λ\_\_\_\_\_

An experimental javascript utility library for array-like objects requiring only the limited interface:
```javascript
arrayLikeObject = {
  reduce: function (callback[, initialValue]) {},
  splice: function (start, deleteCount[, item1[, item2[, ...]]]) {}, 
  length: 0
}
```
The objectives is to clearly demonstrate the flexibility of [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) and then to a lesser extent... you know... be accurate and robust. That being said, there is a smattering of unit tests to back it up.

### currently supported functions:

- reduce, foldl, inject 
- reduceRight, foldr
- map, collect
- forEach, each
- filter, select
- reject
- contains, includes, include
- compact
- some, any
- all, every
- first, head, take
- rest, tail, drop
- groupBy
- countBy
- indexBy
- partition
- flatten
- reverse
- min, max
- invoke
- slice
- negate
- identity
