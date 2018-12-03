'use strict';

var _inputs = require('./inputs');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getChecksum = function getChecksum(input) {
  var lines = input.split('\n');
  var with3 = new Set();
  var with2 = new Set();
  lines.forEach(function (line) {
    var matched = new Set();
    [].concat(_toConsumableArray(line)).forEach(function (char) {
      if (!matched.has(char)) {
        var matches = line.match(new RegExp(char, 'g')) || [];
        if (matches.length === 3) {
          with3.add(line);
          matched.add(char);
        } else if (matches.length === 2) {
          with2.add(line);
          matched.add(char);
        }
      }
    });
  });

  return with3.size * with2.size;
};

var getCorrectBoxIds = function getCorrectBoxIds(input) {
  var lines = input.split('\n');
  var matchchars = void 0;

  lines.forEach(function (line, idx) {
    if (!matchchars) {
      var chars = [].concat(_toConsumableArray(line));
      lines.forEach(function (otherLine, oIdx) {
        var matches = [];
        if (idx !== oIdx) {
          chars.forEach(function (char, cIdx) {
            if (char === otherLine[cIdx]) {
              matches.push(char);
            }
          });

          if (matches.length === line.length - 1) {
            matchchars = matches.join('');
          }
        }
      });
    }
  });

  return matchchars;
};

exports.getPart1 = function () {
  return getChecksum(_inputs.inputs);
};
exports.getPart2 = function () {
  return getCorrectBoxIds(_inputs.inputs);
};