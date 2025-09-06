const  {UserBuilder, AdminBuilder, User, Admin} = require('../../../classes/USERS')

exports.createUser = async(dto,req, res)=>{
    return res.status(200).json(
        {
            success:true,
            message: "api/v1 is working...",
            dto:dto
        },
        
    )
}