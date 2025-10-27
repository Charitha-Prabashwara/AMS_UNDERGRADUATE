const {User, Admin, NullUser} = require('../classes/USERS')
const PasswordHashService = require('./PasswordHashService')
const {userTypes} = require('../config')
const {selectCorrectUser} = require('./dependencies/userServicesSupport')
const {UserNotFoundError} = require('../errors')

class UserAccountService{

   static async getUserById(userType, id){
        const userClass = selectCorrectUser(userType)
        const user = await userClass.findById(id);
        if(user === NullUser) throw UserNotFoundError()
        return user;
   }
  


}

module.exports = UserAccountService;