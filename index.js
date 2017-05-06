const database = require('./modules/database.module.js');
const Collection = require('./modules/collection.module.js');


module.exports.connect = database.connect;
module.exports.Collection = Collection;