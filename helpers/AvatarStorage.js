// Load dependencies
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Jimp = require('jimp');
var crypto = require('crypto');
var mkdirp = require('mkdirp');
var concat = require('concat-stream');
var streamifier = require('streamifier');

// Configure UPLOAD_PATH
// process.env.AVATAR_STORAGE contains uploads/avatars
var UPLOAD_PATH = path.resolve(__dirname, '..', process.env.AVATAR_STORAGE);

// create a multer storage engine
var AvatarStorage = function (options) {

    // this serves as a constructor
    function AvatarStorage(opts) { }

    // this generates a random cryptographic filename
    AvatarStorage.prototype._generateRandomFilename = function () { }

    // this creates a Writable stream for a filepath
    AvatarStorage.prototype._createOutputStream = function (filepath, cb) { }

    // this processes the Jimp image buffer
    AvatarStorage.prototype._processImage = function (image, cb) { }

    // multer requires this for handling the uploaded file
    AvatarStorage.prototype._handleFile = function (req, file, cb) { }

    // multer requires this for destroying file
    AvatarStorage.prototype._removeFile = function (req, file, cb) { }

    // create a new instance with the passed options and return it
    return new AvatarStorage(options);

};

// export the storage engine
module.exports = AvatarStorage;
