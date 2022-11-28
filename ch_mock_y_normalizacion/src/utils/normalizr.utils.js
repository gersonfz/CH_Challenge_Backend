const { normalize, schema } = require('normalizr');
const util = require('util')
const MessagesDao  = require('../model/DAOs/messages/messages.dao')

const messagesDao = new MessagesDao();  

const normalizerMessages = async () =>{
    try {
        const print = (object) => {
            console.log(util.inspect(object, false, 12, true));
        };
        
        const postMessages = await messagesDao.getAll()
        
        // Define schema author message
        const schemaPost = new schema.Entity('messages',{},{idAttribute: 'username'})
        
        const normalizeObject = normalize(postMessages, schemaPost)
        
        print(normalizeObject);
        
        console.log('Longitud objecto normalizado =>', JSON.stringify(normalizeObject).length);

    }
    catch(error){
        console.log(error);
    }
}
normalizerMessages()
module.exports = normalizerMessages();