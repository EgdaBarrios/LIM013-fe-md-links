// const mdLinks = require('../');

import { isValidPath, isAbsolutePath, convertToAbsolute, identifiedFile, 
  identifiedDirectory, isMdFile, readFileContent, readDirectorySync,
  tipeOfPath, getLinksFromMdFile, getLinksFromDirectoryFiles } from '../src/index.js';

import path from 'path';

import { mdLinks, stats } from '../src/index.js';

//-------------------------------------------------------------------------------------------

/*
describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
*/

//-------------------------------------------------------------------------------------------

//----------isValidPath input: path/ruta (string) output: true/false (boolean)> TEST PASSED

describe('isValidPath', () => {
  it('Espero que retorne true para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\Readme.md', () => {
    expect(isValidPath('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\Readme.md')).toBe(true); 
  })

  it('Espero que retorne false para la ruta: markdowns\Readme.md', () => {
    expect(isValidPath('C:\\.&4')).toBe(false); 
  })
})


//----------isAbsolutePath input: path/ruta (string) output: true/false (boolean)> TEST PASSED

describe('isAbsolutePath', () => {
  it('Espero que retorne true para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\Readme.md', () => {
    expect(isAbsolutePath('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\Readme.md')).toBe(true); 
  })

  it('Espero que retorne false para la ruta: markdowns\Readme.md', () => {
    expect(isAbsolutePath('markdowns\Readme.md')).toBe(false); 
  })
})


//----------convertToAbsolute input: relative path/ruta (string) output: absolute path/ruta (string)> TEST PASSED

describe('convertToAbsolute', () => {
  it('Debería convertir ruta relativa en absoluta y retornar resultado', () => {
    const resolveSpy = jest.spyOn(path, 'resolve').mockReturnValueOnce('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos\\readme.md');
    const actual = convertToAbsolute('markdowns\masarchivos\readme.md');
    expect(actual).toBe('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos\\readme.md');
    expect(resolveSpy).toBeCalledWith('markdowns\masarchivos\readme.md');
    resolveSpy.mockRestore();
  });

  //--------convertToAbsolute input: tyoeof output: function> TEST PASSED
  it('Debería ser una función', () => {
    expect(typeof convertToAbsolute).toBe('function');
  })

  //--------convertToAbsolute input: value output: string> TEST PASSED
  it('Debería ser y retornar un string', () => {
    expect(typeof 'markdowns\example.md').toBe('string');
  })
});


//----------identifiedFile input: path/ruta (string) output: true/false (boolean)> TEST PASSED

describe('identifiedFile', () => {
  it('Debería retornar true para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\example.md', () => {
    expect(identifiedFile('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\example.md')).toBe(true); 
  })

  it('Debería retornar false para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\masarchivos', () => {
    expect(identifiedFile('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos')).toBe(false); 
  })
});


//----------identifiedDirectory input: path/ruta (string) output: true/false (boolean)> TEST PASSED

describe('identifiedDirectory', () => {
  it('Debería retornar true para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\masarchivos', () => {
    expect(identifiedDirectory('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos')).toBe(true); 
  })

  it('Debería retornar false para la ruta: C:\Users\Estudiante\LIM013-fe-md-links\markdowns\example.md', () => {
    expect(identifiedDirectory('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\example.md')).toBe(false); 
  })
});


//----------isMdFile input: path/ruta (string) output: extension of file (string)> TEST PASSED

describe('isMdFile', () => {
  it('Debería retornar extensión de archivos', () => {
    expect(isMdFile('C:\\Users\\Estudiante\\LIM013-fe-md-links\\masarchivos\\otherexample.md')).toBe('.md');
  })
});


//----------readFileContent input: path/ruta (string) output: content (string)> TEST PASSED

describe('readFileContent', () => {
  it('Debería retornar su contenido', () => {
    expect(readFileContent('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md')).toBe('[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado...');
  })
});


//----------readDirectorySync input: path/ruta (string) output: arreglo de nombres de archivos .md (string)> TEST PASSED

