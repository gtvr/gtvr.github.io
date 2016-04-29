var radius = 200, maxSize = 40, minSize = 1;

function setup(){
    createCanvas(windowWidth, windowHeight);
    fill(225, 220, 255);
    noStroke();
}

function draw() {
    clear();
    
    for(var i = 0; i <= width; i += maxSize) {
	for(var j = 0; j <= height; j += maxSize) {
	    var d = (radius - dist(mouseX, mouseY, i, j)) / radius;
	    if (d >= 0) {
		var size = ((maxSize - minSize) * d) + minSize;
		rect(i, j, size, size, 0, 0, maxSize, 0);
	    }
	}
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
