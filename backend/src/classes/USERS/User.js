const { MongooseError } = require('mongoose');
const {USER_WRAPPER} = require('../DATABASE');

class User{
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

    
    constructor(){
       
    }

    async save(){
        try {
            this.user_wrapper = new USER_WRAPPER();
            
            const user = new User();
            
            user.id = this.id;
            user.registration_id = this.registration_id;
            user.name = this.name;
            user.email = this.email;
            user.address = this.address;
            user.password = this.password;
            user.access_token = this.access_token;
            user.refresh_token = this.refresh_token;
            user.last_login = this.last_login;
            user.enable_state = this.enable_state;
            user.createdAt_timestamp = this.createdAt_timestamp;
            user.updatedAt_timestamp = this.updatedAt_timestamp;

            const returned_object = await this.user_wrapper.save(user);
            user.id = returned_object._id;
            user.registration_id = returned_object.registration_id;
            user.name = returned_object.name;
            user.email = returned_object.email;
            user.address = returned_object.address;
            user.password = returned_object.password;
            user.access_token = returned_object.access_token;
            user.refresh_token = returned_object.refresh_token;
            user.last_login = returned_object.last_login;
            user.access_token = returned_object.enable_state;
            user.createdAt_timestamp = returned_object.createdAt_timestamp;
            user.updatedAt_timestamp = returned_object.updatedAt_timestamp;

            return user;
            
        } catch (error) {
            throw new MongooseError(error);
        }
    }

    async findById(user_id){
        
        try {
            this.user_wrapper = new USER_WRAPPER();
            const found_user = await this.user_wrapper.findById(user_id);
            
            const user = new User();
            
            user.id = found_user._id;
            user.registration_id = found_user.registration_id;
            user.name = found_user.name;
            user.address = found_user.address;
            user.email = found_user.email;
           
            user.password = found_user.password;
            user.access_token = found_user.access_token;
            user.refresh_token = found_user.refresh_token;
            user.last_login = found_user.last_login;
            user.enable_state = found_user.enable_state;
            user.createdAt_timestamp = found_user.createdAt_timestamp;
            user.updatedAt_timestamp = found_user.createdAt_timestamp;
            
            return user;
        } catch (error) {
            throw new Error(error)
        }

       
    }

    async updateById(user_id, update_data){
        try {
            this.user_wrapper = new USER_WRAPPER();
            const found_user = await this.user_wrapper.findById(user_id);
            
            const user = new User();

        } catch (error) {
            
        }    
    }
}

module.exports = User;
