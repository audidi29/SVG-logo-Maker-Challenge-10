const Shape = require('./Shape');

describe('Shape Class', () => {
  test('Render Circle', () => {
    const circle = new Shape('circle', 100, 'blue', 'Circle', 24, 'white');
    const svg = circle.render();
    expect(svg).toContain('<circle');
    expect(svg).toContain('cx="50" cy="50" r="50"');
    expect(svg).toContain('fill="blue"');
    expect(svg).toContain('<text x="50" y="50"');
  });

  test('Render Triangle', () => {
    const triangle = new Shape('triangle', 100, 'green', 'Triangle', 24, 'white');
    const svg = triangle.render();
    expect(svg).toContain('<polygon');
    expect(svg).toContain('points="50,25 25,75 75,75"');
    expect(svg).toContain('fill="green"');
    expect(svg).toContain('<text x="50" y="50"');
  });

  test('Render Square', () => {
    const square = new Shape('square', 100, 'red', 'Square', 24, 'white');
    const svg = square.render();
    expect(svg).toContain('<rect');
    expect(svg).toContain('width="100" height="100"');
    expect(svg).toContain('fill="red"');
    expect(svg).toContain('<text x="50" y="50"');
  });

  test('Unsupported Shape Type', () => {
    const unsupportedShape = new Shape('invalid', 100, 'invalidColor', 'Invalid', 24, 'white');
    expect(() => unsupportedShape.render()).toThrowError('Unsupported shape type.');
  });
});
