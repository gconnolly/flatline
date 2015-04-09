(function () {
  var root = this;
  
  var _ = function () {};
  
  _.reduce = _.foldl = _.inject = function (obj, callback, initialValue, context) {
    return obj.reduce(callback.bind(context), initialValue);
  };
   
  _.map = _.collect = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(previousValue.length, 0, callback.call(context, currentValue));
      return previousValue;
    }, []);
  };
   
  _.forEach = _.each = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue){
      callback.call(context, currentValue);
    }, {});
  };

  _.invoke = function (obj, method, args) {
    return obj.reduce(function (previousValue, currentValue){
      previousValue.splice( previousValue.length, 0, currentValue[method].apply(currentValue, args) );
      return previousValue;
    }, []);
  };  
   
  _.filter = _.select = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      !callback.call(context, currentValue) || previousValue.splice( previousValue.length, 0, currentValue );
      return previousValue;
    }, []);
  };
   
  _.some = _.any = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue || callback.call(context, currentValue);
    }, false);
  };
   
  _.all = _.every = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue && callback.call(context, currentValue);
    }, true);
  };
   
  _.first = _.head = _.take = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      return index ? previousValue : currentValue;
    });
  };
   
  _.rest = _.tail = _.drop = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      !index || previousValue.splice(previousValue.length, 0, currentValue );
      return previousValue;
    }, []);
  };
   
  _.partition = function(obj, predicate, context) {
    return obj.reduce(function (previousValue, currentValue) {
      (predicate.call(context, currentValue) 
        ? previousValue[0] 
        : previousValue[1]).splice(previousValue.length, 0, currentValue );
      return previousValue;
    }, [[],[]]);
  };
   
  _.groupBy = function(obj, callback, context) {
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
  
  _.flatten = function (obj, shallow) {
    return flatten([], obj, shallow);
  };
   
  _.reverse = function(obj) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, []);
  };
   
  _.reduceRight = function(obj, callback, initialValue, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, []).reduce(callback.bind(context), initialValue);
  };

  _.min = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var challenger = callback.call(context, currentValue),
          currentMin = index != 1 ? previousValue : callback.call(context, previousValue);

      return currentMin < challenger ? currentMin : challenger;
    });
  };

  _.max = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var challenger = callback.call(context, currentValue),
          currentMin = index != 1 ? previousValue : callback.call(context, previousValue);

      return previousValue > challenger ? previousValue : challenger;
    });
  };

  _.slice = function (obj, begin, end) {
    return obj.reduce(function (previousValue, currentValue, index) {
      if((index >= (begin || 0)) && (index < end || obj.length)) {
        previousValue.splice( previousValue.length, 0, currentValue );
      }

      return previousValue;
    }, []);
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
  
  root._ = _;
}).call(this);
