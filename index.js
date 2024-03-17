
//create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);


// variables
let rows;
let cols;

let trackRight;
let trackUp;
let trackDown;
let trackLeft;

let counter = 0;

let spriteWidth;
let spriteHeight;
let width;
let height;

let curXFrame;
let frameCount;
let srcX;
let srcY;

let right;
let up;
let down;
let left;

let x = canvas.width /2;
let y = canvas.height - 30;
const dx = 2;
const dy = -2;

//keyboard controls
var keysDown = {};

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};

//Hen images
var henReady = false;
var henImage = new Image();
var hitImage = new Image();
henImage.onload = function () {
    henReady = true;
};
hitImage.onload = function () {
    henReady = true;
};

//Car images
var carReady = false;
var carImage = new Image();
carImage.onload = function () {
    carReady = true;
};

//~~~~~~~~~~~~END OF IMAGES~~~~~~~~~~~~~~

//image sources

bgImage.src = "other imgs/background.jpeg"; //background image
henImage.src = "spritesheets/hen-spritesheet.png"; //hen image
hitImage.src = "spritesheets/hit-spritesheet.png"; //hen hit image
carImage.src = "spritesheets/car-spritesheet.png"; //car image

//Game objects
var hen = {
    speed: 256, //movement in pixels per second
    x: 50,
    y: 50
};
var car = {
    speed: 150,
    x: 0,
    y: 0
};

//play now!
var then = Date.now();
// reset();
main(); //call the main game loop

//main game loop
function main(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

// Handle keyboard controls

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function update(modifier){
    //hen movement
    ctx.clearRect(hen.x, hen.y, width, height);

	if (38 in keysDown) { // Player holding up
		hen.y -= hen.speed * modifier;
        up = true;
        right = false;
        down = false;
        left = false;
	}
	else if (40 in keysDown) { // Player holding down
		hen.y += hen.speed * modifier;
        up = false;
        right = false;
        down = true;
        left = false;
	}
	else if (37 in keysDown) { // Player holding left
		hen.x -= hen.speed * modifier;
        up = false;
        right = false;
        down = false;
        left = true;

	}
	else if (39 in keysDown) { // Player holding right
		hen.x += hen.speed * modifier;
        up = false;
        right = true;
        down = false;
        left = false;
	}
    //car movement
    // if (car.x < 0 || car.x > canvas.width) {
    //     dx = -dx;
    // }

	// Are they touching?
	if ((hen.x <= car.x) && (car.x <= hen.x) && (hen.y <= car.y) && (car.y <= hen.y)) {
        ctx.clearRect(hen.x, hen.y, width, height);
        hen.speed = 0;
        ctx.drawImage(hitImage, hen.x, hen.y);
        
        curXFrame = ++curXFrame % frameCount;
        srcX = curXFrame * width;
        reset()
	}
    
    if (up) {
        srcY = trackUp * width;
    }
    else if (down) {
        srcY = trackDown * width;
    }
    else if (right) {
        srcY = trackRight * width;
    }
    else if (left) {
        srcY = trackLeft * width; 
    }
    else if (right == false && up == false && down == false && left == false) {
        srcX = 1 * width;
        srcY = 2 * height;
    }
};

function render(){
    if(bgReady) {
        console.log('bgReady');
        ctx.drawImage(bgImage, 0, 0);
    }
    if(henReady) {
        console.log('henReady');
        ctx.drawImage(henImage, srcX, srcY, width, height, hen.x, hen.y, width, height);
        animateHen();
    }
    if(carReady) {
        console.log('carReady');

    }
};

function reset(){
    hen.x = canvas.width / 2;
    hen.y = canvas.height -30;
};

function animateHen() {
    var rows = 1;
    var cols = 4;

    var trackRight = 1;
    var trackUp = 1;
    var trackDown = 1;
    var trackLeft = 1;

    var counter = 0;

    var spriteWidth = 640;
    var spriteHeight = 160;
    var width = spriteWidth / cols;
    var height = spriteHeight / rows;

    var curXFrame = 0;
    var frameCount = 4;
    var srcX = 0;
    var srcY = 0;

    var right = true;

    srcX = curXFrame * width;
    
    if (frameCount < 4) {
        frameCount += 1;
    };

    if (counter == 4) {
        curXFrame = ++curXFrame % frameCount;
        counter = 0;
    } else {
        counter++;
    };
};



// function animateHen(){
//     srcX = curXFrame * width;
//     ctx.drawImage(henImage, srcX, srcY, width, height, hen.x, hen.y, width, height);
//     if (frameCount < 4) {
//         frameCount += 1;
//     }
