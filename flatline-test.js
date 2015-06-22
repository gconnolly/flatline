(function (_, QUnit) {

  /* a fake array implemenation that restricts functionality to reduce, splice, length */
  var PhonyArray = function (array) {
      var innerArray = array || [];

      Object.defineProperty(this, 'length', {
        get: function () {
          return innerArray.length;
        }
      });

      this.reduce = function () {
        return Array.prototype.reduce.apply(innerArray, arguments);
      };

      this.splice = function () {
        return Array.prototype.splice.apply(innerArray, arguments);
      };

      this.unwrap = function () {
        return innerArray;
      };

      this.deepUnwrap = function () {
        return innerArray.map(function (i) {
          return i.deepUnwrap ? i.deepUnwrap() : i;
        });
      };
    },
    /* convert phonyarrays to native arrays on an object */
    unwrapObject = function (obj) {
      var newObj = {};

      for(prop in obj) {
        newObj[prop] = obj[prop].unwrap ? obj[prop].unwrap() : obj[prop];
      }

      return newObj;
    };

  /* configure flatline to use our phonyarray for our tests*/
  _.setArrayCreator(function () {
    var args = Array.prototype.slice.call(arguments);
    return new PhonyArray(args);
  });

  QUnit.module('reduce');

  QUnit.test( 'reduce', function( assert ) {
    var input = new PhonyArray([1, 2, 3]),
        expected = [1, 3, 6];

    assert.expect(expected.length);

    _.reduce(input, function (previousValue, currentValue, index) {
      var actual = previousValue + currentValue;
      assert.equal(actual, expected[index], actual);
      return actual;
    }, 0);
  });

  QUnit.module('map');

  QUnit.test( 'map', function( assert ) {
    var expected = [2, 3, 4],
        actual = _.map(new PhonyArray([1, 2, 3]), function (i) { return i + 1;});

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'map with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3, 4],
        actual = _.map(new PhonyArray([1, 2, 3]), function (i) { return i + this.val;}, context);

    assert.deepEqual(actual.unwrap(), expected);
  });  

  QUnit.module('forEach');

  QUnit.test( 'forEach', function( assert ) {
    var expected = [2, 3, 4];

    assert.expect(expected.length);

    _.forEach(new PhonyArray([1, 2, 3]), function (i) { assert.ok(i); });
  });

  QUnit.module('filter');

  QUnit.test( 'filter', function( assert ) {
    var expected = [2, 3],
        actual = _.filter(new PhonyArray([1, 2, 3]), function (i) { return i > 1;});

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'filter with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3],
        actual = _.filter(new PhonyArray([1, 2, 3]), function (i) { return i > this.val;}, context);

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.module('reject');

  QUnit.test( 'reject', function( assert ) {
    var expected = [2, 3],
        actual = _.reject(new PhonyArray([1, 2, 3]), function (i) { return i <= 1;});

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'reject with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3],
        actual = _.reject(new PhonyArray([1, 2, 3]), function (i) { return i <= this.val;}, context);

    assert.deepEqual(actual.unwrap(), expected);
  });  

  QUnit.module('compact');

  QUnit.test( 'compact', function( assert ) {
    var expected = [2, 3],
        actual = _.compact(new PhonyArray([null, 2, undefined, 3, 0]));

    assert.deepEqual(actual.unwrap(), expected);
  });  

  QUnit.module('some');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = _.some(new PhonyArray([1, 2, 3]), function (i) { return i === 2;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 2
        },
        expected = true,
        actual = _.some(new PhonyArray([1, 2, 3]), function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = _.some(new PhonyArray([1, 2, 3]), function (i) { return i === 4;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 4
        },
        expected = false,
        actual = _.some(new PhonyArray([1, 2, 3]), function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('all');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = _.all(new PhonyArray([1, 1, 1]), function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = true,
        actual = _.all(new PhonyArray([1, 1, 1]), function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = _.all(new PhonyArray([1, 2, 3]), function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = false,
        actual = _.all(new PhonyArray([1, 2, 3]), function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });    

  QUnit.module('contains');

  QUnit.test( 'true', function( assert ) {
    var actual = _.contains(new PhonyArray([1, 2, 3]), 3);

    assert.ok(actual);
  });

  QUnit.test( 'false', function( assert ) {
    var actual = _.contains(new PhonyArray([1, 2, 3]), 4);

    assert.ok(!actual);
  });

  QUnit.module('find');

  QUnit.test( 'find', function( assert ) {
    var expected = 2,
        actual = _.find(new PhonyArray([1, 2, 3]), function (i) { return i === expected; });

    assert.equal(actual, expected);
  });

  QUnit.test( 'doesnt find', function( assert ) {
    var expected = -1,
        actual = _.find(new PhonyArray([1, 2, 3]), function (i) { return i === 4; });

    assert.equal(actual, expected);
  });

  QUnit.module('findIndex');

  QUnit.test( 'findIndex', function( assert ) {
    var expected = 1,
        actual = _.findIndex(new PhonyArray([1, 2, 3]), function (i) { return i === 2; });

    assert.equal(actual, expected);
  });

  QUnit.test( 'doesnt findIndex', function( assert ) {
    var expected = -1,
        actual = _.findIndex(new PhonyArray([1, 2, 3]), function (i) { return i === 4; });

    assert.equal(actual, expected);
  }); 

  QUnit.module('first');

  QUnit.test( 'first', function( assert ) {
    var expected = 1,
        actual = _.first(new PhonyArray([1, 2, 3]));

    assert.deepEqual(actual, expected);
  });

  QUnit.module('rest');

  QUnit.test( 'rest', function( assert ) {
    var expected = [2, 3],
        actual = _.rest(new PhonyArray([1, 2, 3]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.module('partition');

  QUnit.test( 'partition', function( assert ) {
    var expected = [[1, 2, 3], [4, 5, 6]],
        actual = _.partition(new PhonyArray([1, 2, 3, 4, 5, 6]), function (i) { return i <= 3; });

    assert.deepEqual(actual.deepUnwrap(), expected);
  });

  QUnit.module('groupBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = _.groupBy(new PhonyArray([{ color: 'red' }, { color: 'red' }, { color: 'blue' }]), function (i) { return i.color; });

    assert.deepEqual(unwrapObject(actual), expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = _.groupBy(new PhonyArray([{ color: 'red' }, { color: 'red' }, { color: 'blue' }]), 'color');

    assert.deepEqual(unwrapObject(actual), expected);
  });   

  QUnit.module('countBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: 2, blue: 1 },
        actual = _.countBy(new PhonyArray([{ color: 'red' }, { color: 'red' }, { color: 'blue' }]), function (i) { return i.color; });

    assert.deepEqual(unwrapObject(actual), expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: 2, blue: 1 },
        actual = _.countBy(new PhonyArray([{ color: 'red' }, { color: 'red' }, { color: 'blue' }]), 'color');

    assert.deepEqual(unwrapObject(actual), expected);
  });  

  QUnit.module('indexBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: { color: 'red' }, blue: { color: 'blue' }, orange: { color: 'orange' } },
        actual = _.indexBy(new PhonyArray([{ color: 'orange' }, { color: 'red' }, { color: 'blue' }]), function (i) { return i.color; });

    assert.deepEqual(unwrapObject(actual), expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: { color: 'red' }, blue: { color: 'blue' }, orange: { color: 'orange' } },
        actual = _.indexBy(new PhonyArray([{ color: 'orange' }, { color: 'red' }, { color: 'blue' }]), 'color');

    assert.deepEqual(unwrapObject(actual), expected);
  });  

  QUnit.module('flatten');

  QUnit.test( 'flatten', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = _.flatten(new PhonyArray([[[1, [2]]], 3, [[4], 5, 6]]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'flatten shallow', function( assert ) {
    var expected = [[1, [2]], 3, [4], 5, 6],
        actual = _.flatten(new PhonyArray([[[1, [2]]], 3, [[4], 5, 6]]), true);

    assert.deepEqual(actual.unwrap(), expected);
  });    

  QUnit.module('reverse');

  QUnit.test( 'reverse', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = _.reverse(new PhonyArray([6, 5, 4, 3, 2, 1]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.module('reduceRight');

  QUnit.test( 'reduceRight', function( assert ) {
    var input = new PhonyArray([1, 2, 3]),
        expected = [3, 5, 6];

    assert.expect(expected.length);

    _.reduceRight(input, function (previousValue, currentValue, index) {
      var actual = previousValue + currentValue;
      assert.equal(actual, expected[index], actual);
      return actual;
    }, 0);
  });  

  QUnit.module('min');

  QUnit.test( 'min with function', function( assert ) {
    var expected = { val: 1 },
        actual = _.min(new PhonyArray([{ val: 1 }, { val: 2 }, { val: 3 }]), function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min first', function( assert ) {
    var expected = 1,
        actual = _.min(new PhonyArray([1, 2, 3]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min last', function( assert ) {
    var expected = 1,
        actual = _.min(new PhonyArray([2, 3, 1]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min middle', function( assert ) {
    var expected = 1,
        actual = _.min(new PhonyArray([2, 1, 3]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('max');

  QUnit.test( 'max with function', function( assert ) {
    var expected = { val: 3 },
        actual = _.max(new PhonyArray([{ val: 1 }, { val: 2 }, { val: 3 }]), function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max last', function( assert ) {
    var expected = 3,
        actual = _.max(new PhonyArray([1, 2, 3]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max middle', function( assert ) {
    var expected = 3,
        actual = _.max(new PhonyArray([1, 3, 2]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max first', function( assert ) {
    var expected = 3,
        actual = _.max(new PhonyArray([3, 2, 1]), _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('invoke');

  QUnit.test( 'invoke with arguments', function( assert ) {
    var expected = [2, 3, 4],
        actual = _.invoke(new PhonyArray([
          { f: function (i) { return 1 + i; } }, 
          { f: function (i) { return 2 + i; } }, 
          { f: function (i) { return 3 + i; } }]), 'f', 1 );

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'invoke', function( assert ) {
    var expected = [1, 2, 3],
        actual = _.invoke(new PhonyArray([
          { f: function () { return 1; } }, 
          { f: function () { return 2; } }, 
          { f: function () { return 3; } }]), 'f');

    assert.deepEqual(actual.unwrap(), expected);
  }); 

  QUnit.module('intersection');

  QUnit.test( 'intersection', function( assert ) {
    var expected = [2, 3, 4],
        actual = _.intersection(new PhonyArray([1, 2, 3, 4]), new PhonyArray([2, 3, 4, 5]), new PhonyArray([1, 2, 3, 4, 5]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.module('union');

  QUnit.test( 'union', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 8, 9, 10],
        actual = _.union(new PhonyArray([1, 2, 3, 4]), new PhonyArray([2, 3, 4, 5]), new PhonyArray([8, 9, 10]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.module('unique');

  QUnit.test( 'unique', function( assert ) {
    var expected = [1, 2, 3],
        actual = _.unique(new PhonyArray([1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 3, 2, 1]));

    assert.deepEqual(actual.unwrap(), expected);
  });

  QUnit.test( 'unique sorted', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6, 7, 8],
        actual = _.unique(new PhonyArray([1, 2, 3, 3, 3, 3, 4, 4, 5, 6, 7, 7, 8, 8]), true);

    assert.deepEqual(actual.unwrap(), expected);
  });  

  QUnit.module('identity');

  QUnit.test( 'identity primitive', function( assert ) {
    var expected = 1,
        actual = _.identity(expected);

    assert.equal(actual, expected);
  });

  QUnit.test( 'identity function', function( assert ) {
    var expected = function () {},
        actual = _.identity(expected);

    assert.equal(actual, expected);
  });

  QUnit.module('negate');

  QUnit.test( 'negate true', function( assert ) {
    var funcUnderTest = function () { return true; },
        expected = funcUnderTest(),
        actual = _.negate(funcUnderTest)();

    assert.equal(actual, !expected);
  });

  QUnit.test( 'negate false', function( assert ) {
    var funcUnderTest = function () { return false; },
        expected = funcUnderTest(),
        actual = _.negate(funcUnderTest)();

    assert.equal(actual, !expected);
  });

  QUnit.module('toArray');

  QUnit.test( 'toArray', function( assert ) {
    var expected = [1, 2, 3],
        actual = function () { return _.toArray(arguments); }(1, 2, 3);

    assert.deepEqual(actual, expected);
  });

}).call(this, this._, this.QUnit);
