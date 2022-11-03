const fs = require('fs');
const path = require('path');
const testFolder = path.join(__dirname, '/secret-folder');

fs.readdir(testFolder, (err, files) => {
  if(err) console.log(err);
  else{
    files.forEach(file => {
      fs.stat(path.join(testFolder,'/', file), (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        if(stats.isFile()){
          console.log(path.basename(file, path.extname(file)) + '-' +  path.extname(file).slice(1) + '-' + (stats.size / 1000) + 'kb');
        } 
      });
    });
  }
});


