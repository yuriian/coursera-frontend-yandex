// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
// polyfill for the append method for IE9+
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function () {
  function Game(cardNums) {
    this._cardNums = cardNums || 12;
    this.init(this._cardNums);
  }

  Game.prototype = {
    _cardNums: 0,
    _emojiList: ['🐸', '🐼', '🐵', '🐨', '🐞', '🐷', ],
    _text: {
      lose: 'Lose',
      win: 'Win',
      tryAgain: 'Try again',
      playAgain: 'Play again',
    },
    _cardsList: [],
    _flippedCards: [],
    _winningCardsNum: 0,
    _isPrevStepWin: false,
    _timer: null,
    _intervalId: null,
    _gameTimeSec: 60,
    _timeLeft: 0,
    _dialog: null,

    init: function (cardNums) {
      var cardsContainer = document.getElementById('cardsContainer');
      cardsContainer.addEventListener('click', handleCardClick.bind(this));

      // this._cardsList = createCards(cardsContainer, cardNums);
      this._cardsList = getCards();
      this._fillCards();

      this._dialog = createDialog.call(this, cardsContainer);

      this._timer = getTimer(cardsContainer);
      this._setTimer();


      function createCards(container, cardAmount) {
        var cardObjsList = [];
        var cardObj;

        var domCard;
        var domCardFront;
        var domCardBack;

        for (var i = 0; i < cardAmount; i++) {
          cardObj = {};

          domCard = createElement('div', 'card');
          domCardFront = createElement('div', 'card__front');

          domCard.append(domCardFront, domCardBack);
          container.append(domCard);

          cardObj.domCard = domCard;
          cardObj.domCardFront = domCardFront;

          cardObjsList.push(cardObj);
        }

        document.body.appendChild(container);

        return cardObjsList;
      }

      function getCards() {
        var cardObjsList = [];
        var cardObj;
        var domCards = document.querySelectorAll('.card');

        [].forEach.call(domCards, function (domCardItem) {
          cardObj = {};

          cardObj.domCard = domCardItem;
          cardObj.domCardFront = domCardItem.firstElementChild;

          cardObjsList.push(cardObj);
        });

        return cardObjsList;
      }

      function getTimer() {
        var timerObj = {};
        var domTimer = document.getElementById('timer');

        timerObj.domTimer = domTimer;

        return timerObj;
      }

      function createDialog(insertedAfterNode) {
        var domDialog = createElement('div', 'dialog');
        var domDialogContent = createElement('div', 'dialog__content');
        var domDialogText = createElement('p', 'dialog__text');
        var domDialogBtn = createElement('button', 'dialog__btn', null, this._restartGame, this);

        domDialogContent.append(domDialogText, domDialogBtn);
        domDialog.append(domDialogContent);
        insertedAfterNode.parentNode.insertBefore(domDialog, insertedAfterNode.nextSibling);
        // document.body.append(domDialog);

        var dialogObj = {
          text: {
            lose: addLettersAnimations(this._text.lose, 'dialog__letter'),
            win: addLettersAnimations(this._text.win, 'dialog__letter'),
            tryAgain: this._text.tryAgain,
            playAgain: this._text.playAgain,
          },
          domDialog: domDialog,
          domDialogContent: domDialogContent,
          domDialogText: domDialogText,
          domDialogBtn: domDialogBtn,
        }

        return dialogObj;
      }

      function addLettersAnimations(word, letterClass) {
        var animDelay = 0.18;
        var animDelayStyle = '';

        var letters = Array.prototype.reduce.call(word, function (str, letter) {
          animDelay += 0.12;
          animDelayStyle = 'style="animation-delay:' + animDelay + 's"'
          return str + '<span class="' + letterClass + '" ' + animDelayStyle + '>' + letter + '</span>';
        }, '');

        return letters;
      }

      function createElement(elTag, elClass, elId, listener, ctx) {
        var element = document.createElement(elTag);

        elClass ? element.classList.add(elClass) : '';
        elId ? element.id = elId : '';
        listener ? element.addEventListener('click', listener.bind(ctx)) : '';

        return element;
      }

      function handleCardClick(event) {
        var card = event.target.parentElement;

        if (!card.classList.contains('card')) {
          return;
        }

        this._startTimer();

        if (!this._isPrevStepWin && this._flippedCards.length === 2) {
          this._flippedCards.forEach(function (item) {
            // IE doesn't support multiple parameters for the add() and remove() methods
            item.classList.remove('card--flipped');
            item.classList.remove('card--lose');
          });
        }

        if (this._flippedCards.length === 2) {
          this._flippedCards = [];
        }

        card.classList.toggle('card--flipped');

        if (this._flippedCards.length === 0) {
          this._flippedCards.push(card);
        } else {
          this._flippedCards.push(card);

          compareCards.apply(this, this._flippedCards);
        }

        function compareCards(firstCard, secondCard) {
          if (firstCard.dataset.emojiId === secondCard.dataset.emojiId) {
            this._flippedCards.forEach(function (item) {
              item.classList.add('card--win');
            }, this);
            this._winningCardsNum += 2;
            this._isPrevStepWin = true;
            this._checkGameState();
          } else {
            this._flippedCards.forEach(function (item) {
              item.classList.add('card--lose');
            });

            this._isPrevStepWin = false;
          }
        }
      }
    },

    _fillCards: function () {
      var cardsIndexes = createCardsIndexes(this._cardsList.length);
      var randomPosition;
      var cardsIndexPos;

      this._emojiList.forEach(function (emoji, index, emojiList) {
        for (var i = 0; i < 2; i++) {
          cardsIndexPos = getRandomInt(0, cardsIndexes.length);
          randomPosition = cardsIndexes[cardsIndexPos];
          cardsIndexes.splice(cardsIndexes.indexOf(randomPosition), 1);

          this._cardsList[randomPosition].domCardFront.textContent = emojiList[index];
          this._cardsList[randomPosition].domCard.dataset.emojiId = index;
        }
      }, this);

      function createCardsIndexes(length) {
        var indexes = [];

        for (var i = 0; i < length; i++) {
          indexes.push(i);
        }

        return indexes;
      }

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    },

    _checkGameState: function () {
      if (this._timeLeft === 0 || this._winningCardsNum === this._cardNums) {
        this._finishGame();
        return;
      }
    },

    _finishGame: function () {
      clearInterval(this._intervalId);
      this._intervalId = null;

      this._winningCardsNum === this._cardNums ?
        this._showDialog('win') :
        this._showDialog('lose');
    },

    _restartGame: function () {
      this._hideDialog();

      this._cardsList.forEach(function (card) {
        // IE doesn't support multiple parameters for the add() and remove() methods
        card.domCard.classList.remove('card--flipped');
        card.domCard.classList.remove('card--win');
        card.domCard.classList.remove('card--lose');
      });

      this._flippedCards = [];
      this._winningCardsNum = 0;

      this._fillCards();
      this._setTimer();
    },

    _setTimer: function (isTimerStart) {
      this._timer.domTimer.textContent = this._formatGameDuration(this._gameTimeSec);
    },

    _startTimer: function (isTimerStart) {
      if (this._intervalId === null) {
        this._timeLeft = this._gameTimeSec;
        this._intervalId = setInterval(this._updateTimer.bind(this), 1000);
      }

    },

    _updateTimer: function () {
      this._timeLeft--;
      this._timer.domTimer.textContent = this._formatGameDuration(this._timeLeft);
      this._checkGameState();
    },

    _formatGameDuration: function (durationSec) {
      var min = parseInt(durationSec / 60);
      var sec = durationSec % 60;

      min = min < 10 ? ('0' + min) : min;
      sec = sec < 10 ? ('0' + sec) : sec;

      return min + ' : ' + sec;
    },

    _showDialog: function (gameResult) {
      if (gameResult === 'win') {
        this._dialog.domDialogText.innerHTML = this._dialog.text.win;
        this._dialog.domDialogBtn.textContent = this._dialog.text.playAgain;
      } else {
        this._dialog.domDialogText.innerHTML = this._dialog.text.lose;
        this._dialog.domDialogBtn.textContent = this._dialog.text.tryAgain;
      }

      this._dialog.domDialog.classList.add('dialog--shown');
    },

    _hideDialog: function () {
      this._dialog.domDialog.classList.remove('dialog--shown');
    },
  };

  Object.defineProperty(Game.prototype, 'constructor', {
    enumerable: false,
    value: Game
  });

  new Game();
})();