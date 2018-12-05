import { values } from 'lodash';
import { squaresInput } from './squares-input';

function getSquares(input = squaresInput) {
  const lines = input.split('\n');
  const squares = [];
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
    squares.push(square);
  });

  return squares;
};

function getPlot(squares = []) {
  const plot = {};
  squares.forEach(square => {
    for (let i = square.x + 1; i <= square.x + square.w; i++) {
      for (let j = square.y + 1; j <= square.y + square.h; j++) {
        const point = `${i}.${j}`;
        if (plot[point]) {
          plot[point] = plot[point] + 1;
        } else {
          plot[point] = 1;
        }
      }
    }
  });

  return plot;
}

function getTotalOverlap(plot = {}) {
  return values(plot).filter(value => value > 1).length
}

function getIntactSquareId(squares, plot) {
  let id;
  squares.forEach(square => {
    let isIntact = true;
    for (let i = square.x + 1; i <= square.x + square.w; i++) {
      for (let j = square.y + 1; j <= square.y + square.h; j++) {
        const point = plot[`${i}.${j}`];
        if (point > 1) {
          isIntact = false;
        }
      }
    }

    if (isIntact) {
      id = square.id;
    }
  });

  return id;
}

const testData = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
const testSquares = getSquares(testData);
const testPlot = getPlot(testSquares);
const testOverlap = getTotalOverlap(testPlot);
const testIntactSquareId = getIntactSquareId(testSquares, testPlot);
console.assert(testOverlap === 4);
console.assert(testIntactSquareId === '3');

exports.getAnswers = () => {
  const squares = getSquares();
  const plot = getPlot(squares);
  return {
    totalOverlap: getTotalOverlap(plot),
    intactSquareId: getIntactSquareId(squares, plot),
  };
};