const UserBuilder = require('./UserBuilder');

class AdminBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: 'admin'});
        
        Object.defineProperty(this, '_type', {
            value: 'admin',
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }

}

module.exports = AdminBuilder;
