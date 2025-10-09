const {SubjectRepository} = require('./DATABASE')
const Subject = require('./Subject')

class SubjectBuilder{
   
    name
    code
    credits
   

    constructor(data={}){
        
        this.name - data.name
        this.code = data.code
        this.credits = data.credits
        this.respository = new SubjectRepository();
    }

    async create(){
        try {

            const fields = [
                'name', 'code' ,'credits'
            ]
            const params = {}

            for(const field of fields){
                if(this[field] !== undefined){
                    params[field] = this[field]
                }
            }
            const subject = await this.respository.create(params);
            return new Subject(subject)
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SubjectBuilder