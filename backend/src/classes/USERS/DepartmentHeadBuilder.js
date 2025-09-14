const UserBuilder = require('./UserBuilder');
const {userTypes} = require('../../config');

class DepartmentHeadBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_DEPARTMENT});
        
        Object.defineProperty(this, '_type', {
            value: userTypes.USER_DEPARTMENT,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

}

module.exports = DepartmentHeadBuilder;
