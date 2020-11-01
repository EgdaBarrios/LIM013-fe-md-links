#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('commander'),
    program = _require.program;

var _require2 = require('marked'),
    options = _require2.options;

program.version('0.0.1');

var colors = require('colors/safe'); //-------------------------------------------------------------------------------------------
//-----------Grab provided args.


var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2); //----------Print hello world provided args.
//console.log(`Hello World ${args}`)
//----------Commands


program.command('md-links <path-to-file>').description('Read Markdown files, print their links, validate them and print stats.').option('-v, --validate', 'validate .md links').option('-s, --stats', 'basic .md link stats').action(function (myPath, options) {
  (0, _index.mdLinks)(myPath, options).then(function (links) {
    if (options.stats === true && options.validate === true) {
      return console.log((0, _index.stats)(links, {
        validate: true
      }));
    }

    if (options.stats === true) {
      return console.log((0, _index.stats)(links, {
        validate: false
      }));
    }

    links.forEach(function (link) {
      if (options.validate === true) {
        if (link.status >= 200 && link.status < 300) {
          console.log(colors.grey(link.file), link.href, colors.green(colors.inverse(link.statusText), link.status), colors.cyan(link.text));
        } else {
          console.log(colors.grey(link.file), link.href, colors.red(colors.inverse(link.statusText), link.status), colors.cyan(link.text));
        }
      } else {
        console.log(colors.grey(link.file), link.href, colors.cyan(link.text));
      }
    });
  })["catch"](console.error);
});
program.parse(process.argv);