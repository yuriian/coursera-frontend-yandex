function handleClick(event) {
  var parentClassesList = event.target.parentElement.classList;
  if (parentClassesList.contains('card')) {
    event.target.parentElement.classList.toggle('card--rotated');
  }
}

document.getElementById('cardContainer').addEventListener('click', handleClick);