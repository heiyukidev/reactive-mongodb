const connect = require('../index.js').connect;
const assert = require('assert');

module.exports = () => {
    describe('Testing Mongo Connection ', function () {
        it("Connecting to local database", function (done) {
            connect("mongodb://127.0.0.1:27017/test").then(() => {
                done();
            }, (err) => {
                console.log(err);
            });
        });
    });
}