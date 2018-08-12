/** =========================================
 * импорт модулей
 */
import {addModal} from './util.js';
import modalConfirm from './module-modal-confirm.js';
/** =========================================
 * обьявление фукнции
 */
/** добавляет модальное окно с подтверждением
 *
 */
const clickHandler = () => {
  addModal(modalConfirm);
};
/** поиск кнопки назад на экране и установление события
 * @param {Node} searchElemenInWrap
 */
const setEventForBtnBack = (searchElemenInWrap) => {
  const btnBack = searchElemenInWrap.querySelector(`.back`);
  btnBack.addEventListener(`click`, clickHandler);
};

/** =========================================
 * экспорт
 */
export {setEventForBtnBack};
