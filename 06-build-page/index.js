const path = require('path');
const { readdir, readFile, copyFile, mkdir, rm, stat, writeFile, createWriteStream, createReadStream, write, access, constants, stats, unlink } = require('fs/promises');

const fs = require('fs');
const components = path.join(__dirname, '/components');
const template = path.join(__dirname, '/template.html');
const styles = path.join(__dirname, '/styles');

let arrComponents = [];
let arrTemp;

async function read() {  
//получаем массив компонентов arrComponents
  let files = await readdir(components);
  files.forEach(file => {
    fs.stat(path.join(components, '/', file), (err, stats) => {
      if (err) { throw err };
      if (stats.isFile() && path.extname(file).slice(1) === 'html') {
        arrComponents.push('{{' + path.basename(file, path.extname(file)) + '}}');
      };
    });
  });
// получаем массив arrTemp из template, ищем совпадения c arrComponents, изменяем массив arrTemp
  let data = await readFile(template);
  arrTemp = data.toString().split('\n');
  for (let i = 0; i < arrComponents.length; i++) {
    for (let j = 0; j < arrTemp.length; j++) {
      if (arrComponents[i] == arrTemp[j].trim()) {
        let nameComponent = arrComponents[i].replace('{{', '')
        nameComponent = nameComponent.replace('}}', '')
        fs.readFile(path.join(__dirname, '/components/', nameComponent + '.html'), (err, data) => {
          if (err) throw err;
          else {
            let componentData = data.toString();
            arrTemp.splice(arrTemp.indexOf(arrTemp[j]), 1, componentData);
          }
        })
      }
    }
  };
};
//создаем новую project-dist папку и новый индекс index.html
async function createDir() {
  await read()
  await mkdir(path.join(__dirname, '/project-dist'), { recursive: true });
  await writeFile(path.join(__dirname, '/project-dist', '/index.html'), arrTemp);
  mergeStyle() // merge style
  copyFolder()
}
createDir();

// обьединяем стили
function mergeStyle() {
  const output = fs.createWriteStream(path.join(__dirname, '/project-dist', '/style.css'));
  fs.readdir(styles, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(file => {
        fs.stat(path.join(styles, '/', file), (err, stats) => {
          if (err) console.log(err)
          else {
            if (stats.isFile() && path.extname(file).slice(1) === 'css') {
              const input = fs.createReadStream(path.join(styles, '/', file), 'utf-8');
              input.on('data', data => output.write(data));
              input.on('error', error => console.log('Error11', error.message));
            } else console.log(file + ' ' + 'is wrong');
          }
        })
      })
    }
  })
}
//копируем папку assets
async function copyFolder() {
  await mkdir(path.join(__dirname, '/project-dist', '/assets'), { recursive: true });
  fs.readdir(path.join(__dirname, '/assets'), (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        fs.stat(path.join(__dirname, '/assets/', file), (err, stats) => {
          if (err) throw err;
          else {
            if (stats.isDirectory()) {

              fs.access(path.join(__dirname, '/project-dist', '/assets/', file), fs.constants.F_OK, async (err) => {
                if (err) {
                  fs.mkdir(path.join(__dirname, '/project-dist', '/assets/', file), (err) => {
                    if (err) throw err;
                  });
                  fs.readdir(path.join(__dirname, '/assets/', file), (err, elements) => {
                    if (err) throw err;
                    else {
                      elements.forEach(elem => {
                        fs.copyFile(path.join(__dirname, '/assets/', file, '/', elem), path.join(__dirname, '/project-dist', '/assets/', file, '/', elem), (err) => {
                          if (err) throw err;
                        })
                      })
                    }
                  })
                } else {

                   fs.readdir(path.join(__dirname, '/project-dist', '/assets/', file), (err, items) => {
                    if (err) throw err;
                    else {
                      items.forEach(item => {
                        fs.unlink(path.join(__dirname, '/project-dist', '/assets/', file, '/', item), (err) => {
                          if (err) throw err;
                          else{
                            fs.readdir(path.join(__dirname, '/assets/', file), (err, elements) =>{
                              if(err) throw err;
                              else {
                                elements.forEach( elem => {
                                  fs.copyFile(path.join(__dirname,'/assets/', file, '/', elem), path.join(__dirname, '/project-dist', '/assets/', file, '/', elem), (err) =>{
                                    if (err) throw err;
                                  })
                                })
                              }
                            })
                          }
                        });
                      })
                    }
                  });
                }
              })
            }
          }
        })
      })
    }
  })
};























function addArrTempToNewIndex() {
  fs.createWriteStream(path.join(__dirname, '/project-dist', '/index.html'));
  // arrTemp.forEach(elem =>{
  //   newIndex.write(elem + '\n')
  // })
}


// fs.mkdir(path.join(__dirname, '/project-dist'), err =>{if(err) throw err});
// newIndex = fs.createWriteStream(path.join(__dirname, '/project-dist','/index.html'));

  // let newIndex = fs.createWriteStream(path.join(__dirname, '/project-dist','/index.html'));