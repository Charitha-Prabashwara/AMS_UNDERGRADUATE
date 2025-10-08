const {BatchModel} = require('../../models');
const BaseRepository = require('./BaseRepository')

class BatchRepository extends BaseRepository{
    constructor(){
        super(BatchModel)
    }
}

module.exports = BatchRepository