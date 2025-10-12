const User = require('./User');
const {userTypes} = require('../../config')
class DepartmentHead extends User {

    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_DEPARTMENT });

         Object.defineProperty(this, '_type', {
            value: userTypes.USER_DEPARTMENT,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }



  
}

module.exports = DepartmentHead;
