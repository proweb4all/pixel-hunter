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
* @return {Node} fragment
*/
const renderTemplate = (strHtml) => {
  const wrapperTemplate = document.createElement(`template`);
  wrapperTemplate.innerHTML = strHtml.trim();
  let fragment = wrapperTemplate.content;
  return fragment;
};
/**
* вставка данных из template
* @param {Function} func
*/
const changeScreen = (func) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(func());
};
/**
* вставка данных из template "модального окна"
* @param {Function} func
*/
const addModal = (func) => {
  mainElement.appendChild(func());
};
/** =========================================
* экспорт
*/
export {changeScreen, renderTemplate, addModal, mainElement};
