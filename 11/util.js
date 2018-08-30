import returnScreenGame from './module-game-screens';
import {userStat, timeText, setLives, initialStateGame, changeLevel} from './game.js';
/** =========================================
* обьявление переменных
*/
const mainElement = document.querySelector(`#main`);
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
* возврашает имя игрового скрина для его приминения
* @param {String} typeGameScreen
* @return {String}
*/
const returnTypeGameScreen = (typeGameScreen) => {
  if (!typeGameScreen) {
    return ``;
  }
  return typeGameScreen;
};
/**
* возврашает функцию устанавливаюшую игровой экран или экран результатов
* @param {Array} array
* @return {Function}
*/
const setGame = (array) => {
  let index = initialStateGame.level;

  changeLevel(initialStateGame);

  return returnScreenGame(returnTypeGameScreen(array[index].type))(array[index].images);
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
    setLives(initialStateGame);
  }
};
/**
* удаление HTMLElement
* @param {HTMLElement} element
*/
const deleteElement = (element) => {
  mainElement.removeChild(element);
};
/** =========================================
* работа с данными
*/
/** =========================================
* экспорт
*/
export {changeScreen, renderTemplate, addModal, mainElement, returnTypeGameScreen, setGame, pushUserAnswer, deleteElement};
