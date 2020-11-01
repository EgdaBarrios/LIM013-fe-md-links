#!/usr/bin/env node

//import { url } from 'inspector';

const path = require('path');
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

//-------------------------------------------------------------------------------------------

//----------Función que valida la existencia de rutas-----METODO: fs.existsSync()---------

export const isValidPath = (myPath) => {
  const validPath = fs.existsSync(myPath);
  return validPath;
}


//----------Función que reconoce rutas absolutas-----METODO: path.isAbsolute()-------------

export const isAbsolutePath = (myPath) => {
  const currentWorkPath = path.isAbsolute(myPath);
  return currentWorkPath;
}


//----------Función que convierte rutas relativas en absolutas-----METODO: path.resolve()----

export const convertToAbsolute = (myPath) => {
  const currentWorkPath = path.resolve(myPath);
  return currentWorkPath;
}
  

//----------Función que identifica archivos-----METODO: fs.statSync()------------------------

export const identifiedFile = (myPath) => {
  const stats = fs.statSync(myPath);
  const itsAFile = stats.isFile();
  return itsAFile;
}
  

//----------Función que identifica directorios-----METODO: fs.statSync()---------------------

export const identifiedDirectory = (myPath) => {
  const stats = fs.statSync(myPath);
  const itsADirectory = stats.isDirectory();
  return itsADirectory;
}
 
  
//-----------Función que retorna la extensión de los archivos-----METODO: path.extname()-----

export const isMdFile = (myPath) => {
  const itsAnMdFile = path.extname(myPath);
  return itsAnMdFile;
}
 
  
//----------Método síncrono que lee un archivo (file) y retorna su contenido-----METODO: fs.readFileSync()

export const readFileContent = (myPath) => {
  const fileContent = fs.readFileSync(myPath, 'utf8');
  return fileContent;
}
  

//----------Función que lee directorios y retorna arreglo de nombres de archivos .md-----METODO (síncrono): fs.readdirSync()

export const readDirectorySync = (myPath) => {
  const fileNames = fs.readdirSync(myPath);
  const directoryMdFileNames = [];
  fileNames.forEach((fileName) => {
    //Convirtiendo a ruta absoluta el nombre del archivo (valor de retorno):
    const absolutePath = path.join(myPath, fileName);
    if(path.extname(absolutePath) == '.md') {
      directoryMdFileNames.push(absolutePath);
    }    
  });
  return directoryMdFileNames;  
}
 
  
//----------Función que identifica el tipo de ruta y retorna ruta absoluta-------------------

export const tipeOfPath = (myPath) => {
  const currentWorkPath = isAbsolutePath(myPath);
  if(currentWorkPath == true) {
    const currentWorkPath = myPath;
    return currentWorkPath;
  } else {
    const currentWorkPath = convertToAbsolute(myPath);
    return currentWorkPath;
  }
}
 

//----------Función que lee archivos, selecciona aquellos con ext .md y obtiene sus links----

export const getLinksFromMdFile = (myPath) => {
  const linksFromMdFile = [];
  const currentWorkPath = tipeOfPath(myPath);
  if(path.extname(currentWorkPath) == ".md") {
    //return 'It´s an .md file';
    const fileContent = fs.readFileSync(myPath, 'utf8');
    const dom = new JSDOM(marked(fileContent));
    const targetTag = dom.window.document.querySelectorAll('a');
    targetTag.forEach((Object) => {
      linksFromMdFile.push({
        file: myPath,
        href: Object.getAttribute('href'),
        text: Object.textContent,
      })
    })
    return linksFromMdFile;
  }   
}


//----------Función que identifica directorios, selecciona archivos .md y obtiene sus links--

export const getLinksFromDirectoryFiles = (myPath) => {
  const storeAllMdFiles = [];
  const linksFromDirectoryFiles = [];
  const currentWorkPath = tipeOfPath(myPath);
  const itsADirectory = identifiedDirectory(currentWorkPath);
  if(itsADirectory == true) {
    //return 'it´s a directory';
    const directoryMdFileNames = readDirectorySync(currentWorkPath);
    storeAllMdFiles.push(directoryMdFileNames);
  }
  const allMdFilesArray = [].concat.apply([], storeAllMdFiles);
  allMdFilesArray.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(marked(fileContent));
    const targetTag = dom.window.document.querySelectorAll('a');
    targetTag.forEach((Object) => {
      linksFromDirectoryFiles.push({
        file: myPath,
        href: Object.getAttribute('href'),
        text: Object.textContent,
      })
    })
  })  
  return linksFromDirectoryFiles;  
}

  
//----------VALIDATE-------------------------------------------------------------------------

//option --validate, valida los links. Retorna array de links y sus propiedades: file, href, 
//status text, status y text;

//-------------------------------------------------------------------------------------------

export const linkValidator = (threePropArray) => {
  const promises = threePropArray.map(link => fetch(link.href)
    .then(res => ({
      file: link.file,
      href: link.href,
      text: link.text,
      statusText: res.statusText,
      status: res.status
    }))
    .catch(() => ({
      file: link.file,
      href: link.href,
      text: link.text,
      statusText: 'FAIL',
      status: 500
    })))
  return Promise.all(promises);
};

//----------STATS----------------------------------------------------------------------------

//opción --stats, el output (salida) será un texto con estadísticas básicas sobre los links.
//opción --stats --validate, estadísticas de links, únicos y rotos.

//-------------------------------------------------------------------------------------------

export const stats = (fivePropArray, options) => {
  let arrayOfLinks = fivePropArray.map(link => link.href)
  let arrayOfBrokenLinks = fivePropArray.filter(link => link.status < 200 || link.status >= 300)
  //return arrayOfLinks;
  const total = arrayOfLinks.length;
  const unique = [...new Set(arrayOfLinks)]
  if(options.validate === false) {
    return `Total: ${total} \nUnique: ${unique.length}`;
  } else {
    return `Total: ${total} \nUnique: ${unique.length} \nBroken: ${arrayOfBrokenLinks.length}`;
  }  
}


//----------MDLINKS--------------------------------------------------------------------------

//Función mdLinks, el input (entrada) es una ruta absoluta de archivo o directorio, el output
//(salida) será un array de links y sus propiedades: file, href, text;

//-------------------------------------------------------------------------------------------

export const mdLinks = (myPath, options) => {
  return new Promise((resolve, reject) => {
    const validPath = isValidPath(myPath);
    if(validPath === true) {
      const currentWorkPath = tipeOfPath(myPath);
      if(currentWorkPath === myPath) {
        const itsAFile = identifiedFile(myPath);
        let threePropArray;
        if(itsAFile === true) {
          threePropArray = getLinksFromMdFile(myPath);
        } else {
          threePropArray = getLinksFromDirectoryFiles(myPath);
        }
        if (options.validate === true) {
          linkValidator(threePropArray)
          .then(fivePropArray => {
            resolve(fivePropArray);
          });
        } else {
          resolve(threePropArray);
        }
      }    
    } else {
      reject(new Error('Enter new path'));
    }
  })
}