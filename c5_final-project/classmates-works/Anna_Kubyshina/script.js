'use strict';

function flip() {
	var cards = document.querySelectorAll(".flip");

	for (var i = 0; i < cards.length; i++ ) 
	{
		var card = cards[i];
		isClicked(card);
	}

	function isClicked(card) {
		card.addEventListener("click", function() {
			var c = this.classList;
			c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
		});
	}
};