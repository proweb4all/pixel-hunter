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
  wrapperTemplate.innerHTML = strHtml.trim();
  return wrapperTemplate.content;
};
/**
* вставка данных из template
* @param {HTMLElement} element
*/
const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
/**
* вставка данных из template "модального окна"
* @param {HTMLElement} element
*/
const addModal = (element) => {
  mainElement.appendChild(element);
};
/** =========================================
* работа с данными
*/
/** =========================================
* экспорт
*/
export {changeScreen, renderTemplate, addModal, mainElement};
