const os = require('os')
const path = require('path')
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const slash = require('slash');

const {app, BrowserWindow, Menu, ipcMain, shell} = require('electron')

// SET ENVIROMENT
process.env.NODE_ENV = 'development'
// check its production or in development
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32'  ? true : false

let mainWindow
let aboutWindow

function createMainWindow() {
    
    // Screen Size Information
    mainWindow = new BrowserWindow({
        title: "Image Shrink",
        width: isDev ? 1000 : 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true
        }
    })

    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}



function createAboutWindow() {
    
    // Screen Size Information
    aboutWindow = new BrowserWindow({
        title: "About Image Shrink",
        width: 300,
        height: 300,
        icon: './assets/icons/Icon_256x256.png',
        resizable: false,
        backgroundColor: 'white'
    })

    // load the path main application
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    aboutWindow.loadFile('./app/about.html')
}



ipcMain.on('image:minimize', (event, options) => {
    options.dest = path.join(os.homedir(), 'imageshrink')
    shrinkImage(options)
})


async function shrinkImage({ imgPath, quality, dest }) {
    try{

        const pngQuality = quality / 100

        const files = await imagemin([slash(imgPath)], {
            destination: dest,
            plugins: [
                imageminMozjpeg({ quality }), 
                imageminPngquant({ quality: [pngQuality, pngQuality] })
            ]
        })

        
        console.log(files)
        // open a folder
        shell.openPath(dest)


    }catch(err){
        console.log(err)
    }

    
}




// CREATING MENU
const menu = [

    ...(isMac ? [{ 
        label: app.name,
        submenu: [
            { 
                label: 'About', 
                click: createAboutWindow
            }
        ]
    }] : []),

    // Custom Menu
    // {
    //     label: 'File',
    //     submenu: [
    //         {
    //             label: 'Quit',
    //             accelerator: 'CmdOrCtrl+W',
    //             click: () => app.quit()
    //         }
    //     ]
    // }

    // Default Menu
    // =================================


    {
        role: 'fileMenu'
    },


    ...(!isMac ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ]
        }, 
    ] : []),

    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {type: 'separator'},
                {role: 'toggledevtools'},
            ]
        }
    ] : [])

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
    }
  })








app.on('ready', () => {
    createMainWindow()
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)


    // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())

    mainWindow.on('closed', () => mainWindow = null)
})