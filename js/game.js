/** =========================================
* обьявление переменных
*/
const INITIAL_GAME = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  points: 0
});
/** =========================================
* обьявление фукнции
*/
/** Управление жизнями игрока
* @param {Object} startData
* @return {Object} newData
*/
const setLives = (startData) => {
  const newData = Object.assign({}, startData);
  if (newData.lives === 0) {
    return newData.lives;
  }
  newData.lives = newData.lives - 1;
  return newData;
};
/** Переключение уровней
* @param {Object} startData
* @return {Object} newData
*/
const changeLevel = (startData) => {
  const newData = Object.assign({}, startData);
  newData.level = newData.level + 1;
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
  let timeText;

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
  const MIN_ANSWER = 10;
  const FAST_TIME = 10;
  const NORMAL_TIME_VALUE_ONE = 10;
  const NORMAL_TIME_VALUE_TWO = 20;
  const SLOW_TIME = 20;
  const POINT_ADD = 100;
  const POINT_BONUS = 50;
  const POINT_FINE = 50;
  const POINT_BONUS_LIVES = 50;

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
export {countingPoints, startTime, INITIAL_GAME, setLives, changeLevel};
