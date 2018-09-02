import {managentDom} from './module-mangment-dom.js';
import {managmentGame} from './game.js';
import dataGame from './data-game.js';

const CORRECT_ANSWER = `paint`;

/** =========================================
 * возврашает шаблон с данными
 * @param {Array} arrImages
 * @param {String} statsPictureStr
 * @return {String}
 */
const template = (arrImages, statsPictureStr) => {
  let htmlImages = ``;
  arrImages.forEach((item, index) => {
    htmlImages += `<div class="game__option">
              <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="304" height="455">
            </div>`;
  });
  return `
    <section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content game__content--triple">
        ${htmlImages}
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
const clickFormHandler = (evt, state) => {
  const target = evt.target;
  const selectUserAnswer = target.getAttribute(`data-type`);

  const newState = managmentGame.pushUserAnswer(CORRECT_ANSWER === selectUserAnswer, state);
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
  const element = managentDom.renderTemplate(template(arrImages, statsPictureStr));
  const imgs = element.querySelectorAll(`.game__content img`);

  imgs.forEach((item) => {
    item.addEventListener(`click`, (evt) => {
      clickFormHandler(evt, state);
    });
  });

  return element;
};
