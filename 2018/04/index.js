import { logData } from './log-data.js';

const byProp = prop => (a, b) => ((a[prop] < b[prop]) ? -1 : ((a[prop] > b[prop]) ? 1 : 0));

function getSortedLogEntries(data = logData) {
  const lines = data.split('\n');
  return lines.map(line => {
    const pattern = /\[([0-9\-]*)\s([0-9]{2})[:]([0-9]{2})\](.*)/g;
    const [ _, date, hour, minute, description ] = pattern.exec(line);
    const [year, month, day] = date.split('-');
    return {
      hour,
      minute,
      description: description.trim(),
      date: new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute))
    };
  }).sort(byProp('date'));
}

function getGuardSleepData(entries = []) {
  const logsByGuard = {};
  let currentGuard;
  let isSleeping;
  let fellAsleepMinute;
  entries.forEach(({ minute, description }) => {
    const idMatches  = /\#([0-9]*)/g.exec(description);
    const isWakeEvent = /wakes/g.test(description);
    const isSleepEvent = /asleep/g.test(description);
    const currentMinute = parseInt(minute);

    if (idMatches) {
      currentGuard = idMatches[1];
      if (!logsByGuard[currentGuard]) logsByGuard[currentGuard] = new Array(59).fill(0);
      isSleeping = false;
    }

    if (isSleepEvent) {
      isSleeping = true;
      fellAsleepMinute = currentMinute;
    }

    if (isSleeping && isWakeEvent && currentGuard) {
      isSleeping = false;
      for (let i = fellAsleepMinute; i < currentMinute; i++) {
        logsByGuard[currentGuard][i]++;
      }
    }
  });

  return Object.entries(logsByGuard).map(([id, minutes]) => {
    const totalSleep = minutes.reduce((total, minute) => minute + total, 0);
    return ({
      id,
      minutes,
      totalSleep,
    });
  }).sort(byProp('totalSleep'))
    .reverse();
}

function getMostTotalSleepGuardAnswer(guards = []) {
  const guard = guards[0];
  let maxIndex = 0;
  guard.minutes.forEach((count, idx) => {
    if(count > guard.minutes[maxIndex]) {
      maxIndex = idx;
    }
  });
  console.log(guard);
  console.log(maxIndex);
  return parseInt(guard.id) * maxIndex;
}

function getMostFrequentMinuteGuardAnswer(guards = []) {
  const max = { count: 0 };
  guards.forEach(guard => {
    guard.minutes.forEach((count, idx) => {
      if (count > max.count) {
        max.id = guard.id;
        max.count = count;
        max.minute = idx
      }
    });
  });
  console.log(max);
}

exports.run = () => {
  const entries = getSortedLogEntries();
  const guardSleepData = getGuardSleepData(entries);
  const mostTotalSleep = getMostTotalSleepGuardAnswer(guardSleepData);
  const mostFrequent = getMostFrequentMinuteGuardAnswer(guardSleepData);
};

//   const max = { count: 0 };
//   Object.entries(logsByGuard).forEach(([id, minutes]) => {
//     minutes.forEach((count, idx) => {
//       if (count > max.count) {
//         max.id = id;
//         max.count = count;
//         max.minute = idx
//       }
//     });
//   });
//   console.log(max);
//   console.log(logsByGuard);
// }

// exports.run = () => {
//   const entries = getSortedLogEntries();
//   const guardSleepData = getGuardSleepData(entries);
// };