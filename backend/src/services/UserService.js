const { userTypes } = require('../config');
const {selectCorrectUser, selectCorrectBuilder} = require('./dependencies/userServicesSupport')
class UserService{

    constructor(){

    }

    async getUserById(userType, id){
        const userClass = selectCorrectUser(userType);
        const result = await userClass.findById(id);
        return result
    }

    async getUserByRegistrationId(userType, registrationId){
        const userClass = selectCorrectUser(userType);
        userClass.registration_id = registrationId;
        const result =await userClass.findOne();
        return result;
    }

    async geyUserByEmail(userType, email){
        const userClass = selectCorrectUser(userType);
        userClass.email = email;
        const result  = await userClass.findOne();
        return result
    }

    async getFindUsers(user){
        const userClass  = user;
        const result = await userClass.find();
        return result
    }

    async createNewUser(userType, data={}){
        const builder = selectCorrectBuilder(userType);

        builder.registration_id = data.registration_id;
        builder.name = data.name;
        builder.email = data.email;
        builder.address = data.address;
        builder.password = data.password;

        if((userType == userTypes.USER_DEPARTMENT)||(userType == userTypes.USER_STUDENT)||(userType == userTypes.USER_LECTURER)){
            builder._department = data.department;
        }

        const user = await builder.create();
        return user;
         
    }

    async deleteUserById(userType, id){
        const userClass = selectCorrectUser(userType)
        const result = await userClass.deleteById(id);
        return result;
    }

    async findByIdAndUpdate(userType, user){
        const userClass = selectCorrectUser(userType)
        const result = await userClass.findByIdAndUpdate(user)
        return result;
    }

    async setSuspend(userType, id, enable){
        const userClass = selectCorrectUser(userType)
        const result = await userClass.findByIdAndUpdate({_id:id, enable_state:!enable})
        return result;
    }

    static isSuspended(user){
        return !user.enable_state
    }

    


}

module.exports = UserService