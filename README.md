# just-reduce.js

An experimental functional library written in javascript that operates on array-like objects requiring only the limited interface:

    arrayLikeObject = {
      reduce: function (callback[, initialValue]) {},
      splice: function (start, deleteCount[, item1[, item2[, ...]]]) {}, 
      length: 0
    }
    
The objectives is to, first, clearly demonstrate the flexibility of [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) and then to a lesser extent, you know, be accurate and robust. That being said, there is a smattering of unit tests to back it up.
