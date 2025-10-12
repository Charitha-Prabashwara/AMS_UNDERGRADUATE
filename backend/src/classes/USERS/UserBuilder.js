const {UserRepository} = require('../DATABASE');
const User = require('./User');
const repository = new UserRepository()

/**
 * UserBuilder is responsible for creating User instances.
 * It allows flexible initialization of user data and handles
 * the creation process through the repository.
 */
class UserBuilder{
  /** @type {string} */
    #registration_id;
    /** @type {string} */
    #name;
    /** @type {string} */
    #email;
    /** @type {string} */
    #address;
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
    /** @type {string} */
    _type;
    /** @type {string} */
    _department;



    /**
     * Creates a new UserBuilder instance.
     * @param {Object} data - Optional data to initialize the builder.
     */
    constructor(data={}){
        this.#registration_id = data.registration_id;
        this.#name = data.name;
        this.#email = data.email;
        this.#address = data.address;
        this.#password = data.password;
        this.#access_token = data.access_token;
        this.#refresh_token = data.refresh_token;
        this.#last_login = data.last_login;
        this.#enable_state = data.enable_state;
        this._type = data.type;
        this._department = data.department;
  }

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
        'registration_id', 'name', 'email', 'address',
        'password', 'access_token', 'refresh_token', 'last_login',
        'enable_state', '_type', '_department'
      ];

      const params = {};
      for (const field of fields) {
        params[field === '_type' ? 'type' : field === '_department' ? 'department' : field] = this[field];
      }
      return params;
    }

  /**
  * Prepares a parameter object for database operations,
  * including only fields that are defined on the builder.
  * @private
  * @returns {Promise<Object>} Parameters object ready for DB operations.
  */
  async create(){
    try {
      const params = this.#matchFieldsAndParams();
      const user = await repository.create(params)
      return new User(user);
    } catch (error) {
      throw error
    }
    
  }
}

module.exports = UserBuilder;