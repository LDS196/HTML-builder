const fs = require('fs');
const path = require('path');
const process = require('process');

const output = fs.createWriteStream(path.join(__dirname, '/text.txt'));
const { stdin} = process;

console.log('Enter your text!');
stdin.on('data', chunk => {
  const myData = chunk.toString();
  if( myData.trim() == 'exit'){
    console.log('Good bye');
    process.exit();
  } else {
    output.write(chunk);
  }
})

process.on('SIGINT', () => {
  console.log('Good bye');
  process.exit();
});
