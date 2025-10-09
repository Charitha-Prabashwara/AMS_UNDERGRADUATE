const {SubjectModel} = require('../../models');
const BaseRepository = require('./BaseRepository')

class SubjectRepository extends BaseRepository{
    constructor(){
        super(SubjectModel);
    }
}

module.exports = SubjectRepository;