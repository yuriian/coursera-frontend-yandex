function Game(cardNums) {
  var cardAmount = cardNums || 12;

  this.init(cardAmount);
}

Game.prototype = {
  _emojiList: ['🐸', '🐼', '🐵', '🐨', '🐞', '🐷', ],
  _cardsList: [],

  _flippedCards: [],
  _isPrevStepWin: false,

  init: function (cardNums) {
    var cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.addEventListener('click', handleCardClick.bind(this));

    createCards.call(this, cardsContainer, cardNums);
    this._fillCards();

    function createCards(container, cardAmount) {
      var cardObj;
      var frontCards = document.querySelectorAll('.card__front');

      var domCard;
      var domCardFront;
      var domCardBack;

      for (var i = 0; i < cardAmount; i++) {
        cardObj = {};

        domCard = document.createElement('div');
        domCardFront = document.createElement('div');
        domCardBack = document.createElement('div');

        domCard.classList.add('card');
        domCardFront.classList.add('card__front');
        domCardBack.classList.add('card__back');

        domCard.append(domCardFront, domCardBack);
        container.append(domCard);

        cardObj.domCard = domCard;
        cardObj.domCardFront = domCardFront;

        this._cardsList.push(cardObj);
      }

      document.body.appendChild(container);
    }

    function handleCardClick(event) {
      var card = event.target.parentElement;

      if (!card.classList.contains('card')) {
        return;
      }

      if (!this._isPrevStepWin && this._flippedCards.length === 2) {
        this._flippedCards.forEach(function (item) {
          item.classList.remove('card--lose', 'card--flipped');
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
          });

          this._isPrevStepWin = true;
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

  showDialog: function (isWin) {
    this.showDialog.textContent = isWin ? 'Win' : 'Lose';
  },
};

Object.defineProperty(Game.prototype, 'constructor', {
  enumerable: false,
  value: Game
});