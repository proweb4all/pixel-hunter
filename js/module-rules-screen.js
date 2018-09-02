import {setEventForBtnBack} from './module-back-btn.js';
import {managentDom} from './module-mangment-dom.js';
import {managmentGame} from './game.js';
import dataGame from './data-game.js';

const RULES_SCREEN = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
`;

/** функция управляет состоянием disabled кнопки формы btnRulesForm в зависимости от значения инпута в форме
* @param {Event} evt
* @param {HTMLElement} btnForm
*/
const changeNameHandler = (evt, btnForm) => {
  const targetValue = evt.target.value;
  btnForm.disabled = !targetValue;
};
/** изменение sreen при отправке формы
* @param {Event} evt
* @param {HTMLElement} inputElem
*/
const submitFormHandler = (evt, inputElem) => {
  evt.preventDefault();
  // как записать имя игрока?
  if (inputElem.value) {
    // managmentGame.recordNameUserStat(inputElem.value);
  }

  managmentGame.controlGameScreens(undefined, dataGame);
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default () => {
  const element = managentDom.renderTemplate(RULES_SCREEN);
  const name = element.querySelector(`.rules__input`);
  const rulesForm = element.querySelector(`.rules__form`);
  const btnRulesForm = element.querySelector(`.rules__button`);

  name.addEventListener(`input`, (evt) => {
    changeNameHandler(evt, btnRulesForm);
  });
  rulesForm.addEventListener(`submit`, (evt) => {
    submitFormHandler(evt, name);
  });

  setEventForBtnBack(element);

  return element;
};
