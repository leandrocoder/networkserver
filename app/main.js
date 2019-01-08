const { NetManager } = require('lcnet/server');
const Config = require("./config.json");
const Path = require('path');
const FS = require('fs');

//#region Start Electron

var electronApp = true;
process.argv.forEach(function (val, index, array) {
    if (val == 'nowindow') electronApp = false;
});

function initElectronView()
{
    const { app, BrowserWindow } = require('electron')
    let win = null;

    function createWindow () {
        win = new BrowserWindow({ 
            minWidth:   800,
            minHeight:  500,
            width:      800,
            height:     500,
            frame:      true
        })


		let isDev = [...process.argv].indexOf('-dev') > -1;

		if (isDev)
		{
            win.loadURL('http://localhost:8080/');
            win.webContents.openDevTools();
		}
		else
		{
			win.loadFile('./view/index.html');
		}
		
        //win.loadFile('index.html');
        win.setMenu(null);
        
        
        win.setTitle("Server");
        win.on('closed', () => {
            win = null
        })

        main(win);
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

function main(electronWindow)
{
    global.args = [...process.argv];
    global.args.unshift(__dirname);
    global.config = Config;
    global.electronWindow = electronWindow;
    global.extension = {};

    // LOAD EXTENSION
    if (false && global.args.length >= 4)
    {
        global.extension.path = Path.join(__dirname, global.args[3]);
        global.extension.config = require(Path.join(global.extension.path, "app.json"));
        global.extension.scriptPath = Path.join(global.extension.path, global.extension.config.script);
        global.extension.scriptClass = require(global.extension.scriptPath);
        global.extension.viewPage =  global.extension.config.view ? Path.join(global.extension.path, global.extension.config.view) : null;

        if (global.extension.config && global.extension.config.server)
        {
            global.config.server = global.extension.config.server;
        }

        if (electronWindow != null)
        {
            electronWindow.setTitle(global.extension.config.title);

            if (global.extension.viewPage)
                electronWindow.loadFile(global.extension.viewPage);
        } 
    }

    global.app = new NetManager(global.config);
    if (global.extension.scriptClass != null)
    {
        let scriptClass = global.extension.scriptClass;
        global.extension.script = new scriptClass(global.app);
    }
}
