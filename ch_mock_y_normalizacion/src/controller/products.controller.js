const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse } = require("../utils/api.utils");
const { ProductsDao } = require('../model/DAOs/app.daos');
const path = require('path')
const MockContainer  = require('../model/container/mock.container');
const productsFaker = require('../utils/products.utils');


const mockContainer = new MockContainer(path.resolve(__dirname, '../data/product.mock.json'))


const productsDao = new ProductsDao();

class ProductsController {
    async getProducts(req, res, next) {
        try {
            const products = await productsDao.getAll();
            console.log('Get Products');
            const response = successResponse(products);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getProductById(req, res, next) {
        const { id } = req.params;
        try {
            console.log(id);
            const product = await productsDao.getById(id)
            if (!product) {
                return res.status(404).json({ error: `Product with id: ${id} does not exist!` });
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    }
    async saveProduct(req, res, next) {
        try {
            const newProduct = await productsDao.save(req.body)
            console.log(newProduct);
            const response = successResponse(newProduct)
            res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        const { id } = req.params
        try {
            const updatedProduct = await productsDao.update(id, req.body)
            const response = successResponse(updatedProduct)
            res.json(response)
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProductById(req, res, next) {
        const { id } = req.params
        try {
            const deletedProduct = await productsDao.delete(id)
            const response = successResponse(deletedProduct)
            res.json(response)
        }
        catch (error) {
            next(error);
        }
    }
    async productsTestFaker(req, res, next) {
        try {
            const products = [];
            for(let i = 0; i <= 5; i++){
                products.push(productsFaker())
            }
            console.log(products);
            const response = successResponse(response)
            res.json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllProductsTestFaker(req, res, next){
        const { productsFaker } = req.body;
        try {
            console.log(productsFaker);
            const products = await mockContainer.getAll();
            console.log('Get Products Faker');
            const response = successResponse(products);
            res.status(HTTP_STATUS.OK).json(response);        }
        catch(error) {
            next(error)
        }
    }
}

module.exports = new ProductsController;