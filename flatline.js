(function () {
  var root = this,
      _ = function () {},
      createArray = function ( ) {
        return Array.apply(null, arguments);
      };

  /* CONFIGURATION */

  // set a function that will create the array-like objects
  // to be used. the native array is set by default.
  _.setArrayCreator = function (callback) {
    createArray = callback;
  };
  
  /* UTILITY FUNCTIONS */

  _.reduce = _.foldl = _.inject = function (obj, callback, initialValue, context) {
    return obj.reduce(callback.bind(context), initialValue);
  };
   
  _.map = _.collect = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(previousValue.length, 0, callback.call(context, currentValue));
      return previousValue;
    }, createArray());
  };
   
  _.forEach = _.each = function (obj, callback, context) {
    obj.reduce(function (previousValue, currentValue){
      callback.call(context, currentValue);
    }, {});

    return obj;
  };

  _.invoke = function (obj, method) {
    var args = _.toArray(arguments).splice( 2, arguments.length );
    return obj.reduce(function (previousValue, currentValue){
      previousValue.splice( previousValue.length, 0, currentValue[method].apply(currentValue, args) );
      return previousValue;
    }, createArray());
  };  
   
  _.filter = _.select = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue) {
      !callback.call(context, currentValue) || previousValue.splice( previousValue.length, 0, currentValue );
      return previousValue;
    }, createArray());
  };

  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(predicate), context);
  };  

  _.compact = function (obj) {
    return _.filter(obj, _.identity);
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

  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue || (item === currentValue);
    }, false);
  };

  _.find = _.detect = function(obj, predicate, context) {
    var result;

    _.forEach(obj, function (element) {
      if(!result && predicate.call(context, element)) {
        result = element;
      }
    });

    return result || -1;
  };

  _.intersection = function (obj) {
    var args = _.rest(_.toArray(arguments));

    return _.filter(obj, function (element) {
      return _.all(args, function (array) {
        return _.contains(array, element);
      });
    });
  };

  _.uniq = _.unique = function (obj, isSorted, callback, context) {
    var previous,
        seen = createArray();    

    return _.filter(obj, function (value) {
      var computed = callback ? callback.call(value, context) : value,
          result = (isSorted && computed !== previous) || (!isSorted && !_.contains(seen, computed));

      if(result) {
        previous = computed;
        seen.splice( seen.length, 0, computed );
      }

      return result;
    }, context);
  };

  _.union = function () {
    return _.uniq(_.flatten(_.toArray(arguments), true));
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
    }, createArray());
  };
  
  _.partition = function(obj, predicate, context) {
    var firstPartition = createArray(),
        secondPartition = createArray();

    _.forEach(obj, function (element) {
      predicate.call(context, element) 
        ? firstPartition.splice(firstPartition.length, 0, element ) 
        : secondPartition.splice(secondPartition.length, 0, element );
    });

    return createArray(firstPartition, secondPartition);
  };

  var group = function (behavior) {
    return function(obj, callback, context) {
      return obj.reduce(function (previousValue, currentValue) {
        var key = typeof callback == 'function' 
              ? callback.call(context, currentValue) 
              : currentValue[callback];

        behavior( previousValue, currentValue, key );
        return previousValue;
      }, {});
    };
  };  

  _.groupBy = group(function (result, value, key) {
    result[key] ? result[key].splice(result[key].length, 0, value ) : (result[key] = createArray( value ));
  });

  _.countBy = group(function (result, value, key) {
    result[key] ? result[key]++ : result[key] = 1;
  });

  _.indexBy = group(function (result, value, key) {
    result[key] = value;
  }); 
  
  _.flatten = function (obj, shallow) {
    return flatten(createArray(), obj, shallow);
  };
   
  _.reverse = function(obj) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, createArray());
  };
   
  _.reduceRight = function(obj, callback, initialValue, context) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.splice(0, 0, currentValue);
      return previousValue;
    }, createArray()).reduce(callback.bind(context), initialValue);
  };

  _.min = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var computed = callback.call(context, currentValue),
          currentMin = callback.call(context, previousValue);

      return currentMin < computed ? previousValue : currentValue;
    });
  };

  _.max = function (obj, callback, context) {
    return obj.reduce(function (previousValue, currentValue, index) {
      var computed = callback.call(context, currentValue),
          currentMax = callback.call(context, previousValue);

      return currentMax > computed ? previousValue : currentValue;
    });
  };

  _.slice = function (obj, begin, end) {
    return obj.reduce(function (previousValue, currentValue, index) {
      if((index >= (begin || 0)) && (index < end || obj.length)) {
        previousValue.splice( previousValue.length, 0, currentValue );
      }

      return previousValue;
    }, createArray());
  };

  /*  
      These functions don't use reduce, but they are used in the implementation of 
      other utility functions and since they exists in lodash and underscore
      we will allow access to them.
  */

  _.identity = function (i) {
    return i;
  };

  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  _.toArray = function(obj) {
    return Array.apply(null, obj);
  };  

  /* IMPLEMENTATION */

  var flatten = function (result, obj, shallow, recursive) {
    return obj.reduce(function (outerPreviousValue, outerCurrentValue) {
      isArrayLike(outerCurrentValue) && (!shallow || !recursive)
        ? flatten(outerPreviousValue, outerCurrentValue, shallow, true) 
        : outerPreviousValue.splice( outerPreviousValue.length, 0, outerCurrentValue );

      return outerPreviousValue;
    }, result);
  };

  var isArrayLike = function (obj) {
    return obj 
          && typeof obj.reduce == 'function'
          && typeof obj.splice == 'function' 
          && typeof obj.length == 'number' 
          && obj.length >= 0;
    return obj && typeof obj.reduce == 'function';
  };

  root._ = _;
}).call(this);
