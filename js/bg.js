function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  background(250);
  rotateY(frameCount * 0.01);

  for(var j = 0; j < 5; j++){
    push();
    for(var i = 0; i < 80; i++){
      translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
      rotateZ(frameCount * 0.002);
      push();
      sphere(8, 6, 4); 
      pop();
    }
    pop();
  }
}

/*
function setup() {
    createCanvas(windowWidth. windowHeight);
}

function draw() {
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
*/
