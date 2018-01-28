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

  let mouseFollowIntervalId
  let isFollowingMouse = false

  const mouseFollowMenuItem = new MenuItem({
    label: 'Follow the mouse',
    type: 'checkbox',
    click () {
      isFollowingMouse ? stopMouseFollow() : startMouseFollow()
    },
    accelerator: 'CmdOrCtrl+C'
  })

  let isBig = false
  const toggleSizeMenuItem = new MenuItem({
    label: 'Make it big',
    type: 'checkbox',
    click () {
      isBig = !isBig
      toggleSizeMenuItem.checked = isBig
      if (isBig) {
        win.setSize(600, 600, true)
      }
      else {
        win.setSize(150, 150, true)
      }
    },
    accelerator: 'CmdOrCtrl+B'
  })

  function startMouseFollow () {
    stopMouseFollow()
    isFollowingMouse = true
    mouseFollowMenuItem.checked = true
    mouseFollowIntervalId = setInterval(() => {
      const { x, y } = electron.screen.getCursorScreenPoint()
      win.setPosition(x, y)
    }, 10)
  }

  function stopMouseFollow () {
    isFollowingMouse = false
    mouseFollowMenuItem.checked = false
    clearInterval(mouseFollowIntervalId)
  }

  win.on('blur', () => stopMouseFollow())

  const hotkey = globalShortcut.register('Cmd+Ctrl+Alt+F', () => {
    const isVisible = win.isVisible()
    stopMouseFollow()
    if (isVisible) {
      win.focus()
    } else {
      win.show()
    }
  })

  const template = [
    {
      label: 'Facebubble',
      submenu: [
        mouseFollowMenuItem,
        toggleSizeMenuItem
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
