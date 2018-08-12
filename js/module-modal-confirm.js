/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate, mainElement} from './util.js';
import welcome from './module-welcome-screen.js';
/** =========================================
 * обьявление констант
 */
const modalConfirm = `
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
/** =========================================
 * обьявление переменных
 */
let modalBtnClose;
let modalBtnOk;
let modalBtnCancel;
/** =========================================
 * обьявление фукнции
 */
/**
 * удаление "модального окна"
 *
 */
const clickCloseHandler = () => {
  mainElement.removeChild(mainElement.lastChild);
};

const clickCancelHandler = clickCloseHandler;
/**
 * смена screen после подтверждения
 * @param {Event} evt
 */
const confirmHandler = (evt) => {
  evt.preventDefault();
  changeScreen(welcome);
};
/** =========================================
 * работа с данными
 */
const element = renderTemplate(modalConfirm);
/** =========================================
 * работа с DOM
 */
modalBtnClose = element.querySelector(`.modal__close`);
modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];

modalBtnClose.addEventListener(`click`, clickCloseHandler);
modalBtnCancel.addEventListener(`click`, clickCancelHandler);
modalBtnOk.addEventListener(`click`, confirmHandler);
/** =========================================
 * экспорт
 */
export default element;
