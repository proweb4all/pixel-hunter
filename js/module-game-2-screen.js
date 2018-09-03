import {renderTemplate} from './module-mangment-dom.js';
import {managmentGame} from './game.js';
import dataGame from './data-game.js';

/** =========================================
 * возврашает шаблон с данными
 * @param {Array} arrImages
 * @param {String} statsPictureStr
 * @return {String}
 */
const template = (arrImages, statsPictureStr) => {
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
  return `
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${html}
      </form>
      <ul class="stats">
        ${statsPictureStr}
      </ul>
    </section>
  `;
};

/** при выборе ответа в форме, переключение экрана
 * @param {Event} evt
 * @param {Object} state
 */
const changeFormHandler = (evt, state) => {
  const targetInput = evt.target;
  const currentTarget = evt.currentTarget;
  const selectUserAnswer = targetInput.value;
  const correctAnswer = currentTarget.querySelector(`img`).getAttribute(`data-type`);

  const newState = managmentGame.pushUserAnswer(correctAnswer === selectUserAnswer, state);
  managmentGame.controlGameScreens(newState, dataGame);
};
/** =========================================
 * экспорт
 * @param {Object} state
 * @param {Array} arrImages
 * @param {String} statsPictureStr
 * @return {HTMLElement} element
 */
export default (state, arrImages, statsPictureStr) => {
  const element = renderTemplate(template(arrImages, statsPictureStr));
  const form = element.querySelector(`.game__content`);

  form.addEventListener(`change`, (evt) => {
    changeFormHandler(evt, state);
  });

  return element;
};
