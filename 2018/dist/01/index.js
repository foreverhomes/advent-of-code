'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.part2 = exports.part1 = undefined;

var _fp = require('lodash/fp');

var _lodash = require('lodash');

var _inputs = require('./inputs');

var part1 = exports.part1 = (0, _fp.reduce)(function (total, value) {
  return total + value;
}, 0);

var part2 = exports.part2 = function part2(values) {
  debugger;
  var frequencies = [];
  var frequency = 0;
  var dupe = void 0;

  while (!dupe) {
    frequency = (0, _lodash.reduce)(values, function (total, value) {
      var newValue = total + value;
      if (!dupe && frequencies.includes(newValue)) {
        dupe = newValue;
      } else {
        frequencies.push(newValue);
      }

      return newValue;
    }, frequency);
  }

  return dupe;
};

exports.getPart1 = function () {
  return part1(_inputs.inputs);
};
exports.getPart2 = function () {
  return part2(_inputs.inputs);
};