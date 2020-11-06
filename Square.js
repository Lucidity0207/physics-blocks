/*square = {
    height: 48,
    jumping: true,
    width: 48,
    x: mouseX, 
    x_velocity: 0,
    y: mouseY,
    y_velocity: 0
};
*/

class Square {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = w;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.jumping = true;
        this.selected = false;
    }

    logCoordinates() {
        console.log("X: " + this.x + " | Y: " + this.y);
    }

    basicPhysics() {
        this.y_velocity += 1.5; //gravity
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.x_velocity *= 0.9;// friction
        this.y_velocity *= 0.9;
    }

    collisionDetection() {
        if (this.y > 330 - 1 - 48) {
            this.jumping = false;
            this.y = 330 - 1 - 48;
            this.y_velocity = 0;
        }
        // if square is going off the left of the screen
        if (this.x < -64) {
    
            this.x = 640;
    
        } else if (this.x > 640) {// if square goes past right boundary
    
            this.x = -64;
    
        }
    }

    toggleSelected() {
        this.selected = !this.selected;
    }

    drawSquare() {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

/*var exampleSquare = new Square(10, 20, 50);
var sqr1 = new Square(10, 50, 10);

var squareArray = [exampleSquare, sqr1];

for (var i = 0; i < squareArray.length; i++) {
    squareArray[i].basicPhysics();
}*/