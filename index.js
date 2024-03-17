
//create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);


// variables
let rows = 1;
let cols = 4;

let trackRight = 0;
let trackUp = 0;
let trackDown = 0;
let trackLeft = 0;

let counter = 0;

let spriteWidth = 640;
let spriteHeight = 160;
let width = spriteWidth / cols;
let height = spriteHeight / rows;

let curXFrame = 0;
let frameCount = 4;
let srcX = 0;
let srcY = 0;

// srcX = curXFrame * width;

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
    x: 100,
    y: 100
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
    left = false;
    right = false;
    up = false;
    down = false;

	if (38 in keysDown) { // Player holding up
		hen.y -= hen.speed * modifier;
        up = true;
	}
	else if (40 in keysDown) { // Player holding down
		hen.y += hen.speed * modifier;
        down = true;
	}
	else if (37 in keysDown) { // Player holding left
		hen.x -= hen.speed * modifier;
        left = true;
	}
	else if (39 in keysDown) { // Player holding right
		hen.x += hen.speed * modifier;
        right = true;
	}

    srcX = curXFrame * width; //update the x coordinate of the spritesheet
    //update the y coordinate of the spritesheet
    if (up) {
        srcY = trackUp * width;
    }
    else if (down) {
        srcY = trackDown * width;
    }
    else if (right) {
        srcY = trackRight * height;
    }
    else if (left) {
        srcY = trackLeft * height; 
    }
    else {
        srcX = 0;
        srcY = 0;
    }

    if (counter < 20) {
    counter += 1;
    }
    else if (counter == 20) {
        curXFrame = ++curXFrame % frameCount;
        counter = 0;
    } else {
        counter++;
    };

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
    
};

function render(){
    if(bgReady) {
        console.log('bgReady');
        ctx.drawImage(bgImage, 0, 0);
    }
    if(henReady) {
        console.log('henReady');
        ctx.drawImage(henImage, srcX, srcY, width, height, hen.x, hen.y, width, height);
    }
    if(carReady) {
        console.log('carReady');

    }
};

function reset(){
    hen.x = canvas.width / 2;
    hen.y = canvas.height -30;
};

// function animateHen(left, right, up, down) {    
//     if (curXFrame < 4) {
//         curXFrame += 1;
//     };

//     if (counter == 4) {
//         curXFrame = ++curXFrame % frameCount;
//         counter = 0;
//     } else {
//         counter++;
//     };
// };



// function animateHen(){
//     srcX = curXFrame * width;
//     ctx.drawImage(henImage, srcX, srcY, width, height, hen.x, hen.y, width, height);
//     if (frameCount < 4) {
//         frameCount += 1;
//     }
