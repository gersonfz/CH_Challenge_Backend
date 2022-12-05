const { HTTP_STATUS } = require("../constants/api.constants");
const { ProductsDao } = require("../model/DAOs/app.daos");
const { successResponse } = require("../utils/api.utils");


const roductsDao = new ProductsDao();

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
        const { qty } = req.query;
        try {
            const users = usersDao.populate(qty);
            const response = successResponse(users);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductsController;