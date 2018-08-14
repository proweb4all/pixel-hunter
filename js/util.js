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
 * @param {String} strHtml
 * @return {Node} cloneFragment
 */
const renderTemplate = (strHtml) => {
  // const wrapperTemplate = document.createElement(`div`);
  const wrapperTemplate = document.createElement(`template`);
  wrapperTemplate.innerHTML = strHtml;
  let cloneFragment = wrapperTemplate.content.cloneNode(true);
  return cloneFragment;
};
/**
 * вставка данных из template
 * @param {Node} element
 */
const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  // console.log(`add`, element);
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
