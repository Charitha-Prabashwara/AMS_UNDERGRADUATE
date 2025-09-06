const bcrypt = require('bcrypt');
const config = require('../config/index');

class PasswordHashService{
    #saltRounds

    constructor(){

        if(!PasswordHashService.instance){
            this.#saltRounds = Number(config.SLAT_ROUNDS || 10)
            PasswordHashService.instance = this 
            
            Object.freeze(PasswordHashService.instance);
        }
       
        return PasswordHashService.instance;

    }

    async hashPassword(password) {
        return bcrypt.hash(password, this.#saltRounds);    
    }

    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new PasswordHashService();