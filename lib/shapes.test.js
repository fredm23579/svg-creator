// lib/shapes.test.js
const { Triangle, Circle, Square } = require('./shapes');

test('Triangle render method returns correct SVG markup', () => {
  const triangle = new Triangle();
  triangle.setColor('blue');
  expect(triangle.render()).toBe('<polygon points="150,18 244,182 56,182" fill="blue" />');
});

test('Circle render method returns correct SVG markup', () => {
  const circle = new Circle();
  circle.setColor('red');
  expect(circle.render()).toBe('<circle cx="150" cy="100" r="80" fill="red" />');
});

test('Square render method returns correct SVG markup', () => {
  const square = new Square();
  square.setColor('green');
  expect(square.render()).toBe('<rect x="40" y="60" width="220" height="120" fill="green" />');
});
