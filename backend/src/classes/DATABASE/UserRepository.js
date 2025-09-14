
const {UserModel} = require('../../models');
const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository{
  
  constructor(){
    super(UserModel)
  }

}

module.exports= UserRepository;