const merge = require('merge-package-json');
const glob = require("glob")
const fs = require('fs');


// options is optional
glob("MicroServices/**/package.json", {}, function (er, files) {
    const content = files.reduce((acc, cur)=>{return merge(require('./'+cur),acc)}, require('./package_src.json'))
    fs.writeFile('./package.json', content, function (err) {   if (err) throw err;   console.log('Fichier créé !');});
})

// let files=[]
// files[0] = require('package.json');
// files[0] = require('MicroServices/AdminService/package.json');
// files[0] = require('MicroServices/DispatchService/package.json');
// files[0] = require('MicroServices/MessageService/package.json');
// files[0] = require('MicroServices/BidService/package.json');

//  dst = merge(files[0], 'package.json');
// // // Create a new `package.json`
//  console.log(dst);
// console.log(merge(files[1], dst));