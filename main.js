const {
    app,
    BrowserWindow
} = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 520,
        height: 600,
        frame: false,
        fullscreenable: false,
        resizable: false,
    })
    //win.setIcon(`${__dirname}/assets/images/icon.svg`);
    win.loadFile(`${__dirname}/src/html/index.html`);

    win.webContents.openDevTools();


    win.on('closed', () => {
        // Closes the window
        win = null;
    })
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})