describe('readDirectorySync', () => {
  it('Debería retornar arreglo de nombres de archivos .md', () => {
    expect(readDirectorySync('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos'))
    .toBe[
            'C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos\\otherexample.md', 
            'C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos\\readme.md',      
            'C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\masarchivos\\thirdexample.md' 
          ];
  })
});


//----------tipeOfPath input: path/ruta (string) output: currentWorkPath (string)> TEST PASSED

describe('tipeOfPath', () => {
  it('Debería confirmar si la ruta es absoluta y retornarla', () => {
    expect(tipeOfPath('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\Readme.md')).toBe('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\Readme.md');
  }),

  it('Debería convertir a absoluta la ruta relativa recibida', () => {
    expect(tipeOfPath('markdowns\\Readme.md')).toBe('C:\\Users\\Estudiante\\LIM013-fe-md-links\\markdowns\\Readme.md');
  })
});


//----------getLinksFromMdFile input: ruta(s) absoluta(s) de archivo(s) (string) output: fileLinks (array de links y sus propiedades: file, href, text)> TEST PASSED

describe('getLinksFromMdFile', () => {
  it('Debería recibir ruta ruta absoluta de archivos .md y retornar array de links', () => {
    expect(getLinksFromMdFile('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md'))
    .toBe[
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://nodejs.org/',
        text: 'Node.js'
      }
    ];
  })
});


//----------getLinksFromMdFile input: currentWorkPath (string) output: array de link(s) de archivo(s) .md de directorio> TEST PASSED

describe('getLinksFromDirectoryFiles', () => {
  it('Debería recibir ruta absoluta y retornar array de link(s) de archivo(s) .md contenidos en el directorio', () => {
    expect(getLinksFromDirectoryFiles('C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder'))
    .toBe[
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import',
        text: 'import'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
        text: 'export'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        text: 'Uso de callbacks.'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
        text: 'Consumo de Promesas.'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
        text: 'Creación de Promesas.'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://nodejs.org/api/fs.html',
        text: 'fs'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://nodejs.org/api/path.html',
        text: 'path'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://www.npmjs.com/',
        text: 'npm'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
        text: '(CommonJS)'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://docs.npmjs.com/files/package.json',
        text: 'Configuración de package.json.'
      },
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\someTestFolder',
        href: 'https://docs.npmjs.com/misc/scripts',
        text: 'Configuración de npm-scripts'
      }
    ]
  })
});


//----------mdLinks input: ruta absoluta de archivo o directorio output: array de tres o cinco propiedades (file, href, status text, status y text)> TEST PASSED

describe('mdLinks', () => {
  it('Debería recibir ruta absoluta de archivo o directorio y retornar array de tres propiedades', () => {
    expect(mdLinks('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md', {validate: false}))
    .toBe[
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
      }
    ]
  })

  it('Debería recibir ruta absoluta de archivo o directorio y retornar array de cinco propiedades', () => {
    expect(mdLinks('C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md', {validate: true}))
    .toBe[
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        statusText: 'OK',
        status: 200
      }
    ]
  })
});


//----------stats input: fivePropArray (array de cinco propiedades, res> mdLinks, validate: true/false ) output: estadísticas básicas con/sin enlaces rotos>  TEST PASSED

describe('stats', () => {
  it('Debería recibir array de cinco propiedades y retornar estadisticas básicas: cant de link y únicos', () => {
    expect(stats([
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        statusText: 'OK',
        status: 200
      }
    ], {validate: false})).toEqual('Total: 1 \nUnique: 1');
  })

  it('Debería recibir array de cinco propiedades y retornar estadisticas: cant de link, únicos y broken', () => {
    expect(stats([
      {
        file: 'C:\\Users\\Estudiante\\LIM013-fe-md-links\\anotherReadmeFile.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        statusText: 'OK',
        status: 200
      }
    ], {validate: true})).toEqual('Total: 1 \nUnique: 1 \nBroken: 0');
  })
});
