const {userTypes, config} = require('../config')
const jwt = require('jsonwebtoken');
const {TokenExpiredError, JsonWebTokenError, TokenNotBefore, GeneralTokenError} = require('../errors')

class authTokenServiceSupport{

    constructor(){
       if(authTokenServiceSupport.instance == null){
          authTokenServiceSupport.instance = this;
          Object.freeze(this);
        }
        return authTokenServiceSupport.instance;
    }

    generatePayload(userType, id, expiresTimestamp, priority=0,other={}){
        return {
            userType:userType,
            id:id,
            priority:priority,
            expiresTimestamp: expiresTimestamp,
            other:other
        } 
    }
    
    generateAccessToken(payload){
      return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: config.ACCESS_TOKEN_TTL})
    }

    generateRefreshToken(payload){
      return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: config.REFRESH_TOKEN_TTL})
    }

    #verify(token, secret){
      try {

        return jwt.verify(token, secret)

      } catch (error) {

        switch (error.name) {
            case 'TokenExpiredError':
                throw new TokenExpiredError();
            case 'JsonWebTokenError':
                throw new JsonWebTokenError();
            case 'NotBeforeError':
                throw new TokenNotBefore();
            default:
                throw new GeneralTokenError();
        }
      }
    }

    verifyAccessToken(token){
      return this.#verify(token, config.ACCESS_TOKEN_SECRET)
    }

    verifyRefreshToken(token){
      return this.#verify(token, config.REFRESH_TOKEN_SECRET)
    }
}

module.exports = new authTokenServiceSupport();