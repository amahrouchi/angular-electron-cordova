const {app, BrowserWindow} = require('electron');
const url                  = require("url");
const path                 = require("path");

// Prepare the main window var
let win = null;
const args             = process.argv.slice(1);
const serve            = args.some(val => val === '--serve');

/**
 * Create the main window
 * @return {BrowserWindow}
 */
function createWindow() {
    // Create the browser window
    win = new BrowserWindow({
        width          : 1000,
        height         : 700,
        webPreferences : {
            nodeIntegration            : true,
            worldSafeExecuteJavaScript : true
        }
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron : require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4201');
    } else {
        // Load the index.html file
        win.loadURL(
            url.format({
                pathname : path.join(__dirname, `/electron-build/index.html`),
                protocol : "file:",
                slashes  : true
            })
        );
    }

    win.webContents.openDevTools(); // TODO: do this only on DEV mode

    win.on('closed', () => {
        win = null;
    });
}

// Create the initial window
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
