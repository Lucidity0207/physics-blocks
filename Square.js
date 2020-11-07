
class Square {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = w;
        this.radius = 20;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.jumping = true;
        this.selected = false;
        this.isColliding = false;
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
    checkAllCollisions() {
        var square;
        for(var i = 0; i < squares.length; i++){
          square = squares[i];
          square.collision(i, squares);
        }
    }
    collision(i, squares){
        for(var j = i+1 ; j < squares.length; j++){
          var squareB = squares[j];
          var dx = squareB.x - this.x;
          var dy = squareB.y - this.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var minDist = this.radius + squareB.radius;
          if(dist < minDist){
            var angle = Math.atan2(dy, dx);
            var tx = this.x + Math.cos(angle) * minDist;
            var ty = this.y + Math.sin(angle) * minDist;
            var ax = (tx - squareB.x) * 0.5;
            var ay = (ty - squareB.y) * 0.5;
            squareB.x_velocity += ax;
            sqaureB.y_velocity += ay;
            this.x_velocity -= ax;
            this.y_velocity -= ay;
          }
        }
  
      }
    // collisionDetection() {
    //     let sq1;
    //     let sq2;

    //     //reset collision state of square
    //     for(let i = 0; i < squares.length; i++) {
    //         squares[i].isColliding = false;
    //     }
    //     //loops through squares array checking each object for collision
    //     for (let i = 0; i < squares.length; i++) {
            
    //         sq1 = squares[i];
    //         for (let j = i + 1; j < squares.length; j++) {

    //             sq2 = squares[j];
    //             if (squares[i].collides(squares[j])) {
    //                 sq1.isColliding = true;
    //                 sq2.isColliding = true;
    //                 this.x_velocity = 0
    //             }

    //         }
    //     }
    // }
    // collides(x1, y1, w1, x2, y2, w2) {
    //     //check x and y for overlap
        
    //     if (x2 > w1 + x1 || 
    //         x1 > w2 + x2 || 
    //         y2 > w1 + y1 || 
    //         y1 > w2 + y2){
    //         return false;
    //     }
    //     return true;
    // }

    boundsDetections() {
        if (this.y > 325 - 1 - 48) {
            this.jumping = false;
            this.y = 325 - 1 - 48;
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



