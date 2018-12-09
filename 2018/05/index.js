import { polymer } from './polymer';

function reducePolymer(sample = polymer) {
  const chars = [...sample];
  let canReduce = true;
  let reduceCount = 0;
  let matchFound;
  while (canReduce) {
    reduceCount++;
    console.log(`Running reduction ${reduceCount}`);
    matchFound = false;
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const nextChar = chars[i+1] || '';
      if (char.toUpperCase() === nextChar.toUpperCase() && char !== nextChar) {
        chars.splice(i, 2);
        matchFound = true;
        break;
      }
    }

    canReduce = matchFound;
  }

  return chars.join('');
}

function findShortestPolymerLength(sample = polymer) {
  const uppercasedPolymer = polymer.toUpperCase();
  const uniqueCharsSet = new Set([...uppercasedPolymer]);
  const chars = Array.from(uniqueCharsSet);
  const reducedPolymerLengths = [];
  chars.forEach(char => {
    console.log(`***** running for ${char} ******`);
    const subtractedPolymer = polymer.replace(new RegExp(char, 'gi'), '');
    const reduced = reducePolymer(subtractedPolymer);
    reducedPolymerLengths.push(reduced.length);
  });

  return Math.min([...reducedPolymerLengths]);
}

const mockPolymer = 'dabAcCaCBAcCcaDA';
const mockReducedPolymer = reducePolymer(mockPolymer);
console.assert(mockReducedPolymer === 'dabCBAcaDA');

exports.run = () => {
  const shortestLength = findShortestPolymerLength();
  return shortestLength;
};