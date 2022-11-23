const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');

faker.locale = "es";

const createFakeProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.datatype.string(),
        thumbnail: faker.image.image(),
        price: faker.commerce.price(),
        timestamp: faker.date.recent(),
        id: uuid()
    }
}

module.exports = {
    createFakeProducts
}