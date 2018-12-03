import { reduce } from 'lodash/fp';
import { reduce as _reduce } from 'lodash';
import { inputs } from './inputs';

export const part1 = reduce((total, value) => total + value, 0);

export const part2 = values => {
  debugger;
  const frequencies = [];
  let frequency = 0;
  let dupe;

  while(!dupe) {
    frequency = _reduce(values, (total, value) => {
      const newValue = total + value;
      if (!dupe && frequencies.includes(newValue)) {
        dupe = newValue;
      } else {
        frequencies.push(newValue);
      }

      return newValue;
    }, frequency);
  }

  return dupe;
}

exports.getPart1 = () => part1(inputs);
exports.getPart2 = () => part2(inputs);