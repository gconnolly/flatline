(function (_, QUnit) {

  QUnit.module('reduce');

  QUnit.test( 'reduce', function( assert ) {
    var input = [1, 2, 3],
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
        actual = _.map([1, 2, 3], function (i) { return i + 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'map with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3, 4],
        actual = _.map([1, 2, 3], function (i) { return i + this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('forEach');

  QUnit.test( 'forEach', function( assert ) {
    var expected = [2, 3, 4];

    assert.expect(expected.length);

    _.forEach([1, 2, 3], function (i) { assert.ok(i); });
  });

  QUnit.module('filter');

  QUnit.test( 'filter', function( assert ) {
    var expected = [2, 3],
        actual = _.filter([1, 2, 3], function (i) { return i > 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'filter with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3],
        actual = _.filter([1, 2, 3], function (i) { return i > this.val;}, context);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('reject');

  QUnit.test( 'reject', function( assert ) {
    var expected = [2, 3],
        actual = _.reject([1, 2, 3], function (i) { return i <= 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'reject with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3],
        actual = _.reject([1, 2, 3], function (i) { return i <= this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('compact');

  QUnit.test( 'compact', function( assert ) {
    var expected = [2, 3],
        actual = _.compact([null, 2, undefined, 3, 0]);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('some');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = _.some([1, 2, 3], function (i) { return i === 2;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 2
        },
        expected = true,
        actual = _.some([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = _.some([1, 2, 3], function (i) { return i === 4;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 4
        },
        expected = false,
        actual = _.some([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('all');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = _.all([1, 1, 1], function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = true,
        actual = _.all([1, 1, 1], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = _.all([1, 2, 3], function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = false,
        actual = _.all([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });    

  QUnit.module('contains');

  QUnit.test( 'true', function( assert ) {
    var actual = _.contains([1, 2, 3], 3);

    assert.ok(actual);
  });

  QUnit.test( 'false', function( assert ) {
    var actual = _.contains([1, 2, 3], 4);

    assert.ok(!actual);
  }); 

  QUnit.module('first');

  QUnit.test( 'first', function( assert ) {
    var expected = 1,
        actual = _.first([1, 2, 3]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('rest');

  QUnit.test( 'rest', function( assert ) {
    var expected = [2, 3],
        actual = _.rest([1, 2, 3]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('partition');

  QUnit.test( 'partition', function( assert ) {
    var expected = [[1, 2, 3], [4, 5, 6]],
        actual = _.partition([1, 2, 3, 4, 5, 6], function (i) { return i <= 3; });

    assert.deepEqual(actual, expected);
  });

  QUnit.module('groupBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = _.groupBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], function (i) { return i.color; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = _.groupBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], 'color');

    assert.deepEqual(actual, expected);
  });   

  QUnit.module('countBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: 2, blue: 1 },
        actual = _.countBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], function (i) { return i.color; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: 2, blue: 1 },
        actual = _.countBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], 'color');

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('indexBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: { color: 'red' }, blue: { color: 'blue' }, orange: { color: 'orange' } },
        actual = _.indexBy([{ color: 'orange' }, { color: 'red' }, { color: 'blue' }], function (i) { return i.color; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'property', function( assert ) {
    var expected = { red: { color: 'red' }, blue: { color: 'blue' }, orange: { color: 'orange' } },
        actual = _.indexBy([{ color: 'orange' }, { color: 'red' }, { color: 'blue' }], 'color');

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('flatten');

  QUnit.test( 'flatten', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = _.flatten([[[1, [2]]], 3, [[4], 5, 6]]);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'flatten shallow', function( assert ) {
    var expected = [[1, [2]], 3, [4], 5, 6],
        actual = _.flatten([[[1, [2]]], 3, [[4], 5, 6]], true);

    assert.deepEqual(actual, expected);
  });    

  QUnit.module('reverse');

  QUnit.test( 'reverse', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = _.reverse([6, 5, 4, 3, 2, 1]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('reduceRight');

  QUnit.test( 'reduceRight', function( assert ) {
    var input = [1, 2, 3],
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
    var expected = 1,
        actual = _.min([{ val: 1 }, { val: 2 }, { val: 3 }], function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 1 2 3', function( assert ) {
    var expected = 1,
        actual = _.min([1, 2, 3], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 1 3 2', function( assert ) {
    var expected = 1,
        actual = _.min([1, 3, 2], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 2 3 1', function( assert ) {
    var expected = 1,
        actual = _.min([2, 3, 1], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 2 1 3', function( assert ) {
    var expected = 1,
        actual = _.min([2, 1, 3], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 3 2 1', function( assert ) {
    var expected = 1,
        actual = _.min([3, 2, 1], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 3 1 2', function( assert ) {
    var expected = 1,
        actual = _.min([3, 1, 2], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('max');

  QUnit.test( 'max with function', function( assert ) {
    var expected = 3,
        actual = _.max([{ val: 1 }, { val: 2 }, { val: 3 }], function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 1 2 3', function( assert ) {
    var expected = 3,
        actual = _.max([1, 2, 3], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 1 3 2', function( assert ) {
    var expected = 3,
        actual = _.max([1, 3, 2], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 2 3 1', function( assert ) {
    var expected = 3,
        actual = _.max([2, 3, 1], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 2 1 3', function( assert ) {
    var expected = 3,
        actual = _.max([2, 1, 3], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 3 2 1', function( assert ) {
    var expected = 3,
        actual = _.max([3, 2, 1], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 3 1 2', function( assert ) {
    var expected = 3,
        actual = _.max([3, 1, 2], _.identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('invoke');

  QUnit.test( 'invoke with arguments', function( assert ) {
    var expected = [2, 3, 4],
        actual = _.invoke([
          { f: function (i) { return 1 + i; } }, 
          { f: function (i) { return 2 + i; } }, 
          { f: function (i) { return 3 + i; } }], 'f', 1 );

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'invoke', function( assert ) {
    var expected = [1, 2, 3],
        actual = _.invoke([
          { f: function () { return 1; } }, 
          { f: function () { return 2; } }, 
          { f: function () { return 3; } }], 'f');

    assert.deepEqual(actual, expected);
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
