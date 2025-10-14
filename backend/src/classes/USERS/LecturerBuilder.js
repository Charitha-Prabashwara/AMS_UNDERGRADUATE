const UserBuilder = require('./UserBuilder');
const {userTypes} = require('../../config');
const Lecturer = require('./Lecturer');
class LecturerBuilder extends UserBuilder {
    constructor(data = {}) {
        super({...data, type: userTypes.USER_LECTURER});
        
        Object.defineProperty(this, '_type', {
            get() { return userTypes.USER_LECTURER; },
            set() { throw new TypeError('Cannot modify _type'); },
            enumerable: true,
            configurable: false
        });
    }
    async create(){
        const user = await super.create()
        return new Lecturer(user)
    }

}

module.exports = LecturerBuilder;
