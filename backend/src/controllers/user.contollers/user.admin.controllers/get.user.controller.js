const  {UserBuilder, AdminBuilder, User, Admin} = require('../../../classes/USERS')
const {UserAccountService} = require('../../../services')
const {DuplicateKeyError, ValidationError} = require('../../../errors/')

exports.getUserById = async(req, res, next)=>{
    try {
       const userType = req.params.userType
       const id = req.params.id

     const user = await UserAccountService.getUserById(id, userType);

       return res.status(200).json(
        {
            success:true,
            message: "api/v1 is working...",
            user:user

           
        })
        
    
    } catch (error) {
       next(error)
    }
   
}
