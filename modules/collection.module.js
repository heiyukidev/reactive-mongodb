const Observable = require('rxjs/Rx').Observable;
const hyvalidator = require('hyvalidator');
const Strings = require('hyvalidator').Strings;


validateId = (id) => {
    var rules = new Strings.Rule;
    rules.setLength(24);
    var hyerrors = hyvalidator.validate(id, rules);
    return hyerrors;
}
//Collection Class
class Collection {
    constructor(name) {
        this.collection = global.db.collection(name);
    }
    insert(object) {
        return Observable.create(
            (observer) => {
                this.collection.insert(object, (err, data) => {
                    if (err) {
                        observer.error(err);
                    }
                    observer.next(data);
                    observer.complete();
                });
            });
    }
    updateOne(object, newObject) {
        return Observable.create(
            (observer) => {
                this.collection.update(object, newObject, { multi: false }, (err, data) => {
                    if (err) {
                        observer.error(err);
                    }
                    observer.complete();
                });
            });
    }
    update(object, newObject) {
        return Observable.create(
            (observer) => {
                if (newObject.$set) {
                    this.collection.update(object, newObject, { multi: true }, (err, data) => {
                        if (err) {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error("You have to specifie the fields to update : update(query,{$set{fields:values}})");
                }
            });
    }
    updateById(id, newObject) {
        return Observable.create(
            (observer) => {
                var hyerrors = validateId(id);
                if (hyerrors === null) {
                    this.collection.update({ _id: ObjectId(id) }, newObject, { multi: true }, (err, data) => {
                        if (err) {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(hyerrors);
                }
            });
    }

    delete(query) {
        return Observable.create(
            (observer) => {
                this.collection.remove(query, { justOne: false }, (err, data) => {
                    if (err) {
                        observer.error(err);
                    }
                    observer.complete();
                });
            });
    }
    deleteById(id) {
        return Observable.create(
            (observer) => {
                var hyerrors = validateId(id);
                if (hyerrors === null) {
                    this.collection.remove({ _id: ObjectId(id) }, { justOne: true }, (err, data) => {
                        if (err) {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(hyerrors);
                }
            });
    }

    find(query) {
        return Observable.create(
            (observer) => {
                this.collection.find(query).toArray((err, data) => {
                    if (err) {
                        observer.error(err);
                    }
                    for (var i = 0; i < data.length; i++) {
                        observer.next(data[i]);
                    }
                    observer.complete();
                });
            });
    }
    findOne(query) {
        return Observable.create(
            (observer) => {
                this.collection.find(query).toArray((err, data) => {
                    if (err) {
                        observer.error(err);
                    }
                    if (data.length > 0) {
                        observer.next(data[0]);
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                });
            });
    }

    findById(id) {
        return Observable.create(
            (observer) => {
                var hyerrors = validateId(id);
                if (hyerrors === null) {
                    this.collection.find({ _id: ObjectId(id) }).toArray((err, data) => {
                        if (err) {
                            observer.error(err);
                        }
                        if (data.length > 0) {
                            observer.next(data[0]);
                        } else {
                            observer.next(null);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(hyerrors);
                }
            });
    }
}

module.exports = Collection;