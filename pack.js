const path = require('path');
const fs = require('fs');

function rimraf(dir_path) {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            var entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}

if (fs.existsSync('dist')) rimraf('dist');

var packager = require('electron-packager');
var options = {
    'arch': 'ia32',
    'platform': 'win32',
    'dir': './app/',
    'app-copyright': 'Leandro Carlos',
    'app-version': '1.0.0',
    'asar': false,
    'icon': './app/view/favicon.ico',
    'name': 'NetworkServer',
    'ignore': [],
    'out': '.',
    'overwrite': true,
    'prune': true,
    'version': '1.0.0',
    'version-string':{
      'CompanyName': 'Leandro Carlos',
      'FileDescription': 'NetworkServer', /*This is what display windows on task manager, shortcut and process*/
      'OriginalFilename': 'NetworkServer',
      'ProductName': 'NetworkServer',
      'InternalName': 'NetworkServer'
    }
};

packager(options).then((appPaths) => {
    console.log('complete');
    console.log(appPaths);

    fs.rename(appPaths[0], 'dist');
})