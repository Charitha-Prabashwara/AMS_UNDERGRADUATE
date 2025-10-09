const {SubjectRepository} = require('./DATABASE')

class Subject{
    id
    name
    code
    credits
    deleted
    createdAt_timestamp
    updatedAt_timestamp

    constructor(data={}){
        this.id = data._id
        this.name = data.name
        this.code = data.code
        this.credits = data.credits
        this.deleted = data.deleted
        this.createdAt = data.createdAt_timestamp;
        this.updatedAt = data.updatedAt_timestamp;


        this.respository = new SubjectRepository();
    }

    async save(){

        try {
             const fields = [
                'id', 'name' ,'code', 'credits', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }

            const subject = await this.respository.save(params)
            return new Subject(subject)

        } catch (error) {
            throw error;
        }
    }

    async findById(id){
        try {
            const subject = await this.respository.findById(id)
            return new Subject(subject);
        } catch (error) {
            throw error
        }
    }

    async find(){
        try {
            const fields = [
                'id', 'name' ,'code', 'credits', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }
            const subjects = await this.respository.find(params)
            return subjects.map(subject=> new Subject(subject))

        } catch (error) {
            throw error
        }
    }

    async deleteOne(){
        try {
             const fields = [
                'id', 'name' ,'code', 'credits', 'deleted', 'createdAt_timestamp', 'updatedAt_timestamp'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field === 'id' ? '_id' : field] = this[field];
                }
            }

            const subject =await this.respository.deleteOne(params);
            //not implemented
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        try {
            const subject = await this.respository.deleteById(id);
            return new Subject(subject)
        } catch (error) {
            throw error
        }
    }

    
}

module.exports = Subject;