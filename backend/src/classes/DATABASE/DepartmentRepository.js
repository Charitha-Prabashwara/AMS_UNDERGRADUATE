
const {DepartmentModel} = require('../../models');
const BaseRepository = require('./BaseRepository')

class DepartmentRepository extends BaseRepository{
  
  constructor(){
    super(DepartmentModel)
  }

}

module.exports= DepartmentRepository;