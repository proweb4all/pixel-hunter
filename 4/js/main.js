(function () {
  'use strict';

  /** =========================================
  * обьявление переменных
  */
  const mainElement = document.querySelector(`#main`);
  /** =========================================
  * обьявление фукнции
  */
  /**
  * рендеринг template
  * @param {String} strHtml
  * @return {HTMLElement} fragment
  */
  const renderTemplate = (strHtml) => {
    const wrapperTemplate = document.createElement(`template`);
    wrapperTemplate.innerHTML = strHtml.trim();
    return wrapperTemplate.content;
  };
  /**
  * вставка данных из template
  * @param {HTMLElement} element
  */
  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };
  /**
  * вставка данных из template "модального окна"
  * @param {HTMLElement} element
  */
  const addModal = (element) => {
    mainElement.appendChild(element);
  };

  /** =========================================
   * импорт модулей
   */
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
  /** =========================================
  * обьявление фукнции
  */
  /**
  * удаление "модального окна"
  *
  */
  const clickCloseHandler = () => {
    mainElement.removeChild(mainElement.lastChild);
    document.removeEventListener(`keydown`, escCloseHandler);
  };

  const clickCancelHandler = clickCloseHandler;

  const escCloseHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      clickCloseHandler();
    }
  };
  /**
  * смена screen после подтверждения
  * @param {Event} evt
  */
  const confirmHandler = (evt) => {
    evt.preventDefault();
    changeScreen(welcome());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var modalConfirm = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(MODAL_CONFIRM);
    /**
     *  обьявление переменных
     */
    const modalBtnClose = element.querySelector(`.modal__close`);
    const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
    const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];
    /** =========================================
    * работа с DOM
    */
    modalBtnClose.addEventListener(`click`, clickCloseHandler);
    modalBtnOk.addEventListener(`click`, confirmHandler);
    modalBtnCancel.addEventListener(`click`, clickCancelHandler);
    document.addEventListener(`keydown`, escCloseHandler);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление фукнции
   */
  /**
   * добавляет модальное окно с подтверждением
   */
  const clickHandler = () => {
    addModal(modalConfirm());
  };
  /** поиск кнопки назад на экране и установка события
   * @param {HTMLElement} searchElementInWrap
   */
  const setEventForBtnBack = (searchElementInWrap) => {
    const btnBack = searchElementInWrap.querySelector(`.back`);
    btnBack.addEventListener(`click`, clickHandler);
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const STATS_SCREEN = `
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
  <section class="result">
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </section>
`;
  /** =========================================
   * экспорт
   * @return {HTMLElement} element
   */
  var resultScreen = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(STATS_SCREEN);
    /** =========================================
    * работа с DOM
    */
    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const GAME_THREE_SCREEN = `
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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;
  /** =========================================
   * обьявление переменных
   */
  /** =========================================
   * обьявление фукнции
   */
  /** при выборе ответа в форме, переключение экрана
   *
   */
  const clickFormHandler = () => {
    changeScreen(resultScreen());
  };
  /** =========================================
   * экспорт
   * @return {HTMLElement} element
   */
  var gameThree = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(GAME_THREE_SCREEN);
    /**
     *  обьявление переменных
     */
    const imgs = element.querySelectorAll(`.game__content img`);
    /** =========================================
    * работа с DOM
    */
    imgs.forEach((item) => {
      item.addEventListener(`click`, clickFormHandler);
    });

    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const GAME_TWO_SCREEN = `
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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;
  /** =========================================
   * обьявление фукнции
   */
  /** при выборе ответа в форме, переключение экрана
   *
   */
  const changeFormHandler = () => {
    changeScreen(gameThree());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var gameTwo = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(GAME_TWO_SCREEN);
    /**
     *  обьявление переменных
     */
    const form = element.querySelector(`.game__content`);
    /** =========================================
    * работа с DOM
    */
    form.addEventListener(`change`, changeFormHandler);

    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const GAME_ONE_SCREEN = `
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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;
  /** =========================================
   * обьявление фукнции
   */
  /** при выборе 2 ответов в форме, переключение экрана
   * @param {Event} evt
   */
  const changeFormHandler$1 = (evt) => {
    let array = Array.from(evt.currentTarget.elements)
                .map((item) => item.checked)
                .filter(function (item) {
                  return !!item;
                });

    if (array.length === 2) {
      changeScreen(gameTwo());
    }
  };
  /** =========================================
   * экспорт
   * @return {HTMLElement} element
   */
  var gameOne = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(GAME_ONE_SCREEN);
    /**
     *  обьявление переменных
     */
    const form = element.querySelector(`.game__content`);
    /** =========================================
    * работа с DOM
    */
    form.addEventListener(`change`, changeFormHandler$1);

    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
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
  /** =========================================
  * обьявление фукнции
  */
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
  */
  const submitFormHandler = (evt) => {
    evt.preventDefault();

    changeScreen(gameOne());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var rulesScreen = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(RULES_SCREEN);
    /**
     *  обьявление переменных
     */
    const name = element.querySelector(`.rules__input`);
    const rulesForm = element.querySelector(`.rules__form`);
    const btnRulesForm = element.querySelector(`.rules__button`);
    /** =========================================
     * работа с DOM
     */
    name.addEventListener(`input`, (evt) => {
      changeNameHandler(evt, btnRulesForm);
    });
    rulesForm.addEventListener(`submit`, submitFormHandler);

    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const WELCOME_SCREEN = `
  <section class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
        <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
        <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
        <li>Фотореализм обманчив и коварен.</li>
        <li>Помни, главное — смотреть очень внимательно.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
  </section>
`;
  /** =========================================
  * обьявление фукнции
  */
  /** изменение sreen при клике
  *
  */
  const clickBtnHandler = () => {
    changeScreen(rulesScreen());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var welcome = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(WELCOME_SCREEN);
    /**
     *  обьявление переменных
     */
    const btnGreetingContinue = element.querySelector(`.greeting__continue`);
    /** =========================================
     * работа с DOM
     */
    btnGreetingContinue.addEventListener(`click`, clickBtnHandler);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * обьявление констант
   */
  const MAIN_SCREEN = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
  /** =========================================
  * обьявление фукнции
  */
  /** изменение sreen по клику и css анимация исчезновения/появления
  *
  */
  const clickBtnHandler$1 = () => {
    changeScreen(welcome());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var mainScreen = () => {
    /**
     *  работа с данными
     */
    const element = renderTemplate(MAIN_SCREEN);
    /**
     *  обьявление переменных
     */
    const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);
    /** =========================================
    * работа с DOM
    */
    btnIntroAsterisk.addEventListener(`click`, clickBtnHandler$1);

    return element;
  };

  /** =========================================
   * импорт модулей
   */
  /** =========================================
   * работа с DOM
   */
  changeScreen(mainScreen());

}());

//# sourceMappingURL=main.js.map
