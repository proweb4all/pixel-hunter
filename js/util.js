import arrayDemoData from './data-game.js';
import returnScreenGame from './module-game-screens';
/** =========================================
* обьявление переменных
*/
const mainElement = document.querySelector(`#main`);
let demoData;
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
  if (elements.length === 2 && elements[1].querySelector(`.result`)) {
    mainElement.appendChild(elements[1]);
  } else {
    elements.forEach((element) => {
      mainElement.appendChild(element);
    });
  }
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
  let data = array.pop();

  if (!data) {
    return returnScreenGame(returnTypeGameScreen())();
  }

  return returnScreenGame(returnTypeGameScreen(data.typeGameScreen))(data.images);
};
/**
* возврашает клон массива с демо данными
*/
let cloneDemoData = function () {
  demoData = arrayDemoData.slice(0);
};
/** =========================================
* работа с данными
*/
cloneDemoData();
/** =========================================
* экспорт
*/
export {changeScreen, renderTemplate, addModal, mainElement, returnTypeGameScreen, setGame, demoData, cloneDemoData};
