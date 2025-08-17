const { default: mongoose, MongooseError } = require('mongoose');
const {UserModel} = require('../../models/');

class MONGODB_USER_WRAPPER{
  
  constructor(){
    this.user = UserModel;
  }
  async create_new_user(
    registration_id, 
    email, 
    address={}, 
    name={}, 
    password
  ){
    const {line1, line2, zip} = address;
    const {first_name, last_name, full_name, with_initial} = name;
    
    try {
      const user = await this.user.create({

        registration_id:registration_id,
        email:email,
        
        address:{line1:line1, line2:line2, zip:zip},
        name:{first_name:first_name, last_name: last_name, with_initial_name: with_initial, full_name:full_name},
        password:password
      });
      
      return user.toObject();
      
    } catch (error) {
      throw error;
    }    
  }

  async findById(user_id){
      try {
        if(!mongoose.isValidObjectId(user_id)){
          throw new MongooseError('UserId is not acceptable.')
        }
        const user = await this.user.findById(user_id).lean();
        return user;

      } catch (error) {
        throw error;
      }
  }

  async save(userObject){
      try {
        let user = await this.user.findById(userObject.id)
        
        if(!user){
         
          user = await this.user.create({

          registration_id:userObject.registration_id,
          email:userObject.email,
          
          address:userObject.address,
          name:userObject.name,
          password:userObject.password,
          enable_state:userObject.enable_state,
          access_token: userObject.access_token,
          refresh_token: userObject.refresh_token,
          last_login:userObject.last_login,
          });
        }else{
          user.registration_id=userObject.registration_id;
          user.email=userObject.email;
          user.address=userObject.address;
          user.name=userObject.name;
          user.password=userObject.password;
          user.enable_state=userObject.enable_state;
          user.access_token= userObject.access_token;
          user.refresh_token= userObject.refresh_token;
          user.last_login=userObject.last_login;

          return (await user.save()).toObject();
        }
        return user.toObject();

      } catch (error) {
        throw error;
      }
  }
}

module.exports=MONGODB_USER_WRAPPER;