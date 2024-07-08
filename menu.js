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
const botaoProsseguir = document.getElementById('botaoProsseguir')
const botaoJogar = document.getElementById('botaoJogar')
const lore =  document.querySelector('.menu-container')
const areaHighscore = document.querySelector('#areaHigh')

areaHighscore.style.display = "none";
lore.style.display = "none";
botaoJogar.style.display = "none";

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

botaoProsseguir.addEventListener('click', () => {
  if (lore.style.display === "none") {
    lore.style.display = "block";
    botaoProsseguir.style.display = "none"
  } else {
    lore.style.display = "none";
  }
  typeLetter(); // Inicia a função de digitação
});

const text = "Você é um(a) piloto(a) intrépido(a) e aventureiro(a), contratado(a) pela Liga Acadêmica de Desenvolvimento Web para uma missão crucial: atravessar a Fronteira Alienigena e chegar até CCET-Park. Seu objetivo é recuperar um item poderoso, que supostamente contém segredos tecnológicos avançados capazes de revolucionar a guerra interestelar. Você encara esse desafio!?";
const typingSpeed = 20; // Velocidade de digitação em milissegundos
let contador = 0; // Índice da letra atual

function typeLetter() {
    if (contador < text.length) {
        document.getElementById('typed-text').innerHTML += text.charAt(contador);
        contador++;
        setTimeout(typeLetter, typingSpeed);
    }
    if(contador == text.length){
      botaoJogar.style.display = "block";
    }
}







