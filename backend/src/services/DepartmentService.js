const Department = require('../classes/Department')
const DepartmentBuilder = require('../classes/DepartmentBuilder')

class DepartmentService{

    async getDepartmentById(id){
        const deptClass = new Department()
        return await deptClass.findById(id);
    }

    async getFindDepartment(department){
        return await department.find()
    }

    async createDepartment(data={}){
        const builder =new DepartmentBuilder()
        builder.name = data.name
        builder.description = data.description

        return await builder.create() 
    }

    async deleteDepartmentById(id){
        const deptClass = new Department();
        return await deptClass.deleteById(id)
    }

}

module.exports = DepartmentService