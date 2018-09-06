(function () {
  'use strict';

  const mainElement = document.querySelector(`#main`);

  /**
  * рендеринг template
  * @param {String} strHtml
  * @return {HTMLElement} fragment
  */
  const renderTemplate = (strHtml) => {
    const wrapperTemplate = document.createElement(`template`);
    wrapperTemplate.innerHTML = strHtml;
    return wrapperTemplate.content;
  };
  /**
  * вставка данных из template
  * @param {HTMLElement} elements
  */
  const changeScreen = (...elements) => {
    mainElement.innerHTML = ``;
    elements.forEach((element) => {
      mainElement.appendChild(element);
    });
  };
  /**
  * вставка данных из template "модального окна"
  * @param {HTMLElement} element
  */
  const addModal = (element) => {
    mainElement.appendChild(element);
  };
  /**
  * удаление HTMLElement
  * @param {HTMLElement} element
  */
  const deleteElement = (element) => {
    mainElement.removeChild(element);
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return renderTemplate(this.template);
    }

    bind() {
      // bind handlers if required
    }
  }

  class MainScreen extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
    `;
    }

    nextScreen() {}

    bind() {
      const btnIntroAsterisk = this.element.querySelector(`.intro__asterisk`);

      /**
       * изменение sсreen по клику
       */
      const clickBtnHandler = () => {
        this.nextScreen();
      };

      btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);
    }
  }

  class WelcomeScreen extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
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
    }

    nextScreen() { }

    bind() {
      const btnGreetingContinue = this.element.querySelector(`.greeting__continue`);

      /**
       * изменение sсreen по клику
       */
      const clickBtnHandler = () => {
        this.nextScreen();
      };

      btnGreetingContinue.addEventListener(`click`, clickBtnHandler);
    }
  }

  var dataGame = [
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
  ];

  class GameOneScreen extends AbstractView {
    constructor(state, arrImages, statsAnswersStr) {
      super();
      this._state = state;
      this._arrImages = arrImages;
      this._statsAnswersStr = statsAnswersStr;
    }

    nextScreen() {}

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

    bind() {
      const form = this.element.querySelector(`.game__content`);

      /** при выборе 2 ответов в форме, переключение экрана
       * @param {Event} evt
       * @param {Object} state
       */
      const changeFormHandler = (evt, state) => {
        this.nextScreen(evt, state);
      };

      form.addEventListener(`change`, (evt) => {
        changeFormHandler(evt, this._state);
      });
    }
  }

  var gameOne = (stateGame, arrImages, statsAnswersStr) => {
    const gameOneScreen = new GameOneScreen(stateGame, arrImages, statsAnswersStr);

    gameOneScreen.nextScreen = (evt, state) => {
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

    return gameOneScreen.element;
  };

  class GameTwoScreen extends AbstractView {
    constructor(state, arrImages, statsAnswersStr) {
      super();
      this._state = state;
      this._arrImages = arrImages;
      this._statsAnswersStr = statsAnswersStr;
    }

    nextScreen() { }

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

    bind() {
      const form = this.element.querySelector(`.game__content`);

      /** при выборе ответа в форме, переключение экрана
       * @param {Event} evt
       * @param {Object} state
       */
      const changeFormHandler = (evt, state) => {
        this.nextScreen(evt, state);
      };

      form.addEventListener(`change`, (evt) => {
        changeFormHandler(evt, this._state);
      });
    }
  }

  var gameTwo = (stateGame, arrImages, statsAnswersStr) => {
    const gameTwoScreen = new GameTwoScreen(stateGame, arrImages, statsAnswersStr);
    gameTwoScreen.nextScreen = (evt, state) => {
      const targetInput = evt.target;
      const currentTarget = evt.currentTarget;
      const selectUserAnswer = targetInput.value;
      const correctAnswer = currentTarget.querySelector(`img`).getAttribute(`data-type`);

      const newState = recordUserAnswer(correctAnswer === selectUserAnswer, state);
      controlGameScreens(newState, dataGame);
    };
    return gameTwoScreen.element;
  };

  class GameThreeScreen extends AbstractView {
    constructor(state, arrImages, statsAnswersStr) {
      super();
      this._state = state;
      this._arrImages = arrImages;
      this._statsAnswersStr = statsAnswersStr;
      this._CORRECT_ANSWER = `paint`;
    }

    nextScreen() { }

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

    bind() {
      const imgs = this.element.querySelectorAll(`.game__content img`);

      /** при выборе ответа в форме, переключение экрана
       * @param {Event} evt
       * @param {Object} stateGane
       */
      const clickFormHandler = (evt, stateGane) => {
        this.nextScreen(evt, stateGane);
      };

      imgs.forEach((item) => {
        item.addEventListener(`click`, (evt) => {
          clickFormHandler(evt, this._state);
        });
      });
    }

  }

  var gameThree = (stateGame, arrImages, statsAnswersStr) => {
    const gameThreeScreen = new GameThreeScreen(stateGame, arrImages, statsAnswersStr);
    gameThreeScreen.nextScreen = (evt, state) => {
      const target = evt.target;
      const selectUserAnswer = target.getAttribute(`data-type`);

      const newState = recordUserAnswer(gameThreeScreen._CORRECT_ANSWER === selectUserAnswer, state);
      controlGameScreens(newState, dataGame);
    };

    return gameThreeScreen.element;
  };

  var returnScreenGame = (valueScreen) => {
    let typeScreen = ``;
    switch (valueScreen) {
      case `gameOne`:
        typeScreen = gameOne;
        break;
      case `gameTwo`:
        typeScreen = gameTwo;
        break;
      case `gameThree`:
        typeScreen = gameThree;
        break;
    }
    return typeScreen;
  };

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

    nextScreen() {}
    closeModal() {}
    closeEscModal() {}

    bind() {
      const modal = this.element.querySelector(`.modal`);
      const modalBtnClose = this.element.querySelector(`.modal__close`);
      const modalBtnOk = this.element.querySelectorAll(`.modal__btn`)[0];
      const modalBtnCancel = this.element.querySelectorAll(`.modal__btn`)[1];

      /**
      * удаление "модального окна"
      * @param {Event} evt
      * @param {HTMLElement} elem
      */
      const onCloseHandler = (evt, elem) => {
        evt.preventDefault();
        this.closeModal(elem);
        document.removeEventListener(`keydown`, this._objectHandler);
      };
      /**
      * удаление "модального окна" по клавише ESC
      * @param {Event} evt
      * @param {HTMLElement} elem
      */
      const onEscCloseHandler = (evt, elem) => {
        this.closeEscModal(evt, elem);
        document.removeEventListener(`keydown`, this._objectHandler);
      };
      /**
      * смена screen после подтверждения
      * @param {Event} evt
      */
      const confirmHandler = () => {
        this.nextScreen();
      };

      modalBtnClose.addEventListener(`click`, (evt) => {
        onCloseHandler(evt, modal);
      });
      modalBtnOk.addEventListener(`click`, confirmHandler);
      modalBtnCancel.addEventListener(`click`, (evt) => {
        onCloseHandler(evt, modal);
      });

      this._objectHandler = {
        handleEvent(evt) {
          onEscCloseHandler(evt, modal);
        }
      };
      document.addEventListener(`keydown`, this._objectHandler);
    }
  }

  //  так или как внизу?
  // const ESC_CODE = 27;

  var modalConfirm = () => {
    const modalConfirm = new ModalConfirm();
    modalConfirm.nextScreen = () => {
      changeScreen(welcome());
    };
    modalConfirm.closeModal = (elem) => {
      deleteElement(elem);
    };
    modalConfirm.closeEscModal = (evt, elem) => {
      if (evt.keyCode === modalConfirm._ESC_CODE) {
        modalConfirm.closeModal(elem);
      }
    };
    return modalConfirm.element;
  };

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

  class Header extends AbstractView {
    constructor(state) {
      super();
      this._state = state;
    }

    get template() {
      return `
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
        ${new Array(3 - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
        ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
      </div>
    </header>
    `;
    }

    bind() {
      setEventForBtnBack(this.element);
    }
  }

  var header = (state) => {
    const header = new Header(state);
    return header.element;
  };

  class ResultScreen extends AbstractView {
    constructor(objUserStat, statsAnswersStr) {
      super();
      this._objUserStat = objUserStat;
      this._statsAnswersStr = statsAnswersStr;
    }

    createTemplate(obj) {
      let slowPoint;
      if (obj.slowPoints) {
        slowPoint = obj.slowPoints.points === 0 ? 0 : `-` + obj.slowPoints.points;
      } else {
        slowPoint = ``;
      }
      let normalPoints;
      if (obj.normalPoints) {
        normalPoints = obj.normalPoints.points !== undefined ? obj.normalPoints.points : ``;
      } else {
        normalPoints = ``;
      }

      let html = ``;
      const htmlHeader = `<header class="header">
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
    <h2 class="result__title">${obj.points > 0 ? `Победа!` : `Проиграл!`}</h2>`;

      const HTML_TABLE_POINTS = `<table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${this._statsAnswersStr}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${normalPoints}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${obj.fastPoints ? obj.fastPoints.items : ``}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 150</td>
      <td class="result__total">${obj.fastPoints ? obj.fastPoints.points : ``}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${obj.livesPoints ? obj.livesPoints.items : ``}<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${obj.livesPoints ? obj.livesPoints.points : ``}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${obj.slowPoints ? obj.slowPoints.items : obj.slowPoints}<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${slowPoint}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${obj.points}</td>
    </tr>
  </table>`;

      const HTML_TABLE_FAIL = `<table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
          ${this._statsAnswersStr}
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>`;

      if (obj.points === -1) {
        html = htmlHeader + HTML_TABLE_FAIL;
      }
      if (obj.points > 0) {
        html = htmlHeader + HTML_TABLE_POINTS;
      }


      html += `</section>`;
      return html;
    }

    get template() {
      return this.createTemplate(this._objUserStat);
    }

    bind() {
      setEventForBtnBack(this.element);
    }
  }

  var resultScreen = (objUserStat, statsAnswersStr) => {
    const resultScreen = new ResultScreen(objUserStat, statsAnswersStr);
    return resultScreen.element;
  };

  const INITIAL_GAME = Object.freeze({
    lives: 3,
    level: 0,
    time: 0,
    points: 0
  });
  const MIN_ANSWER = 10;
  const FAST_TIME = 10;
  const NORMAL_TIME_VALUE_ONE = 10;
  const NORMAL_TIME_VALUE_TWO = 20;
  const SLOW_TIME = 20;
  const WRONG_TEXT = `<li class="stats__result stats__result--wrong"></li>`;
  const SLOW_TEXT = `<li class="stats__result stats__result--slow"></li>`;
  const FAST_TEXT = `<li class="stats__result stats__result--fast"></li>`;
  const CORRECT_TEXT = `<li class="stats__result stats__result--correct"></li>`;
  const UNKNOWN_TEXT = `<li class="stats__result stats__result--unknown"></li>`;
  const POINT_ADD = 100;
  const POINT_BONUS = 50;
  const POINT_FINE = 50;
  const POINT_BONUS_LIVES = 50;
  let timeText;
  let userStat = {
    name: ``,
    answers: []
  };

  /**
  * возврашает функцию устанавливаюшую игровой экран или экран результатов
  * @param {Object} state
  * @param {Array} array
  * @param {String} statsAnswersStr
  * @return {Function}
  */
  const setGame = (state, array, statsAnswersStr) => {
    let index = state.level;
    const gameScreen = returnScreenGame(array[index].type);
    const newState = Object.assign({}, state, {
      level: state.level + 1
    });

    return gameScreen(newState, array[index].images, statsAnswersStr);
  };
  /**
  * записываем ответ пользователя
  * @param {Boolean} value
  * @param {Object} state
  * @return {Object}
  */
  const recordUserAnswer = (value, state) => {
    if (value) {
      userStat.answers.push({answer: true, elapsedTime: timeText});
      return state;
    } else {
      userStat.answers.push({answer: false, elapsedTime: timeText});
      return Object.assign({}, state, {
        lives: state.lives - 1
      });
    }
  };
  // /** запись текста времени
  // * @param {HTMLElement} element
  // * @param {String} text
  // */
  // const setTextTime = (element, text) => {
  //   if (text < 10) {
  //     text = `0` + text;
  //   }
  //   element.innerHTML = text;
  // };
  /** создание графики ответов
  * @return {String} answersListStr
  */
  const createResponseStatistics = () => {
    let answersListStr = new Array(10);

    let answersListUser = userStat.answers.slice();

    for (let i = 0; i < answersListStr.length; i++) {
      if (answersListUser[i] === undefined) {
        answersListStr[i] = UNKNOWN_TEXT;
      }
      if (answersListUser[i]) {
        const elapsedTime = answersListUser[i].elapsedTime;
        if (elapsedTime < FAST_TIME) {
          answersListStr[i] = FAST_TEXT;
        }
        if (elapsedTime > SLOW_TIME) {
          answersListStr[i] = SLOW_TEXT;
        }
        if (elapsedTime >= NORMAL_TIME_VALUE_ONE && elapsedTime <= NORMAL_TIME_VALUE_TWO || elapsedTime === undefined) {
          answersListStr[i] = CORRECT_TEXT;
        }
        if (answersListUser[i].answer === false) {
          answersListStr[i] = WRONG_TEXT;
        }
      }
    }

    answersListStr = answersListStr.join(``);
    return answersListStr;
  };
  // /** Счетчик времени
  // * @param {HTMLElement} timerElement
  // * @return {Number} timeText
  // */
  // const startTime = (timerElement) => {
  //   let date = Date.now();

  //   setInterval(() => {
  //     let now = Date.now();
  //     timeText = Math.round((now - date) / 1000);
  //     setTextTime(timerElement, timeText);
  //   }, 20);
  //   return timeText;
  // };
  /**
  * управление игровыми экранами
  * @param {Object} state
  * @param {Array} questions
  */
  const controlGameScreens = (state = Object.assign({}, INITIAL_GAME), questions) => {
    if (state.level === 0) {
      userStat.answers = [];
    }
    let statsAnswersStr = createResponseStatistics();
    if (state.lives === -1 || state.level >= questions.length) {
      const resulltUserStat = calculatePoints(userStat.answers, state);
      changeScreen(resultScreen(resulltUserStat, statsAnswersStr));
      return;
    }

    changeScreen(header(state), setGame(state, questions, statsAnswersStr));
  };
  /** Подсчет очков при окончании игры
  * @param {Array} arrayUserAnswers
  * @param {Object} dataAnswers
  * @return {Object} newData
  */
  const calculatePoints = (arrayUserAnswers, dataAnswers) => {
    if (arrayUserAnswers.length < MIN_ANSWER) {
      dataAnswers.points = -1;
      return dataAnswers;
    }

    dataAnswers.fastPoints = {
      points: 0,
      items: 0
    };
    dataAnswers.slowPoints = {
      points: 0,
      items: 0
    };
    dataAnswers.normalPoints = {
      points: 0,
      items: 0
    };
    dataAnswers.livesPoints = {
      points: 0,
      items: 0
    };

    arrayUserAnswers.forEach((item) => {
      if (item.answer && item.elapsedTime < FAST_TIME) {
        dataAnswers.fastPoints.points = dataAnswers.fastPoints.points + POINT_ADD + POINT_BONUS;
        dataAnswers.fastPoints.items += 1;
      } else if ((item.answer && item.elapsedTime >= NORMAL_TIME_VALUE_ONE && item.elapsedTime <= NORMAL_TIME_VALUE_TWO) || (item.elapsedTime === undefined && item.answer === true)) {
        dataAnswers.normalPoints.points = dataAnswers.normalPoints.points + POINT_ADD;
        dataAnswers.normalPoints.items += 1;
      } else if (item.answer && item.elapsedTime > SLOW_TIME) {
        dataAnswers.slowPoints.points = dataAnswers.slowPoints.points + POINT_ADD - POINT_FINE;
        dataAnswers.slowPoints.items += 1;
      }
    });

    if (dataAnswers.lives >= 0) {
      dataAnswers.livesPoints.points = dataAnswers.livesPoints.points + dataAnswers.lives * POINT_BONUS_LIVES;
      dataAnswers.livesPoints.items = dataAnswers.lives;
    }
    dataAnswers.points = dataAnswers.points + dataAnswers.fastPoints.points + dataAnswers.slowPoints.points + dataAnswers.normalPoints.points + dataAnswers.livesPoints.points;

    return dataAnswers;
  };

  class RulesScreen extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
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
    }

    recordNamePlay() {}
    nextScreen() {}
    checkedValue() {}

    bind() {
      const fieldName = this.element.querySelector(`.rules__input`);
      const rulesForm = this.element.querySelector(`.rules__form`);
      const btnRulesForm = this.element.querySelector(`.rules__button`);

      /** функция управляет состоянием disabled кнопки формы btnRulesForm в зависимости от значения инпута в форме
      * @param {Event} evt
      * @param {HTMLElement} elem
      */
      const checkedValueHandler = (evt, elem) => {
        this.checkedValue(evt, elem);
      };
      /** изменение sreen при отправке формы
      * @param {Event} evt
      * @param {HTMLElement} elem
      */
      const submitFormHandler = (evt, elem) => {
        evt.preventDefault();

        this.recordNamePlay(elem);
        this.nextScreen();
      };

      fieldName.addEventListener(`input`, (evt) => {
        checkedValueHandler(evt, btnRulesForm);
      });
      rulesForm.addEventListener(`submit`, (evt) => {
        submitFormHandler(evt, fieldName);
      });

      setEventForBtnBack(this.element);
    }
  }

  var rulesScreen = () => {
    const rulesScreen = new RulesScreen();

    rulesScreen.recordNamePlay = (elem) => {
      if (elem.value) ;
    };
    rulesScreen.checkedValue = (evt, elem) => {
      const targetValue = evt.target.value;
      elem.disabled = !targetValue;
    };
    rulesScreen.nextScreen = () => {
      controlGameScreens(undefined, dataGame);
    };

    return rulesScreen.element;
  };

  var welcome = () => {
    const welcomeScreen = new WelcomeScreen();

    welcomeScreen.nextScreen = () => {
      changeScreen(rulesScreen());
    };

    return welcomeScreen.element;
  };

  var mainScreen = () => {
    const mainScreenView = new MainScreen();

    mainScreenView.nextScreen = () => {
      changeScreen(welcome());
    };

    return mainScreenView.element;
  };

  changeScreen(mainScreen());

}());

//# sourceMappingURL=main.js.map
