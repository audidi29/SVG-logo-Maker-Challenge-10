// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require('./lib/shapes');
const fs = require('fs'); // Corrected 'filesystem' to 'fs'

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
    name: "shape",
    message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "pixel-image",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
];

function init() {
  console.log("Starting init");
  let svgString = "";
  const svgFile = "logo.svg";

  inquirer.prompt(questions).then((answers) => {
    const userText = answers.text;
    const userFontColor = answers["text-color"];
    const userShapeColor = answers.shape;
    const userShapeType = answers["pixel-image"];
    let userShape;

    switch (userShapeType.toLowerCase()) {
      case "square":
        userShape = new Square();
        console.log("User selected Square shape");
        break;
      case "circle":
        userShape = new Circle();
        console.log("User selected Circle shape");
        break;
      case "triangle":
        userShape = new Triangle();
        console.log("User selected Triangle shape");
        break;
      default:
        console.log("Invalid shape!");
        return;
    }

    userShape.setColor(userShapeColor);

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
  fs.writeFile(fileName, data, function (err) { // Corrected 'filesystem' to 'fs'
    if (err) {
      return console.log(err);
    }
    console.log("Congratulations, you have Generated a logo.svg!");
  });
}

init();
