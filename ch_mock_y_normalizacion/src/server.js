const httpServer = require('./app')
const ENV_CONFIG_PROCESS = require('./config')


const PORT = ENV_CONFIG_PROCESS.PORT || 8080

const DATASOURCE_BY_ENV = {
    mongo: require('./model/container/mongo.container')
}

const dataSource = DATASOURCE_BY_ENV[ENV_CONFIG_PROCESS.DATASOURCE]


// Listen
httpServer.listen(PORT, () => {
    dataSource.connect().then(()=> {
        console.log(`Server is up and running on port ${PORT}`);
        console.log("Connected to " + ENV_CONFIG_PROCESS.DATASOURCE);
    })
})

httpServer.on('error', (error) => {
    console.log(error.message);
})