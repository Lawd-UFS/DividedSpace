


// CONFIGURAÇÃO DE JOGADOR 



// Funcionalidade do botão 'CONFIRMAR':
document.addEventListener('DOMContentLoaded', (event) => {
  // Resgate dos Id's determinados nos elementos do html.
  const inputField = document.getElementById('nomeUsuario');
  const saveButton = document.getElementById('botaoInicial');
  const loadButton = document.getElementById('loadButton');
  const output = document.getElementById('output');
  // Salva o 'nome do viajante' em localStorage.
  saveButton.addEventListener('click', () => {
      const inputValue = inputField.value;
      localStorage.setItem('botaoInicial', inputValue);
      inputField.value = '';
      alert('Viajante Registrado!');
  });

});

// Armazena o botão 'INICIAR', 'JOGAR' e elemento que contêm a história do game (LORE) em constantes, respectivamente.
const botaoProsseguir = document.getElementById('botaoProsseguir');
const botaoJogar = document.getElementById('botaoJogar');
const lore =  document.querySelector('.menu-container')

// Configra o style para que a LORE e o botão 'JOGAR' não sejam visíveis.
lore.style.display = "none";
botaoJogar.style.display = "none";

//Funcionalidade do botão 'INICIAR': 
botaoProsseguir.addEventListener('click', () => {
// Altera o style de LORE, tornando visíveis.
if (lore.style.display === "none") {
  lore.style.display = "block";
  botaoProsseguir.style.display = "none"
} else {
  lore.style.display = "none";
}
typeLetter(); 
});

// Digitação da LORE.
let contador = 0; // Índice da letra atual
const text = "Você é um(a) piloto(a) intrépido(a) e aventureiro(a), contratado(a) pela Liga Acadêmica de Desenvolvimento Web para uma missão crucial: atravessar a Fronteira Alienígena e chegar ao CCET-Park. Seu objetivo é recuperar um item poderoso, que supostamente contém segredos tecnológicos avançados capazes de revolucionar a guerra interestelar. Você encara esse desafio!?"; //LORE
const typingSpeed = 20; // Velocidade de digitação em milissegundos
function typeLetter() {
// Condicional verdadeira até que o indíce da letra seja igual ao tamanho do texto.
if (contador < text.length) {
    document.getElementById('typed-text').innerHTML += text.charAt(contador);
    contador++;
    setTimeout(typeLetter, typingSpeed);
}
// Quando for igual, altera o style do botão 'JOGAR', tornando-o visível.
if(contador == text.length){
  botaoJogar.style.display = "block";
}
}



// PONTUAÇÕES DOS JOGADORES



// Armazena botão 'RANKING DE VIAJANTES', o elemento que contêm o ranking e configura o style para não ser visível, respectivamente.
const leadboardButton = document.getElementById('leadboard')
const areaHighscore = document.querySelector('#areaHigh')
areaHighscore.style.display = "none";

var highscores = []; // Array que vai armazenar as pontuações dos jogadores.

//Cria 10 elementos (<p> </p>) na página.
for(let i = 0; i < 10; i++) {
var element = document.createElement('p')
highscoreMenu.appendChild(element)
}

//Armazena o conteúdo de localStorage nos elementos (<p> </p>) criados.
function updateHighscore() {
let hN = Math.min(10, highscores.length) //carrega APENAS ATÉ 10 colocações no ranking, ignorando as demais.
for(let i = 0; i < hN; i++) {
  highscoreMenu.children[i].innerHTML = `${(i+1)}. ${highscores[i]}`
}
}

// Funcionalidade do botão 'RANKING DE VIAJANTES'
leadboardButton.addEventListener('click', () => {
//verifica se tem alguma pontuação armazenada em local storage e salva em 'highscores'.
if(localStorage.savedHighscores){
  highscores = JSON.parse(localStorage.getItem('savedHighscores'));
}
// Altera o style do elemento que contêm o ranking dos jogadores, deixando a informação visível ou não.
if (areaHighscore.style.display === "none") {
  areaHighscore.style.display = "block";
} else {
  areaHighscore.style.display = "none";
}

updateHighscore() 
});