import ResultScreen from '../views/screens/module-result-screen-view.js';

export default (objUserStat, statsAnswersStr) => {
  const resultScreen = new ResultScreen(objUserStat, statsAnswersStr);
  return resultScreen.element;
};
