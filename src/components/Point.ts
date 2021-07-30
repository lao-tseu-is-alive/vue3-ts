interface iPoint{
  x:number,
  y:number,
  name?:string,
}
export default class Point {
  private p:iPoint={ x: 0, y: 0, name: '' }

  get x():number { return this.p.x; }

  set x(value) { this.p.x = value; }

  get y():number { return this.p.y; }

  set y(value) { this.p.y = value; }

  get name():(string|undefined) { return this.p.name; }

  set name(value) { this.p.name = value; }

  constructor(name:(string|undefined), x = 0, y = 0) {
    this.p = { x, y, name };
  }

  dump=():string => `Point[${this.p.name}](${this.p.x}, ${this.p.y})`;
}
