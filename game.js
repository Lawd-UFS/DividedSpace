const ASSETS = {
  
    COLOR: {
      TAR: ['linear-gradient(to bottom, #43045E, #2C083B 30%, #2C083B 50%,  #43045E 100%)', 'linear-gradient(to bottom, #43045E, #2C083B 30%, #2C083B 50%,  #43045E 100%)'],
      RUMBLE: {src : 'https://i.pinimg.com/564x/53/19/ac/5319ac7f8b14412956f0b15c32534348.jpg'} 
    },
    
    IMAGE: {
      ALIEN: {
        src: 'assets/bicho-zoiudo.gif',
        width: 132,
        height: 192
      },
      ALIEN2: {
        src: 'assets/verdinho.gif',
        width: 132,
        height: 192
      },
      ALIEN3: {
        src: 'assets/roxinho.gif',
        width: 132,
        height: 192
      },
      METEOR: {
        src: 'assets/meteor.png',
        width: 132,
        height: 192
      },
      HERO: {
        src: 'assets/nave-teste.png',
        width: 110,
        height: 56
      },
      CAR: {
        src: 'assets/espaconave.png',
        width: 50,
        height: 36
      },
      FINISH: {
        src: 'assets/PortalCCET.png',
        width: 339,
        height: 180,
        offset: -.5
      },
      SKY: {
        src: 'assets/space-pixelator-LAWD3.png',
      }
    },
      
    AUDIO: {
      theme: 'assets/Dark Ocean - Menu Theme of Divided Space.mp3',
      game: 'assets/Meteor Rush - Main Theme of Divided Space.mp3',
      engine: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/engine.wav',
      beep: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/155629/beep.wav'
    }
    
  }
  
  Number.prototype.pad = function(numZeros, char = 0) {
      let n = Math.abs(this)
      let zeros = Math.max(0, numZeros - Math.floor(n).toString().length )
      let zeroString = Math.pow(10, zeros).toString().substr(1).replace(0, char)
      return zeroString + n
  }
  
  Number.prototype.clamp = function(min, max) {
    return Math.max(min, Math.min(this, max))
  }
  
  const timestamp = _ => new Date().getTime()
  const accelerate = (v, accel, dt) => v + (accel * dt)
  const COLLISION_SCALE_FACTOR = 0.5; // Ajuste este valor para o que você achar adequado

  const isCollide = (x1, w1, x2, w2) => (x1 - x2) ** 2 <= ((w2 * COLLISION_SCALE_FACTOR) + (w1 * COLLISION_SCALE_FACTOR)) ** 2

  


  //Função para pegar um valor aleatório a partir de parâmetros passados    
  function getRand(min, max) {
      return Math.random() * (max - min) + min | 0;
  }

  //
  function randomProperty(obj) {
      let keys = Object.keys(obj)
      return obj[keys[ keys.length * Math.random() << 0]]
  }
  
  //
  function drawQuad(element, layer, color, x1, y1, w1, x2, y2, w2) {
    element.style.zIndex = layer
    element.style.background = color
    element.style.top = y2 + `px`
    element.style.left = x1 - w1 / 2 - w1 + `px`
    element.style.width = w1 * 3 + `px`
    element.style.height = y1 - y2 + `px`
  
    let leftOffset = w1 + x2 - x1 + Math.abs(w2/2 - w1/2)
    element.style.clipPath = `polygon(${leftOffset}px 0, ${leftOffset + w2}px 0, 66.66% 100%, 33.33% 100%)`
  }
  
  function drawTriangle(p1, p2, p3, color) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

  const KEYS = {}
  const keyUpdate = e => {
    KEYS[e.code] = e.type === `keydown`
  }
  addEventListener(`keydown`, keyUpdate)
  addEventListener(`keyup`, keyUpdate)
  
  function sleep(ms) {
      return new Promise(function(resolve, reject) {
          setTimeout(_ => resolve(), ms)
      })
  }
  
  class Line {
  
    constructor() {
      this.x = 0
      this.y = 0
      this.z = 0
  
      this.X = 0
      this.Y = 0
      this.W = 0
  
      this.curve = 0
      this.scale = 0
  
      this.elements = []
      this.special = null
  
    }
  
    project(camX, camY, camZ) {
      this.scale = camD / (this.z - camZ)
      this.X = (1 + this.scale * (this.x - camX)) * halfWidth
      this.Y = Math.ceil( (1 - this.scale * (this.y - camY)) * height / 2 )
      this.W = this.scale * roadW * halfWidth
    }
  
    clearSprites() {
      for(let e of this.elements) e.style.background = 'transparent'
    }

    drawSprite(depth, layer, sprite, offset) {
  
      let destX = this.X + this.scale * halfWidth * offset
      let destY = this.Y + 4
      let destW = sprite.width * this.W / 265
      let destH = sprite.height * this.W / 265
  
      destX += destW * offset
      destY += destH * -1
  
      let obj = (layer instanceof Element) ? layer : this.elements[layer + 6]
      obj.style.background = `url('${sprite.src}') no-repeat`
      obj.style.backgroundSize = `${destW}px ${destH}px`
      obj.style.left = destX + `px`
      obj.style.top = destY + `px`
      obj.style.width = destW + `px`
      obj.style.height = destH + `px`
      obj.style.zIndex = depth
  
    }
  
    drawSpriteFloat(depth, layer, sprite, offset) {
  
      let destX = this.X + this.scale * halfWidth * offset
      let destY = this.Y + 4
      let destW = sprite.width * this.W / 265
      let destH = sprite.height * this.W / 265
  
      destX += destW * offset
      destY += destH * -1
  
      let obj = (layer instanceof Element) ? layer : this.elements[layer + 6]
      obj.style.background = `url('${sprite.src}') no-repeat`
      obj.style.backgroundSize = `${destW}px ${destH}px`
      obj.style.left = destX + `px`
      obj.style.top = destY + `px`
      obj.style.width = destW + `px`
      obj.style.height = destH + `px`
      obj.style.zIndex = depth
      obj.classList.add('float');
  
    }
  
  }
  
  class Car {
  
    constructor(pos, type, lane) {
  
      this.pos = pos
      this.type = type
      this.lane = lane
  
      var element = document.createElement('div')
      road.appendChild(element)
      this.element = element
  
    }
  
  }
  
  //Classe para definir as músicas que tocam entre o menu e o início de partida
  class Audio {

    constructor() {
      
      this.audioCtx = new AudioContext();
      this.destination = this.audioCtx.createGain();
      this.volume = 1;
      this.destination.connect(this.audioCtx.destination);
      this.files = {};
      this.themeSource = null; // Armazenar a referência ao source do tema

      
      let _self = this;
      document.body.addEventListener('click', function() {
        // Verificar se a música do tema já está tocando
        if (!_self.themeSource && !isGameMusicPlaying) {
            // Carregar e reproduzir a música do tema
            _self.load(ASSETS.AUDIO.theme, 'theme', function(key) {
                let source = _self.audioCtx.createBufferSource();
                source.buffer = _self.files[key];
                _self.themeSource = source; // Armazenar a referência ao source do tema para parar posteriormente
                
                let gainNode = _self.audioCtx.createGain();
                gainNode.gain.value = 0.6;
                source.connect(gainNode);
                gainNode.connect(_self.destination);
                
                source.loop = true;
                source.start(0);
            });
        }
    });
//teste
      let isGameMusicPlaying = false;

      document.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              // Verificar se a música do jogo já está tocando
              if (!isGameMusicPlaying) {
                  // Parar a música do tema se estiver tocando
                  if (_self.themeSource) {
                      _self.themeSource.stop();
                  }
                  
                  this.load(ASSETS.AUDIO.game, 'game', function(key) {
                    let source = _self.audioCtx.createBufferSource();
                    source.buffer = _self.files[key];
                    _self.themeSource = source; // Armazenar a referência ao source do tema para parar posteriormente
                    
                    let gainNode = _self.audioCtx.createGain();
                    gainNode.gain.value = 0.6;
                    source.connect(gainNode);
                    gainNode.connect(_self.destination);
                    

                    source.loop = true
                    source.start(0);
               
                });
      
                  // Atualizar o estado da música do jogo para indicar que está tocando
                  isGameMusicPlaying = true;
              }
          }
      });

  }

  
    get volume() {
      return this.destination.gain.value
    }
  
    set volume(level) {
      this.destination.gain.value = level
    }
  
  
  
  
      play(key, pitch) {
          if (this.files[key]) {
              let source = this.audioCtx.createBufferSource()
              source.buffer = this.files[key]
              source.connect(this.destination)
        if(pitch) source.detune.value = pitch
              source.start(0)
          } else this.load(key, () => this.play(key))
      }
   
      load(src, key, callback) {
          let _self = this
          let request = new XMLHttpRequest()
          request.open('GET', src, true)
          request.responseType = 'arraybuffer'
          request.onload = function() {
              _self.audioCtx.decodeAudioData(request.response, function(beatportBuffer) {
                  _self.files[key] = beatportBuffer
                  callback(key)
              }, function() {})
          }
          request.send()
      }
  }
  

  var highscores = []
  
  const width = 1100
  const halfWidth = width / 2
  const height = 650
  const roadW = 4000
  const segL = 200
  const camD = 0.2
  const H = 1500
  const N = 70
  
  const maxSpeed = 200
  const accel = 38
  const breaking = -80
  const decel = -40
  const maxOffSpeed = 40
  const offDecel = -70
  const enemy_speed = 8
  const hitSpeed = 20
  
  const LANE = {
    A: -2.3,
    B: -.5,
    C: 1.2
  }
  
  const mapLength = 15000
  let then = timestamp()
  const targetFrameRate = 1000 / 25 
  
  let audio
  
  let inGame, start, playerX, speed, scoreVal, pos, cloudOffset, sectionProg, mapIndex, countDown
  let lines = []
  let cars = []
  
  function getFun(val) {
    return i => val
  }
  
  //Função para gerar o mapa do jogo, tomando valores aleatórios para definir as curvas e ondas no mapa
  function genMap() {
  
    let map = []
  
    for(var i = 0; i < mapLength; i += getRand(0, 50)) {
  
      let section = {
        from: i,
        to: (i = i + getRand(300, 600))
      }
  
      let randHeight = getRand(-5, 5)
      let randCurve = getRand(5, 30) * ((Math.random() >= .5) ? 1 : -1)
      let randInterval = getRand(20, 40)
  
      if(Math.random() > .9) Object.assign(section, {curve: _ => randCurve, height: _ => randHeight})
      else if(Math.random() > .8) Object.assign(section, {curve: _ => 0, height: i =>
 Math.sin(i/randInterval)*1000})
      else if(Math.random() > .8) Object.assign(section, {curve: _ => 0, height: _ => randHeight})
      else Object.assign(section, {curve: _ => randCurve, height: _ => 0})
  
      map.push(section)
    }

    map.push({from: i, to: i + N, curve: _ => 0, height: _ => 0, special: ASSETS.IMAGE.FINISH})
    map.push({from: Infinity})
    return map
  
  }
  
  let map = genMap()
  
  //Interpreta os comandos do teclado para definir as ações no jogo
  addEventListener(`keyup`, function(e){
  
    if(e.code === 'ShiftLeft') {
      e.preventDefault()
  
      audio.volume = (audio.volume === 0) ? 1 : 0
      return
    }
  
    if(e.code === 'Enter') {
      e.preventDefault()
  
      if(inGame) return
  
      sleep(0).then(_ => {
        text.classList.remove('blink')
        text.innerText = 3
        audio.play('beep')
        return sleep(1000)
      }).then(_ => {
        text.innerText = 2
        audio.play('beep')
        return sleep(1000)
      }).then(_ => {
  
        reset()
  
        home.style.display = 'none'
  
        road.style.opacity = 1
        hero.style.display = 'block'
        hud.style.display = 'block'
  
        audio.play('beep', 500)
  
        inGame = true
  
      })
  
      return
    }
  
    if(e.code === 'Escape') {
      e.preventDefault()
      
      solvingBug()
    }
  
  
  })

  //Responsável por atualizar o estado do jogo em cada "passo" do ciclo de renderização,
  //controlando o movimento do jogador, as interações com o ambiente e as colisões. 
  function update(step) {
    
    //A posição do jogador é incrementada pela velocidade (speed),
    //ou seja, o jogador se move ao longo da estrada.
    pos += speed

    //Essas linhas garantem que a posição (pos) seja cíclica,
    //ou seja, ela vai "voltar" ao início após ultrapassar o fim da estrada.
    while (pos >= N * segL) pos -= N * segL
    while (pos < 0) pos += N * segL
    
    //São calculadas as posições de início e fim de um segmento da estrada,
    //com base na posição atual (pos).
    var startPos = (pos / segL)  | 0
    let endPos = (startPos + N - 1) % N

    //A pontuação do jogador aumenta com base na velocidade e no tempo (step).
    scoreVal += speed*step
    //O tempo restante (contagem regressiva) diminui com o tempo (step).
    countDown -= step

    
    // Controla a posição do jogador na tela (deslocamento horizontal)
    playerX -= lines[startPos].curve / 5000 * step * speed
    
    // Controla a animação de movimento do personagem com as teclas de seta
    if(KEYS.ArrowRight) hero.style.backgroundPosition = '-220px 0', playerX+=.007*step*speed
    else if(KEYS.ArrowLeft) hero.style.backgroundPosition = '0 0', playerX-=.007*step*speed
    else hero.style.backgroundPosition = '-110px 0'
  
    playerX = playerX.clamp(-3, 3)
  
    if(inGame && KEYS.ArrowUp) speed = accelerate(speed, accel, step)
    else if(KEYS.ArrowDown) speed = accelerate(speed, breaking, step)
    else speed = accelerate(speed, decel, step)
    
    // Se o jogador sair da estrada, desacelera mais rápido
    if(Math.abs(playerX) > 0.55 && speed >= maxOffSpeed) {
      speed = accelerate(speed, offDecel, step)
    }
  
    speed = speed.clamp(0, maxSpeed)
    
    // Verifica a seção do mapa atual e atualiza a curva e a altura da estrada
    let current = map[mapIndex]
    let use = current.from < scoreVal && current.to > scoreVal
    if(use) sectionProg += speed*step
    lines[endPos].curve = use ? current.curve(sectionProg) : 0
    lines[endPos].y = use ? current.height(sectionProg) : 0
    lines[endPos].special = null
    
    // Quando a seção do mapa é concluída, passa para a próxima
    if(current.to <= scoreVal) {
      mapIndex++
      sectionProg = 0
  
      lines[endPos].special = map[mapIndex].special
  
    }
    if(!inGame) {
  
      speed = accelerate(speed, breaking, step)
      speed = speed.clamp(0, maxSpeed)
  
    } else if(countDown <= 0 || lines[startPos].special) {
  
      tacho.style.display = 'none'
  
      home.style.display = 'block'
      road.style.opacity = .4
      text.innerText = 'Aperte Enter para jogar'
      
      // Armazena o lap (tempo da corrida) no localStorage
      const savedInput = localStorage.getItem('botaoInicial');
      const volta = lap.innerText;
      const savedLap = localStorage.setItem('lap', volta);

      const resultado = localStorage.getItem('lap');

      // Atualiza os recordes de pontuação
      if(localStorage.savedHighscores){
        highscores = JSON.parse(localStorage.getItem('savedHighscores'));
      }
      highscores.push(resultado +`: ${savedInput}` )  
      highscores.sort()

      // Salva os recordes no localStorage
      localStorage.savedHighscores = JSON.stringify(highscores);
      
      updateHighscore()
  
      inGame = false
  
    } else {
  
      time.innerText = (countDown|0).pad(3)
      score.innerText = (scoreVal|0).pad(8)
      tacho.innerText = speed | 0
       // Calcula e exibe o tempo da volta (lap)
      let cT = new Date(timestamp() - start)
      lap.innerText = `${cT.getMinutes()}'${cT.getSeconds().pad(2)}"${cT.getMilliseconds().pad(3)}`
  
    }
  
  
    
  
     // Atualiza a posição do fundo
    cloud.style.backgroundPosition = `${ (cloudOffset -= lines[startPos].curve * step * speed * .13) | 0}px 0`
  
    for(let car of cars) {
  
      car.pos = (car.pos + enemy_speed * step) % N
      
      // Se o carro chega ao final de um segmento, reposiciona
      if( (car.pos|0) === endPos) {
        if(speed < 30) car.pos = startPos
        else car.pos = endPos - 2
        car.lane = randomProperty(LANE)
      }
      // Verifica se o jogador colidiu com o carro
      const offsetRatio = 5
      if((car.pos|0) === startPos && isCollide(playerX * offsetRatio + LANE.B, .5, car.lane, .5)) {
        speed = Math.min(hitSpeed, speed)
        
      }
  
    }
    
     // Desenha a estrada, o fundo e outros elementos gráficos
    let maxy = height
    let camH = H + lines[startPos].y
    let x = 0
    let dx = 0
    
     // Desenha cada linha da estrada
    for (let n = startPos; n < startPos + N; n++) {
  
      let l = lines[n % N]
      let level = N * 2 - n
      
      // Projeta a estrada na tela com base na posição do jogador
      l.project(playerX * roadW - x, camH, startPos * segL - (n >= N ? N * segL : 0))
      x += dx
      dx += l.curve
      
      l.clearSprites()

      // O que vem depois da '%' é a distância entre cada imagem

      // Desenha os sprites (imagens) do jogo como alienígenas e meteoros
      if(n % 10 === 0) l.drawSpriteFloat(level, 0, ASSETS.IMAGE.ALIEN, -2)
      if(n % 20 === 0) l.drawSpriteFloat(level, 0, ASSETS.IMAGE.ALIEN2, -2)
      if(n % 30 === 0) l.drawSprite(level, 0, ASSETS.IMAGE.METEOR, -2)
      if((n + 5) % 10 === 0) l.drawSpriteFloat(level, 0, ASSETS.IMAGE.ALIEN, 1.3)
      if((n + 5) % 20 === 0) l.drawSprite(level, 0, ASSETS.IMAGE.ALIEN3, 1.3)
      if((n + 5) % 30 === 0) l.drawSpriteFloat(level, 0, ASSETS.IMAGE.METEOR, 1.3)
      // Desenha o efeito especial, se houver
      if(l.special) l.drawSprite(level, 0, l.special, l.special.offset||0)
      
      // Desenha os carros inimigos nas linhas
      for(let car of cars) if((car.pos|0) === n % N) l.drawSprite(level, car.element, car.type, car.lane)
  

      if (l.Y >= maxy ) continue
      maxy = l.Y
  
      let even = ((n / 2) | 0) % 2
      let grass = ASSETS.IMAGE.GRASS
      let rumble = ASSETS.COLOR.RUMBLE[even * 1]
      let tar = ASSETS.COLOR.TAR[even * 1]
  
      let p = lines[(n - 1) % N]
  
      //drawQuad(l.elements[0], level, grass, width / 4, p.Y, halfWidth + 2, width / 4, l.Y, halfWidth)
      //drawQuad(l.elements[1], level, grass, width / 4 * 3, p.Y, halfWidth + 2, width / 4 * 3, l.Y, halfWidth)
  
      drawQuad(l.elements[2], level, rumble, p.X, p.Y, p.W * 1.15, l.X, l.Y, l.W * 1.15)
      drawQuad(l.elements[3], level, tar, p.X,p.Y, p.W, l.X, l.Y, l.W)
  
      if(!even) {
        drawQuad(l.elements[4], level, ASSETS.COLOR.RUMBLE[1], p.X, p.Y, p.W * .4, l.X, l.Y, l.W * .4)
        drawQuad(l.elements[5], level, tar, p.X, p.Y, p.W * .35, l.X, l.Y, l.W * .35)
      }
  
    }
  
  }
  
  //Função para resetar os parâmetros e retornar o jogo ao estado inicial
  function reset() {
  
    inGame = false
  
    start = timestamp()
    countDown = map[map.length - 2].to / 130 + 10
  
    playerX = 0
    speed = 0
    scoreVal = 0
  
    pos = 0
    cloudOffset = 0
    sectionProg = 0
    mapIndex = 0
  
    for(let line of lines) line.curve = line.y = 0
  
    text.innerText = 'Aperte Enter'
    text.classList.add('blink')
  
    road.style.opacity = .4
    hud.style.display = 'none'
    home.style.display = 'block'
    tacho.style.display = 'block'
  
  }

  //Função que atualiza a página, resetando o jogo, porém mantendo os tempos e nomes de jogadores
  function solvingBug() {

    location.reload()
  }
  //Função que atualiza o placar com os menores tempos de conclusão
  function updateHighscore() {
    let hN = Math.min(10, highscores.length)
    for(let i = 0; i < hN; i++) {
      highscore.children[i].innerHTML = `${(i+1).pad(2, '&nbsp;')}. ${highscores[i]}`
    }
  }
  

  //Usando o LocalStorage para armazenar o nome do jogador
  document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('nomeUsuario');
    const saveButton = document.getElementById('botaoInicial');
    const loadButton = document.getElementById('loadButton');
    const output = document.getElementById('output');

    // Save the input value to local storage
    saveButton.addEventListener('click', () => {
        const inputValue = inputField.value;
        localStorage.setItem('botaoInicial', inputValue);
        alert('Viajante Registrado!');
    });

    // Optional: Load the saved value into the input field on page load
    const savedInput = localStorage.getItem('botaoInicial');
    if (savedInput) {
        inputField.value = savedInput;
    }
  });


  //Função para dar início ao jogo
  function init() {
  
    game.style.width = width + 'px'
    game.style.height = height + 'px'
  
    hero.style.top = height - 80 + 'px'
    hero.style.left = halfWidth - ASSETS.IMAGE.HERO.width / 2 + 'px'
    hero.style.background = `url(${ASSETS.IMAGE.HERO.src})`
    hero.style.width = `${ASSETS.IMAGE.HERO.width}px`
    hero.style.height = `${ASSETS.IMAGE.HERO.height}px`
  
    cloud.style.backgroundImage = `url(${ASSETS.IMAGE.SKY.src})`
    
    audio = new Audio
    Object.keys(ASSETS.AUDIO).forEach(key => audio.load(ASSETS.AUDIO[key], key, _=>0))
  
    cars.push(new Car(0, ASSETS.IMAGE.CAR, LANE.C))
    cars.push(new Car(10, ASSETS.IMAGE.CAR, LANE.B))
    cars.push(new Car(20, ASSETS.IMAGE.CAR, LANE.C))
    cars.push(new Car(35, ASSETS.IMAGE.CAR, LANE.C))
    cars.push(new Car(50, ASSETS.IMAGE.CAR, LANE.A))
    cars.push(new Car(60, ASSETS.IMAGE.CAR, LANE.B))
    cars.push(new Car(70, ASSETS.IMAGE.CAR, LANE.A))
  
    for (let i = 0; i < N; i++) {
      var line = new Line
      line.z = i * segL + 270
  
      for (let j = 0; j < 6 + 2; j++) {
        var element = document.createElement('div')
        road.appendChild(element)
        line.elements.push(element)
      }
  
      lines.push(line)
  
    }
  
    for(let i = 0; i < 12; i++) {
      var element = document.createElement('p')
      highscore.appendChild(element)
    }
    updateHighscore()
  
    reset()
  
    ;(function loop(){
        requestAnimationFrame(loop)
  
        let now = timestamp()
        let delta = now - then
  
        if (delta > targetFrameRate) {
            then = now - (delta % targetFrameRate)
            update(delta / 1000)
        }
  
    })()
  
  }
  
  init()
