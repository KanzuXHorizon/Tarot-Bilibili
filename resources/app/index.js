
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800, // Độ rộng của cửa sổ
    height: 600, // Chiều cao của cửa sổ
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false

    },
  });

  win.loadFile('index.html'); // Tên file HTML chứa giao diện của chương trình

  // Uncomment code below to open DevTools by default
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

