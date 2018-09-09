import returnScreenGame from './module-game-screens';
import header from './module-header.js';
import {changeScreen} from './module-mangment-dom.js';
import resultScreen from './screens/module-result-screen';

const INITIAL_GAME = Object.freeze({
  LIVES: 3,
  LEVEL: 0,
  TIME: 0,
  POINTS: 0
});
const MIN_ANSWER = 10;
const FAST_TIME = 10;
const NORMAL_TIME_VALUE_ONE = 10;
const NORMAL_TIME_VALUE_TWO = 20;
const SLOW_TIME = 20;
const WRONG_TEXT = `<li class="stats__result stats__result--wrong"></li>`;
const SLOW_TEXT = `<li class="stats__result stats__result--slow"></li>`;
const FAST_TEXT = `<li class="stats__result stats__result--fast"></li>`;
const CORRECT_TEXT = `<li class="stats__result stats__result--correct"></li>`;
const UNKNOWN_TEXT = `<li class="stats__result stats__result--unknown"></li>`;
const POINT_ADD = 100;
const POINT_BONUS = 50;
const POINT_FINE = 50;
const POINT_BONUS_LIVES = 50;
let timeText;
let UserStat = {
  NAME: ``,
  ANSWERS: []
};

/**
* возврашает функцию устанавливаюшую игровой экран или экран результатов
* @param {Object} state
* @param {Array} array
* @param {String} statsAnswersStr
* @return {Function}
*/
const setGame = (state, array, statsAnswersStr) => {
  let index = state.LEVEL;
  const gameScreen = returnScreenGame(array[index].type);
  const newState = Object.assign({}, state, {
    LEVEL: state.LEVEL + 1
  });

  return gameScreen(newState, array[index].images, statsAnswersStr);
};
/**
* записываем ответ пользователя
* @param {Boolean} value
* @param {Object} state
* @return {Object}
*/
const recordUserAnswer = (value, state) => {
  if (value) {
    UserStat.ANSWERS.push({answer: true, elapsedTime: timeText});
    return state;
  } else {
    UserStat.ANSWERS.push({answer: false, elapsedTime: timeText});
    return Object.assign({}, state, {
      LIVES: state.LIVES - 1
    });
  }
};
// /** запись текста времени
// * @param {HTMLElement} element
// * @param {String} text
// */
// const setTextTime = (element, text) => {
//   if (text < 10) {
//     text = `0` + text;
//   }
//   element.innerHTML = text;
// };
/** создание графики ответов
* @return {String} answersListStr
*/
const createResponseStatistics = () => {
  let answersListStr = new Array(10);

  let answersListUser = UserStat.ANSWERS.slice();

  for (let i = 0; i < answersListStr.length; i++) {
    if (answersListUser[i] === undefined) {
      answersListStr[i] = UNKNOWN_TEXT;
    }
    if (answersListUser[i]) {
      const elapsedTime = answersListUser[i].elapsedTime;
      if (elapsedTime < FAST_TIME) {
        answersListStr[i] = FAST_TEXT;
      }
      if (elapsedTime > SLOW_TIME) {
        answersListStr[i] = SLOW_TEXT;
      }
      if (elapsedTime >= NORMAL_TIME_VALUE_ONE && elapsedTime <= NORMAL_TIME_VALUE_TWO || elapsedTime === undefined) {
        answersListStr[i] = CORRECT_TEXT;
      }
      if (answersListUser[i].answer === false) {
        answersListStr[i] = WRONG_TEXT;
      }
    }
  }

  answersListStr = answersListStr.join(``);
  return answersListStr;
};
// /** Счетчик времени
// * @param {HTMLElement} timerElement
// * @return {Number} timeText
// */
// const startTime = (timerElement) => {
//   let date = Date.now();

//   setInterval(() => {
//     let now = Date.now();
//     timeText = Math.round((now - date) / 1000);
//     setTextTime(timerElement, timeText);
//   }, 20);
//   return timeText;
// };
/**
* управление игровыми экранами
* @param {Object} state
* @param {Array} questions
*/
const controlGameScreens = (state = Object.assign({}, INITIAL_GAME), questions) => {
  if (state.LEVEL === 0) {
    UserStat.ANSWERS = [];
  }
  let statsAnswersStr = createResponseStatistics();
  if (state.LIVES === -1 || state.LEVEL >= questions.length) {
    const resulltUserStat = calculatePoints(UserStat.ANSWERS, state);
    changeScreen(resultScreen(resulltUserStat, statsAnswersStr));
    return;
  }

  changeScreen(header(state), setGame(state, questions, statsAnswersStr));
};
/** Подсчет очков при окончании игры
* @param {Array} arrayUserAnswers
* @param {Object} dataAnswers
* @return {Object} newData
*/
const calculatePoints = (arrayUserAnswers, dataAnswers) => {
  if (arrayUserAnswers.length < MIN_ANSWER) {
    dataAnswers.POINTS = -1;
    return dataAnswers;
  }

  dataAnswers.fastPoints = {
    POINTS: 0,
    ITEMS: 0
  };
  dataAnswers.slowPoints = {
    POINTS: 0,
    ITEMS: 0
  };
  dataAnswers.normalPoints = {
    POINTS: 0,
    ITEMS: 0
  };
  dataAnswers.livesPoints = {
    POINTS: 0,
    ITEMS: 0
  };

  arrayUserAnswers.forEach((item) => {
    if (item.answer && item.elapsedTime < FAST_TIME) {
      dataAnswers.fastPoints.POINTS = dataAnswers.fastPoints.POINTS + POINT_ADD + POINT_BONUS;
      dataAnswers.fastPoints.ITEMS += 1;
    } else if ((item.answer && item.elapsedTime >= NORMAL_TIME_VALUE_ONE && item.elapsedTime <= NORMAL_TIME_VALUE_TWO) || (item.elapsedTime === undefined && item.answer === true)) {
      dataAnswers.normalPoints.POINTS = dataAnswers.normalPoints.POINTS + POINT_ADD;
      dataAnswers.normalPoints.ITEMS += 1;
    } else if (item.answer && item.elapsedTime > SLOW_TIME) {
      dataAnswers.slowPoints.POINTS = dataAnswers.slowPoints.POINTS + POINT_ADD - POINT_FINE;
      dataAnswers.slowPoints.ITEMS += 1;
    }
  });

  if (dataAnswers.LIVES >= 0) {
    dataAnswers.livesPoints.POINTS = dataAnswers.livesPoints.POINTS + dataAnswers.LIVES * POINT_BONUS_LIVES;
    dataAnswers.livesPoints.ITEMS = dataAnswers.LIVES;
  }
  dataAnswers.POINTS = dataAnswers.POINTS + dataAnswers.fastPoints.POINTS + dataAnswers.slowPoints.POINTS + dataAnswers.normalPoints.POINTS + dataAnswers.livesPoints.POINTS;

  return dataAnswers;
};
/** =========================================
* экспорт
*/
export {controlGameScreens, recordUserAnswer};
