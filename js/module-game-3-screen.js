import {controlGameScreens, renderTemplate, pushUserAnswer, returnInitialStateGame, createStatsPicture} from './game.js';
import dataGame from './data-game.js';

const CORRECT_ANSWER = `paint`;

/** =========================================
 * возврашает шаблон с данными
 * @param {Array} arr
 * @return {String}
 */
const template = (arr) => {
  let htmlImages = ``;
  arr.forEach((item, index) => {
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
        ${createStatsPicture()}
      </ul>
    </section>
  `;
};
/** при выборе ответа в форме, переключение экрана
 * @param {Event} evt
 */
const clickFormHandler = (evt) => {
  const target = evt.target;
  const selectUserAnswer = target.getAttribute(`data-type`);

  pushUserAnswer(CORRECT_ANSWER === selectUserAnswer);
  controlGameScreens(returnInitialStateGame(), dataGame);
};
/** =========================================
 * экспорт
 * @param {Array} arr
 * @return {HTMLElement} element
 */
export default (arr) => {
  const element = renderTemplate(template(arr));
  const imgs = element.querySelectorAll(`.game__content img`);

  imgs.forEach((item) => {
    item.addEventListener(`click`, clickFormHandler);
  });

  return element;
};
