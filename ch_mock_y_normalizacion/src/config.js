const dotenv = require('dotenv');

dotenv.config();

const ENV_CONFIG_PROCESS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    DATASOURCE: process.env.DATASOURCE
};

module.exports = ENV_CONFIG_PROCESS;