const {DepartmentRepository} = require('./DATABASE')
class Department{
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

    async save(){
        try {
            const fields = [
                'id', 'name' ,'description', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field] = this[field]
                }
            }

            const dept = this.repository.save(params)
            return new Department(dept)
        } catch (error) {
            throw error
        }
    }

}


module.exports = Department;