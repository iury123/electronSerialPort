import { app, BrowserWindow } from 'electron';
import * as SerialPort from 'serialport';

const baseUrl = 'http://localhost:4200';
let mainWindow;
const port = new SerialPort('/dev/ttyUSB0', (err) => {
    console.log('CRIANDO SERIAL PORT', err);
});

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1200, height: 900 });
    mainWindow.loadURL(baseUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


SerialPort.list((err, ports) => {
    // console.log('ports', ports);
    if (err) {
        console.log(err.message);
        return;
    } else {
        console.log('');
    }
    if (ports.length === 0) {
        console.log('No ports discovered');
    }
});


app.on('ready', createWindow);
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


// The open event is always emitted
port.on('open', (e) => {
    console.log('OPEN EVENT CALLED', e);
});

// Switches the port into "flowing mode"
port.on('data', (data) => {
    console.log('Data:', data.toString());
});

port.write('main screen turn on', (err) => {
    if (err) {
        return console.log('Error on write: ', err.message)
    }
    console.log('message written');
});
