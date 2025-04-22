let cols; let rows;
let size= 20;
let c = [];


function setup(){
    createCanvas(800,800)
    cols = (width-400)/size;
    rows = (height-400)/size;
    for(let i =0; i<cols; i++){
      c[i] = []
      for (let j = 0; j < rows; j++) {
        c[i][j] = color(Math.floor(Math.random()*(254)),Math.floor(Math.random()*(254)),Math.floor(Math.random()*(254)));
        
      }
    }
}

function draw(){
    background(220);
    sz_sqr = 800
    x_sqr = width - 400
    y_sqr = height - 810
    fill(0)
    for(let i = 0; i< cols; i++){
        for(let j = 0; j < rows; j++){
            fill(c[i][j])
            rect(i*size, j*size, size, size)

            rectMode(CENTER)
            rect(x_sqr, y_sqr, sz_sqr, sz_sqr); // posição e tamanho do quadrado
            sz_sqr *= 0.5
            y_sqr *= 20


        }
    }

}