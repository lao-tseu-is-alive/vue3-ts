export default class Point {
    constructor(name, x = 0, y = 0) {
        this.p = { x: 0, y: 0, name: '' };
        this.dump = () => `Point[${this.p.name}](${this.p.x}, ${this.p.y})`;
        this.getPoint = () => ({
            x: this.p.x,
            y: this.p.y,
            name: this.p.name,
        });
        this.getDistanceFromOrigin = () => Math.sqrt(this.p.x * this.p.x + this.p.y * this.p.y);
        // give the angle in Radian from horizontal axis x with the vector from origin to this point
        this.getAngleRad = () => Math.atan(this.p.y / this.p.x);
        // give the angle in degree from horizontal axis x with the vector from origin to this point
        this.getAngleDeg = () => (Math.atan(this.p.y / this.p.x) * 360) / (2 * Math.PI);
        this.move = (x, y) => { this.p.x = x; this.p.y = y; return this; };
        this.rename = (name) => { this.name = name; return this; };
        this.moveRelative = (dx, dy) => { this.p.x += dx; this.p.y += dy; return this; };
        this.p = { x, y, name };
    }
    get x() { return this.p.x; }
    set x(value) { this.p.x = value; }
    get y() { return this.p.y; }
    set y(value) { this.p.y = value; }
    get name() { return this.p.name; }
    set name(value) { this.p.name = value; }
}
//# sourceMappingURL=Point.js.map