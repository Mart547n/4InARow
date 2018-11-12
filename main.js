const {
    app,
    BrowserWindow
} = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        fullscreenable: false,
        resizable: false,
        autoHideMenuBar: true,
        title: "Four In A Rowx",
    })
    //win.setIcon(`${__dirname}/assets/images/icon.svg`);
    win.loadFile(`${__dirname}/lib/src/html/index.html`);

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