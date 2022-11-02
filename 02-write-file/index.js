const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, '/text.txt'));
const { stdin, stdout } = process;


console.log('Enter your text!');

stdin.on('data', chunk => {
  const myData = chunk.toString();
  if( myData.trim() == 'exit'){
    process.exit()
  } else {
    output.write(chunk)
  }
})

process.on('exit', () => stdout.write('Удачи!'));


