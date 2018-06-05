'use strict';

function flip() {
	var cards = document.querySelectorAll(".flip");

	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];
		isClicked(card);
	}
};

function isClicked(card) {
	card.addEventListener("click", function () {
		if (this.classList.contains("right")) return;
		if (this.classList.contains("wrong")) return;
		flipWrong();
		var c = this.classList;
		c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
		isRightPair();
	});
}

function isRightPair() {
	var openedCards = document.querySelectorAll(".flipped");
	if (openedCards.length < 2) return;
	if (openedCards[0].innerHTML === openedCards[1].innerHTML)
		var newClass = "right";
	else newClass = "wrong";

	for (var i = 0; i < openedCards.length; i++) {
		var c = openedCards[i].classList;
		c.remove("flipped");
		c.add(newClass);
	}
}

function flipWrong() {
	var wrongCards = document.querySelectorAll(".wrong");
	for (var i = 0; i < wrongCards.length; i++) {
		var c = wrongCards[i].classList;
		c.remove("wrong");
	}
}

function start() {
	document.addEventListener("DOMContentLoaded", function () {
		var picsArray = ["🐼", "🐼", "🐙", "🐙", "🦄", "🦄", "🐸", "🐸", "🐟", "🐟", "🐷", "🐷"];
		shuffle(picsArray);

		var cardsArray = document.querySelectorAll(".front");

		for (var i = 0; i < cardsArray.length; i++)
			cardsArray[i].innerHTML = picsArray[i];
	});

}

function shuffle(array) {
	var j, x, i;
	for (i = array.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = array[i];
		array[i] = array[j];
		array[j] = x;
	}
	return array;
}