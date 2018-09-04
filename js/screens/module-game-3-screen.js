import {renderTemplate} from '../module-mangment-dom.js';
import {controlGameScreens, recordUserAnswer} from '../game.js';
import dataGame from '../data-game.js';
import AbstractView from '../clases/abstract-view.js';

class GameThreeScreen extends AbstractView {
  constructor(state, arrImages, statsAnswersStr) {
    super();
    this._state = state;
    this._arrImages = arrImages;
    this._statsAnswersStr = statsAnswersStr;
    this._CORRECT_ANSWER = `paint`;
  }

  /**
   * возврашает шаблон изображений для ответов
   * @param {Array} arrImages
   * @return {String}
   */
  createTemplateImages(arrImages) {
    let html = ``;

    arrImages.forEach((item, index) => {
      html += `<div class="game__option">
              <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="304" height="455">
            </div>`;
    });

    return html;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">Найдите рисунок среди изображений</p>
        <form class="game__content game__content--triple">
          ${this.createTemplateImages(this._arrImages)}
        </form>
        <ul class="stats">
          ${this._statsAnswersStr}
        </ul>
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
    const imgs = element.querySelectorAll(`.game__content img`);

    /** при выборе ответа в форме, переключение экрана
     * @param {Event} evt
     * @param {Object} state
     */
    const clickFormHandler = (evt, state) => {
      const target = evt.target;
      const selectUserAnswer = target.getAttribute(`data-type`);

      const newState = recordUserAnswer(this._CORRECT_ANSWER === selectUserAnswer, state);
      controlGameScreens(newState, dataGame);
    };

    imgs.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        clickFormHandler(evt, this._state);
      });
    });

    return element;
  }

}

export default (state, arrImages, statsAnswersStr) => {
  return new GameThreeScreen(state, arrImages, statsAnswersStr).bind();
};

// const CORRECT_ANSWER = `paint`;

// /** =========================================
//  * возврашает шаблон с данными
//  * @param {Array} arrImages
//  * @param {String} statsAnswersStr
//  * @return {String}
//  */
// const template = (arrImages, statsAnswersStr) => {
//   let htmlImages = ``;
//   arrImages.forEach((item, index) => {
//     htmlImages += `<div class="game__option">
//               <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="304" height="455">
//             </div>`;
//   });
//   return `
//     <section class="game">
//       <p class="game__task">Найдите рисунок среди изображений</p>
//       <form class="game__content game__content--triple">
//         ${htmlImages}
//       </form>
//       <ul class="stats">
//         ${statsAnswersStr}
//       </ul>
//     </section>
//   `;
// };
// /** при выборе ответа в форме, переключение экрана
//  * @param {Event} evt
//  * @param {Object} state
//  */
// const clickFormHandler = (evt, state) => {
//   const target = evt.target;
//   const selectUserAnswer = target.getAttribute(`data-type`);

//   const newState = recordUserAnswer(CORRECT_ANSWER === selectUserAnswer, state);
//   controlGameScreens(newState, dataGame);
// };
// /** =========================================
//  * экспорт
//  * @param {Object} state
//  * @param {Array} arrImages
//  * @param {String} statsAnswersStr
//  * @return {HTMLElement} element
//  */
// export default (state, arrImages, statsAnswersStr) => {
//   const element = renderTemplate(template(arrImages, statsAnswersStr));
//   const imgs = element.querySelectorAll(`.game__content img`);

//   imgs.forEach((item) => {
//     item.addEventListener(`click`, (evt) => {
//       clickFormHandler(evt, state);
//     });
//   });

//   return element;
// };
