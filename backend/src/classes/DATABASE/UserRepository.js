const { default: mongoose, MongooseError } = require('mongoose');
const {UserModel} = require('../../models');
const {UserNotFoundError, InvalidUserIdError} = require('../../errors')

class UserRepository{
  
  constructor(){
    this.user = UserModel;
  }

  _validateId(id){
    if(!mongoose.isValidObjectId(id)) throw new InvalidUserIdError()
  }

  async findById(id){
        this._validateId(id)
        return await this.user.findById(id).lean();
        
  }
  async create(userObject){
      const user = await this.user.create(userObject)
      return user.toObject();
  }

  async save(user){
        const id = user._id || user.id;
        this._validateId(id)
        const found_user = await this.user.findByIdAndUpdate(id.toString(), user,{ new: true, lean: true })
        if(!found_user) throw new UserNotFoundError()
        return found_user
  }

  async directUpdate(id, fields){
      this._validateId(id)
      return await this.user.findByIdAndUpdate(id, fields, { new: true, lean: true }); 
  }

  async find(filter={}, options={}){
    const { limit = null, skip = 0, select = null, sort = null } = options;
    let query = this.user.find(filter).skip(skip);
      if (limit) query = query.limit(limit);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
    return await query.lean();
  }

  async deleteOne(filter){
      const deleted = await this.user.findOneAndDelete(filter).lean()
      if(!deleted) throw new UserNotFoundError();
      return deleted;
  }
  async deleteMany(filter){
      return await this.user.deleteMany(filter);
  }
}

module.exports= UserRepository;