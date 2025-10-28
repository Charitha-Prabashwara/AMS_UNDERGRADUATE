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

   static async updateUserById(userType, id, data){
      
      const userClass = selectCorrectUser(userType)
      const user = await userClass.findById(id)
      if(user === NullUser) throw UserNotFoundError()
      
      user.registration_id = data.registration_id
      user.name = data.name
      user.email = data.email
      user.address = data.address
      user.password = data.password
      user.enable_state = data.enable_state
      user._department = data._department

      const savedUser = await user.save()
      return savedUser

   }
  


}

module.exports = UserAccountService;