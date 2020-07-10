const canvas = document.getElementById("boidCanvas");

const ctx = canvas.getContext("2d");
boids = [];
let globalCanvasHeight = 500;
let globalCanvaswidth = 1000;
canvas.width = globalCanvaswidth;
canvas.height = globalCanvasHeight;
var numOfBoids = 150;
var obstacles = [];
var perches = [];
var play = true;

const playButton = document.getElementById("play");
const pause = document.getElementById("pause");


playButton.style.display = 'none';
playButton.addEventListener('click', (e) => {
    play = true;
    window.requestAnimationFrame(updateFrame);
    playButton.style.display = 'none';
    pause.style.display = 'block';
});


pause.addEventListener('click', (e) => {
    play = false;
    pause.style.display = 'none';
    playButton.style.display = 'block';
});
var perchTrigger;

const perchEle = document.getElementById("perch");
perchEle.addEventListener('click', (e) => {
    perchTrigger = true;
    perchEle.parentElement.style.color = 'green';
    predator.parentElement.style.color = 'white';
});
const predator = document.getElementById("predator");
predator.addEventListener('click', (e) => {
    perchTrigger = false;
    perchEle.parentElement.style.color = 'white';
    predator.parentElement.style.color = 'red';
});


canvas.addEventListener('mousedown', function (event) {
    canvas.addEventListener('mousemove', drawEvent);
});

canvas.addEventListener('mouseup', function (event) {
    canvas.removeEventListener('mousemove', drawEvent);
});
drawEvent = (event) => {
    if (perchTrigger === true) {
        perches.push({
            x: event.offsetX,
            y: event.offsetY
        });
        modifier.perches = perches;
    } else if (perchTrigger === false) {
        obstacles.push({
            x: event.offsetX,
            y: event.offsetY
        });
        modifier.obstacles = obstacles;
    }
}





// init boids
for (let i = 0; i < numOfBoids; i++) {
    boids[i] = new Boid(ctx, globalCanvaswidth, globalCanvasHeight);
    boids[i].draw();
}


// init boidModifier
var modifier = new BoidsModifer(boids, obstacles, perches);
function updateFrame() {
    ctx.clearRect(0, 0, globalCanvaswidth, globalCanvasHeight);
    // boundary.forEach((el, i) => {
    //     ctx.fill(el.path);
    // });
    addObstaclesPerch();
    boids.forEach(el => {
        el = modifier.coherence(el);
        el = modifier.avoidOthers(el);
        el = modifier.avoidObstacles(el);
        el = modifier.perch(el);
        el = modifier.matchVelocity(el);
        el.update();
    });
    if (play == true)
        window.requestAnimationFrame(updateFrame);
}



function addObstaclesPerch() {
    obstacles.forEach(el => {
        const circle = new Path2D();
        circle.arc(el.x, el.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill(circle);
    });
    perches.forEach(el => {
        const circle = new Path2D();
        circle.arc(el.x, el.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill(circle);
    });
}




window.requestAnimationFrame(updateFrame);