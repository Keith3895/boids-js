# Boids Algorithm
Boids algorithm is an artificial life program, developed by Craig Reynolds. It simulates the flocking behavior of birds. There are 3 rules that a boid follows:
1) Separation: fly away to avoid a collision.
2) Alignment: steer toward the average heading of nearest boids.
3) Cohesion: move toward the average position of the nearest boids.

### Intent

this is a project I worked on to try and simulate boids algorithm in javascript. I initially intended for the boid to be a truly autonomous object but ended up creating a global method to maintain the rules of the simulation.