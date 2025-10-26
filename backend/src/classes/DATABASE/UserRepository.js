
const {UserModel} = require('../../models');
const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository{
  
  constructor(){
    const defaultSelectList = ['-password']
    super(UserModel, defaultSelectList)
  }

}

module.exports= UserRepository;