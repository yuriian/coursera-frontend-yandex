
let cardsGrid = document.querySelector('.cards-grid'),
    cards = document.querySelectorAll('.card'),
    backs = document.querySelectorAll('.back'),
    timerSector = document.querySelector('#timer');

function startGame() {

    let cardCount = 0,
        pairs = 0,
        timerTrigger = 0,
        cardsArr = [];

    // Массив картинок карточек
    let animals = ['cat', 'dog', 'rat', 'cow', 'frog', 'bear'];

    // Дублируем картинки:
    animals = animals.concat(animals);
    // перемешиваем:
    shuffleArray(animals);
    // и применяем к карточкам:
    backs.forEach( function (item, i) {
        item.dataset.info = animals[i];
    });

    // Применяем обработчик
    cardsGrid.addEventListener('click', clickHandler, true);

    function clickHandler(event) {
        let thisCard = event.target.parentElement;

        // Делегируем обработчик и отключаем его на уже найденных парах
        if (thisCard.classList.contains('card') && !thisCard.classList.contains('marked')) {

            cardCount++;
            cardsArr.push(thisCard);
            toggleClass(thisCard);

            // Старт таймера
            if (!timerTrigger) {
                startTimer(59, timerSector);
            }

            // Если открыты две карты + совпали картинки и это не одна и та же карта:
            if (cardCount === 2 &&
                cardsArr[0].children[1].dataset.info === cardsArr[1].children[1].dataset.info &&
                cardsArr[0] !== cardsArr[1]) {

                cardsArr.forEach(function (item) {
                    colorChanger(item, '#5ad66f');
                    item.classList.add('marked');
                });

                cardCount = 0;
                cardsArr = [];
                pairs++;

                // Проверяем количество открытых пар:
                if (pairs === (animals.length / 2)) {
                    clearInterval(timerTrigger);
                    cardsGrid.removeEventListener('click', clickHandler, true);
                    togglePopup('Win');
                }

            // Если открыты две карты и это не одна и та же карта:
            } else if (cardCount === 2 && cardsArr[0] !== cardsArr[1]) {

                cardsArr.forEach(function (item) {
                    colorChanger(item, '#f44336');
                    item.classList.add('marked');
                });

            // Если открывается третья карта:
            } else if (cardCount === 3) {

                cardsArr.forEach(function (item) {
                    colorChanger(item, '#fff');
                    item.classList.remove('marked');
                    toggleClass(item);
                });

                cardsArr = [thisCard];
                cardCount = 1;
                toggleClass(thisCard);

            }
        }
    }

    // Функция работы таймера
    function startTimer(duration, display) {
        let timer = duration, min, sec,
            timerId = setInterval(function () {

                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);

                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;

                display.textContent = min + ":" + sec;

                if (--timer < 0) {
                    clearInterval(timerId);
                    cardsGrid.removeEventListener('click', clickHandler, true);
                    togglePopup('Lose');
                }
            }, 1000);
        timerTrigger = timerId;
    }
}


/**
 * --- Вспомогательные функции ---
 **/

// Алгоритм Фишера-Йейса для перемешивания:
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Смена фона
function colorChanger(item, color) {
    item.children[1].style.cssText = ( '--bg-color: ' + color);
}

// Переключатель класса:
function toggleClass(item) {
    item.classList.contains('chosen') ?
        item.classList.remove('chosen') :
        item.classList.add('chosen');
}

// Приведение поля к дефолтному состоянию
function setDefault() {
    cards.forEach( function (item) {
        item.classList.remove('chosen');
        item.classList.remove('marked');
    });
    backs.forEach( function (item) {
        item.style.cssText = ( '--bg-color: #fff');
    });
    timerSector.textContent = '01:00';
    // Задержка на время переворота карточек
    setTimeout( function () {
        startGame()
    }, 600);
}

// Переключатель всплывающего окна:
function togglePopup (arg) {

    let waveTxt = document.querySelector('.wave'),
        popButton = document.querySelector('.start-again'),
        popup = document.querySelector('.popup').style;

    if (arg === 'Win') {
        waveTxt.innerHTML = spanDecorator(arg);
        popButton.innerHTML = 'Play again';
        popup.visibility = 'visible';
    } else if (arg === 'Lose') {
        waveTxt.innerHTML = spanDecorator(arg);
        popButton.innerHTML = 'Try again';
        popup.visibility = 'visible';
    } else {
        popup.visibility = 'hidden';
        setDefault();
    }
}

// Декоратор
function spanDecorator (arg) {
    return arg.split('').map( function(item) {
        return '<span>' + item + '</span>';
    }).join('');
}

window.onload = startGame();