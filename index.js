
//create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);


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
bgImage.src = "other imgs/background.jpeg";

//Hen image
var henReady = false;
var henImage = new Image();
henImage.onload = function () {
    henReady = true;
};
henImage.src = "hen sprite/hen-start.png"

//Car images
var carReady = false;
var carImage = new Image();
carImage.onload = function () {
    carReady = true;
};
carImage.src = "car sprite/blue-car1.png";
//~~~~~~~~~~~~END OF IMAGES~~~~~~~~~~~~~~


//Game objects
var hen = {
    speed: 256, //movement in pixels per second
    x: 0,
    y: 0
};
var car = {
    x: 0,
    y: 0
};

//play now!
var then = Date.now();
reset();
main() //call the main game loop

//main game loop
function main(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};


function render(){
    if(bgReady) {
        console.log('bgReady');
        ctx.drawImage(bgImage, 0, 0);
    }
    if(henReady) {
        console.log('henReady');
        ctx.drawImage(henImage, hen.x, hen.y, 100, 100);
    }
    if(carReady) {
        console.log('carReady');
        drawCar();
    }
};

function reset(){
    carImage.x = canvas.width / 2;
    carImage.y = canvas.height / 2;
};

function drawCar() {
    ctx.beginPath();
    ctx.drawImage(carImage, car.x, car.y, 200, 200);           
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    x += dx;
    y += dy;
}

// Handle keyboard controls


addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function update(modifier){
	if (38 in keysDown) { // Player holding up
		hen.y -= hen.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hen.y += hen.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hen.x -= hen.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hen.x += hen.speed * modifier;
	}

	// Are they touching?
	if (
		hen.x <= (car.x + 32)
		&& car.x <= (hen.x + 32)
		&& hen.y <= (car.y + 32)
		&& car.y <= (hen.y + 32)
	) {
		reset()
	}
};