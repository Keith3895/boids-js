class BoidsModifer {
    boids;
    obstacles;
    perches;
    visualRange = 55;
    constructor(boids, obstacles, perches) {
        this.boids = boids;
        this.obstacles = obstacles;
        this.perches = perches;
    }


    coherence(boidEl) {
        const centeringFactor = 0.05; // adjust velocity by this %

        let centerX = 0;
        let centerY = 0;
        let numNeighbors = 0;

        for (let compareBoid of this.boids) {
            if (this.distance(boidEl, compareBoid) < this.visualRange) {
                centerX += compareBoid.x;
                centerY += compareBoid.y;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            centerX = centerX / numNeighbors;
            centerY = centerY / numNeighbors;

            boidEl.dx += (centerX - boidEl.x) * centeringFactor;
            boidEl.dy += (centerY - boidEl.y) * centeringFactor;
        }
        return boidEl;
    }
    distance(boid1, boid2) {
        return Math.sqrt(
            (boid1.x - boid2.x) * (boid1.x - boid2.x) +
            (boid1.y - boid2.y) * (boid1.y - boid2.y),
        );
    }

    avoidOthers(boid) {
        const minDistance = 20; // The distance to stay away from other boids
        const avoidFactor = 0.05; // Adjust velocity by this %
        let moveX = 0;
        let moveY = 0;
        for (let otherBoid of this.boids) {
            if (otherBoid.id !== boid.id) {
                if (this.distance(boid, otherBoid) < minDistance) {
                    moveX += boid.x - otherBoid.x;
                    moveY += boid.y - otherBoid.y;
                }
            }
        }

        boid.dx += moveX * avoidFactor;
        boid.dy += moveY * avoidFactor;
        return boid;
    }
    matchVelocity(boid) {
        const matchingFactor = 0.05; // Adjust by this % of average velocity

        let avgDX = 0;
        let avgDY = 0;
        let numNeighbors = 0;

        for (let otherBoid of this.boids) {
            if (this.distance(boid, otherBoid) < this.visualRange) {
                avgDX += otherBoid.dx;
                avgDY += otherBoid.dy;
                numNeighbors += 1;
            }
        }

        if (numNeighbors) {
            avgDX = avgDX / numNeighbors;
            avgDY = avgDY / numNeighbors;

            boid.dx += (avgDX - boid.dx) * matchingFactor;
            boid.dy += (avgDY - boid.dy) * matchingFactor;
        }
        return boid;
    }


    avoidObstacles(boid) {
        const minDistance = 40; // The distance to stay away from other boids
        const avoidFactor = 0.9; // Adjust velocity by this %
        let moveX = 0;
        let moveY = 0;
        for (let obstacleElement of this.obstacles) {
            if (this.distance(boid, obstacleElement) < minDistance) {
                moveX += boid.x - obstacleElement.x;
                moveY += boid.y - obstacleElement.y;
            }
        }
        boid.dx += moveX * avoidFactor;
        boid.dy += moveY * avoidFactor;
        return boid;
    }


    perch(boid) {
        const minDistance = 10; // The distance to stay away from other boids
        for (let perch of this.perches) {
            if (this.distance(boid, perch) < minDistance) {
                boid.dx = 0;
                boid.dy = 0;
            }
        }
        return boid;
    }
}