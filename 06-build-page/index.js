const path = require('path');
const fs = require('fs');
const components = path.join(__dirname, '/components');
const template = path.join(__dirname, '/template.html');
const header = path.join(__dirname, '/components', '/header.html');
const articles = path.join(__dirname, '/components', '/articles.html');
const footer = path.join(__dirname, '/components', '/footer.html');
let arrComponents = [];
let arrTemp;
let newIndex;
function read() {
  fs.readdir(components, (err, files,) => {
    if(err) throw err;
    else{
      files.forEach(file => {
        fs.stat(path.join(components,'/', file), (err, stats) => {
          if (err) { throw err}
          if(stats.isFile()){
            arrComponents.push( '{{' + path.basename(file, path.extname(file)) + '}}');
          } 
        });
      });
    }
  });

  fs.mkdir(path.join(__dirname, '/project-dist'), err =>{if(err) throw err}); 

  fs.readFile(template, (err, data) => {  
    if(err) throw err;
    else{
      arrTemp = data.toString().split('\n');
      for(let i = 0; i < arrComponents.length; i++){
        for(let j = 0; j < arrTemp.length; j++){
          if( arrComponents[i] == arrTemp[j].trim() ){
            let nameComponent = arrComponents[i].replace('{{','')
            nameComponent = nameComponent.replace('}}','')
            fs.readFile(path.join(__dirname, '/components/', nameComponent + '.html'), (err, data) =>{
              if(err) throw err;
              else {
                let componentData = data.toString();
                arrTemp.splice(arrTemp.indexOf(arrTemp[j]), 1, componentData);
                console.log(arrTemp.length)
              }
            })
          }
        }
      } 
    }
  })
};

function createDir() {  // выполнидась после  fs.readFile
  newIndex = fs.writeFile(path.join(__dirname, '/project-dist','/index.html'));
  arrTemp.forEach(elem =>{
    newIndex.write(elem + '\n')
  })
};

function addArrTempToNewIndex() {
  arrTemp.forEach(elem =>{
    newIndex.write(elem + '\n')
  })
}


// fs.mkdir(path.join(__dirname, '/project-dist'), err =>{if(err) throw err});
// newIndex = fs.createWriteStream(path.join(__dirname, '/project-dist','/index.html'));