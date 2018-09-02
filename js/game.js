import returnScreenGame from './module-game-screens';
import header from './module-header.js';
import resultScreen from './module-result-screen.js';
/** =========================================
* обьявление переменных
*/
const mainElement = document.querySelector(`#main`);
const INITIAL_GAME = {
  lives: 3,
  level: 0,
  time: 0,
  points: 0
};
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
/** =========================================
* обьявление фукнции
*/
/**
* рендеринг template
* @param {String} strHtml
* @return {HTMLElement} fragment
*/
const renderTemplate = (strHtml) => {
  const wrapperTemplate = document.createElement(`template`);
  wrapperTemplate.innerHTML = strHtml;
  return wrapperTemplate.content;
};
/**
* вставка данных из template
* @param {HTMLElement} elements
*/
const changeScreen = (...elements) => {
  mainElement.innerHTML = ``;
  elements.forEach((element) => {
    mainElement.appendChild(element);
  });
};
/**
* вставка данных из template "модального окна"
* @param {HTMLElement} element
*/
const addModal = (element) => {
  mainElement.appendChild(element);
};
/**
* возврашает функцию устанавливаюшую игровой экран или экран результатов
* @param {Object} state
* @param {Array} array
* @return {Function}
*/
const setGame = (state, array) => {
  let index = state.level;

  changeLevel(state);

  return returnScreenGame(array[index].type)(array[index].images);
};
/** =========================================
/**
* записываем ответ пользователя
* @param {Boolean} value
*/
const pushUserAnswer = function (value) {
  if (value) {
    userStat.answers.push({answer: true, elapsedTime: timeText});
  } else {
    userStat.answers.push({answer: false, elapsedTime: timeText});
    setLives(INITIAL_GAME);
  }
};
/**
* удаление HTMLElement
* @param {HTMLElement} element
*/
const deleteElement = (element) => {
  mainElement.removeChild(element);
};
/** Управление жизнями игрока
* @param {Object} startData
*/
const setLives = (startData) => {
  startData.lives -= 1;
};
/**
* Играть заново
*/
const startOverGame = () => {
  userStat.answers.length = 0;
  INITIAL_GAME.lives = 3;
  INITIAL_GAME.level = 0;
};
/** Запись имени игрока
* @param {String} value
*/
const recordNameUserStat = (value) => {
  userStat.name = value;
};
/** Переключение уровней
* @param {Object} startData
*/
const changeLevel = (startData) => {
  startData.level += 1;
};
/** запись текста времени
* @param {HTMLElement} element
* @param {String} text
*/
const setTextTime = (element, text) => {
  if (text < 10) {
    text = `0` + text;
  }
  element.innerHTML = text;
};
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
      if (answersListTime[i].elapsedTime >= NORMAL_TIME_VALUE_ONE && answersListTime[i].elapsedTime <= NORMAL_TIME_VALUE_TWO) {
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
/** Счетчик времени
* @param {HTMLElement} timerElement
* @return {Number} timeText
*/
const startTime = (timerElement) => {
  let date = Date.now();

  setInterval(() => {
    let now = Date.now();
    timeText = Math.round((now - date) / 1000);
    setTextTime(timerElement, timeText);
  }, 20);
  return timeText;
};
/**
* управление игровыми экранами
* @param {Object} state
* @param {Array} questions
*/
const controlGameScreens = (state = INITIAL_GAME, questions) => {
  if (state.lives === 0 || state.level >= questions.length) {
    changeScreen(resultScreen(userStat));
    return;
  }

  changeScreen(header(state), setGame(state, questions));
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
  countingPoints,
  startTime,
  controlGameScreens,
  changeScreen,
  renderTemplate,
  addModal,
  pushUserAnswer,
  deleteElement,
  INITIAL_GAME,
  recordNameUserStat,
  createStatsPicture,
  startOverGame
};

export {managmentGame};
