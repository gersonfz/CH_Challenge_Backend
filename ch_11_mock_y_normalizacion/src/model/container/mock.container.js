const { createFakeProducts } = require("../../utils/products.utils");
const fs = require('fs');

class MockContainer {
    constructor(name) {
        this.item = [];
        this.name = name;
    }

    async fileInJSON() {
        let data = await fs.promises.readFile(this.name, "utf-8");
        let dataJSON = JSON.parse(data);
        return dataJSON;
    }
    async fileSaving(item) {
        let dataJSON = JSON.stringify(item);
        await fs.promises.writeFile(this.name, dataJSON);
    }
    // Test for mocks container in products!!
    async productsFaker(qty = 5) {
        this.items = [];
        for (let i = 1; i <= qty; i++) {
            const newItem = createFakeProducts();
            this.items.push(newItem);
        }
        this.save(this.items);
        return this.items;
    }
    async save(item) {
        try {
            this.fileSaving(item)
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            let data = await this.fileInJSON()
            return data
        }
        catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            let data = await this.fileInJSON()
            let containerArray
            data.map(el => { el.id === id && (containerArray = el) })
            return containerArray
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteById(id) {
        try {
            let data = await this.fileInJSON()
            const productIndex = data.findIndex(product => product.id === +id);
            data.splice(productIndex, 1);
            this.fileSaving(data);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = MockContainer;