let frutas = [];
let cesto;
let pontos = 0;
let pontosAlvo = 10;

function setup() {
  createCanvas(600, 400);
  cesto = {
    x: width / 2,
    y: height - 50,
    largura: 100,
    altura: 20
  };
}

function draw() {
  background(135, 206, 235); // Fundo azul

  // Cesta
  fill(139, 69, 19);
  rect(cesto.x, cesto.y, cesto.largura, cesto.altura);

  // Movimento da cesta
  if (keyIsDown(LEFT_ARROW)) {
    cesto.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cesto.x += 5;
  }
  cesto.x = constrain(cesto.x, 0, width - cesto.largura);

  // Criar frutas
  if (random(1) < 0.02) {
    frutas.push({
      x: random(width),
      y: 0,
      raio: 20,
      velocidade: random(2, 5),
      cor: color(random(255), random(255), random(255))
    });
  }

  // Mostrar e mover frutas
  for (let i = frutas.length - 1; i >= 0; i--) {
    let fruta = frutas[i];
    fill(fruta.cor);
    ellipse(fruta.x, fruta.y, fruta.raio * 2);
    fruta.y += fruta.velocidade;

    // Colisão com a cesta
    if (fruta.y + fruta.raio > cesto.y &&
        fruta.x > cesto.x &&
        fruta.x < cesto.x + cesto.largura) {
      pontos++;
      frutas.splice(i, 1);
    } else if (fruta.y > height) {
      frutas.splice(i, 1);
    }
  }

  // Exibir pontuação
  fill(0);
  textSize(24);
  text("Pontos: " + pontos, 10, 30);

  // Vitória
  if (pontos >= pontosAlvo) {
    noLoop();
    textSize(32);
    fill(0, 102, 0);
    text("Você venceu!", width/2 - 80, height/2);
  }
}