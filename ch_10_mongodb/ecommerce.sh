# Create and switched database
use ecommerce 

# Create collections
db.createCollection("mensajes")
db.createCollection("products")


# 1) Add 10 products and messages

# 2) Define keys in each products and messages
db.messages.insertMany([
    {
      email: 'gerson@mail.com',
      text: 'Hola',
      time: '27/10/2022, 9:09:26 p. m.'
    },
    {
      email: 'gerson@mail.com',
      text: 'Necesito informacion acerca de la app',
      time: '27/10/2022, 9:09:50 p. m.'
    },
    {
      email: 'gerson@mail.com',
      text: 'Es este el metodo correcto para informar?',
      time: '27/10/2022, 9:10:00 p. m.'
    },
    {
      email: 'fernando@mail.com',
      text: 'Buenas',
      time: '27/10/2022, 9:10:08 p. m.'
    },
    {
      email: 'fernando@mail.com',
      text: 'Si, estas en el lugar correcto',
      time: '27/10/2022, 9:10:14 p. m.'
    },
    {
      email: 'gerson@mail.com',
      text: 'Buenisimo',
      time: '27/10/2022, 9:10:23 p. m.'
    },
    {
      email: 'fernando@mail.com',
      text: 'Que es lo que desearia consultar',
      time: '27/10/2022, 9:11:30 p. m.'
    },
    {
      email: 'fernando@mail.com',
      text: '?',
      time: '27/10/2022, 9:11:31 p. m.'
    },
    {
      email: 'gerson@mail.com',
      text: 'Si',
      time: '27/10/2022, 9:11:43 p. m.'
    },
    {
      email: 'gerson@mail.com',
      text: 'Necesitaria ',
      time: '27/10/2022, 9:11:50 p. m.'
    }
])

db.products.insertMany([
    {
      title: 'Tijera punta roma',
      price: 525.25,
      thumbnail: 'https://http2.mlstatic.com/tijeras-maped-vivo-escolar-punta-redonda-D_NQ_NP_498115-MLC25178083037_112016-F.jpg'
    },
    {
      title: 'Calculadora',
      price: 2235.15,
      thumbnail: 'https://th.bing.com/th/id/OIP.O22PSQNAKGoRRnvxN-4jQwHaGk?pid=ImgDet&rs=1'
    },
    {
      title: 'Globo terraqueo',
      price: 2505.5,
      thumbnail: 'https://th.bing.com/th/id/OIP.hcJvt60K6QqM4QK1CL5K-AHaJ4?pid=ImgDet&rs=1'
    },
    {
      title: 'Borrador',
      price: 700,
      thumbnail: 'https://th.bing.com/th/id/R.9f6338bff9624a31d213e261c4bb6c9e?rik=ugdyTU1e5%2fpndg&riu=http%3a%2f%2fs1.thingpic.com%2fimages%2fTY%2ftM5gkjCxAAiMyuRWbEq7FSt1.jpeg&ehk=42ki5xjYY2tshM%2f%2fljW9LvUVmn5sow%2fulxKIkmU8aJw%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      title: 'Lapiz',
      price: 500,
      thumbnail: 'https://th.bing.com/th/id/OIP.WHBXgz0YRmPOxVXubEuq_QHaEK?pid=ImgDet&rs=1'
    },
    {
      title: 'Carrito hot wheels',
      price: 2500,
      thumbnail: 'https://th.bing.com/th/id/OIP.sHsaQoL2ajfsMvIm2c0XxwHaE7?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      title: 'Notebook',
      price: 4500,
      thumbnail: 'https://th.bing.com/th/id/OIP.5EZRHGR0LgL2IWcQ511TkQHaF5?pid=ImgDet&rs=1'
    },
    {
      title: 'Macbook',
      price: 4999,
      thumbnail: 'https://th.bing.com/th/id/OIP.5EZRHGR0LgL2IWcQ511TkQHaF5?pid=ImgDet&rs=1'
    },
    {
      title: 'Papel A4',
      price: 125,
      thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_779384-MLB26171258887_102017-F.jpg'
    },
    {
      title: 'Mochila',
      price: 1500,
      thumbnail: 'https://www.karpatos.com.ar/wp-content/uploads/2019/08/3-3.jpg'
    }
])

# 3) List of the each documents

db.messages.find()
db.products.find()

# 4) Show the total number of documents in the collection

db.messages.estimatedDocumentCount()
db.products.estimatedDocumentCount()

# 5) CRUD

# Create
# 5.a) Adding one product
db.products.insertOne({
  title: 'Hot wheels v8',
  price: 950.2,
  thumbnail: 'https://th.bing.com/th/id/OIP.mLl2axHtDaLK-5mXWjVzygHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7'
})

# Read
# 5.b) 

# 5.b.1. Find products with price lower than 1000
db.products.find({ price: { $lt: 1000 } })
# 5.b.2. Find products with price between 1000 and 3000
db.products.find({ $and: [{ price: { $gt: 1000 } }, { price: { $lt: 3000 } }] })
# 5.b.3. Find products with price greater than 3000
db.products.find({ price: { $gt: 3000 } })
# 5.b.4. Find the title of the third most cheaper product
db.products.find({}, { title: 1 }).sort({ price: 1 }).limit(1).skip(2)

# Update
# 5.c. Update all products, adding a new field called stock with a value of 100
db.products.updateMany({}, { $set: { stock: 100 } })

# 5.d. Update all products with a price greater than 4000, setting the stock to 0
db.products.updateMany({  price: { $gt: 4000 } }, { $set: { stock: 0 } })

# Delete
# 5.3. Delete all products with a price lower than 1000
db.products.deleteMany({ price: { $lt: 1000 } })

# 6. Create an user called 'pepe' with password 'asd456' that can only read the database

use admin
db.createUser({
  user: 'pepe',
  pwd: 'asd456',
  roles: [
    {
      role: 'read',
      db: 'ecommerce'
    }
  ]
})