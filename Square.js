
class Square {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = w;
        this.radius = 24;
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
        for (var i = 0; i < squares.length; i++) {
            square = squares[i];
            square.collision(i, squares);
        }
    }
    collision(i, squares) {
        for (var j = i + 1; j < squares.length; j++) {
            var squareB = squares[j];
            var dx = squareB.x - this.x;
            var dy = squareB.y - this.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var minDist = this.radius + squareB.radius;
            if (dist < minDist) {
                var angle = Math.atan2(dy, dx);
                var tx = this.x + Math.cos(angle) * minDist;
                var ty = this.y + Math.sin(angle) * minDist;
                var ax = (tx - squareB.x) * 0.5;
                var ay = (ty - squareB.y) * 0.5;
                squareB.x_velocity += ax;
                squareB.y_velocity += ay;
                this.x_velocity -= 0;
                this.y_velocity -= 0;
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
    toggleSelected(i, squares) {
        for (var j = i + 1; j < squares.length; j++) {
            this.selected = !this.selected;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.radius) {
                console.log('click');
            }
        }
        
    }

    drawSquare() {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}



