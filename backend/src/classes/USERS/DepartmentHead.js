const User = require('./User');
const {userTypes} = require('../../config')
class DepartmentHead extends User {

    constructor(data = {}) {
        super({ ...data, type: userTypes.USER_DEPARTMENT });

        Object.defineProperty(this, '_type', {
            get() { return userTypes.USER_DEPARTMENT; },
            set() { throw new TypeError('Cannot modify _type'); },
            enumerable: true,
            configurable: false
        });
    }

    static _wrapToDepartmentHead(obj) {
        if (!obj) return obj;
        if (obj instanceof DecompressionStream) return obj;
        return new DepartmentHead(obj);
    }

    async save(){
        const user = await super.save()
        return DepartmentHead._wrapToDepartmentHead(user);
    }

    async findById(id){
        const user = await super.findById(id);
        return  DepartmentHead._wrapToDepartmentHead(user)
    }

    async find(){
        const users = await super.find();
        return users.map(user =>  DepartmentHead._wrapToDepartmentHead(user));
    }
    async deleteOne(){
        const user = await super.deleteOne()
        return  DepartmentHead._wrapToDepartmentHead(user)
    }

    async deleteById(id){
        const user = await super.deleteById(id)
        return  DepartmentHead._wrapToDepartmentHead(user)
    }
 
}

module.exports = DepartmentHead;
