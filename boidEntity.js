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
    history = [];
    constructor(ctx, width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.dx = Math.random() * 10 - 6;
        this.dy = Math.random() * 10 - 6;
        this.ctx = ctx;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.allBoids;
    }
    draw() {
        const angle = Math.atan2(this.dy, this.dx);
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(angle);
        this.ctx.translate(-this.x, -this.y);
        this.ctx.fillStyle = "#af1212";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - 15, this.y + 5);
        this.ctx.lineTo(this.x - 15, this.y - 5);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.fill();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (this.history.length > 0) {
            ctx.strokeStyle = "#af120066";
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for (const point of this.history) {
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        }
    }
    update = () => {
        this.bounds();
        this.acceleration();
        this.x += this.dx;
        this.y += this.dy;
        this.history.push({
            x: this.x,
            y: this.y
        });
        this.history = this.history.slice(-75);
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
        const margin = 100;
        const turnFactor = 1;

        if (this.x < margin) {
            this.dx += turnFactor;
        }
        if (this.x > this.canvasWidth - margin) {
            this.dx -= turnFactor
        }
        if (this.y < margin) {
            this.dy += turnFactor;
        }
        if (this.y > this.canvasHeight - margin) {
            this.dy -= turnFactor;
        }
    }
}
