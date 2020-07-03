const canvas = document.getElementById("boidCanvas");
const ctx = canvas.getContext("2d");
boids = [];
let globalCanvasHeight = 800;
let globalCanvaswidth = 1000;
canvas.width = globalCanvaswidth;
canvas.height = globalCanvasHeight;



const boundary = [];
for (let i = 0; i < 4; i++) {
    boundary[i] = { path: new Path2D(), id: i };
}
boundary[0].path.rect(0, -130, globalCanvaswidth * 2, 150);
boundary[1].path.rect(-130, 0, 150, globalCanvasHeight * 2);
boundary[2].path.rect(globalCanvaswidth - 20, 0, 150, globalCanvasHeight * 2);
boundary[3].path.rect(0, globalCanvasHeight - 20, globalCanvaswidth * 2, 150);
// boundary.forEach((el, i) => {
//     ctx.fill(el.path);
// });
for (let i = 0; i < 30; i++) {
    boids[i] = new Boid(ctx, globalCanvaswidth, globalCanvasHeight, boundary);
    boids[i].draw();
}
function updateAll() {
    ctx.clearRect(0, 0, globalCanvaswidth, globalCanvasHeight);
    boundary.forEach((el, i) => {
        ctx.fill(el.path);
    });
    boids.forEach(el => el.update());
    window.requestAnimationFrame(updateAll);
}
window.requestAnimationFrame(updateAll);