'use strict'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const mongoose = require('mongoose');
const config = require('./config');
const exec = require('child_process').exec;
const express = require('express');
const expressApp = express();
const basicRouter = require('./server/routes/basic')(expressApp, express);
const apiRouter = require('./server/routes/api')(expressApp, express);


// Mongodb stuff ---------------------------------------------------------------

// Start mongodb. Actually, a shell is spawned as a child provcess and executes
//the commands given as arguments
const child = exec('mongod --dbpath ' + config.databasePath,
    function(error, stdout, stderr) {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });

// open connection do mongodb
mongoose.connect(config.database);

// Verify sucessful connection, throw error when there is a connction problem
mongoose.connection.once('open', function() {
    console.log('Successfully connected to: ' + config.database);
});
mongoose.connection.on('error', function() {
    console.error.bind(console, 'connection error:')
});


// Set up express app ----------------------------------------------------------

expressApp.use('/', basicRouter);
expressApp.use('/api', apiRouter);
expressApp.use(express.static('client'));
expressApp.listen(3002, function() {
    console.log('express app listening on port 3002');
});


// electron --------------------------------------------------------------------

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Create main window
app.on('ready', function() {

    var mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000
    });

    // Point electron to express server
    mainWindow.loadURL('http://127.0.0.1:3002/');

    // open dev tools
    mainWindow.openDevTools();

    // // open edit window when table row is double clicked
    // ipcMain.on('open-edit-window', function(event, productId) {
    //     var editWindow = new BrowserWindow({
    //         width: 800,
    //         height: 400
    //     });
    //     editWindow.loadURL('http://127.0.0.1:3000/edit');
    //     editWindow.openDevTools();
    //     console.log(productId);
    //     // reply to ipcRenderer! you could directly send the product
    //     // specific data back! 'pong'
    //     event.sender.send('asynchronous-reply', 'pong');
    //
    // });

    // stay with single page (it'a an SPA after all ;-)
    ipcMain.on('open-edit-window', function (event, productName) {
        console.log(pruductName);
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {

        // terminate mongoose connection
        mongoose.connection.close();

        // kill the child process (mongodb)
        child.kill('SIGINT');

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

});
