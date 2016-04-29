var radius = 700, maxSize = 20, minSize = 1, slope = 0.35, rate = 15;

var scan = 0, maxScan = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    fill(240, 240, 255);
    noStroke();
}

var scan;

function draw() {
    maxScan = width + width * (1 - slope) + radius;
    
    clear();
    
    for(var i = 0; i <= maxScan; i += maxSize) {
	for(var j = 0; j <= height; j += maxSize) {
	    var d = (radius - dist(scan, 0, i, 0)) / radius;
	    if (d >= 0) {
		var size = ((maxSize - minSize) * d) + minSize;
		rect(i - slope * j, j, size, size, 0, 0, maxSize, 0);
	    }
	}
    }
    
    scan += rate;
    if (scan > maxScan)
	scan = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
