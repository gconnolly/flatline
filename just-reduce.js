function () {
  var root = this;
  
  var jr = function () {};
  
  jr.reduce = function (obj, callback, initialValue) {
    return obj.reduce(callback, initialValue);
  };
   
  jr.map = function (obj, callback) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue.push(callback(currentValue));
    }, []);
  };
   
  jr.forEach = function (obj, callback) {
    return obj.reduce(function (previousValue, currentValue){
      callback(currentValue);
    });
  };
   
  jr.filter = function (obj, callback) {
    return obj.reduce(function (previousValue, currentValue) {
      callback(currentValue)) || previousValue.push(currentValue);
      return previousValue;
    }, []);
  };
   
  jr.some = function (obj, callback) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue || callback(currentValue);
    }, false);
  };
   
  jr.all = function (obj, callback) {
    return obj.reduce(function (previousValue, currentValue) {
      return previousValue && callback(currentValue);
    }, true);
  };
   
  jr.first = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      return index ? previousValue : currentValue;
    });
  };
   
  jr.rest = function (obj) {
    return obj.reduce(function (previousValue, currentValue, index) {
      index || previousValue.push(currentValue);
      return previousValue;
    }, []);
  };
   
  jr.partition = function(obj, predicate) {
    return obj.reduce(function (previousValue, currentValue) {
      (predicate(currentValue) ? previousValue[0] : previousValue[1]).push(currentValue);
    }, [[],[]]);
  };
   
  jr.groupBy = function(obj, callback) {
    return obj.reduce(function (previousValue, currentValue) {
      var result = typeof obj == 'function' ? callback(currentValue) : currentValue[callback];
      previousValue[result] ? previousValue[result].push(currentValue) : previousValue[result] = [ currentValue ];
      return previousValue;
    }, {});
  };
   
  jr.flatten = function(obj) {
    return obj.reduce(function (outerPreviousValue, outerCurrentValue) {
      return outerCurrentValue.reduce(function (innerPreviousValue, innerCurrentValue) {
        innerPreviousValue.push(innerCurrentValue);
        return innerPreviousValue;
      }, outerPreviousValue);
    }, []);
  }
   
  jr.reverse = function(obj) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.unshift(currentValue);
      return previousValue;
    }, []);
  }
   
  jr.reduceRight = function(obj, callback, iniitialValue) {
    return obj.reduce(function (previousValue, currentValue) {
      previousValue.unshift(currentValue);
      return previousValue;
    }, []).reduce(callback, initialValue);
  }
  
  root.jr = jr;
}.call(this);
