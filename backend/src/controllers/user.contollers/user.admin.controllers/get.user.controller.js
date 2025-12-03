const UserService = require('../../../services/UserService')
const userService = new UserService()
const {httpStatus, Strings} = require('../../../config')
const {UserNotFoundError} = require('../../../errors')

exports.getUserById = async(dto,req, res, next)=>{
    try {
        const user = await userService.getUserById(dto.type, dto.id)
        if(userService.isNullUser(user)) throw new UserNotFoundError()
        
        return res.status(httpStatus.OK).json(
            {
                success:true,
                data:{
                    user:user
                }

            }
        )
    } catch (error) {
       next(error)
    } 
}

exports.getUserByRegistrationId = async(dto,req, res, next)=>{
    try {
        const user = await userService.getUserByRegistrationId(dto.type, dto.registrationId)
        if(userService.isNullUser(user)) throw new UserNotFoundError()
        
        return res.status(httpStatus.OK).json(
            {
                success:true,
                data:{
                    user:user
                }

            }
        )
    } catch (error) {
       next(error)
    } 
}

exports.getUserByEmailId = async(dto,req, res, next)=>{
    try {
        const user = await userService.getUserByEmail(dto.type, dto.email)
        if(userService.isNullUser(user)) throw new UserNotFoundError('ERROR_USER_NOT_FOUND', 'si')
        
        return res.status(httpStatus.OK).json(
            {
                success:true,
                data:{
                    user:user
                }

            }
        )
    } catch (error) {
       next(error)
    } 
}


exports.allUsers = async(dto, req, res, next)=>{
    
}