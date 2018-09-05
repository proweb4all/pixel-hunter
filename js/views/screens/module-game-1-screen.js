import {renderTemplate} from '../../module-mangment-dom.js';
import {controlGameScreens, recordUserAnswer} from '../../game.js';
import dataGame from '../../data-game.js';
import AbstractView from '../../clases/abstract-view.js';

class GameOneScreen extends AbstractView {
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
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
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

    /** при выборе 2 ответов в форме, переключение экрана
     * @param {Event} evt
     * @param {Object} state
     */
    const changeFormHandler = (evt, state) => {
      const selectUserAnswer = Array.from(evt.currentTarget.elements)
        .map((item) => item.checked && item.value)
        .filter(function (item) {
          return !!item;
        });
      const correctAnswer = Array.from(evt.currentTarget.querySelectorAll(`img`))
        .map((item) => item.getAttribute(`data-type`));

      if (selectUserAnswer.length === correctAnswer.length) {
        const sameArrays = selectUserAnswer.every((item, index) => {
          return item === correctAnswer[index];
        });

        const newState = recordUserAnswer(sameArrays, state);
        controlGameScreens(newState, dataGame);
      }
    };

    form.addEventListener(`change`, (evt) => {
      changeFormHandler(evt, this._state);
    });
  }
}

export default (state, arrImages, statsAnswersStr) => {
  const gameOneScreen = new GameOneScreen(state, arrImages, statsAnswersStr);
  return gameOneScreen.element;
};
