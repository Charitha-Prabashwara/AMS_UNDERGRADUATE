const {DepartmentRepository} = require('./DATABASE')
class Department{
    id
    name
    description
    deleted
    createdAt_timestamp
    updatedAt_timestamp

    constructor(data={}){
        this.id = data._id ?? data.id
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
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }

            const dept = await this.repository.save(params)
            return new Department(dept)
        } catch (error) {
            throw error
        }
    }

    async findById(id){
        try {
            const dept = await this.repository.findById(id)
            return new Department(dept)
        } catch (error) {
            throw error;
        }
    }

    async find(){
        try {
            const fields = [
                'id', 'name' ,'description', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }

            const dept = await this.repository.find(params);
            return dept.map(department => new Department(department));

        } catch (error) {
            throw error;
        }
    }

    async deleteOne(){
        try {
            const fields = [
                'id', 'name' ,'description', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }

            const dept = this.repository.deleteOne(params)

            //Not implemented
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id){
        
        try {
            const dept = await this.repository.deleteById(id);
            return new Department(dept);
        } catch (error) {
            throw error
        }
    }

}


module.exports = Department;