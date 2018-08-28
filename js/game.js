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
/** Управление жизнями игрока
* @param {Object} startData
* @return {Object} newData
*/
const setLives = (startData) => {
  if (startData.lives === 0) {
    return startData;
  }
  const tempObj = {
    lives: startData.lives - 1
  };
  const newData = Object.assign({}, startData, tempObj);
  return newData;
};
/** Переключение уровней
* @param {Object} startData
* @return {Object} newData
*/
const changeLevel = (startData) => {
  const tempObj = {
    level: startData.level + 1
  };
  const newData = Object.assign({}, startData, tempObj);
  return newData;
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
/** Подсчет очков при окончании игры
* @param {Array} arrayUserAnswers
* @param {Number} lives
* @param {Object} startData
* @return {Object} newData
*/
const countingPoints = (arrayUserAnswers, lives, startData) => {
  const newData = Object.assign({}, startData);

  if (arrayUserAnswers.length < MIN_ANSWER) {
    newData.points = -1;
    return newData;
  }

  arrayUserAnswers.forEach((item) => {
    if (item.answer && item.elapsedTime < FAST_TIME) {
      newData.points = newData.points + POINT_ADD + POINT_BONUS;
    } else if (item.answer && item.elapsedTime >= NORMAL_TIME_VALUE_ONE && item.elapsedTime <= NORMAL_TIME_VALUE_TWO) {
      newData.points = newData.points + POINT_ADD;
    } else if (item.answer && item.elapsedTime > SLOW_TIME) {
      newData.points = newData.points + POINT_ADD - POINT_FINE;
    }
  });

  newData.points = newData.points + lives * POINT_BONUS_LIVES;
  return newData;
};
/** =========================================
* экспорт
*/
export {countingPoints, startTime, INITIAL_GAME, setLives, changeLevel, userStat, timeText};
