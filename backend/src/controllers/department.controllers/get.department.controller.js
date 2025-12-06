const DepartmentService = require('../../services/DepartmentService')
const {DepartmentNotFoundError} = require('../../errors')
const deptService = new DepartmentService();


exports.getDepartmentById = async(dto, req, res, next)=>{
    try {
        const department =await deptService.getDepartmentById(dto.id)
        if(deptService.isNullDepartment(department)) throw new DepartmentNotFoundError()
        return res.status(200).json({ success: true, department: department });
    } catch (error) {
        next(error)
    }
}