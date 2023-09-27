class Shape {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }
}

class Circle extends Shape {
  constructor(cx, cy, r) {
    super();
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  render() {
    return `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  constructor(x, y, size) {
    super();
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render() {
    return `<rect x="${this.x}" y="${this.y}" width="${this.size}" height="${this.size}" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  constructor(x1, y1, x2, y2, x3, y3) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  render() {
    return `<polygon points="${this.x1},${this.y1} ${this.x2},${this.y2} ${this.x3},${this.y3}" fill="${this.color}" />`;
  }
}

module.exports = { Circle, Square, Triangle };
