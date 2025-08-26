require('dotenv').config();
class Config{

    constructor(){
        if(Config.instance == null){
            const env = process.env;

            this.DB_MONGODB_URI = env.DB_MONGODB_URI;
            this.DB_MONGODB_DATABASE = env.DB_MONGODB_DATABASE;
            this.APPLICATION_PORT = env.APPLICATION_PORT;
            this.SLAT_ROUNDS = env.SLAT_ROUNDS;
            Config.instance = this;

        }
        return Config.instance;
    }

}

const config = new Config()
Object.freeze(config)
module.exports = config;