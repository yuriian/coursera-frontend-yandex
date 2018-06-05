
var cardsGrid = document.querySelector('.cards-grid'),
    backs = document.querySelectorAll('.back'),
    cardCount = 0,
    cardsArr = [];

// Массив картинок карточек
var animals = ['cat', 'dog', 'rat', 'cow', 'frog', 'bear'];

// Дублируем картинки:
animals = animals.concat(animals);
// перемешиваем:
shuffleArray(animals);
// и применяем к карточкам:
for (var i = 0 ; i < animals.length ; i++) {
    backs[i].dataset.info = animals[i];
}

// Применяем обработчик
cardsGrid.addEventListener('click', clickHandler, true);

function clickHandler (event) {
    var thisCard = event.target.parentElement;

    // Делегируем обработчик и отключаем его на уже найденных парах
    if (thisCard.classList.contains('card') && !thisCard.classList.contains('done')) {

        cardCount++;
        cardsArr.push(thisCard);
        toggleClass(thisCard);

        // Если открыты две карты + совпали картинки и это не одна и та же карта:
        if ( cardCount === 2 &&
            cardsArr[0].children[1].dataset.info === cardsArr[1].children[1].dataset.info &&
            cardsArr[0] !== cardsArr[1] ) {

            cardsArr.forEach(function (item) {
                colorChanger(item, '#5ad66f');
                item.classList.add('done');
            });

            cardCount = 0;
            cardsArr = [];

        // Если открыты две карты и это не одна и та же карта:
        } else if ( cardCount === 2 && cardsArr[0] !== cardsArr[1]) {

            cardsArr.forEach(function (item) {
                colorChanger(item, '#f44336');
                item.classList.add('done');
            });

        // Если открывается третья карта:
        } else if (cardCount === 3 ) {

            cardsArr.forEach( function(item){
                colorChanger(item, '#fff');
                item.classList.remove('done');
                toggleClass(item);
            });

            cardsArr = [thisCard];
            cardCount = 1;
            toggleClass(thisCard);

        }
    }
}


// Алгоритм Фишера-Йейса для перемешивания:
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Функция переключения класса:
function toggleClass(item) {
    item.classList.contains('chosen') ?
        item.classList.remove('chosen') :
        item.classList.add('chosen');

}

// Функция смены фона
function colorChanger(item, color) {
    item.children[1].style.cssText = ( '--bg-color: ' + color);
}