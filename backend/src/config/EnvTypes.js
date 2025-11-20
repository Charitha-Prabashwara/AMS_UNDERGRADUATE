
class EnvTypes{

    constructor(){
        if(EnvTypes.instance == null){
            this.ENV_TYPES = ['development', 'production'];
            this.DEVELOPMENT = this.ENV_TYPES[0];
            this.PRODUCTION = this.USER_TYPES[1];
            EnvTypes.instance = this;

        }
        return UserTypes.instance;
    }

}

const envTypes = new EnvTypes()
Object.freeze(envTypes)
module.exports = envTypes;