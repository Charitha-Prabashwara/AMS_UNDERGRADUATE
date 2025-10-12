const User = require('./User');
const {userTypes} = require('../../config')
class DepartmentHead extends User {
     /** @type {string} */
    _department

    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_DEPARTMENT });

         Object.defineProperty(this, '_type', {
            value: userTypes.USER_DEPARTMENT,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

    get department(){return this._department}
    set department(department){this._department = department}
}

module.exports = DepartmentHead;
