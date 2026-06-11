const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

let win;
let tray;

function createWindow() {

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadURL(
    "https://waterbridge-chat-server-production.up.railway.app/admin"
  );

  win.on("close", (e) => {
    e.preventDefault();
    win.hide();
  });
}

app.whenReady().then(() => {

  createWindow();

  const icon = nativeImage.createFromPath(
    path.join(__dirname, "assets/icon.ico")
  );

  tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {
      label: "열기",
      click: () => win.show()
    },
    {
      label: "종료",
      click: () => {
        app.exit();
      }
    }
  ]);

  tray.setContextMenu(menu);

  tray.on("click", () => {
    win.show();
  });
});