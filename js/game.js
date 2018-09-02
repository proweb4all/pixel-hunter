import returnScreenGame from './module-game-screens';
import header from './module-header.js';
import {managentDom} from './module-mangment-dom.js';
import resultScreen from './module-result-screen.js';
/** =========================================
* обьявление переменных
*/
const INITIAL_GAME = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  points: 0
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
let userStat = {
  name: ``,
  answers: []
};

/**
* возврашает функцию устанавливаюшую игровой экран или экран результатов
* @param {Object} state
* @param {Array} array
* @param {String} statsPictureStr
* @return {Function}
*/
const setGame = (state, array, statsPictureStr) => {
  let index = state.level;

  return returnScreenGame(array[index].type)(changeLevel(state), array[index].images, statsPictureStr);
};
/**
* записываем ответ пользователя
* @param {Boolean} value
* @param {Object} state
* @return {Object}
*/
const pushUserAnswer = function (value, state) {
  if (value) {
    userStat.answers.push({answer: true, elapsedTime: timeText});
    return state;
  } else {
    userStat.answers.push({answer: false, elapsedTime: timeText});
    return setLives(state);
  }
};
/** Управление жизнями игрока
* @param {Object} startData
* @return {Object}
*/
const setLives = (startData) => {
  const tempObj = {
    lives: startData.lives - 1
  };
  return Object.assign({}, startData, tempObj);
};
/** Переключение уровней
* @param {Object} startData
* @return {Object}
*/
const changeLevel = (startData) => {
  const tempObj = {
    level: startData.level + 1
  };
  return Object.assign({}, startData, tempObj);
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
* @return {String} answersList
*/
const createStatsPicture = () => {
  let answersList = new Array(10);

  let answersListTime = userStat.answers.map((item) => {
    return item;
  });

  if (answersListTime.length === 0) {
    answersListTime = new Array(10).fill(undefined);
  }

  for (let i = 0; i < answersList.length; i++) {
    if (answersListTime[i] === undefined) {
      answersList[i] = UNKNOWN_TEXT;
    }
    if (answersListTime[i]) {
      if (answersListTime[i].elapsedTime < FAST_TIME) {
        answersList[i] = FAST_TEXT;
      }
      if (answersListTime[i].elapsedTime > SLOW_TIME) {
        answersList[i] = SLOW_TEXT;
      }
      if (answersListTime[i].elapsedTime >= NORMAL_TIME_VALUE_ONE && answersListTime[i].elapsedTime <= NORMAL_TIME_VALUE_TWO || answersListTime[i].elapsedTime === undefined) {
        answersList[i] = CORRECT_TEXT;
      }
      if (answersListTime[i].answer === false) {
        answersList[i] = WRONG_TEXT;
      }
    }
  }

  answersList = answersList.join(``);
  return answersList;
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
  let statsPictureStr = createStatsPicture();
  if (state.level === 0) {
    userStat.answers.length = 0;
    statsPictureStr = createStatsPicture();
  }
  if (state.lives === 0 || state.level >= questions.length) {
    const resulltUserStat = countingPoints(userStat.answers, state);
    managentDom.changeScreen(resultScreen(resulltUserStat, statsPictureStr));
    return;
  }

  managentDom.changeScreen(header(state), setGame(state, questions, statsPictureStr));
};
/** Подсчет очков при окончании игры
* @param {Array} arrayUserAnswers
* @param {Object} startData
* @return {Object} newData
*/
const countingPoints = (arrayUserAnswers, startData) => {
  const newData = Object.assign({}, startData);

  if (arrayUserAnswers.length < MIN_ANSWER) {
    newData.points = -1;
    return newData;
  }
  newData.fastPoints = {
    points: 0,
    items: 0
  };
  newData.slowPoints = {
    points: 0,
    items: 0
  };
  newData.livesPoints = {
    points: 0,
    items: 0
  };

  arrayUserAnswers.forEach((item) => {
    if (item.answer && item.elapsedTime < FAST_TIME) {
      newData.fastPoints.points = newData.fastPoints.points + POINT_ADD + POINT_BONUS;
      newData.fastPoints.items += 1;
    } else if (item.answer && item.elapsedTime >= NORMAL_TIME_VALUE_ONE && item.elapsedTime <= NORMAL_TIME_VALUE_TWO) {
      newData.points = newData.points + POINT_ADD;
    } else if (item.answer && item.elapsedTime > SLOW_TIME) {
      newData.slowPoints.points = newData.slowPoints.points + POINT_ADD - POINT_FINE;
      newData.slowPoints.items += 1;
    }
  });

  newData.livesPoints.points = newData.livesPoints.points + startData.lives * POINT_BONUS_LIVES;
  newData.livesPoints.items = startData.lives;
  newData.points = newData.points + newData.fastPoints.points + newData.slowPoints.points + newData.livesPoints.points;

  return newData;
};
/** =========================================
* экспорт
*/
const managmentGame = {
  controlGameScreens,
  pushUserAnswer
};

export {managmentGame};
