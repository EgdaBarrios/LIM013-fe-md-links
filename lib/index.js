#!/usr/bin/env node
//import { Console } from 'console';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = exports.stats = exports.linkValidator = exports.getLinksFromDirectoryFiles = exports.getLinksFromMdFile = exports.tipeOfPath = exports.readDirectorySync = exports.readFileContent = exports.isMdFile = exports.identifiedDirectory = exports.identifiedFile = exports.convertToAbsolute = exports.isAbsolutePath = exports.isValidPath = void 0;

var _inspector = require("inspector");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = require('path');

var fs = require('fs'); //const MarkdownIt = require('markdown-it'),


var marked = require('marked');

var jsdom = require('jsdom'); //const { isAbsolutePath } = require('path');


var JSDOM = jsdom.JSDOM;

var fetch = require('node-fetch'); //-------------------------------------------------------------------------------------------
//----------Función que valida la existencia de rutas-----METODO: fs.existsSync()---------


var isValidPath = function isValidPath(myPath) {
  var validPath = fs.existsSync(myPath);
  return validPath;
}; //----------Función que reconoce rutas absolutas-----METODO: path.isAbsolute()-------------


exports.isValidPath = isValidPath;

var isAbsolutePath = function isAbsolutePath(myPath) {
  var currentWorkPath = path.isAbsolute(myPath);
  return currentWorkPath;
}; //----------Función que convierte rutas relativas en absolutas-----METODO: path.resolve()----


exports.isAbsolutePath = isAbsolutePath;

var convertToAbsolute = function convertToAbsolute(myPath) {
  var currentWorkPath = path.resolve(myPath);
  return currentWorkPath;
}; //----------Función que identifica archivos-----METODO: fs.statSync()------------------------


exports.convertToAbsolute = convertToAbsolute;

var identifiedFile = function identifiedFile(myPath) {
  var stats = fs.statSync(myPath);
  var itsAFile = stats.isFile();
  return itsAFile;
}; //----------Función que identifica directorios-----METODO: fs.statSync()---------------------


exports.identifiedFile = identifiedFile;

var identifiedDirectory = function identifiedDirectory(myPath) {
  var stats = fs.statSync(myPath);
  var itsADirectory = stats.isDirectory();
  return itsADirectory;
}; //-----------Función que retorna la extensión de los archivos-----METODO: path.extname()-----


exports.identifiedDirectory = identifiedDirectory;

var isMdFile = function isMdFile(myPath) {
  var itsAnMdFile = path.extname(myPath);
  return itsAnMdFile;
}; //----------Método síncrono que lee un archivo (file) y retorna su contenido-----METODO: fs.readFileSync()


exports.isMdFile = isMdFile;

var readFileContent = function readFileContent(myPath) {
  var fileContent = fs.readFileSync(myPath, 'utf8');
  return fileContent;
}; //----------Función que lee directorios y retorna arreglo de nombres de archivos .md-----METODO (síncrono): fs.readdirSync()


exports.readFileContent = readFileContent;

var readDirectorySync = function readDirectorySync(myPath) {
  var fileNames = fs.readdirSync(myPath);
  var directoryMdFileNames = [];
  fileNames.forEach(function (fileName) {
    //Convirtiendo a ruta absoluta el nombre del archivo (valor de retorno):
    var absolutePath = path.join(myPath, fileName);

    if (path.extname(absolutePath) == '.md') {
      directoryMdFileNames.push(absolutePath);
    }
  });
  return directoryMdFileNames;
}; //----------Función que identifica el tipo de ruta y retorna ruta absoluta-------------------


exports.readDirectorySync = readDirectorySync;

var tipeOfPath = function tipeOfPath(myPath) {
  var currentWorkPath = isAbsolutePath(myPath);

  if (currentWorkPath == true) {
    var _currentWorkPath = myPath;
    return _currentWorkPath;
  } else {
    var _currentWorkPath2 = convertToAbsolute(myPath);

    return _currentWorkPath2;
  }
}; //----------Función que lee archivos, selecciona aquellos con ext .md y obtiene sus links----


