const merge = require('merge-package-json');
const glob = require("glob")
const fs = require('fs');


// options is optional
glob("MicroServices/**/package.json", {}, function (er, files) {
    const content = files.reduce((acc, cur)=>{return merge(require('./'+cur),acc)}, require('./package_src.json'))
    fs.writeFile('./package.json', content, function (err) {   if (err) throw err;   console.log('Fichier créé !');});
})