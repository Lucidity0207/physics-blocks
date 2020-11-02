//variables
var ctx, controller, square, loop;
var canvas = document.getElementById('mycanvas');
var offsetLeft, offsetTop
var isMouseDown = false;
var mouseX = 0, mouseY = 0;
//canvas size
ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 360;
ctx.canvas.width = 640;

// square properties (rect)
square = {
    height: 48,
    jumping: true,
    width: 48,
    x: 300, //center of canvas
    x_velocity: 0,
    y: 0,
    y_velocity: 0
};


// making key press functions 
keyContr = {
    left: false,
    right: false,
    up: false,
    keylistener: function (event) {
        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {
            case 37: //left key
                keyContr.left = key_state;
                break;
            case 38://up key
                keyContr.up = key_state;
                break;
            case 39://right key
                keyContr.right = key_state;
                break;
        }
    }
};

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    isMouseDown = true;
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;
    console.log('mousedown')

}
function onMouseUp() {
    isMouseDown = false;
}
loop = function () {

    if (keyContr.up && square.jumping == false) {
        square.y_velocity -= 20;
        square.jumping = true;
    }
    if (keyContr.left) {
        square.x_velocity -= 0.5;
    }
    if (keyContr.right) {
        square.x_velocity += 0.5;
    }
    // physics
    square.y_velocity += 1; //gravity
    square.x += square.x_velocity;
    square.y += square.y_velocity;
    square.x_velocity *= 0.9;// friction
    square.y_velocity *= 0.9;

    // collision detection y axis
    if (square.y > 325 - 1 - 48) {
        square.jumping = false;
        square.y = 325 - 1 - 48;
        square.y_velocity = 0;
    }
    // if square is going off the left of the screen
    if (square.x < -64) {

        square.x = 640;

    } else if (square.x > 640) {// if square goes past right boundary

        square.x = -64;

    }
    //draw square
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, 640, 325);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.rect(square.x, square.y, square.width, square.height);
    ctx.fill();
    //floor line
    // ctx.strokeStyle = "#202830";
    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.moveTo(0, 325);
    // ctx.lineTo(640, 325);
    // ctx.stroke();

    //call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};



//controller event listeners

window.addEventListener("keydown", keyContr.keylistener);
window.addEventListener("keyup", keyContr.keylistener);
window.requestAnimationFrame(loop);