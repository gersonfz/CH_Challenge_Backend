const MongoContainer  = require('../../container/mongo.container');
const messageSchema = require('../../schema/messages.schema');

const collection = 'messages';

class MessagesDao extends MongoContainer{
    constructor() {
        super(collection, messageSchema)
    }
}

module.exports = MessagesDao;