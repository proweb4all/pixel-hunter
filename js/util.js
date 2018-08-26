import arrayDemoData from './data-game.js';
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

const setScreen = (array) => {
  console.log(array);
  if (!array.length) {
    return ``;
  }
  return array.pop().screenName;
};
/** =========================================
* работа с данными
*/
let demoData;
let returnDemoData =  function () {
  return demoData = arrayDemoData.slice(0);
};
returnDemoData();
/** =========================================
* экспорт
*/
export {changeScreen, renderTemplate, addModal, mainElement, setScreen, demoData, returnDemoData};
