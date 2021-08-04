export interface iPoint{
  x:number,
  y:number,
  name?:string,
}
export default class Point {
  private p:iPoint={ x: 0, y: 0, name: '' }

  get x():number { return this.p.x; }

  set x(value:number) { this.p.x = value; }

  get y():number { return this.p.y; }

  set y(value:number) { this.p.y = value; }

  get name():(string|undefined) { return this.p.name; }

  set name(value:string|undefined) { this.p.name = value; }

  constructor(name:(string|undefined), x = 0, y = 0) {
    this.p = { x, y, name };
  }

  dump=():string => `Point[${this.p.name}](${this.p.x}, ${this.p.y})`;

  getPoint=():iPoint => ({
    x: this.p.x,
    y: this.p.y,
    name: this.p.name,
  })

  getDistanceFromOrigin=():number => Math.sqrt(this.p.x * this.p.x + this.p.y * this.p.y)

  // give the angle in Radian from horizontal axis x with the vector from origin to this point
  getAngleRad=():number => Math.atan(this.p.y / this.p.x)

  // give the angle in degree from horizontal axis x with the vector from origin to this point
  getAngleDeg=():number => (Math.atan(this.p.y / this.p.x) * 360) / (2 * Math.PI);

  move=(x:number, y:number):Point => { this.p.x = x; this.p.y = y; return this; }

  rename=(name:string):Point => { this.name = name; return this; }

  moveRelative=(dx:number, dy:number):Point => { this.p.x += dx; this.p.y += dy; return this; }
}
