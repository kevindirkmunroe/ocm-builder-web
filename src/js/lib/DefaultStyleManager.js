const GRANDE_RIDGE = require('./defaultStyles/grandeRidge');
const OLD_WORLD_PATINA = require('./defaultStyles/oldWorldPatina');

const mergeHistoryWithDefaults = history => {
  history.styleHistory.snapshots.push(GRANDE_RIDGE.styleHistory.snapshots[0]);
  history.colorHistory.push(...GRANDE_RIDGE.colorHistory);

  history.styleHistory.snapshots.push(
    OLD_WORLD_PATINA.styleHistory.snapshots[0],
  );
  history.colorHistory.push(...OLD_WORLD_PATINA.colorHistory);

  return history;
};

module.exports = {
  mergeHistoryWithDefaults,
};
