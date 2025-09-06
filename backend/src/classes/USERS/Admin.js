const User = require('./User');

class Admin extends User {
    constructor(data = {}) {
        super({ ...data, type: 'admin' });

         Object.defineProperty(this, '_type', {
            value: 'admin',
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }
    

}

module.exports = Admin;
