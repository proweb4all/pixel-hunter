import {renderTemplate} from '../../module-mangment-dom.js';
import {controlGameScreens, recordUserAnswer} from '../../game.js';
import dataGame from '../../data-game.js';
import AbstractView from '../../clases/abstract-view.js';

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

  render() {
    return renderTemplate(this.template);
  }

  bind() {
    const imgs = this.element.querySelectorAll(`.game__content img`);

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
  }

}

export default (state, arrImages, statsAnswersStr) => {
  const gameThreeScreen = new GameThreeScreen(state, arrImages, statsAnswersStr);
  return gameThreeScreen.element;
};
