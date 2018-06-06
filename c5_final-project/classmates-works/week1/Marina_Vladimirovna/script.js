var card = document.querySelectorAll('.card');
var cardFront = document.querySelectorAll('.card__front');
var cardBack = document.querySelectorAll('.card__back');
var cardFrontArray = Array.prototype.slice.call(cardFront);
var cardBackArray = Array.prototype.slice.call(cardBack);

cardFrontArray.forEach(function(card, index) {
  card.addEventListener('click', function(evt) {
    evt.preventDefault();
    if(!card.classList.contains('card__front--flipped')) {
      card.classList.add('card__front--flipped');
      cardBackArray[index].classList.add('card__back--flipped');
    } 
  })
})

cardBackArray.forEach(function(card, index) {
  card.addEventListener('click', function(evt) {
    evt.preventDefault();
    if(card.classList.contains('card__back--flipped')) {
      card.classList.remove('card__back--flipped');
      cardFrontArray[index].classList.remove('card__front--flipped');
    } 
  })
})