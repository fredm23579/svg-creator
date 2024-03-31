// index.js
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo (up to three characters):',
      validate: function (value) {
        return value.length <= 3 ? true : 'Please enter up to three characters.';
      }
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (color keyword or hexadecimal):',
      default: '#000000' // Default to black
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Triangle', 'Circle', 'Square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (color keyword or hexadecimal):',
      default: '#FFFFFF' // Default to white
    }
  ]);
}

function createLogo(answers) {
  let shape;
  switch (answers.shape) {
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Circle':
      shape = new Circle();
      break;
    case 'Square':
      shape = new Square();
      break;
    default:
      console.log('Invalid shape.');
      return;
  }
  shape.setColor(answers.shapeColor);

  const svgContent = `
  <svg width="300" height="200">
    ${shape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
  </svg>
  `;

  saveSVG(svgContent);
}

function saveSVG(content) {
  fs.writeFileSync('./examples/logo.svg', content);
  console.log('Generated logo.svg');
}

promptUser().then(createLogo);
