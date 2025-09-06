const {UserRepository} = require('../DATABASE');

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

    async save(){
        try {
            this.user_wrapper = new UserRepository();
            
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
            const returned_object = await this.user_wrapper.save(params);
            return new User(returned_object)
            
        } catch (error) {
            throw error
        }
    }

    async findById(user_id){
        
        try {
            this.user_wrapper = new UserRepository();
            const found_user = await this.user_wrapper.findById(user_id);            
            return new User(found_user);
        } catch (error) {
            throw new Error(error)
        }

       
    }

    async find(){
        
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

        try {

            this.user_wrapper = new UserRepository();
            const users_object = await this.user_wrapper.find(params);
            return users_object.map(user => new User(user));
            
        } catch (error) {
            throw error;
        }


    }

    async deleteOne() {

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

        try {
            this.user_wrapper = new UserRepository();
            return await this.user_wrapper.deleteOne(params);
        } catch (error) {
            throw error
        }
        
    }

    async deleteById(id){
        try {
            this.user_wrapper = new UserRepository();
            const deleted  =await this.user_wrapper.deleteById(id)
            return new User(deleted)
        } catch (error) {
            
        }
    }


}

module.exports = User;
