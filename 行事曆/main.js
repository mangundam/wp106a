const {app, BrowserWindow} = require('electron')

function createWindow () {
  var win = new BrowserWindow({width: 1000, height: 600})
  win.loadURL('file://' + __dirname + '/index.html')
}

app.on('ready', createWindow)
