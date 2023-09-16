class Shape {
    constructor(shapeType, width, fillColor, text, fontSize, textColor) {
      this.shapeType = shapeType;
      this.width = width;
      this.fillColor = fillColor;
      this.text = text;
      this.fontSize = fontSize;
      this.textColor = textColor;
    }
  
    render() {
      switch (this.shapeType) {
        case 'circle':
          return this.renderCircle();
        case 'triangle':
          return this.renderTriangle();
        case 'square':
          return this.renderSquare();
        default:
          throw new Error('Unsupported shape type.');
      }
    }
  
    renderCircle() {
      return this.renderShape('circle', `cx="${this.width / 2}" cy="${this.width / 2}" r="${this.width / 2}"`);
    }
  
    renderTriangle() {
      return this.renderShape('polygon', `points="${this.width / 2},${this.width / 4} ${this.width / 4},${(3 * this.width) / 4} ${(3 * this.width) / 4},${(3 * this.width) / 4}"`);
    }
  
    renderSquare() {
      return this.renderShape('rect', `width="${this.width}" height="${this.width}"`);
    }
  
    renderShape(tag, shapeAttributes) {
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${this.width}" height="${this.width}">
        <${tag} ${shapeAttributes} fill="${this.fillColor}" />
        <text x="${this.width / 2}" y="${this.width / 2}" font-size="${this.fontSize}" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
      </svg>`;
    }
  }
  
  module.exports = Shape;
  
  class SVG {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.elements = [];
    }
  
    addElement(element) {
      this.elements.push(element);
    }
  
    render() {
      const svgElements = this.elements.map((element) => element.render());
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${this.width}" height="${this.height}">
        ${svgElements.join('\n')}
      </svg>`;
    }
  }
  
  class Circle {
    constructor(cx, cy, r, fill) {
      this.cx = cx;
      this.cy = cy;
      this.r = r;
      this.fill = fill;
    }
  
    render() {
      return `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" fill="${this.fill}" />`;
    }
  }
  
  class Text {
    constructor(x, y, fontSize, text, fill) {
      this.x = x;
      this.y = y;
      this.fontSize = fontSize;
      this.text = text;
      this.fill = fill;
    }
  
    render() {
      return `<text x="${this.x}" y="${this.y}" font-size="${this.fontSize}" fill="${this.fill}">${this.text}</text>`;
    }
  }
  
  // Example usage:
  const mySVG = new SVG(200, 200);
  
  const circle = new Circle(100, 100, 80, '#3498db');
  mySVG.addElement(circle);
  
  const text = new Text('50%', '50%', 36, 'My Logo', '#ffffff');
  mySVG.addElement(text);
  
  const svgCode = mySVG.render();
  
  console.log(svgCode);
  