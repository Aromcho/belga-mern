const fs = require('fs');
const { component, styles, barrel } = require('./component_templates');

// grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name.');
const lowerCaseName = name.toLowerCase();

const dir = `./components/${lowerCaseName}/`;

// throw an error if the file already exists
if (fs.existsSync(dir)) throw new Error('A component with that name already exists.'); 

// create the folder
fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(`${dir}/${lowerCaseName}.tsx`, component(name), writeFileErrorHandler);
// component.scss
fs.writeFile(`${dir}/${lowerCaseName}.styles.ts`, styles(name), writeFileErrorHandler);
// index.tsx
fs.writeFile(`${dir}/index.ts`, barrel(name), writeFileErrorHandler);