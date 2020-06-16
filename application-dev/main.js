const {app, BrowserWindow} = require('electron')

// SET ENVIROMENT
process.env.NODE_ENV = 'development'
// check its production or in development
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32'  ? true : false

let mainWindow

function createMainWindow() {
    
    // Screen Size Information
    mainWindow = new BrowserWindow({
        title: "Image Shrink",
        width: 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev
    })

    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')


}




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })




app.on('ready', createMainWindow)