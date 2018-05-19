#!/usr/bin/env node
let package = require('../package.json');
var program = require('commander');

program
    .version(package.version)
    .option('-p, --port [port]', 'set especific port')
    .parse(process.argv);


var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/../dist'));
let port =  program.port || 8000;
app.listen(port);

console.log(`Angular editor [${package.version}] is initialized.`);
console.log(`Listening on port ${port}`);