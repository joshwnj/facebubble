'use strict'

const electron = require('electron')
const { 
  app, 
  BrowserWindow,
  globalShortcut,
  Menu,
  MenuItem
} = electron

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
  const template = [
    {
      label: 'Facebubble',
      submenu: [
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'quit'}
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
