const {selectCorrectUser} = require('./dependencies/userServicesSupport')
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

    
}

module.exports = UserService