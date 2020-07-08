const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = require('electron')
const remote = require('electron').remote;
const path = require('path');
const { electron } = require('process');
const { options } = require('node-os-utils');
const axios = require('axios')

const Store = require('./Store')


// Init Store and defaults
const store = new Store({
    configName: 'user-login',
    defaults: {
      login: {
        fullname: '', 
        email: '',
        password: '',
      }
    }
  })
  


// SET ENVIROMENT
process.env.NODE_ENV = 'development'
// check its production or in development
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32'  ? true : false

let appWidth = 450
let appHeight = 600
let mainWindow
let networkWindow
let permissionWindow

function createMainWindow() {
    
    // Screen Size Information
    mainWindow = new BrowserWindow({
        title: "Image Shrink",
        width: appWidth,
        height: appHeight,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
        },
    })

    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')


}


ipcMain.on('login:check', (event, options) => {
    // check permission 
    console.log(options)
    axios.post('http://localhost:8000/api/login/', {
        email: options.email,
        password: options.password
    })
    .then((res) => {
        store.set('login', res.data.data)
        createNetworkWindow()
    })
    .catch((error) => {
        console.error(error)
    })



    // Move to the another page.
})



ipcMain.on('index:permission', (event, options) => {
    // Close current window 
    console.log(store.get('login').fullname)
    if(store.get('login').fullname === ''){
        createMainWindow()
    }else{
        createNetworkWindow()
    }
    
    permissionWindow.close()
    // mainWindow.close();

})


ipcMain.on('network:create', (event, options) => {
    // Close current window 
    createNetworkWindow();
    // mainWindow.close();

})


//      PERMISSION WINDOW
// ===============================================================
function createPermissionWindow() {
    
    // Screen Size Information
    permissionWindow = new BrowserWindow({
        title: "Network Permission",
        width: appWidth,
        height: appHeight,
        icon: path.join(__dirname, 'assets', 'icons', 'Icon_256x256.png'),
        resizable: true,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
        },
    })


    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    permissionWindow.loadFile('./app/permission.html')
}


//      NETWORK WINDOW
// ===============================================================
function createNetworkWindow() {
    
    // Screen Size Information
    networkWindow = new BrowserWindow({
        title: "About Image Shrink",
        width: appWidth,
        height: appHeight,
        icon: path.join(__dirname, 'assets', 'icons', 'Icon_256x256.png'),
        resizable: true,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
        },
    })

    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    networkWindow.loadFile('./app/network.html')
}


// CREATING MENU
const menu = [

    ...(isMac ? [
        { role: 'appMenu'}
    ] : []),

    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+W',
                click: () => app.quit()
            }
        ]
    }
]

// menu for mac
// if(isMac){
//     menu.unshift({ role: 'appMenu' })
// }











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
      createNetworkWindow()
    }
  })








app.on('ready', () => {
    createPermissionWindow()
    // const mainMenu = Menu.buildFromTemplate(menu)
    // Menu.setApplicationMenu(mainMenu)


    // globalShortcut.register('CmdOrCtrl+R', () => {
    //     mainWindow.reload()
    // })
    // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => {
    //     mainWindow.toggleDevTools()
    //     mainWindow.toggleDevTools()
    // })

   
    

    permissionWindow.on('closed', () => permissionWindow = null)
})


