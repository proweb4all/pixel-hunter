/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate, mainElement, cloneDemoData, deleteElement} from './util.js';
import welcome from './module-welcome-screen.js';
import {userStat} from './game.js';
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
let objectHandler;
/** =========================================
* обьявление фукнции
*/
/**
* отмена отправки формы у "модального окна"
*
*/
// const submitFormHandler = (evt) => {
//   evt.preventDefault();
//   console.log(evt);
// };
/**
* удаление "модального окна"
* @param {HTMLElement} elem
* @param {Event} evt
*/
const clickCloseHandler = (evt, elem) => {
  evt.preventDefault();

  deleteElement(elem);
  document.removeEventListener(`keydown`, objectHandler);
};

const clickCancelHandler = clickCloseHandler;
/**
* удаление "модального окна" по клавише ESC
* @param {HTMLElement} elem
* @param {Event} evt
*/
const escCloseHandler = (evt, elem) => {
  if (evt.keyCode === ESC_CODE) {
    clickCloseHandler(evt, elem);
  }
};
/**
* смена screen после подтверждения
* @param {Event} evt
*/
const confirmHandler = () => {
  changeScreen(welcome());
  cloneDemoData();
  userStat.answers = null;
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default () => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(MODAL_CONFIRM);
  /**
   *  обьявление переменных
   */
  // const modalForm = element.querySelector(`.modal__inner`);
  const modal = element.querySelector(`.modal`);
  const modalBtnClose = element.querySelector(`.modal__close`);
  const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
  const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];
  /** =========================================
  * работа с DOM
  */
  // modalForm.addEventListener(`submit`, submitFormHandler);
  modalBtnClose.addEventListener(`click`, (evt) => {
    clickCloseHandler(evt, modal);
  });
  modalBtnOk.addEventListener(`click`, confirmHandler);
  modalBtnCancel.addEventListener(`click`, (evt) => {
    clickCancelHandler(evt, modal);
  });

  objectHandler = {
    elem: modal,
    handleEvent: function (evt) {
      escCloseHandler(evt, this.elem);
    }
  };
  document.addEventListener('keydown', objectHandler);

  return element;
};
