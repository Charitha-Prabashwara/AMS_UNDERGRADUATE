const User = require('./User');
const {userTypes} = require('../../config')
class Lecturer extends User {
    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_LECTURER });

         Object.defineProperty(this, '_type', {
            value: userTypes.USER_LECTURER,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }
    

}

module.exports = Lecturer;
