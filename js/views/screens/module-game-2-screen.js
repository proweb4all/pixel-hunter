import {renderTemplate} from '../../module-mangment-dom.js';
import {controlGameScreens, recordUserAnswer} from '../../game.js';
import dataGame from '../../data-game.js';
import AbstractView from '../../clases/abstract-view.js';

class GameTwoScreen extends AbstractView {
  constructor(state, arrImages, statsAnswersStr) {
    super();
    this._state = state;
    this._arrImages = arrImages;
    this._statsAnswersStr = statsAnswersStr;
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
                  <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="468" height="458">
                  <label class="game__answer game__answer--photo">
                    <input class="visually-hidden" name="question${index}" type="radio" value="photo">
                    <span>Фото</span>
                  </label>
                  <label class="game__answer game__answer--paint">
                    <input class="visually-hidden" name="question${index}" type="radio" value="paint">
                    <span>Рисунок</span>
                  </label>
                </div>`;
    });

    return html;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">Угадай, фото или рисунок?</p>
        <form class="game__content  game__content--wide">
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
    const form = this.element.querySelector(`.game__content`);

    /** при выборе ответа в форме, переключение экрана
     * @param {Event} evt
     * @param {Object} state
     */
    const changeFormHandler = (evt, state) => {
      const targetInput = evt.target;
      const currentTarget = evt.currentTarget;
      const selectUserAnswer = targetInput.value;
      const correctAnswer = currentTarget.querySelector(`img`).getAttribute(`data-type`);

      const newState = recordUserAnswer(correctAnswer === selectUserAnswer, state);
      controlGameScreens(newState, dataGame);
    };

    form.addEventListener(`change`, (evt) => {
      changeFormHandler(evt, this._state);
    });
  }
}

export default (state, arrImages, statsAnswersStr) => {
  const gameTwoScreen = new GameTwoScreen(state, arrImages, statsAnswersStr);
  return gameTwoScreen.element;
};
