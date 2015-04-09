(function () {
  var root = this;
  
  var jr = function () {};
  
  jr.reduce = jr.foldl = jr.inject = function (obj, callback, initialValue, context) {
    return obj.reduce(callback.bind(context), initialValue);
  };
   
  jr.map = jr.collect = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(previousValue.length, 0, callback.call(context, currentValue));
      return previousValue;
    }, []);
  };
   
  jr.forEach = jr.each = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue){
      callback.call(context, currentValue);
    }, {});
  };
   
  jr.filter = jr.select = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      !callback.call(context, currentValue) || previousValue.splice( previousValue.length, 0, currentValue );
      return previousValue;
    }, []);
  };
   
  jr.some = jr.any = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue || callback.call(context, currentValue);
    }, false);
  };
   
  jr.all = jr.every = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue && callback.call(context, currentValue);
    }, true);
  };
   
  jr.first = jr.head = jr.take = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      return index ? previousValue : currentValue;
    });
  };
   
  jr.rest = jr.tail = jr.drop = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      !index || previousValue.splice(previousValue.length, 0, currentValue );
      return previousValue;
    }, []);
  };
   
  jr.partition = function(obj, predicate, context) {
    return obj.reduce(function (previousValue, currentValue) {
      (predicate.call(context, currentValue) 
        ? previousValue[0] 
        : previousValue[1]).splice(previousValue.length, 0, currentValue );
      return previousValue;
    }, [[],[]]);
  };
   
  jr.groupBy = function(obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      var result = typeof callback == 'function' 
            ? callback.call(context, currentValue) 
            : currentValue[callback];

      previousValue[result] 
        ? previousValue[result].splice(previousValue[result].length, 0, currentValue )
        : (previousValue[result] = [ currentValue ]);
      return previousValue;
    }, {});
  };
  
  jr.flatten = function (obj, shallow) {
    return flatten([], obj, shallow);
  };
   
  jr.reverse = function(obj) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, []);
  };
   
  jr.reduceRight = function(obj, callback, initialValue, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, []).reduce(callback.bind(context), initialValue);
  };

  jr.min = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var challenger = callback.call(context, currentValue),
          currentMin = index != 1 ? previousValue : callback.call(context, previousValue);

      return currentMin < challenger ? currentMin : challenger;
    });
  };

  jr.max = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var challenger = callback.call(context, currentValue),
          currentMin = index != 1 ? previousValue : callback.call(context, previousValue);

      return previousValue > challenger ? previousValue : challenger;
    });
  };

  /* Implementation */

  function flatten(result, obj, shallow, recursive) {
    return obj.reduce(function (outerPreviousValue, outerCurrentValue) {
      isArrayLike(outerCurrentValue) && (!shallow || !recursive)
        ? flatten(outerPreviousValue, outerCurrentValue, shallow, true) 
        : outerPreviousValue.splice( outerPreviousValue.length, 0, outerCurrentValue );

      return outerPreviousValue;
    }, result);
  }

  function isArrayLike(obj) {
    return obj 
          && typeof obj.reduce == 'function'
          && typeof obj.splice == 'function' 
          && typeof obj.length == 'number' 
          && obj.length >= 0;
  }
  
  root.jr = jr;
}).call(this);
