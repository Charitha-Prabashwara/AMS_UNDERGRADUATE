const UserBuilder = require('./UserBuilder');
const Admin  = require('./Admin')
const {userTypes} = require('../../config');

class AdminBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_ADMIN});
        
        Object.defineProperty(this, '_type', {
            get() { return userTypes.USER_ADMIN; },
            set() { throw new TypeError('Cannot modify _type'); },
            enumerable: true,
            configurable: false
        });
    }

    async create(){
        const admin = await super.create();
        return new Admin(admin)
    }

}

module.exports = AdminBuilder;
