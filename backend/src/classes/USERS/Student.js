const User = require('./User');
const {userTypes} = require('../../config')
class Student extends User {
    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_STUDENT });

         Object.defineProperty(this, '_type', {
            value: userTypes.USER_STUDENT,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }
    

}

module.exports = Student;
