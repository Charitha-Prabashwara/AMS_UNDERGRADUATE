const Department = require('../classes/Department')
const DepartmentBuilder = require('../classes/DepartmentBuilder')

class DepartmentService{

    constructor(){
        this.deptClass = new Department()
    }
    async getDepartmentById(id){
        return this.deptClass.findById(id);
    }

    async getFindDepartment(data={}){
        const dept = new Department()
        const {name,description, deleted, createdAt_timestamp, updatedAt_timestamp} = data

        dept.name = name
        dept.description = description
        dept.deleted = deleted
        dept.createdAt_timestamp = createdAt_timestamp
        dept.updatedAt_timestamp =updatedAt_timestamp 
        
        return dept.find()
    }

    async createDepartment(name={}, description){
        const {long, short, key} = name
        const builder =new DepartmentBuilder()

        builder.name = {long: long, short:short, key:key}
        builder.description = description
        
        return builder.create() 
    }

    async deleteDepartmentById(id){
        return this.deptClass.deleteById(id)
    }

}

module.exports = DepartmentService