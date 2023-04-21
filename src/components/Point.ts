export interface iPoint{
  x:number,
  y:number,
  name?:string,
}
export default class Point implements iPoint{
  private p:iPoint={ x: 0, y: 0, name: '' }

  get x():number { return this.p.x; }

  set x(value:number) { this.p.x = value; }

  get y():number { return this.p.y; }

  set y(value:number) { this.p.y = value; }

  get name():(string) {
    if (this.p.name === undefined) {
      return '';
    }
    return this.p.name; }

  set name(value:string) { this.p.name = value; }

  constructor(name:(string|undefined), x = 0, y = 0) {
    this.p = { x, y, name };
  }

  // dump will give a string with all Point attributes value
  dump=():string => `Point[${this.p.name}](${this.p.x}, ${this.p.y})`;

  // getPoint will return a copy of the Point
  getPoint=():iPoint => ({
    x: this.p.x,
    y: this.p.y,
    name: this.p.name,
  })
  // getDistanceFromOrigin returns the length of the vector from origin to this point
  getDistanceFromOrigin=():number => Math.sqrt(this.p.x * this.p.x + this.p.y * this.p.y)

  // getAngleRad gives the angle in Radian from horizontal axis x with the vector from origin to this point
  getAngleRad=():number => Math.atan(this.p.y / this.p.x)

  // getAngleDeg gives the angle in degree from horizontal axis x with the vector from origin to this point
  getAngleDeg=():number => (Math.atan(this.p.y / this.p.x) * 360) / (2 * Math.PI);

  // move will put the Point in the absolute position defined by the passed x,y coordinates
  move=(x:number, y:number):Point => { this.p.x = x; this.p.y = y; return this; }

  // moveRelative will move the current Point by the passed x,y coordinates relative to current position
  moveRelative=(dx:number, dy:number):Point => { this.p.x += dx; this.p.y += dy; return this; }

  // rename allows to change the name attrivute of the point
  rename=(name:string):Point => { this.name = name; return this; }
}
