const Department = require('./Department')
const {DepartmentRepository} = require('./DATABASE')
class DepartmentBuilder{
    id
    name
    description
    deleted
    createdAt_timestamp
    updatedAt_timestamp

    constructor(data={}){
        this.id = data._id
        this.name = data.name
        this.description = data.description
        this.deleted = data.deleted;
        this.createdAt_timestamp = data.createdAt_timestamp
        this.updatedAt_timestamp = data.updatedAt_timestamp
        
        this.repository = new DepartmentRepository();
    }

    #buildParams(){
        const fields = [
            'id', 'name' ,'description', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
        ]
        const params = {}

        for(const field of fields){
            if(this[field] !== undefined){
                params[field] = this[field]
            }
        }
        return params
    }

    async create(){
         try {
            
            const params = this.#buildParams()
            const dept = await this.repository.create(params)
            return new Department(dept)
        } catch (error) {
            throw error
        }
    }


}

module.exports = DepartmentBuilder;