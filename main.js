//variables
var ctx, controller, rectangle, loop;

//canvas size
ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 360;
ctx.canvas.width = 640;

// square (rect)
square = {
    height:32,
    jumping:true,
    width:32,
    x:300, //center of canvas
    vx:0,
    y:0,
    vy:0
};
//draw square
ctx.fillStyle = "#202020";
ctx.fillRect(0, 0, 640, 325);
ctx.fillStyle ="#ff0000";
ctx.beginPath();
ctx.rect(square.x, square.y, square.width, square.height);
ctx.fill();
//floor line
ctx.strokeStyle ="#202830";
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(0,325);
ctx.lineTo(640, 325);
ctx.stroke();