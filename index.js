// index.js
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Import inquirer using dynamic import
import('inquirer').then((inquirer) => {
  function promptUser() {
    return inquirer.default.prompt([
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
    let shapeName;
    switch (answers.shape) {
      case 'Triangle':
        shape = new Triangle();
        shapeName = 'triangle';
        break;
      case 'Circle':
        shape = new Circle();
        shapeName = 'circle';
        break;
      case 'Square':
        shape = new Square();
        shapeName = 'square';
        break;
      default:
        console.log('Invalid shape.');
        return;
    }
    shape.setColor(answers.shapeColor);

    const svgContent = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>
    `;

    const fileName = `${shapeName}_${answers.textColor}_${answers.shapeColor}.svg`;
    saveSVG(fileName, svgContent);
  }

  function saveSVG(fileName, content) {
    fs.writeFileSync(`./examples/${fileName}`, content);
    console.log(`Generated ${fileName}`);
  }

  promptUser().then(createLogo);
});
