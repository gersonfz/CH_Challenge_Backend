const { sqlite } = require('../../db/db.config')
const knex = require('knex')(sqlite)


class MessageConstructor{
    constructor(){
        this.knex = knex;
    }
    async createTable (){
        try{
            const DATABASE = "messages"
            const tableExist = await this.knex.schema.hasTable(DATABASE);
            if (tableExist){
                await this.knex.schema.dropTable(DATABASE);
            } 
            else {
                await this.knex.schema.createTable(DATABASE, (table) =>{
                    table.increments('id').notNullable().primary();
                    table.string('email').notNullable();
                    table.string('text').notNullable();
                    table.string('time').notNullable();
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async save (item){
        try{
            await this.knex('messages').insert(item);
            console.log('Messages saved successfully in the database');
        }
        catch(error){
            console.log(error);
        }
    }
    async getAll() {
        try {
            const messages = await this.knex('messages');
            console.log(messages);
            if(messages.length > 0){
                console.log('All messages successfully received from the database');
                return messages;
            }
            else{
                console.log('No messages found in the database');
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MessageConstructor