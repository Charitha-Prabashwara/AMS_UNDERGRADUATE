const {UserRepository} = require('../DATABASE');
const User = require('./user');
const {PasswordHashService} = require('../../services');

class USER_BUILDER{
    registration_id;
    name;
    email;
    address;
    id;
    password;
    access_token;
    refresh_token;
    last_login;
    enable_state;
    createdAt_timestamp;
    updatedAt_timestamp;
    _type;


    constructor(data={}){
        this.id = data._id;
        this.registration_id = data.registration_id;
        this.name = data.name;
        this.email = data.email;
        this.address = data.address;
        this.password = data.password;
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.last_login = data.last_login;
        this.enable_state = data.enable_state;
        this._type = data.type;
        this.createdAt_timestamp = data.createdAt_timestamp;
        this.updatedAt_timestamp = data.updatedAt_timestamp;
        
       
  }

  async create(){
    try {
      const fields = [
            'id', 'registration_id', 'name', 'email', 'address',
            'password', 'access_token', 'refresh_token', 'last_login',
            'enable_state', '_type', 'createdAt_timestamp', 'updatedAt_timestamp'
        ];

        const params = {};

        for (const field of fields) {
            if (this[field] !== undefined) {
                params[field === '_type' ? 'type' : field] = this[field];
            }
        }

    const user_wrapper = await new UserRepository()
    const user = await user_wrapper.create(params)
    return new User(user);
  
    } catch (error) {
      throw error
    }
    
  }
}

module.exports=USER_BUILDER;