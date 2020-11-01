#!/usr/bin/env node

const { program } = require('commander');
const { options } = require('marked');
program.version('0.0.1');

import { mdLinks, stats } from './index.js';
var colors = require('colors/safe');

//-------------------------------------------------------------------------------------------

//-----------Grab provided args.
const [,, ...args] = process.argv


//----------Print hello world provided args.
//console.log(`Hello World ${args}`)


//----------Commands

program
    .command('md-links <path-to-file>')
    .description('Read Markdown files, print their links, validate them and print stats.')
    .option('-v, --validate', 'validate .md links')
    .option('-s, --stats', 'basic .md link stats')    
    .action((myPath, options) => {
        mdLinks(myPath, options)
            .then(links => {
                if(options.stats === true && options.validate === true) {
                    return console.log(stats(links, {validate: true}));
                }
                if(options.stats === true) {
                    return console.log(stats(links, {validate: false}));
                }     
                links.forEach(link => {
                    if(options.validate === true) { 
                        if(link.status >= 200 && link.status < 300) {
                            console.log(colors.grey(link.file), link.href, colors.green(colors.inverse(link.statusText), link.status), colors.cyan(link.text));
                        } else {
                            console.log(colors.grey(link.file), link.href, colors.red(colors.inverse(link.statusText), link.status), colors.cyan(link.text));
                        }                           
                    } else {
                        console.log(colors.grey(link.file), link.href, colors.cyan(link.text));
                    }
                })
            })
            .catch(console.error);
    });
    
program.parse(process.argv);