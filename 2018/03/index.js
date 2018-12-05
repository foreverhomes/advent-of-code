import { values } from 'lodash';
import { squaresInput } from './squares-input';

function getOverlap(input = squaresInput) {
  const lines = input.split('\n');
  const squares = [];
  let xMax = 0, yMax = 0;
  lines.forEach(line => {
    const [ id, _, position, size ] = line.split(' ');
    const [x, y] = position.split(',');
    const [w, h] = size.split('x');
    const square = {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      w: parseInt(w, 10),
      h: parseInt(h, 10),
      id: id.replace(/\#/g, ''),
    };
    xMax = Math.max(xMax, square.x + square.w);
    yMax = Math.max(yMax, square.y + square.h);
    squares.push(square);
  });

  const points = {};

  squares.forEach(square => {
    for (let i = square.x + 1; i <= square.x + square.w; i++) {
      for (let j = square.y + 1; j <= square.y + square.h; j++) {
        const point = `${i}.${j}`;
        if (points[point]) {
          points[point] = points[point] + 1;
        } else {
          points[point] = 1;
        }
      }
    }
  });

  return values(points).filter(value => value > 1).length;
};

console.assert(getOverlap(`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`) === 4);

exports.getPart1 = () => {
  debugger;
  return getOverlap()
};