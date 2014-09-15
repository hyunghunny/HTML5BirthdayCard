/*************************************************/

var g_canvas = $('#myCanvas')[0];
var x = 0, y = 200, speed = 5; 

function animate() {
    
    var context = g_canvas.getContext("2d");
    // clear the canvas
    //context.clearRect(0, 0, g_canvas.width, g_canvas.height);

    reqAnimFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    if (x >= g_canvas.width) {
        
    }
    reqAnimFrame(animate);

    x += speed;

    if (x <= 0 || x >= g_canvas.width) {
        speed = -speed;
    }
    draw();
    //console.log('A box animated.');
};

function draw() {

    var context = $('#myCanvas')[0].getContext("2d");

    //context.clearRect(0, 0, g_canvas.width, g_canvas.height);
    context.fillStyle = "#ff00ff";
    context.fillRect(this.x, this.y, 25, 25);
};

// start animation after 10 secs
//setTimeout(animate, 10000);