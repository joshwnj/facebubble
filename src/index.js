'use strict'

const { 
  app, 
  BrowserWindow,
} = require('electron')

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 150,
    height: 150,
    frame: false,
    resizable: false,
    transparent: true
  })
  
  win.loadURL(`file://${__dirname}/browser/index.html`)
})
