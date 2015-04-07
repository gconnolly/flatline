(function () {

  QUnit.test( "map", function( assert ) {
    var expected = [2, 3, 4],
        actual = jr.map([1, 2, 3], function (i) { return i + 1;});

    assert.deepEqual(actual, expected, 'map');
  });

  QUnit.test( "forEach", function( assert ) {
    var expected = [2, 3, 4]

    expect(expected.length);

    jr.forEach([1, 2, 3], function (i) { ok(i); });
  });

  QUnit.test( "filter", function( assert ) {
    var expected = [2, 3],
        actual = jr.filter([1, 2, 3], function (i) { return i > 1;});

    assert.deepEqual(actual, expected, 'filter');
  });  

}).call(this);
