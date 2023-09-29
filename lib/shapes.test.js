const { Circle, Square, Triangle } = require('./shapes');

describe('Shape Class', () => {
  test('Render Circle', () => {
    const circle = new Circle(100, 100, 50); // Use Circle constructor correctly
    circle.setColor('blue'); // Set color
    const svg = circle.render();
    expect(svg).toContain('<circle');
    expect(svg).toContain('cx="100" cy="100" r="50" fill="blue"');
  });

  test('Render Triangle', () => {
    const triangle = new Triangle(50, 25, 25, 75, 75, 75); // Use Triangle constructor correctly
    triangle.setColor('green'); // Set color
    const svg = triangle.render();
    expect(svg).toContain('<polygon');
    expect(svg).toContain('points="50,25 25,75 75,75" fill="green"');
  });

  test('Render Square', () => {
    const square = new Square(100, 50, 100); // Use Square constructor correctly
    square.setColor('red'); // Set color
    const svg = square.render();
    expect(svg).toContain('<rect');
    expect(svg).toContain('x="100" y="50" width="100" height="100" fill="red"');
  });

  // test('Unsupported Shape Type', () => {
  //   expect(() => new Shape('invalid', 100, 'invalidColor', 'Invalid', 24, 'white')).toThrowError('Unsupported shape type.');
  // });
});
