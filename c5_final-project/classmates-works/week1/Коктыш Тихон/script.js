var cards = document.querySelectorAll('.card');

 for (var i = 0 ; i < cards.length ; i++) {
     cards[i].addEventListener('click', function () {
        this.classList.contains('chosen') ?
            this.classList.remove('chosen') :
            this.classList.add('chosen');
     });
 }