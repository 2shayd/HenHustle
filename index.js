
//create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);


// variables for animations
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
console.log(width);
console.log(height);

let curXFrame = 0;
let frameCount = 4;
let srcX = 0;
let srcY = 0;

let right;
let up;
let down;
let left;


// Define the starting point (A) and ending point (B)
var pointA = { x: 0, y: 0 };
var pointB = { x: 100, y: 100 };

// Define the car's progress from A to B (0 = at A, 1 = at B)
var progress = 0;




//keyboard controls
var keysDown = {};

//~~~~~~~~~~~~IMAGES~~~~~~~~~~~~~~
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
//flower image
var flowerReady = false;
var flowerImage = new Image();
flowerImage.onload = function () {
    flowerReady = true;
};
//Hen images
var henReady = false;
var hitReady = false;
var winReady = false;
var henImage = new Image();
var hitImage = new Image();
var winImage = new Image();
henImage.onload = function () {
    henReady = true;
};
//car images
var carReady = false;
var carImage = new Image();
carImage.onload = function () {
    carReady = true;
};
//image sources
winImage.src = "other imgs/win.png"; //win image
bgImage.src = "other imgs/background.jpeg"; //background image
henImage.src = "spritesheets/hen-spritesheet.png"; //hen image
hitImage.src = "spritesheets/hit-spritesheet.png"; //hen hit image
carImage.src = "spritesheets/car-spritesheet.png"; //car image
flowerImage.src = "other imgs/flower.png"; //flower image
//~~~~~~~~~~~~END OF IMAGES~~~~~~~~~~~~~~

//Game objects
var hen = {
    speed: 256, //movement in pixels per second
    x: 100,
    y: 600
};
var car = {
    speed: 150,
    x: 0,
    y: 0
};
var flower = {
    x: 600,
    y: 100
};

//play now!
var then = Date.now();

main(); //call the main game loop

//main game loop
function main(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();
    updateCarPosition();

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

    if (checkCollision(hen, car)) {
        console.log('hit');
        henReady = false;
        hitReady = true;
        reset();
    }
    if (checkCollision(hen, flower)) {
        console.log('win');
        henReady = false;
        flowerReady = false;
        winReady = true;
        reset();
    }
};
function render(){
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if(henReady) {
        ctx.drawImage(henImage, srcX, srcY, width, height, hen.x, hen.y, width, height);
    }
    if(winReady) {
        ctx.drawImage(winImage, hen.x, hen.y, width, height);
    }
    if(hitReady) {
        ctx.drawImage(hitImage, hen.x, hen.y, width, height);
    }
    if(carReady) {
        ctx.drawImage(carImage, car.x, car.y);
    }
    if(flowerReady) {
        ctx.drawImage(flowerImage, flower.x, flower.y, 150, 150);
    }
};
function checkCollision(obj1, obj2) {
    return obj1.x < (obj2.x + width) &&
        (obj1.x + width) > obj2.x &&
        obj1.y < (obj2.y + height) &&
        (obj1.y + height) > obj2.y;
};

function reset(){
    winReady = false;
    hitReady = false;
    henReady = true;
    flowerReady = true;
    hen.speed = 256;
    hen.x = 100;
    hen.y = 600;
};

function updateCarPosition() {
    
}