import { inputs } from './inputs';

const getChecksum = input => {
  const lines = input.split('\n');
  const with3 = new Set();
  const with2 = new Set();
  lines.forEach(line => {
    const matched = new Set();
    [...line].forEach(char => {
      if (!matched.has(char)) {
        const matches = line.match(new RegExp(char, 'g')) || [];
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

const getCorrectBoxIds = input => {
  const lines = input.split('\n');
  let matchchars;

  lines.forEach((line, idx) => {
    if (!matchchars) {
      const chars = [...line];
      lines.forEach((otherLine, oIdx) => {
        const matches = [];
        if (idx !== oIdx) {
          chars.forEach((char, cIdx) => {
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
}

exports.getPart1 = () => getChecksum(inputs);
exports.getPart2 = () => getCorrectBoxIds(inputs);