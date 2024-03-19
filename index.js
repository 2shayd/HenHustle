
//create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

//hen animation variables
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

let right;
let up;
let down;
let left;

//car spritesheet variables
let cspriteWidth = 630;
let cspriteHeight = 105;
let cwidth = cspriteWidth / 6;
let cheight = cspriteHeight / 1;

let ccurXFrame = 0;
let cframeCount = 6;
let csrcX = 0;
let csrcY = 0;

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
hitImage.src = "other imgs/hit.png"; //hen hit image
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
    speed: 5,
    x: 0,
    y: 100
};
var flower = {
    x: 600,
    y: 100
};
let pointA = {
    x: 0, 
    y: 100
};
let pointB = {
    x: 800,
    y: 800
};

//car's movement path
let slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);

//sounds
var bgMusic = new Audio ("sounds/gametrack.mp3");
bgMusic.loop = true;
var lose = new Audio("sounds/sounds_lose.mp3");
var win = new Audio ("sounds/win.mp3");


//play now!
var then = Date.now();

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

    if (38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown && !bgMusic.paused) {
        bgMusic.play();
    }

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

    srcX = curXFrame * width; //update the x coordinate of the hen spritesheet
    
    //update the y coordinate of the hen spritesheet
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
    if (car.x <= pointB.x && car.y <= pointB.y) {
        car.x += car.speed;
        car.y += slope * car.speed;
    }
    if (car.x >= pointB.x || car.y >= pointB.y) {
        resetCar();
    };
    
    if (checkCollision(hen, car)) {
        bgMusic.pause();
        lose.play();
        hen.speed = 0;
        henReady = false;
        hitReady = true;
        let interval = setInterval(() => {
            reset()
            clearInterval(interval);
        }, 1000);
    }
    if (checkCollision(hen, flower)) {
        hen.speed = 0;
        bgMusic.pause();
        win.play();
        henReady = false;
        flowerReady = false;
        winReady = true;
        let interval = setInterval(() => {
            reset()
            clearInterval(interval);
        }, 2000);
    }
};
function render(){
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if(flowerReady) {
        ctx.drawImage(flowerImage, flower.x, flower.y, 200, 200);
    }
    if(carReady) {
        ctx.drawImage(carImage, csrcX, csrcY, cwidth, cheight, car.x, car.y, width, height);
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
};

//check if hen and car or flower are touching
function checkCollision(obj1, obj2) {
    return obj1.x < (obj2.x + 20) &&
        (obj1.x + 20) > obj2.x &&
        obj1.y < (obj2.y + 20) &&
        (obj1.y + 20) > obj2.y;
};

//reset hen position after win or hit
function reset(){
    winReady = false;
    hitReady = false;
    henReady = true;
    flowerReady = true;
    carReady = true;
    hen.speed = 256;
    hen.x = 100;
    hen.y = 600;
};

//spawn car on new route in new color
function resetCar(){
    let randomNum = Math.floor(Math.random() * 5); //random number between 0 and 4
    let carArray = [0, 100, 200, 300, 400];
    switch (randomNum) {
        case 0: 
            csrcX = 105;
            break
        case 1:
            csrcX = 210;
            break;
        case 2:
            csrcX = 315;
            break;
        case 3:
            csrcX = 420;
            break;
        case 4:
            csrcX = 525;
            break;
        default:
            csrcX = 0;
            break;
    };
    car.x = 0;
    car.y = carArray[randomNum];
    pointA.x = 0;
    pointA.y = parseInt(carArray[randomNum]);
};
