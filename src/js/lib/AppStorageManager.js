import AsyncStorage from '@react-native-community/async-storage';

const HISTORY_KEY = 'ocmBuilder-history';

const storeHistory = async history => {
  history = JSON.stringify(history);
  await AsyncStorage.setItem(HISTORY_KEY, history);
};

const retrieveHistory = async () => {
  let savedHistory = await AsyncStorage.getItem(HISTORY_KEY);
  if (savedHistory) {
    return JSON.parse(savedHistory);
  }

  return null;
};

module.exports = {
  storeHistory,
  retrieveHistory,
};
