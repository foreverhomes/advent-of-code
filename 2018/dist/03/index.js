'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

var _squaresInput = require('./squares-input');

function getOverlap() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _squaresInput.squaresInput;

  var lines = input.split('\n');
  var squares = [];
  var xMax = 0,
      yMax = 0;
  lines.forEach(function (line) {
    var _line$split = line.split(' '),
        _line$split2 = _slicedToArray(_line$split, 4),
        id = _line$split2[0],
        _ = _line$split2[1],
        position = _line$split2[2],
        size = _line$split2[3];

    var _position$split = position.split(','),
        _position$split2 = _slicedToArray(_position$split, 2),
        x = _position$split2[0],
        y = _position$split2[1];

    var _size$split = size.split('x'),
        _size$split2 = _slicedToArray(_size$split, 2),
        w = _size$split2[0],
        h = _size$split2[1];

    var square = {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      w: parseInt(w, 10),
      h: parseInt(h, 10),
      id: id.replace(/\#/g, '')
    };
    xMax = Math.max(xMax, square.x + square.w);
    yMax = Math.max(yMax, square.y + square.h);
    squares.push(square);
  });

  var points = {};

  squares.forEach(function (square) {
    for (var i = square.x + 1; i <= square.x + square.w; i++) {
      for (var j = square.y + 1; j <= square.y + square.h; j++) {
        var point = i + '.' + j;
        if (points[point]) {
          points[point] = points[point] + 1;
        } else {
          points[point] = 1;
        }
      }
    }
  });

  var total = (0, _lodash.values)(points).filter(function (value) {
    return value > 1;
  }).length;
  debugger;

  return total;
};

console.assert(getOverlap('#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2') === 4);

exports.getPart1 = function () {
  debugger;
  return getOverlap();
};