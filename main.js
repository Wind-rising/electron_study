const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    // win.webContents.openDevTools();
}
function eventHandler(eventName){
    console.log(eventName,)
    app.on(eventName,(e)=>{
        console.log(eventName,e)
    })
}
const eventList = [
    'will-finish-launching',
    'ready',
    
]
eventHandler('will-finish-launching');
// app.on('will-finish-launching', (e) => {
//     console.log(e)
//     app.quit()
// })
// app.on('ready', () => {
//     app.quit()
// })
// app.on('window-all-closed', () => {
//     app.quit()
// })
app.whenReady().then(() => {  
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})