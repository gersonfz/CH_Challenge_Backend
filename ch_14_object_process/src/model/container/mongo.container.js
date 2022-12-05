const mongoose = require('mongoose')
const db_config = require('../../db/db.config')
const { HttpError } = require('../../utils/api.utils')
const { HTTP_STATUS } = require('../../constants/api.constants')


class MongoContainer {
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema)
    }

    static async connect() {
        await mongoose.connect(db_config.mongodb.URI)
        
    }

    static async disconnect() {
        await mongoose.disconnect()
    }

    async getAll(filter = {}) {
        const documents = await this.model.find(filter, { __v: 0 }).lean()
        return documents
    }

    async getById(id) {
        const document = await this.model.findOne({ _id: id }, { __v: 0 })
        if (!document) {
            const message = `Resource with id ${id} not found`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return document
    }

    async getByEmail(username){
        const email = username.map(item => item.author.email)
        const document = await this.model.findOne({ email }, { __v: 0 })
        if(!document){
            const message = `Resource with id ${username} not found`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return document
    }
    async save(item) {
        const newDocument = new this.model(item)
        return await newDocument.save()
    }

    async update(id, item) {
        const updatedDocument = await this.model.updateOne(
            { _id: id },
            { $set: { ...item } }
        )
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return updatedDocument
    }
    async updateText(id, item) {
        const text = item.map(element => element.text).toString();
        console.log('text' + text);
        const messageId = id._id;
        const updatedDocument = await this.model.updateOne(
            { _id: messageId },
            {$push:
                {text: {
                    $each: 
                        text
                    }
                }
            }
        )
            console.log(updatedDocument);
        return updatedDocument;
    }

    async delete(id) {
        const deletedDocument = await this.model.deleteOne({ _id: id })
        if (!deletedDocument.deletedCount) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return deletedDocument
    }
}

module.exports = MongoContainer;