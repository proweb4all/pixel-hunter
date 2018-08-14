/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate, mainElement} from './util.js';
import welcome from './module-welcome-screen.js';
/** =========================================
 * обьявление констант
 */
const MODAL_CONFIRM = `
  <section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>
`;
const ESC_CODE = 27;
/** =========================================
* обьявление фукнции
*/
/**
* удаление "модального окна"
*
*/
const clickCloseHandler = () => {
  mainElement.removeChild(mainElement.lastChild);
  document.removeEventListener(`keydown`, escCloseHandler);
};

const clickCancelHandler = clickCloseHandler;

const escCloseHandler = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    clickCloseHandler();
  }
};
/**
* смена screen после подтверждения
* @param {Event} evt
*/
const confirmHandler = (evt) => {
  evt.preventDefault();
  changeScreen(welcome);
};
/** =========================================
* экспорт
* @return {Function} element
*/
export default () => {
  const element = renderTemplate(MODAL_CONFIRM);
  /** =========================================
  * работа с DOM
  */
  const modalBtnClose = element.querySelector(`.modal__close`);
  modalBtnClose.addEventListener(`click`, clickCloseHandler);
  const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
  modalBtnOk.addEventListener(`click`, confirmHandler);
  const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];
  modalBtnCancel.addEventListener(`click`, clickCancelHandler);
  document.addEventListener(`keydown`, escCloseHandler);

  return element;
};
