# mdLinks

## Índice

* [1. Qué es mdLinks?](#1-qué-es-mdLinks?)
* [2. Instalación](#2-instalación)
* [3. Uso](#3-uso)
* [4. Sobre el Proyecto](#4-sobre-el-proyecto)


***

## 1. Qué es mdLinks?

Es una librería construida para leer y analizar archivos en formato Markdown, verificando e imprimiendo tanto los _links_ (vínculos/ligas) contenidos en ellos, como reportar algunas estadísticas simples de su estado.

Esta útil herramienta está disponible para interactuar mediante la línea de comando (CLI), permitiéndole al usuario acceder al sistema de archivos y servidores.


## 2. Instalación

```sh
npm install --global EgdaBarrios/md-links
```


## 3. Uso

Ejecutar la aplicación de la siguiente manera a través de la terminal:
```sh
md-links <path-to-file>
``` 
Por ejemplo:
![Ejecutable por default](/src/images/default.jpg)

El comportamiento por defecto/default identifica el archivo markdown (a partir de la ruta que recibe como argumento), lo analiza e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link.


### Opción --validate:
```sh
md-links <path-to-file> --validate
``` 
Por ejemplo:
![Ejecutable con opción --validate](/src/images/validate.jpg)

Esta opción valida si el link funciona o no.


### Opción --stats:
```sh
md-links <path-to-file> --stats
``` 
Por ejemplo:
![Ejecutable con opción --stats](/src/images/stats.jpg)

Esta opción imprime estadísticas básicas sobre los links.


### Opción --stats --validate:
```sh
md-links <path-to-file> --stats --validate
``` 
Por ejemplo:
![Ejecutable con opción --stats --validate](/src/images/stats_validate.jpg)

Al combinar ambas opciones, se obtenen estadísticas que necesiten de los resultados de la validación.


***

## 4. Sobre el Proyecto

### Planteamiento del Problema

Para este ejercicio, debimos alejarnos un poco del navegador para construir un programa que se ejecute usando Node.js, que es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. 


### Especificaciones Técnicas

#### Dependencias/dependencies
* [ ] marked
* [ ] node-fetch
* [ ] commander
* [ ] colors

#### Módulos/modules
* [ ] path
* [ ] fs
* [ ] jsdom
* [ ] fetch


### Diagrama de Flujo
![diagrama de flujo](/src/images/diagrama_de_flujo.jpg)


### Pseudocódigo
1. Instalar módulo vía npm install --global Egda-Barrios/md-links. 
2. Ejecutar invocando en la línea de comando como una interfaz que podamos importar con   require para usarlo programáticamente: 
const mdLinks = require("md-links");
3. Imprime en la interfaz Mensaje de Bienvenida/ explicativo.
4. CLI: Usuario ingresa ruta de archivo/directorio.
  4.1. <path-to-file>: standard output
	  4.1.1. Identificación de la ruta de acceso:
		  4.1.1.1. Válida: Si
			  4.1.1.1.1. Absoluta> Ir a 4.1.2.
        4.1.1.1.2. Relativa: 
          4.1.1.1.2.1. Convertir a absoluta en relación al directorio desde donde se invoca node (current working directory).
          4.1.1.1.2.2.> Ir a 4.1.2.
			4.1.1.2. Válida: No (Inválida):
				4.1.1.2.1. Imprime Mensaje de alerta: Ruta inválida!
		4.1.2. Identificación de archivo o directorio:
			4.1.2.1. Archivo:
				4.1.2.1.1> Ir a 4.1.3.
			4.1.2.2. Directorio:
				4.1.2.2.1. Extrae la información del directorio.
				4.1.2.2.2> Ir a 4.1.3.
		4.1.3. Búsqueda e identificación de archivos.md: Es archivo.md?
			4.1.3.1. Si> Ir a 4.1.4.
			4.1.3.2. No:
				4.1.3.2.1. Ingresar nueva ruta> 4.1.
		4.1.4. Análisis de(los) archivo(s) .md
			4.1.4.1. Si encuentra link:
        4.1.4.1.1. Imprime ruta + link + texto.
        4.1.4.1.2. Ingresar nueva ruta> 4.1.
        4.1.4.1.3. Fin.
      4.1.4.2. No encuentra link:
				4.1.4.2.1. Imprime Mensaje de alerta: No hay coincidencias!
        4.1.4.2.2. Ingresar nueva ruta> 4.1.
        4.1.4.2.3. Fin.
  4.2. <path-to-file> --validate: Función que recorre la lista para verificar el estado de los enlaces: Hace petición HTTP:
	  4.2.1. Flujo del standard output: Array de tres propiedades +
    4.2.2. Retorna OK, si el link resulta en una redirección a una URL que responde ok. Retorna FAIL, si no.
    4.2.3. Ingresar nueva ruta> 4.1.
    4.2.4. Fin.
  4.3. <path-to-file> --stats:
    4.3.1. Flujo del standard output: Array de tres propiedades +
    4.3.2. Imprime stats (cantidad de links y cantidad de links únicos).
    4.3.3. Ingresar nueva ruta> 4.1.
    4.4.4. Fin.
  4.4. <path-to-file> --stats --validate:
    4.4.1. Flujo del standard output: Array de tres propiedades +
    4.4.2. Imprime stats (cantidad de links y cantidad de links únicos) +
    4.4.3. Estado de links (rotos).
    4.3.4. Ingresar nueva ruta> 4.1.
    4.4.5. Fin.		
5. [FIN]> Salir.


### Board
https://github.com/EgdaBarrios/LIM013-fe-md-links/projects/1
