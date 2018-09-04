import {deleteElement, changeScreen, renderTemplate} from './module-mangment-dom.js';
import welcome from './screens/module-welcome-screen.js';
import AbstractView from './clases/abstract-view.js';

class ModalConfirm extends AbstractView {
  constructor() {
    super();
    this._ESC_CODE = 27;
    this._objectHandler = {};
  }

  get template() {
    return `
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
  }

  // get element() {
  //   if (this._element) {
  //     return this._element;
  //   }
  //   this._element = this.render();
  //   this.bind(this._element);
  //   return this._element;
  // }

  render() {
    return renderTemplate(this.template);
  }

  bind() {
    const element = this.render();
    const modal = element.querySelector(`.modal`);
    const modalBtnClose = element.querySelector(`.modal__close`);
    const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
    const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];

    /**
    * удаление "модального окна"
    * @param {Event} evt
    * @param {HTMLElement} elem
    */
    const clickCloseHandler = (evt, elem) => {
      evt.preventDefault();

      deleteElement(elem);
      document.removeEventListener(`keydown`, this._objectHandler);
    };

    const clickCancelHandler = clickCloseHandler;
    /**
    * удаление "модального окна" по клавише ESC
    * @param {Event} evt
    * @param {HTMLElement} elem
    */
    const escCloseHandler = (evt, elem) => {
      if (evt.keyCode === this._ESC_CODE) {
        clickCloseHandler(evt, elem);
      }
    };
    /**
    * смена screen после подтверждения
    * @param {Event} evt
    */
    const confirmHandler = () => {
      changeScreen(welcome());
    };

    modalBtnClose.addEventListener(`click`, (evt) => {
      clickCloseHandler(evt, modal);
    });
    modalBtnOk.addEventListener(`click`, confirmHandler);
    modalBtnCancel.addEventListener(`click`, (evt) => {
      clickCancelHandler(evt, modal);
    });

    this._objectHandler = {
      handleEvent(evt) {
        escCloseHandler(evt, modal);
      }
    };
    document.addEventListener(`keydown`, this._objectHandler);

    return element;
  }
}

export default () => {
  return new ModalConfirm().bind();
};

// const MODAL_CONFIRM = `
//   <section class="modal">
//     <form class="modal__inner">
//       <button class="modal__close" type="button">
//         <span class="visually-hidden">Закрыть</span>
//       </button>
//       <h2 class="modal__title">Подтверждение</h2>
//       <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
//       <div class="modal__button-wrapper">
//         <button class="modal__btn">Ок</button>
//         <button class="modal__btn">Отмена</button>
//       </div>
//     </form>
//   </section>
// `;
// const ESC_CODE = 27;
// let objectHandler;

// /**
// * удаление "модального окна"
// * @param {Event} evt
// * @param {HTMLElement} elem
// */
// const clickCloseHandler = (evt, elem) => {
//   evt.preventDefault();

//   deleteElement(elem);
//   document.removeEventListener(`keydown`, objectHandler);
// };

// const clickCancelHandler = clickCloseHandler;
// /**
// * удаление "модального окна" по клавише ESC
// * @param {Event} evt
// * @param {HTMLElement} elem
// */
// const escCloseHandler = (evt, elem) => {
//   if (evt.keyCode === ESC_CODE) {
//     clickCloseHandler(evt, elem);
//   }
// };
// /**
// * смена screen после подтверждения
// * @param {Event} evt
// */
// const confirmHandler = () => {
//   changeScreen(welcome());
// };
// /** =========================================
// * экспорт
// * @return {HTMLElement} element
// */
// export default () => {
//   const element = renderTemplate(MODAL_CONFIRM);
//   const modal = element.querySelector(`.modal`);
//   const modalBtnClose = element.querySelector(`.modal__close`);
//   const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
//   const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];

//   modalBtnClose.addEventListener(`click`, (evt) => {
//     clickCloseHandler(evt, modal);
//   });
//   modalBtnOk.addEventListener(`click`, confirmHandler);
//   modalBtnCancel.addEventListener(`click`, (evt) => {
//     clickCancelHandler(evt, modal);
//   });

//   objectHandler = {
//     handleEvent(evt) {
//       escCloseHandler(evt, modal);
//     }
//   };
//   document.addEventListener(`keydown`, objectHandler);

//   return element;
// };
