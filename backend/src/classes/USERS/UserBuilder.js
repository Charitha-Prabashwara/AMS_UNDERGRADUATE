const {USER_WRAPPER} = require('../DATABASE');
const User = require('./user');
class USER_BUILDER{
  id  
  registration_id;
  name;
  email;
  address;
  #password;

    constructor(){
      this.registration_id;   
      this.name;
      this.email;
      this.address;     
      this.#password;
  }

  set password(password){
    this.#password  = password;
  }

  async create(){
    const user_wrapper = await new USER_WRAPPER()

    .create_new_user(
      this.registration_id,
      this.email,
      this.address,
      this.name,
      this.#password
    )
    const user = new User();
    user.registration_id = user_wrapper.registration_id;
    user.name = user_wrapper.name;
    user.email = user_wrapper.email;
    user.address = user_wrapper.address;
    user.id = user_wrapper._id;
    user.password = user_wrapper.password;

    return user;
  }
}

module.exports=USER_BUILDER;