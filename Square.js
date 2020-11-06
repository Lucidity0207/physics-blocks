
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
    collides() {
        
    }
    collisionDetection() {
        for(i = 0; i< squares.length; i++) {

            for(j = i+1; j < squares.length; j++){
        
                if(squares[i].collides(squares[j])){
        
                    console.log("Do something");
                }
                
            }
        }
    }

    boundsDetections() {
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



