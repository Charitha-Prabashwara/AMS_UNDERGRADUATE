const UserBuilder = require('./UserBuilder');
const {userTypes} = require('../../config')
class StudentBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_STUDENT});
        
        Object.defineProperty(this, '_type', {
            value: userTypes.USER_STUDENT,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

}

module.exports = StudentBuilder;
