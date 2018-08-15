/** =========================================
 * импорт модулей
 */
import {addModal} from './util.js';
import modalConfirm from './module-modal-confirm.js';
/** =========================================
 * обьявление фукнции
 */
/**
 * добавляет модальное окно с подтверждением
 */
const clickHandler = () => {
  addModal(modalConfirm());
};
/** поиск кнопки назад на экране и установка события
 * @param {HTMLElement} searchElementInWrap
 */
const setEventForBtnBack = (searchElementInWrap) => {
  const btnBack = searchElementInWrap.querySelector(`.back`);
  btnBack.addEventListener(`click`, clickHandler);
};

/** =========================================
 * экспорт
 */
export {setEventForBtnBack};