exports.tipeOfPath = tipeOfPath;

var getLinksFromMdFile = function getLinksFromMdFile(myPath) {
  var linksFromMdFile = [];
  var currentWorkPath = tipeOfPath(myPath);

  if (path.extname(currentWorkPath) == ".md") {
    //return 'It´s an .md file';
    var fileContent = fs.readFileSync(myPath, 'utf8');
    var dom = new JSDOM(marked(fileContent));
    var targetTag = dom.window.document.querySelectorAll('a');
    targetTag.forEach(function (Object) {
      linksFromMdFile.push({
        file: myPath,
        href: Object.getAttribute('href'),
        text: Object.textContent
      });
    });
    return linksFromMdFile;
  }
}; //----------Función que identifica directorios, selecciona archivos .md y obtiene sus links--


exports.getLinksFromMdFile = getLinksFromMdFile;

var getLinksFromDirectoryFiles = function getLinksFromDirectoryFiles(myPath) {
  var storeAllMdFiles = [];
  var linksFromDirectoryFiles = [];
  var currentWorkPath = tipeOfPath(myPath);
  var itsADirectory = identifiedDirectory(currentWorkPath);

  if (itsADirectory == true) {
    //return 'it´s a directory';
    var directoryMdFileNames = readDirectorySync(currentWorkPath);
    storeAllMdFiles.push(directoryMdFileNames);
  }

  var allMdFilesArray = [].concat.apply([], storeAllMdFiles);
  allMdFilesArray.forEach(function (file) {
    var fileContent = fs.readFileSync(file, 'utf8');
    var dom = new JSDOM(marked(fileContent));
    var targetTag = dom.window.document.querySelectorAll('a');
    targetTag.forEach(function (Object) {
      linksFromDirectoryFiles.push({
        file: myPath,
        href: Object.getAttribute('href'),
        text: Object.textContent
      });
    });
  });
  return linksFromDirectoryFiles;
}; //----------VALIDATE-------------------------------------------------------------------------
//option --validate, valida los links. Retorna array de links y sus propiedades: file, href, 
//status text, status y text;
//-------------------------------------------------------------------------------------------


exports.getLinksFromDirectoryFiles = getLinksFromDirectoryFiles;

var linkValidator = function linkValidator(threePropArray) {
  var promises = threePropArray.map(function (link) {
    return fetch(link.href).then(function (res) {
      return {
        file: link.file,
        href: link.href,
        text: link.text,
        statusText: res.statusText,
        status: res.status
      };
    })["catch"](function () {
      return {
        file: link.file,
        href: link.href,
        text: link.text,
        statusText: 'FAIL',
        status: 500
      };
    });
  });
  return Promise.all(promises);
}; //----------STATS----------------------------------------------------------------------------
//opción --stats, el output (salida) será un texto con estadísticas básicas sobre los links.
//opción --stats --validate, estadísticas de links, únicos y rotos.
//-------------------------------------------------------------------------------------------

/*
export const stats = (fivePropArray, option) => {
  let arrayOfLinks = fivePropArray.map(link => link.href)
  let arrayOfBrokenLinks = fivePropArray.filter(link => link.status < 200 || link.status >= 300)
  //return arrayOfLinks;
  const total = arrayOfLinks.length;
  const unique = [...new Set(arrayOfLinks)]
  if(option.validate === false) {
    return `Total: ${total} \nUnique: ${unique.length}`;
  } else {
    return `Total: ${total} \nUnique: ${unique.length} \nBroken: ${arrayOfBrokenLinks.length}`;
  }  
}
*/


exports.linkValidator = linkValidator;

var stats = function stats(fivePropArray, options) {
  var arrayOfLinks = fivePropArray.map(function (link) {
    return link.href;
  });
  var arrayOfBrokenLinks = fivePropArray.filter(function (link) {
    return link.status < 200 || link.status >= 300;
  }); //return arrayOfLinks;

  var total = arrayOfLinks.length;

  var unique = _toConsumableArray(new Set(arrayOfLinks));

  if (options.validate === false) {
    return "Total: ".concat(total, " \nUnique: ").concat(unique.length);
  } else {
    return "Total: ".concat(total, " \nUnique: ").concat(unique.length, " \nBroken: ").concat(arrayOfBrokenLinks.length);
  }
};
/*
const fivePropArray = 
[
  {
    file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    statusText: 'OK',
    status: 200
  }
]
console.log(stats(fivePropArray, {validate: false}));
*/

