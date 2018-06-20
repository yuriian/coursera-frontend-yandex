;(function(){

window.onload = function() {

	/***************************************************************************/
	function Game(params) {
		this.images = ['&#128054;','&#128049;','&#128045;','&#128057;','&#128048;','&#128059;','&#128060;','&#128040;','&#128047;','&#129409;','&#128046;','&#128055;','&#128056;','&#128025;','&#128053;','&#129412;','&#128030;','&#129408;','&#128031;','&#128010;','&#128019;','&#129411;','&#128063;'];
		this.idField = params.id;
		this.field = document.getElementById(this.idField);
		this.numberCardsField = this.getNumberCards(params.numberCards);
		this.shuffledCards = this.shuffle(this.images, this.images.length);
		this.playingCards = this.createKitOfCards();
		this.gameStart = false;
		this.interval;

		this.createField().createTimer();

		this.field.addEventListener('click', this.handler(this), true);
	}

	//Обработать клик по карте
	Game.prototype.handler = function(arg) {
		var $this = arg;
		return function(e) {
			if (e.target.tagName === 'DIV') {
				var parentElement = e.target.parentNode;
				if (parentElement.classList.contains('opened')) return;
				if (parentElement.classList.contains('freezeErr')) return;
				parentElement.classList.toggle('open');

				$this.compareCards();
				$this.start();			
			}
		}
	}

	//Перетасовать колоду и получить массив необходимого количества карт
	Game.prototype.shuffle = function(elements, resultArrLength) {
		var result = [];
		while (result.length !== resultArrLength) {
			var randomNumber = Math.floor(Math.random() * resultArrLength);
			if ( result.indexOf(elements[randomNumber]) === -1) {
				result.push(elements[randomNumber]);
			}
		}
		return result;
	}

	//Создать элемент h2 каждый символ которого обернут в span
	Game.prototype.createH2 = function(word, CssClass) {
		var h2 = document.createElement('h2');
		for (var i = 0; i < word.length; i++) {
			var span = document.createElement('span');
			span.classList.add(CssClass);
			var text = document.createTextNode(word[i]);
			span.appendChild(text);
			h2.appendChild(span);
		}
		return h2;
	}

	//Получить количество карт для игры
	Game.prototype.getNumberCards = function(num) {
		if (isNaN(num) || (num < 4) || (num > this.images.length)) {
			throw new Error('Количество карт должно быть от 4 до ' + this.images.length);
		}
		if (num % 2 !== 0) num -= 1;
		return num;
	}

	//Сравнить открытые карты
	Game.prototype.compareCards = function() {
		var openedCards = document.querySelectorAll('.open');
		if (openedCards.length === 2) {
			if(openedCards[0].kitId === openedCards[1].kitId) {
				openedCards[0].classList.add('freeze','opened');
				openedCards[0].classList.remove('open');
				openedCards[1].classList.add('freeze','opened');
				openedCards[1].classList.remove('open');

				this.checkWin();

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

		return this;
	}

	Game.prototype.checkWin = function() {
		var freezeCards = document.querySelectorAll('.freeze');
		if (this.numberCardsField === freezeCards.length) {
			clearInterval(this.interval);
			this.createWindowWin();
		}
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
	Game.prototype.createCardElement = function(image) {
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
	Game.prototype.createField = function() {
		this.playingCards.forEach(function(elem){
			this.field.appendChild(elem);
		});
		return this;
	}

	//Создать счетчик и добавить его в DOM и анимировать
	Game.prototype.createTimer = function() {
		var playingFieldParent = this.field.parentNode;
		var timer = document.createElement('div');
		timer.classList.add('timer');
		timer.id = 'timer';
		var time = document.createTextNode('01:00');
		timer.appendChild(time);
		playingFieldParent.insertBefore(timer, this.field.nextSibling);

		return this;
	}

	//Создать окно выигрыша, добавить его в DOM и анимировать
	Game.prototype.createWindowWin = function() {
		var windowWinWrap = document.createElement('div');
		windowWinWrap.classList.add('windowWinWrap');
		windowWinWrap.id = 'windowWinWrap';

		var windowWin = document.createElement('div');
		windowWin.classList.add('windowWin');

		var btnWin = document.createElement('a');
		btnWin.setAttribute('href', 'javascript:void(0);');
		btnWin.id = 'btnWin';

		var h2Win = this.createH2('Win', 'win');

		var textA = document.createTextNode('Play again');
		btnWin.appendChild(textA);

		windowWin.appendChild(h2Win);
		windowWin.appendChild(btnWin);
		windowWinWrap.appendChild(windowWin);

		document.body.insertBefore(windowWinWrap, document.body.firstChild);

		var win = document.getElementById('btnWin');


		win.addEventListener('click', this.restartGame(this));

		return this;
	}

	//Создать окно проигрыша и добавить его в DOM
	Game.prototype.createWindowLose = function() {
		var windowLoseWrap = document.createElement('div');
		windowLoseWrap.classList.add('windowLoseWrap');
		windowLoseWrap.id = 'windowLoseWrap';

		var windowLose = document.createElement('div');
		windowLose.classList.add('windowLose');

		var btnLose = document.createElement('a');
		btnLose.setAttribute('href', 'javascript:void(0);');
		btnLose.id = 'btnLose';

		var h2Lose = this.createH2('Lose', 'lose');

		var textA = document.createTextNode('Try again');
		btnLose.appendChild(textA);

		windowLose.appendChild(h2Lose);
		windowLose.appendChild(btnLose);
		windowLoseWrap.appendChild(windowLose);

		document.body.insertBefore(windowLoseWrap, document.body.firstChild);

		var lose = document.getElementById('btnLose');
		lose.addEventListener('click', this.restartGame(this));

		return this;
	}

	//Запустить таймер при первом клике на курту
	Game.prototype.start = function() {
		var $this = this;

		if (this.gameStart) return;
			
		this.gameStart = true;
		this.interval = setInterval(timer, 1000);

		function timer() {
			var timer = document.getElementById('timer');
			var text = timer.innerHTML;
			var time = text.split(':');
			
			if (time[0] === '01') {
				time[0] = '00';
				time[1] = '59';
				timer.innerHTML = time[0] + ':' + time[1];
			} else if (parseInt(time[1]) > 0) {
				time[1] = parseInt(time[1]) - 1;
				if (time[1] < 10) time[1] = '0' + time[1];
				timer.innerHTML = time[0] + ':' + time[1];
				if(time[1] === '00') {

					clearInterval($this.interval);
					$this.createWindowLose();
				}
			}
		}

		return this;
	}

	//Перезапустить игру при проигрыше или выигрыше
	Game.prototype.restartGame = function($this) {
		return function(e) {
			clearInterval(this.interval);
			var win = document.getElementById('windowWinWrap');
			if (win) win.parentNode.removeChild(win);			
			var lose = document.getElementById('windowLoseWrap');
			if (lose) lose.parentNode.removeChild(lose);
			var timer = document.getElementById('timer');
			if (timer) timer.parentNode.removeChild(timer);
			$this.field.parentNode.removeChild(field);

			var newField = document.createElement('ul');
			newField.id = $this.idField;

			var section = document.querySelector('section');
			section.appendChild(newField);

			var nextGame = new Game({
				id: $this.idField,
				numberCards: $this.numberCardsField
			});

			return this;
		}
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

}

})();