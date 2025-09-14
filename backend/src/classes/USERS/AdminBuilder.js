const UserBuilder = require('./UserBuilder');
const {userTypes} = require('../../config');

class AdminBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_ADMIN});
        
        Object.defineProperty(this, '_type', {
            value: userTypes.USER_ADMIN,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

}

module.exports = AdminBuilder;
