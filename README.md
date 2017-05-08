# Reactive-MongoDB

Reactive-MongoDB is An ODM for MongoDB with very strict data types/stucture. It is Based on Observable (with RxJS).

## Why Observables

You can read about all the benefits of the Reactive approach (Reactive Architectures) here : [RxJS5](https://github.com/ReactiveX/rxjs)

Use RxJS's Operators you can work easily on your mongodb documents and define complexe behaviors in an easy to reason about way.

## What's New

Currently working on data models so you can specifie the structure of your JSON objects and validate them before inserting them into your database. I made a module [hyvalidator](https://github.com/heiyukidev/hyvalidator) specificly for data validation, I plan on using it for this module to validate the data models.

## Suggestions

Always Open For [Suggestions](https://github.com/heiyukidev/reactive-mongodb/issues). you can leave them as [Issues](https://github.com/heiyukidev/reactive-mongodb/issues)

## Bugs

Please report your bugs here: [Issues](https://github.com/heiyukidev/reactive-mongodb/issues)

## Installation

Add the project to your dependencies

```bash
npm install --save reactive-mongodb
```

To properly setup you need to connect to your mongo database with the following commands:

```javascript
const connect = require('reactive-mongodb').connect;

connect('YOUR_DATABASE_URL');
```

> You only need to do this once.

## Collections

Reactive-MongoDB allows you to interact with your collections after you connect to your database.

### New Collection

```javascript
const Collection = require('../index.js').Collection;
//Collection is a class that represents your collection in the database
const Users = new Collection('users');
// 'users' will be the name of the collection in the mongodb database
```

### Insert A Document

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

var user; //A document you want to insert

function onItemReceived(item) {
    // item is the document you inserted into the database
    // Your Own Logic
}

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.insert(user).subscribe(onItemReceived, errorHandler, completionHandler);
```

### Update A Document

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

var oldUser; //A document you want to update
var newUser; //A document you want to update

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.updateOne(oldUser,newUser).subscribe(null, errorHandler, completionHandler);
```

> Update will replace the oldUser by the newOne. If you want to update specifique field you have to use {$set:{fields:values}} instead of newUser:

```javascript
Users.updateOne(oldUser,{$set:{fields:values}}).subscribe(null, errorHandler, completionHandler);
```

### Update A Document By It's Id

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

var newUser; // The New Document

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.updateById(id,newUser).subscribe(null, errorHandler, completionHandler);
// You can also use $set instead of new User, See note Above
```

### Update Multiple Documents

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

var query; //A query to determine which documents to update

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.update(query,{$set:{fields:values}}).subscribe(null, errorHandler, completionHandler);
// You have to specifie which fields to update with $set
```

### Delete Multiple Documents

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

var query; //A query to determine which documents to delete

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.delete(query).subscribe(null, errorHandler, completionHandler);
```

### Delete A Documents By Id

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.deleteById(id).subscribe(null, errorHandler, completionHandler);
```

The Id is the MongoDB ObjectID, you just need to pass in the String value Example :

```javascript
Users.deleteById("590db2cc375bcc2cddc450a5").subscribe(onItemReceived, errorHandler, completionHandler);
```


### Finding Documents

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

const query = {
    //Some Values
};

function onItemReceived(item) {
    // item is one of element of the array of documents that match the query
    // Your Own Logic
}

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.find(query).subscribe(onItemReceived, errorHandler, completionHandler);
// find will always return an array
```

### Finding A Document

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');

const query = {
    //Some Values
};

function onItemReceived(item) {
    // item is one of element of the array of documents that match the query
}

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.findOne(query).subscribe(onItemReceived, errorHandler, completionHandler);
// find will return the first document Encoutered
```

### Finding A Document By Id

```javascript
const Collection = require('reactive-mongodb').Collection;
const Users = new Collection('users');


function onItemReceived(item) {
    // item is one of element of the array of documents that match the query
    // Your Own Logic
}

function errorHandler(err) {
    // err is the error thrown by the method
    // Your Own Logic
}

function completionHandler() {
    // Your Own Logic
}

Users.findById(id).subscribe(onItemReceived, errorHandler, completionHandler);
// Id is the string value of Object ID Of MongoDB, see delete by Id Example.
```


## About the Author

I'm Khaled Romdhane but mostly known as heiyuki.
My handle is : [@heiyukidev](https://github.com/heiyukidev).

I Work at this amazing Company [@redcarpetsolutions](https://github.com/redcarpetsolutions) don't hesitate to go check us out.

This project is backed By [redcarpetsolutions](https://github.com/redcarpetsolutions)
