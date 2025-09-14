const UserBuilder = require('./UserBuilder');
const {userTypes} = require('../../config')
class LecturerBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_LECTURER});
        
        Object.defineProperty(this, '_type', {
            value: userTypes.USER_LECTURER,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

}

module.exports = LecturerBuilder;
