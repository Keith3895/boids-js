class Boid {


    x;
    y;
    dx;
    dy;
    ctx;
    w = 20;
    h = 20;
    speedLimit = 5;
    id = Math.random() * 10 * new Date().getTime();
    constructor(ctx, width, height, boundary) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.dx = Math.random() * 10 - 6;
        this.dy = Math.random() * 10 - 6;
        this.ctx = ctx;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.canvasBoundary = boundary;
        this.allBoids
    }
    draw() {
        const angle = Math.atan2(this.dy, this.dx);
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(angle);
        this.ctx.translate(-this.x, -this.y);
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - 15, this.y + 5);
        this.ctx.lineTo(this.x - 15, this.y - 5);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.fill();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        const circle = new Path2D();
        circle.arc(this.x, this.y, 22.5, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke(circle);
    }
    update = () => {
        // debugger
        this.bounds();
        this.acceleration();
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    acceleration() {
        const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (speed > this.speedLimit) {
            this.dx = (this.dx / speed) * this.speedLimit;
            this.dy = (this.dy / speed) * this.speedLimit;
        }
    }
    bounds() {
        const turnFactor = 1;
        this.canvasBoundary.forEach((el, index) => {
            if (this.ctx.isPointInPath(el.path, this.x, this.y)) {
                switch (index) {
                    case 2:
                    case 3:
                        this.dx -= turnFactor;
                        this.dy -= turnFactor;
                        break;
                    case 1:
                    case 0:
                        this.dx += turnFactor;
                        this.dy += turnFactor;
                        break;
                }
            }
        });
    }
}
