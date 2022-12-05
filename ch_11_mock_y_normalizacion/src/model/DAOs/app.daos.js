const envConfig = require('../../config');

let ProductsDao;
let MessagesDao;

switch (envConfig.DATASOURCE) {
    case 'mongo':
        ProductsDao = require('./products/products.dao');
        MessagesDao = require('./messages/messages.dao');
        break;
    case 'memory':
        ProductsDao = require('../container/mock.container');
        break
    default:
        throw new Error("Invalid Datasource");
}

module.exports = {
    ProductsDao,
    MessagesDao
}