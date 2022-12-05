const MongoContainer = require('../../container/mongo.container');
const productSchema = require('../../schema/products.schema');

const collection = 'products'

class ProductsDao extends MongoContainer {
    constructor() {
        super(collection, productSchema)
    }
}

module.exports = ProductsDao;