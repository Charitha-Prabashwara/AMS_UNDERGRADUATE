const {User, Admin, NullUser} = require('../classes/USERS')
const PasswordHashService = require('./PasswordHashService')
const {userTypes} = require('../config')
const {selectCorrectUser, selectCorrectBuilder} = require('./dependencies/userServicesSupport')
const {UserNotFoundError} = require('../errors')

class UserAccountService{

   static async getUserById(userType, id){
      const userClass = selectCorrectUser(userType)
      const user = await userClass.findById(id);
      if(user === NullUser) throw UserNotFoundError()
      return user;
   }

   static async findUsers(userType, filter={}, options={}){
      const userClass = selectCorrectUser(userType)
      const users = await userClass.find(filter, options)
      users.forEach(user => {if(user===NullUser) throw UserNotFoundError()});
      return users;
   }

   static async findOneUser(userType, filter={}, options={}){
      const userClass = selectCorrectUser(userType);
      const user = await userClass.findOne(filter, options);
      if(user === NullUser){throw UserNotFoundError()};
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

   static async createUser(userType, data){
      
      const builder = selectCorrectBuilder(userType);

      builder.registration_id = data.registration_id
      builder.name = data.name
      builder.email = data.email
      builder.address = data.address
      builder.password = data.password
      builder._department = data._department

      const user = await builder.create()
      return user;
   }

   static async deleteById(userType, id){
      const userClass = selectCorrectUser(userType)
      const user = await userClass.deleteById(id)
      return user;
   }

   static async getEnableState(userType, id){

   }

   static async setEnableState(userType, id, enableState){

   }

   static async getUserByEmail(userType, email){

   }

   static async existsCount(userType, filter){

   }

   static async isExists(userType, id){

   }

   static async count(userType, filter={}){
      
   }
   static async deleteMany(userType, filter={}){

   }

  


}

module.exports = UserAccountService;