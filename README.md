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
![Pseudocodigo](/src/images/Pseudocodigo.jpg)


### Board
https://github.com/EgdaBarrios/LIM013-fe-md-links/projects/1
