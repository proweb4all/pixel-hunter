/** =========================================
 * обьявление констант
 */
/** =========================================
 * обьявление переменных
 */
const mainElement = document.querySelector(`#main`);
/** =========================================
 * обьявление фукнции
 */
/**
 * рендеринг template
 * @param {String} template
 * @return {Node} wrapperTemplate
 */
const renderTemplate = (template) => {
  const wrapperTemplate = document.createElement(`div`);
  wrapperTemplate.innerHTML = template.trim();
  return wrapperTemplate;
};
/**
 * вставка данных из template
 * @param {Node} element
 */
const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
/**
 * вставка данных из template "модального окна"
 * @param {Node} element
 */
const addModal = (element) => {
  mainElement.appendChild(element);
};
/** =========================================
 * работа с данными
 */
/** =========================================
 * работа с DOM
 */
/** =========================================
 * экспорт
 */
export {changeScreen, renderTemplate, addModal, mainElement};
