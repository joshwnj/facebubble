'use strict'

const { 
  app, 
  BrowserWindow,
  globalShortcut
} = require('electron')

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 150,
    height: 150,
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true
  })
  
  win.loadURL(`file://${__dirname}/browser/index.html`)

  const hotkey = globalShortcut.register('Command+Control+Option+F', () => {
    const isVisible = win.isVisible()

    if (isVisible) {
      win.hide()
    } else {
      win.show()
    }
  })
})
