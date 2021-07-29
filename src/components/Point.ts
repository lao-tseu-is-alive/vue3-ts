interface iPoint{
  x:number,
  y:number,
  name?:string,
}
export default class Point {
  p:iPoint={ x: 0, y: 0 }

  constructor(name:string, x = 0, y = 0) {
    this.p = { x, y, name };
  }

  dump=():string => `Point[${this.p.name}]`;
}
