;window.onload = function() {

	/***************************************************************************/
	function Game(params) {
		this.images = ['&#128054;','&#128049;','&#128045;','&#128057;','&#128048;','&#128059;','&#128060;','&#128040;','&#128047;','&#129409;','&#128046;','&#128055;','&#128056;','&#128025;','&#128053;','&#129412;','&#128030;','&#129408;','&#128031;','&#128010;','&#128019;','&#129411;','&#128063;'];
		this.idField = params.id;
		this.numberCardsField = params.numberCards;
		this.shuffledCards = this.shuffle(this.images, this.images.length);
		this.playingCards = this.createKitOfCards();

		this.createField();

		var playingField = document.getElementById(this.idField);
		playingField.addEventListener('click', handler, true);
		function handler(e) {
			if (e.target.tagName === 'DIV') {
				var parentElement = e.target.parentNode;
				if (!parentElement.classList.contains('opened')) {
					if (!parentElement.classList.contains('freezeErr')) {
						parentElement.classList.toggle('open');
						compareCards();
					}
				}
			}	
		}
		function compareCards() {
			var openedCards = document.querySelectorAll('.open');
			if (openedCards.length === 2) {
				if(openedCards[0].kitId === openedCards[1].kitId) {
					openedCards[0].classList.add('freeze','opened');
					openedCards[0].classList.remove('open');
					openedCards[1].classList.add('freeze','opened');
					openedCards[1].classList.remove('open');
				} else {
					openedCards[0].classList.add('freezeErr');
					openedCards[1].classList.add('freezeErr');
				}
			}
			if (openedCards.length === 3) {
				var openedCards = document.querySelectorAll('.freezeErr');
					openedCards[0].classList.remove('freezeErr','open');
					openedCards[1].classList.remove('freezeErr','open');
			}
		}

	}

	//Перетасовать колоду и получить массив необходимого количества карт
	Game.prototype.shuffle = function(elements, resultArrLength) {
		var result = [];
		while (result.length !== resultArrLength) {
			var randomNumber = Math.round(Math.random() * (resultArrLength - 1));
			if ( result.indexOf(elements[randomNumber]) === -1) {
				result.push(elements[randomNumber]);
			}
		}
		return result;
	}

	//Получить набор карт для игры из перетасованной колоды
	Game.prototype.getCardsOfField = function(images, resultArrLength) {
		var images = this.shuffledCards;
		var resultArrLength = this.numberCardsField/2;
		var result = [];
		var cards = this.shuffle(images, resultArrLength);
		while (cards.length !== 0) {
			var card = new Card(cards[cards.length - 1]);
			card.kitId = cards.length - 1;
			result.push(card);
			var card = new Card(cards.pop());
			card.kitId = cards.length;
			result.push(card);
		}
		return result;
	}

	//Создать элемент (карту) игрового поля
	Game.prototype.createCardElement = function (image) {
		var li = document.createElement('li');
		var shirt = document.createElement('div');
		shirt.classList.add('shirt');
		li.appendChild(shirt);
		var emotion = document.createElement('div');
		emotion.classList.add('emotion');
		emotion.innerHTML = image.image;
		li.appendChild(emotion);
		li.kitId = image.kitId;
		return li;
	}

	//Создать набор из парных карт для игры
	Game.prototype.createKitOfCards = function() {
		var images = this.getCardsOfField();
		var result = [];
		var elements = [];
		for (var i = 0; i < images.length; i++) {
			elements.push(this.createCardElement(images[i]));
		}
		while (result.length !== elements.length ) {
			var i = this.shuffle(elements, this.numberCardsField);
			i = i[0];
			if ((result.indexOf(i) === -1)) {
				result.push(i);
			}
		}
		return result;
	}

	//Заполнить поле картами
	Game.prototype.createField = function () {
		var field = document.getElementById(this.idField);
		var playingCardsLength = this.playingCards.length;
		this.playingCards.forEach(function(elem){
			field.appendChild(elem);
		});
	}

	/**************************************************/



	/**************************************************/
	function Card(image) {
		this.image = image;
	}
	/**************************************************/



	var game = new Game({
		id: 'field',
		numberCards: 12
	});

};