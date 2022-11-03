const fs = require('fs');
const path = require('path');

const copyFolder = path.join(__dirname, '/files-copy')
const testFolder = path.join(__dirname, '/files');

copyDir();

function copyDir(){
fs.access(copyFolder, fs.constants.F_OK, (err) =>{
  if (err) {
    createFolder(addFile)
  } else {
    clearFolder(addFile)
  }
})
}

function addFile (){
  fs.readdir(testFolder, (err, files) =>{
    if(err){
      console.log(err);
      return;
    } else{
      files.forEach(file =>{
        fs.copyFile(path.join(testFolder, '/', file) ,path.join(copyFolder, '/', file), (err) =>{
          if(err) {
            console.log(err);
            return;
          } else {
            console.log('Files added');
          }
        })
      })
    }
  })
};

function clearFolder(callback){
  fs.readdir(copyFolder, (err, files) =>{
    if(err) {
      console.log(err);
      return;
    } else {
      files.forEach(file =>{
        fs.unlink(path.join(copyFolder, '/', file), err => {
          if(err) throw err; // не удалось удалить файл
          console.log('Файл успешно удалён');
       });
      })
    }
  })
  callback()
}

function createFolder(callback){
  fs.mkdir(path.join(copyFolder), err => {
    if(err){
      console.log('Errorss');
      return;
    }
  })
  callback();
}