import {managentDom} from './module-mangment-dom.js';
import modalConfirm from './module-modal-confirm.js';

/**
 * добавляет модальное окно с подтверждением
 */
const clickHandler = () => {
  managentDom.addModal(modalConfirm());
};
/** поиск кнопки назад на экране и установка события
 * @param {HTMLElement} searchElementInWrap
 */
const setEventForBtnBack = (searchElementInWrap) => {
  const btnBack = searchElementInWrap.querySelector(`.back`);
  btnBack.addEventListener(`click`, clickHandler);
};

export {setEventForBtnBack};
