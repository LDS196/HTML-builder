const fs = require('fs');
const path = require('path');
const testFolder = path.join(__dirname, '/secret-folder');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    fs.stat(path.join(testFolder,'/', file), (err, stats) => {
      if (err) {
        console.error(err)
        return
      }
      if(stats.isFile()){
        console.log(path.basename(file, path.extname(file)) + '-' +  path.extname(file).slice(1) + '-' + (stats.size / 1000) + 'kb')
      } 
    })
  })
});


// console.log(path.resolve(__dirname,'secret-folder','data.csv'))
// fs.stat(path.resolve(__dirname,'secret-folder','data.csv'), (err, stats) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(stats.isFile()) //true
// })