/*
export const stats = (fivePropArray, options) => {
  let arrayOfLinks = fivePropArray.map(link => link.href)
  let arrayOfBrokenLinks = fivePropArray.filter(link => link.status < 200 || link.status >= 300)
  //return arrayOfLinks;
  const total = arrayOfLinks.length;
  const unique = [...new Set(arrayOfLinks)]
  if(options.stats === true && options.validate === false) {
    return `Total: ${total} \nUnique: ${unique.length}`;
  } 
  if(options.stats === true && options.validate === true) {
    return `Total: ${total} \nUnique: ${unique.length} \nBroken: ${arrayOfBrokenLinks.length}`;
  }  
}
*/

/*
const fivePropArray = 
[
  {
    file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    statusText: 'OK',
    status: 200
  }
]
console.log(stats(fivePropArray, {stats: true , validate: false}));
*/

/*
> Total: 1
  Unique: 1
  Broken: 0
*/
//----------MDLINKS--------------------------------------------------------------------------
//Función mdLinks, el input (entrada) es una ruta absoluta de archivo o directorio, el output
//(salida) será un array de links y sus propiedades: file, href, text;
//-------------------------------------------------------------------------------------------


exports.stats = stats;

var mdLinks = function mdLinks(myPath, options) {
  return new Promise(function (resolve, reject) {
    var validPath = isValidPath(myPath);

    if (validPath === true) {
      var currentWorkPath = tipeOfPath(myPath);

      if (currentWorkPath === myPath) {
        var itsAFile = identifiedFile(myPath);
        var threePropArray;

        if (itsAFile === true) {
          threePropArray = getLinksFromMdFile(myPath);
        } else {
          threePropArray = getLinksFromDirectoryFiles(myPath);
        }

        if (options.validate === true) {
          linkValidator(threePropArray).then(function (fivePropArray) {
            resolve(fivePropArray);
          });
        } else {
          resolve(threePropArray);
        }
      }
    } else {
      reject(new Error('Enter new path'));
    }
  });
};
/*
mdLinks('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md', {validate: true}).then(res => {
  console.log(res);
});
*/

/*
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
        if (options.validate === true && options.stats === false) {
          linkValidator(threePropArray)
          .then(fivePropArray => {
            resolve(fivePropArray);
          });
        } 
        if(options.validate === false && options.stats === false) {
          resolve(threePropArray);
        }
      }    
    } else {
      reject(new Error('Enter new path'));
    }
  })
}
*/
//VALORES DE PRUEBA:
//console.log(mdLinks('C:\\.&4'));

/*
mdLinks('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md', {validate: false, stats: false}).then(res => {
  console.log(res);
});
*/
//console.log(mdLinks('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns'));
//-------------------------------------------------------------------------------------------
//VALORES DE PRUEBA:
//const myPath = 'C:\\.&4';
//const myPath = 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md';
//const myPath = 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns';

/*
mdLinks(myPath)
  .then(links => {
    //const resultLinks = [];
    links.forEach(link => {
      console.log(link.file, link.href, link.text);
    })
  })
  .catch(console.error);
*/
//----------
//VALORES DE PRUEBA:
//const myPath = 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md';
//> C:\Users\Estudiante\LIM013-fe-md-links\anotherReadmeFile.md https://es.wikipedia.org/wiki/Markdown Markdown OK 200
//const myPath = 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns';

/*
const urls = getMdLinks(myPath);
urls.map(link => 
fetch(link.href)
  .then(res => {
    console.log(link.file, link.href, link.text, res.statusText, res.status);
  })
  .catch(() => {
    console.log(link.file, link.href, link.text, 'FAIL', 500);
  }))   
*/


exports.mdLinks = mdLinks;