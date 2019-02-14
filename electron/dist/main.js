"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var SerialPort = require("serialport");
var baseUrl = 'http://localhost:4200';
var mainWindow;
var port = new SerialPort('/dev/ttyUSB0', function (err) {
    console.log('CRIANDO SERIAL PORT', err);
});
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({ width: 1200, height: 900 });
    mainWindow.loadURL(baseUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
SerialPort.list(function (err, ports) {
    // console.log('ports', ports);
    if (err) {
        console.log(err.message);
        return;
    }
    else {
        console.log('');
    }
    if (ports.length === 0) {
        console.log('No ports discovered');
    }
});
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
// The open event is always emitted
port.on('open', function (e) {
    console.log('OPEN EVENT CALLED', e);
});
// Switches the port into "flowing mode"
port.on('data', function (data) {
    console.log('Data:', data.toString());
});
port.write('main screen turn on', function (err) {
    if (err) {
        return console.log('Error on write: ', err.message);
    }
    console.log('message written');
});
//# sourceMappingURL=main.js.map