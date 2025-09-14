const User = require('./User');
const {userTypes} = require('../../config')
class Admin extends User {
    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_ADMIN });

         Object.defineProperty(this, '_type', {
            value: userTypes.USER_ADMIN,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }
    

}

module.exports = Admin;
