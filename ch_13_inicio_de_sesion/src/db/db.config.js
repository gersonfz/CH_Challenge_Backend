const ENV_CONFIG_PROCESS = require('../config')

const db_config = {
    mongodb: {
        URI: ENV_CONFIG_PROCESS.MONGO_URI
    }
}

module.exports = db_config;