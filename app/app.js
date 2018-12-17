const Main = require('./main.js');
const Config = require("./config.json");

//#region Start Electron

var electronApp = true;
process.argv.forEach(function (val, index, array) {
    if (val == 'nowindow') electronApp = false;
});

function initElectronView()
{
    const { app, BrowserWindow } = require('electron')

    let win

    function createWindow () {
        main();
        win = new BrowserWindow({ width: 800, height: 600 })
        //win.loadFile('index.html');
        win.setMenu(null);
        win.loadURL('http://localhost:8080/') 
        win.webContents.openDevTools();
        win.on('closed', () => {
            win = null
        })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (win === null) {
            createWindow()
        }
    })
}

if (electronApp == true)
{
    initElectronView();
}
else
{
    main();
}
//#endregion

// ========================================

function main()
{
    /*
    global.config = Config;
    console.log(global.config);
    global.dataManager = new DataManager(global.config.type, global.config.port);
    global.dataManager.init("websocket", 5000);
    */
   global.config = Config;
   global.app = new Main();
}
