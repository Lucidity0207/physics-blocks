//variables
var ctx, controller, square, loop;
var canvas = document.getElementById('mycanvas');
var offsetLeft, offsetTop
var isMouseDown = false;
var squares = [];
var squareNum = 20;
var draggedSquare = null;
var mouseX = 0, mouseY = 0;
var selectedIndex = 0;

//squares array which contains all instances of a Square object
//When creating a new Square use an object constructor OR a class
//In your loop function, loop through all Squares in the squares array and do the physics stuff to each of them.

//canvas size
ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 360;
ctx.canvas.width = 640;

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);


// tracking mouse x & y
canvas.addEventListener('mousemove', onDragSquare);

//console.log(isMouseDown);
function onMouseDown() {
    isMouseDown = true;
    //console.log(isMouseDown);
    

    var square = new Square(mouseX, mouseY, 48);
    
    console.log();
    squares.push(square);
}
function onMouseUp() {
    isMouseDown = false;
    //console.log(isMouseDown);
}

function onDragSquare(e){
    var rect = canvas.getBoundingClientRect();
    mouseX = e.x - rect.left;
    mouseY = e.y - rect.top;

    
    //console.log('x=', mouseX, 'y=', mouseY);
}
// square properties (rect)
/*square = {
    height: 48,
    jumping: true,
    width: 48,
    x: mouseX, 
    x_velocity: 0,
    y: mouseY,
    y_velocity: 0
};*/

squares.push(new Square(mouseX, mouseY, 48));


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

loop = function() {
    if (keyContr.up && squares[selectedIndex].jumping == false) {
        squares[selectedIndex].y_velocity -= 20;
        squares[selectedIndex].jumping = true;
    }
    if (keyContr.left) {
        squares[selectedIndex].x_velocity -= 0.5;
    }
    if (keyContr.right) {
        squares[selectedIndex].x_velocity += 0.5;
    }
    
    //background and floor
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, 640, 325);

    //draw square 
    for(var i = 0; i < squares.length; i++){
        squares[i].basicPhysics();

        squares[i].collisionDetection();

        squares[i].drawSquare();
    }
    

    
    

    
    

    

    //floor line
    ctx.strokeStyle = "#202830";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 325);
    ctx.lineTo(640, 325);
    ctx.stroke();

    //call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};



//controller event listeners

window.addEventListener("keydown", keyContr.keylistener);
window.addEventListener("keyup", keyContr.keylistener);
window.requestAnimationFrame(loop);