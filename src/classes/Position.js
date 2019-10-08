export default class Position {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scalar(value) {
        return new Position(this.x *= value,
            this.y *= value,
            this.z *= value);
    }

    dist(target){
        return Math.sqrt(
            (this.x-target.x)*(this.x-target.x) +
            (this.y-target.y)*(this.y-target.y) +
            (this.z-target.z)*(this.z-target.z)
        );
    }

    angle2d(target){
        return Math.atan2(target.y - this.y, target.x - this.x) * 180 / Math.PI;
    }
}