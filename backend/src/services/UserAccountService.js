const {User, Admin} = require('../classes/USERS')
const AdminBuilder = require('../classes/USERS/AdminBuilder');
const DepartmentHeadBuilder = require('../classes/USERS/DepartmentHeadBuilder')
const PasswordHashService = require('./PasswordHashService')
const {userTypes} = require('../config')
class UserAccountService{

    async createUser(dto){
        if(dto.type == userTypes.USER_ADMIN){
            const admin = new AdminBuilder();

            admin.registration_id = dto.registrationId;
            admin.name = {
                first_name: dto.firstName,
                last_name: dto.lastName,
                full_name: dto.fullName,
                with_initial_name: dto.nameWithInitial
            };
            admin.email = dto.email;
            admin.address = {
                line1:dto.addressLine1,
                line2:dto.addressLine2,
                zip:dto.addressZip
            };
            admin.password = await PasswordHashService.hashPassword(dto.password);

            const adminUser = await admin.create()
            return adminUser;

        }

        if(dto.type == userTypes.USER_DEPARTMENT){
            const departmentHead = new DepartmentHeadBuilder();

            departmentHead.registration_id = dto.registrationId;
            departmentHead.name = {
                first_name: dto.firstName,
                last_name: dto.lastName,
                full_name: dto.fullName,
                with_initial_name: dto.nameWithInitial
            };
            departmentHead.email = dto.email;
            departmentHead.address = {
                line1:dto.addressLine1,
                line2:dto.addressLine2,
                zip:dto.addressZip
            };
            departmentHead.password = await PasswordHashService.hashPassword(dto.password);

            const departmentHeadUser = await departmentHead.create()
            return departmentHeadUser;
        }
        
    }


}

module.exports = UserAccountService;