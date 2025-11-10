const {userTypes, config} = require('../../config')
const jwt = require('jsonwebtoken');
const {TokenExpiredError, JsonWebTokenError, TokenNotBefore, GeneralTokenError} = require('../../errors')

class authTokenServiceSupport{

    constructor(){
       if(authTokenServiceSupport.instance == null){
          authTokenServiceSupport.instance = this;
          Object.freeze(this);
        }
        return authTokenServiceSupport.instance;
    }

    generatePayload(userType, id, expiresTimestamp, priority=0,other={}){
        const payload = {
            userType:userType,
            id:id,
            priority:priority,
            expiresTimestamp: expiresTimestamp,
            other:other
        }

        return payload;
    }
    
    generateAccessToken(payload){
       const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: config.ACCESS_TOKEN_TTL})
       return accessToken;
    }

    verifyAccessToken(token){
      
      try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
        return decoded;
      } catch (error) {
        throw error
      }
    }
}

module.exports = new authTokenServiceSupport();