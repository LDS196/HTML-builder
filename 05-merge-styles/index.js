const path = require('path');
const fs = require('fs');

const styles = path.join(__dirname, '/styles')
const bundle = path.join(__dirname, '/project-dist','/bundle.css');


fs.access(bundle,fs.constants.F_OK, (err) =>{
  if(err) {
    readDir();
  } else {
    deleteFile(readDir);
  }
});



function readDir(){
const output = fs.createWriteStream(path.join(__dirname, '/project-dist','/bundle.css'));
fs.readdir(styles, (err, files) =>{
  if(err) console.log(err);
  else {
    files.forEach( file => {
      fs.stat(path.join(styles, '/', file), (err, stats) => {
        if(err) console.log(err)
        else{
          if(stats.isFile() && path.extname(file).slice(1) === 'css'){
            const input = fs.createReadStream(path.join(styles,'/',file), 'utf-8');
            input.on('data', data => output.write(data));
            input.on('error', error => console.log('Error11', error.message));
          } else console.log (file + ' ' + 'is wrong');
        }
      })
    })
  }
})
}

function deleteFile(callback){
    fs.unlink(bundle, err => {
      if(err) throw err; // не удалось удалить файл
      //console.log('Файл успешно удалён');
   });
  callback();
}

