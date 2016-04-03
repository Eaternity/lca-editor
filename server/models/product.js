const mongoose = require('mongoose');
const mongoosify = require('mongoosify');
const fse = require('fs-extra');

// Load json schema file. This file is used as template to create a
// mongoose Schema. (Synchronous fse.readJsonSync() here for simplicity...)
// Path is relative to the entry point script (main.js when electron...)
var jsonSchemaFile = fse.readJsonSync('./server/models/camelCase.schema.json', 'utf8');
var mongoosifySchema = mongoosify(jsonSchemaFile);
var Schema = mongoose.Schema;
var productSchema = new Schema(mongoosifySchema);

module.exports = mongoose.model('Product', productSchema);
