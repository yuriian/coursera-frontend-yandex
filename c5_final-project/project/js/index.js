(function () {
  var game = {
    openCards: [],
    isPrevStepWin: false,
  };

  fillCards();

  function fillCards() {
    var emojiList = ['🐸', '🐼', '🐵', '🐨', '🐞', '🐷', ];
    // var emojiList = ['1', '2', '3', '4', '5', '6', ];
    var randomEmoji;
    var randomPosition;
    var cards = createCardObjs();
    var cardsIndexes = createCardsIndexes(cards.length);
    var cardsIndexPos;

    emojiList.forEach(function (emoji, index) {
      // randomEmoji = getRandomInt(0, emojiList.length);

      for (var i = 0; i < 2; i++) {
        cardsIndexPos = getRandomInt(0, cardsIndexes.length);
        randomPosition = cardsIndexes[cardsIndexPos];
        cardsIndexes.splice(cardsIndexes.indexOf(randomPosition), 1);

        cards[randomPosition].front.textContent = emojiList[index];
        cards[randomPosition].front.parentElement.dataset.emojiId = index;
      }
    });

    function createCardObjs() {
      var cards = [];
      var cardObj;
      var frontCards = document.querySelectorAll('.card__front');

      frontCards.forEach(function (item, index) {
        card = {};
        card.front = item;
        card.isFilled = false;
        cards.push(card);
      });

      return cards;
    }

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
  }

  function handleCardClick(event) {
    var card = event.target.parentElement;

    if (!card.classList.contains('card')) {
      return;
    }

    if (!game.isPrevStepWin && game.openCards.length === 2) {
      game.openCards.forEach(function (item) {
        item.classList.remove('card--lose', 'card--rotated');
      });
    }

    if (game.openCards.length === 2) {
      game.openCards = [];
    }

    card.classList.toggle('card--rotated');

    if (game.openCards.length === 0) {
      game.openCards.push(card);
    } else {
      game.openCards.push(card);

      compareCards(game.openCards[0], game.openCards[1]);
    }
  }

  function compareCards(firstCard, secondCard) {
    if (firstCard.dataset.emojiId === secondCard.dataset.emojiId) {
      game.openCards.forEach(function (item) {
        item.classList.add('card--win');
      });

      game.isPrevStepWin = true;
    } else {
      game.openCards.forEach(function (item) {
        item.classList.add('card--lose');
      });

      game.isPrevStepWin = false;
    }
  }

  document.getElementById('cardContainer').addEventListener('click', handleCardClick);
})();