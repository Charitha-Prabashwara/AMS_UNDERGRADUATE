const  {UserBuilder, AdminBuilder, User, Admin} = require('../../../classes/USERS')
const {UserAccountService} = require('../../../services')
const {DuplicateKeyError, ValidationError} = require('../../../errors/')

exports.createUser = async(dto,req, res, next)=>{
    try {
        const service  = new UserAccountService()
        const user = await service.createUser(dto);
        

         return res.status(200).json(
        {
            success:true,
            message: "api/v1 is working...",
            dto:user
        })
        
    
    } catch (error) {
       next(error)
    }
   
}