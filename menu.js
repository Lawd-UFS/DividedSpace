document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('nomeUsuario');
    const saveButton = document.getElementById('botaoInicial');
    const loadButton = document.getElementById('loadButton');
    const output = document.getElementById('output');

    // Save the input value to local storage
    saveButton.addEventListener('click', () => {
        const inputValue = inputField.value;
        localStorage.setItem('botaoInicial', inputValue);
        inputField.value = '';
        alert('Viajante Registrado!');
    });

});

//highscoreMenu

const leadboardButton = document.getElementById('leadboard')
const areaHighscore = document.querySelector('#areaHigh')

areaHighscore.style.display = "none";

var highscores = [];

for(let i = 0; i < 10; i++) {
  var element = document.createElement('p')
  highscoreMenu.appendChild(element)
}

function updateHighscore() {
  let hN = Math.min(10, highscores.length)
  for(let i = 0; i < hN; i++) {
    highscoreMenu.children[i].innerHTML = `${(i+1)}. ${highscores[i]}`
  }
}


leadboardButton.addEventListener('click', () => {
  if(localStorage.savedHighscores){
    highscores = JSON.parse(localStorage.getItem('savedHighscores'));
  }
  if (areaHighscore.style.display === "none") {
    areaHighscore.style.display = "block";
  } else {
    areaHighscore.style.display = "none";
  }

  updateHighscore() 
});








