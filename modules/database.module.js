var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

module.exports.connect = (url) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            }
            global.db = db;
            global.ObjectId = ObjectId;
            resolve();
        });
    });
}