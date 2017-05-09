const Collection = require('../index.js').Collection;
const assert = require('assert');

const hyvalidator = require('hyvalidator');
const Arrays = require('hyvalidator').Arrays;
const Objects = require('hyvalidator').Objects;
const empty = () => { };

module.exports = () => {
    describe('Testing Collection Module', function () {
        it("Testing Collection Constructor", function (done) {
            var Test = new Collection('test');
            done();
        });
        it("Testing insert({name:'hello i\'m mocha'})", function (done) {
            var Test = new Collection('test');
            Test.insert({ name: 'hello i\'m mocha' }).subscribe(empty, empty, () => {
                done();
            });
        });
        it("Testing updateOne({name:'hello i\'m mocha'},{name:'I changed from Mocha'})", function (done) {
            var Test = new Collection('test');
            Test.updateOne({ name: 'hello i\'m mocha' }, { name: 'I changed from Mocha' }).subscribe(empty,empty,() => {
                done();
            });
        });
        it("Testing update({ name: 'I changed from Mocha' },{$set:{name:'I changed from Mocha Again'}})", function (done) {
            var Test = new Collection('test');
            Test.update({ name: 'I changed from Mocha' }, { $set: { name: 'I changed from Mocha Again' } }).subscribe(empty, empty, (data) => {
                done();
            });
        });


        it("Testing deleteById(id)", function (done) {
            var Test = new Collection('test');
            Test.deleteById('590db2cc375bcc2cddc450a5').subscribe(empty, empty, () => {
                done();
            });
        });

        it("Testing delete({ name: 'I changed from Mocha Again' })", function (done) {
            var Test = new Collection('test');
            Test.delete({ name: 'I changed from Mocha Again' }).subscribe(empty, empty, () => {
                done();
            });
        });

        it("Testing find({})", function (done) {
            var Test = new Collection('test');
            Test.find({}).subscribe(empty, empty, () => {
                done();
            });
        });
        it("Testing findOne({})", function (done) {
            var Test = new Collection('test');
            Test.findOne({}).subscribe(empty, empty, () => {
                done();
            });
        });
        it("Testing findById(id)", function (done) {
            var Test = new Collection('test');
            Test.findById('590db2cc375bcc2cddc450a5').subscribe(empty, empty, () => {
                done();
            });
        });
    });
}