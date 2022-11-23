const express = require('express');
const apiRoutes = require('./routers/app.routes');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const ProductsConstructor = require('./model/DAOs/products/products.dao')
const MessageConstructor = require('./model/DAOs/messages/messages.dao')
const logger = require('./middleware/logger.middleware')


const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger)
app.use(express.static('public'))


// Routes

app.use('/api', apiRoutes)

const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const productsApi = new ProductsConstructor()
const messageSocket = new MessageConstructor()


// Socket Events
io.on('connection', async (socket) => {
    console.log("New client connection!");

    // Emit products
    socket.emit('products', await productsApi.getAll())

    // Update Products
    socket.on('update', async products => {
        io.sockets.emit('products', await productsApi.save(products)
        );
    })
        // Emit message
        socket.emit('message', await messageSocket.getAll());
        // Update Message
        socket.on('newMessage', async message => {
            const email = await messageSocket.getAll();
            const updateEmail = await messageSocket.getByEmail(email)
            if(updateEmail !== message){
                await messageSocket.updateText(updateEmail, [message]);
            } else{
                await messageSocket.save(message)
            }
            io.sockets.emit('message', await messageSocket.getAll());
        })
});


module.exports = httpServer;