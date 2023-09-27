const inquirer = require("inquirer");
const fs = require('fs');

class Svg {
  constructor() {
    this.textElement = '';
    this.shapeElement = '';
  }

  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

const questions = [
  {
    type: "input",
    name: "text",
    message: "TEXT: Enter up to (3) Characters:",
  },
  {
    type: "input",
    name: "text-color",
    message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "input",
    name: "shape-color",
    message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "pixel-image",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
];

class Circle {
  constructor(color) {
    this.color = color;
  }

  render() {
    return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
  }
}

class Square {
  constructor(color) {
    this.color = color;
  }

  render() {
    return `<rect x="100" y="50" width="100" height="100" fill="${this.color}" />`;
  }
}

class Triangle {
  constructor(color) {
    this.color = color;
  }

  render() {
    return `<polygon points="100,50 150,150 200,50" fill="${this.color}" />`;
  }
}

function init() {
  console.log("Starting init");
  let svgString = "";
  const svgFile = "logo.svg";

  inquirer.prompt(questions).then((answers) => {
    const userText = answers.text;
    const userFontColor = answers["text-color"];
    const userShapeColor = answers["shape-color"];
    const userShapeType = answers["pixel-image"];
    let userShape;

    switch (userShapeType.toLowerCase()) {
      case "square":
        userShape = new Square(userShapeColor);
        console.log("User selected Square shape");
        break;
      case "circle":
        userShape = new Circle(userShapeColor);
        console.log("User selected Circle shape");
        break;
      case "triangle":
        userShape = new Triangle(userShapeColor);
        console.log("User selected Triangle shape");
        break;
      default:
        console.log("Invalid shape!");
        return;
    }

    const svg = new Svg();
    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);
    svgString = svg.render();

    console.log("Displaying shape:\n\n" + svgString);
    console.log("Shape generation complete!");
    console.log("Writing shape to file...");

    writeToFile(svgFile, svgString);
  });
}

function writeToFile(fileName, data) {
  console.log("Writing [" + data + "] to file [" + fileName + "]");
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Congratulations, you have generated a logo.svg!");
  });
}

init();
