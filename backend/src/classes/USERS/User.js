const {UserRepository} = require('../DATABASE');
const repository = new UserRepository();


/**
 * Represents a User in the system.
 * Provides methods to create, read, update, and delete users.
 */
class User{
    /** @type {string} */
    #registration_id;
    /** @type {string} */
    #name;
    /** @type {string} */
    #email;
    /** @type {string} */
    #address;
    /** @type {string} */
    #id;
    /** @type {string} */
    #password;
    /** @type {string} */
    #access_token;
    /** @type {string} */
    #refresh_token;
    /** @type {Date} */
    #last_login;
    /** @type {boolean} */
    #enable_state;
    /** @type {Date} */
    #createdAt_timestamp;
    /** @type {Date} */
    #updatedAt_timestamp;
    /** @type {string} */
    _type;

    /** @type {string} */
    _department

    /**
     * Creates a new User instance.
     * @param {Object} data - Initial data to populate the User.
     */
    constructor(data={}){
        this.#id = data._id;
        this.#registration_id = data.registration_id;
        this.#name = data.name;
        this.#email = data.email;
        this.#address = data.address;
        this.#password = data.password;
        this.#access_token = data.access_token;
        this.#refresh_token = data.refresh_token;
        this.#last_login = data.last_login;
        this.#enable_state = data.enable_state;
        this._department = data.department
        this._type = data.type;
        
        this.#createdAt_timestamp = data.createdAt_timestamp;
        this.#updatedAt_timestamp = data.updatedAt_timestamp;
    }

    get id(){return this.#id}
    set id(id){this.#id = id}

    get registration_id(){return this.#registration_id}
    set registration_id(registration_id){this.#registration_id = registration_id}

    get name(){return this.#name}
    set name(name){this.#name = name};

    get email(){return this.#email}
    set email(email){this.#email = email}

    get address(){return this.#address}
    set address(address){this.#address = address}

    get password(){return this.#password}
    set password(password){this.#password = password}

    get access_token(){return this.#access_token}
    set access_token(access_token){this.#access_token = access_token}

    get refresh_token(){return this.#refresh_token}
    set refresh_token(refresh_token){this.#refresh_token = refresh_token}

    get last_login(){return this.#last_login}
    set last_login(last_login){this.#last_login = last_login}

    get enable_state(){return this.#enable_state}
    set enable_state(enable_state){this.#enable_state = enable_state}

    get createdAt_timestamp(){return this.#createdAt_timestamp}
    set createdAt_timestamp(createdAt_timestamp){this.#createdAt_timestamp = createdAt_timestamp}

    get updatedAt_timestamp(){return this.#updatedAt_timestamp}
    set updatedAt_timestamp(updatedAt_timestamp){this.#updatedAt_timestamp = updatedAt_timestamp}

    get _type(){return this._type}
    set _type(_type){this._type = _type}


     /**
     * Prepares a parameter object for database operations,
     * including only defined fields.
     * @private
     * @returns {Promise<Object>} Parameters object for queries.
     */
    #matchFieldsAndParams(){

        const fields = [
            'id', 'registration_id', 'name', 'email', 'address',
            'password', 'access_token', 'refresh_token', 'last_login',
            'enable_state', '_type', 'createdAt_timestamp', 'updatedAt_timestamp',
            '_department'
        ];

        const params = {};
        for (const field of fields) {
            if (this[field] !== undefined) { 
                params[field === '_type' ? 'type' : field === '_department' ? 'department' : field] = this[field];
            }
        }
        return params;
    }

    /**
     * Saves the user to the database (create or update).
     * @returns {Promise<User>} The saved User instance.
     * @throws Will throw an error if saving fails.
     */
    async save(){
        try {         
            const params = this.#matchFieldsAndParams();
            const returned_object = await repository.save(params);
            return new User(returned_object)   
        } catch (error) {
            throw error
        }
    }

    /**
     * Finds a user by ID.
     * @param {string} user_id - The ID of the user to find.
     * @returns {Promise<User>} The found User instance.
     * @throws Will throw an error if the user is not found or DB error occurs.
     */
    async findById(user_id){ 
        try {
            const user = await repository.findById(user_id);            
            return new User(user);
        } catch (error) {
            throw error        
        }     
    }

    /**
     * Finds users matching the current User instance fields.
     * @returns {Promise<User[]>} Array of User instances that match.
     * @throws Will throw an error if the query fails.
     */
    async find(){    
        try {
            const params = this.#matchFieldsAndParams()
            const users = await repository.find(params)
            return users.map(user => new User(user));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a user matching the current User instance fields.
     * @returns {Promise<User>} The deleted User instance.
     * @throws Will throw an error if the deletion fails.
     */
    async deleteOne() {
        try {
           const params = this.#matchFieldsAndParams()
           const user = await repository.deleteOne(params);
           return new User(user)
        } catch (error) {
            throw error
        }     
    }

    /**
     * Deletes a user by ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<User>} The deleted User instance.
     * @throws Will throw an error if deletion fails.
     */
    async deleteById(id){
        try {
            const deleted = await repository.deleteById(id)
            return new User(deleted)
        } catch (error) {
            throw error
        }
    }


}

module.exports = User;
