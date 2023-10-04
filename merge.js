const glob = require("glob");
const fs = require("fs");
const { execSync } = require("child_process");

// Define the packages to check
const packagesToCheck = ["prettier-package-json", "merge-package-json"];

// Check if each package is installed
for (const packageName of packagesToCheck) {
    const buff = execSync(`pnpm list ${packageName}`);
    if(buff.buffer.byteLength === 0) {
        console.log(`Package '${packageName}' is not installed. Installing...`);
        execSync(`pnpm add ${packageName} --save-dev`);
    }
}
console.log("All required packages are installed.");
const merge = require("merge-package-json");


// options is optional
glob("MicroServices/**/package.json", {}, function (er, files) {
  const content = files.reduce((acc, cur) => {
    return merge(require("./" + cur), acc);
  }, require("./package_src.json"));
  fs.writeFile("./package.json", content, function (err) {
    if (err) throw err;
    console.log("Fichier créé !");
  });
});
