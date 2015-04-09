(function (jr, QUnit) {

  QUnit.module('reduce');

  QUnit.test( 'reduce', function( assert ) {
    var input = [1, 2, 3],
        expected = [1, 3, 6];

    assert.expect(expected.length);

    jr.reduce(input, function (previousValue, currentValue, index) {
      var actual = previousValue + currentValue;
      assert.equal(actual, expected[index], actual);
      return actual;
    }, 0);
  });

  QUnit.module('map');

  QUnit.test( 'map', function( assert ) {
    var expected = [2, 3, 4],
        actual = jr.map([1, 2, 3], function (i) { return i + 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'map with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3, 4],
        actual = jr.map([1, 2, 3], function (i) { return i + this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('forEach');

  QUnit.test( 'forEach', function( assert ) {
    var expected = [2, 3, 4];

    assert.expect(expected.length);

    jr.forEach([1, 2, 3], function (i) { assert.ok(i); });
  });

  QUnit.module('filter');

  QUnit.test( 'filter', function( assert ) {
    var expected = [2, 3],
        actual = jr.filter([1, 2, 3], function (i) { return i > 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'filter with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = [2, 3],
        actual = jr.filter([1, 2, 3], function (i) { return i > this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('some');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = jr.some([1, 2, 3], function (i) { return i === 2;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 2
        },
        expected = true,
        actual = jr.some([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = jr.some([1, 2, 3], function (i) { return i === 4;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 4
        },
        expected = false,
        actual = jr.some([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.module('all');

  QUnit.test( 'true', function( assert ) {
    var expected = true,
        actual = jr.all([1, 1, 1], function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'true with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = true,
        actual = jr.all([1, 1, 1], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false', function( assert ) {
    var expected = false,
        actual = jr.all([1, 2, 3], function (i) { return i === 1;});

    assert.deepEqual(actual, expected);
  });  

  QUnit.test( 'false with context', function( assert ) {
    var context = {
          val: 1
        },
        expected = false,
        actual = jr.all([1, 2, 3], function (i) { return i === this.val;}, context);

    assert.deepEqual(actual, expected);
  });    

  QUnit.module('first');

  QUnit.test( 'first', function( assert ) {
    var expected = 1,
        actual = jr.first([1, 2, 3]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('rest');

  QUnit.test( 'rest', function( assert ) {
    var expected = [2, 3],
        actual = jr.rest([1, 2, 3]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('partition');

  QUnit.test( 'partition', function( assert ) {
    var expected = [[1, 2, 3], [4, 5, 6]],
        actual = jr.partition([1, 2, 3, 4, 5, 6], function (i) { return i <= 3; });

    assert.deepEqual(actual, expected);
  });

  QUnit.module('groupBy');

  QUnit.test( 'function', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = jr.groupBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], function (i) { return i.color; });

    assert.deepEqual(actual, expected);
  });


  QUnit.test( 'property', function( assert ) {
    var expected = { red: [{ color: 'red' }, { color: 'red' }], blue: [{ color: 'blue' }] },
        actual = jr.groupBy([{ color: 'red' }, { color: 'red' }, { color: 'blue' }], 'color');

    assert.deepEqual(actual, expected);
  }); 

  QUnit.module('flatten');

  QUnit.test( 'flatten', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = jr.flatten([[[1, [2]]], 3, [[4], 5, 6]]);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'flatten shallow', function( assert ) {
    var expected = [[1, [2]], 3, [4], 5, 6],
        actual = jr.flatten([[[1, [2]]], 3, [[4], 5, 6]], true);

    assert.deepEqual(actual, expected);
  });    

  QUnit.module('reverse');

  QUnit.test( 'reverse', function( assert ) {
    var expected = [1, 2, 3, 4, 5, 6],
        actual = jr.reverse([6, 5, 4, 3, 2, 1]);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('reduceRight');

  QUnit.test( 'reduceRight', function( assert ) {
    var input = [1, 2, 3],
        expected = [3, 5, 6];

    assert.expect(expected.length);

    jr.reduceRight(input, function (previousValue, currentValue, index) {
      var actual = previousValue + currentValue;
      assert.equal(actual, expected[index], actual);
      return actual;
    }, 0);
  });  

  QUnit.module('min');

  QUnit.test( 'min with function', function( assert ) {
    var expected = 1,
        actual = jr.min([{ val: 1 }, { val: 2 }, { val: 3 }], function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 1 2 3', function( assert ) {
    var expected = 1,
        actual = jr.min([1, 2, 3], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 1 3 2', function( assert ) {
    var expected = 1,
        actual = jr.min([1, 3, 2], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 2 3 1', function( assert ) {
    var expected = 1,
        actual = jr.min([2, 3, 1], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 2 1 3', function( assert ) {
    var expected = 1,
        actual = jr.min([2, 1, 3], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 3 2 1', function( assert ) {
    var expected = 1,
        actual = jr.min([3, 2, 1], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'min 3 1 2', function( assert ) {
    var expected = 1,
        actual = jr.min([3, 1, 2], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.module('max');

  QUnit.test( 'max with function', function( assert ) {
    var expected = 3,
        actual = jr.max([{ val: 1 }, { val: 2 }, { val: 3 }], function (i) { return i.val; });

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 1 2 3', function( assert ) {
    var expected = 3,
        actual = jr.max([1, 2, 3], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 1 3 2', function( assert ) {
    var expected = 3,
        actual = jr.max([1, 3, 2], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 2 3 1', function( assert ) {
    var expected = 3,
        actual = jr.max([2, 3, 1], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 2 1 3', function( assert ) {
    var expected = 3,
        actual = jr.max([2, 1, 3], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 3 2 1', function( assert ) {
    var expected = 3,
        actual = jr.max([3, 2, 1], identity);

    assert.deepEqual(actual, expected);
  });

  QUnit.test( 'max 3 1 2', function( assert ) {
    var expected = 3,
        actual = jr.max([3, 1, 2], identity);

    assert.deepEqual(actual, expected);
  });

  /* Implementation */

  function identity(i) { return i; }

}).call(this, this.jr, this.QUnit);