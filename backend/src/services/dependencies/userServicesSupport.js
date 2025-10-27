const {userTypes} = require('../../config')
const AdminBuilder = require('../../classes/USERS/AdminBuilder');
const DepartmentHeadBuilder = require('../../classes/USERS/DepartmentHeadBuilder')
const LecturerBuilder = require('../../classes/USERS/LecturerBuilder');
const StudentBuilder = require('../../classes/USERS/StudentBuilder')

const {Admin, DepartmentHead, Lecturer, Student} = require('../../classes/USERS')

const buildersMap={
    [userTypes.USER_STUDENT]: StudentBuilder,
    [userTypes.USER_LECTURER]: LecturerBuilder,
    [userTypes.USER_DEPARTMENT]: DepartmentHeadBuilder,
    [userTypes.USER_ADMIN]: AdminBuilder
}

const userClassMap={
    [userTypes.USER_STUDENT]: Student,
     [userTypes.USER_LECTURER]: Lecturer,
    [userTypes.USER_DEPARTMENT]: DepartmentHead,
    [userTypes.USER_ADMIN]:Admin
}

function selectCorrectBuilder(userType) {
    const BuilderClass = buildersMap[userType];
    if (!BuilderClass) throw new Error('undefined user type');
    return new BuilderClass();
}

function selectCorrectUser(userType){
    const userClass = userClassMap[userType];
    if(!userClass) throw new Error('undefined user type')
    return new userClass();
}

function setNames(firstName, lastName, fullName, nameWithInitial){
    return {first_name: firstName, last_name: lastName, full_name:fullName, with_initial_name:nameWithInitial}
}
function setAddress(addressLine1, addressLine2, zip){
    return {line1:addressLine1, line2:addressLine2, zip:zip}
}

module.exports ={selectCorrectBuilder, setNames, setAddress, selectCorrectUser}