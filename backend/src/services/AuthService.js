const {InvalidCredentialsError, LoginFailedError, PasswordResetFailedError, AuthHeaderMissing, UnauthorizedError, DoesNotHavePermissionError, InvalidAuthFormatError} = require('../errors')

class AuthService{
  #userService
  #authTokenService
  #passwordHashService

  constructor(userService, authTokenService, passwordHashService) {
    this.#userService = userService
    this.#authTokenService = authTokenService
    this.#passwordHashService = passwordHashService
  }

  async login(userType, email, password, priority=0){
   
    try {
      const user = await this.#userService.getUserByEmail(userType,email);

      if(this.#userService.isNullUser(user) || this.#userService.isSuspended(user)) throw new InvalidCredentialsError()

      const isMatching = await this.#passwordHashService.verifyPassword(password, user.password)
      if(!isMatching) throw new InvalidCredentialsError()

      const payload = this.#authTokenService.generatePayload(user._type, user.id, Date.now(), priority, {});
      const accessToken = this.#authTokenService.generateAccessToken(payload)
      const refreshToken = this.#authTokenService.generateRefreshToken(payload)

      user.access_token = accessToken
      user.refresh_token = refreshToken

      const updatedUser = await this.#userService.findByIdAndUpdate(user._type, user);
      if(this.#userService.isNullUser(updatedUser)) throw new LoginFailedError()
      
      return {
        user:{id:updatedUser.id, type: updatedUser._type, email: updatedUser.email, name: updatedUser.name},
        tokens:{refresh: refreshToken, access: refreshToken}
      }

    } catch (error) {
      throw error
    }
  }

  async verifyAccessToken(token){
    return await this.#authTokenService.verifyAccessToken(token)
  }

  async verifyRefreshToken(token){
    return await this.#authTokenService.verifyRefreshToken(token)
  }

  async passwordReset(userType, id, password){
    try {
      const user =await this.#userService.getUserById(userType, id)
      
      if(this.#userService.isNullUser(user) || this.#userService.isSuspended(user)){
        throw new PasswordResetFailedError()
      }

      user.password = await this.#passwordHashService.hashPassword(password)
      const updatedUser = await this.#userService.findByIdAndUpdate(user._type, user);
      
      if(this.#userService.isNullUser(updatedUser)){
        throw new PasswordResetFailedError()
      }
      return true;
    } catch (error) {
      throw error
    }
  }

  async logOut(userType, id){

    const user = this.#userService.getUserById(userType, id);
    
    if(this.#userService.isNullUser(user) || this.#userService.isSuspended(user)){
      throw new Error('login failed')
    }

    user.access_token=""
    user.refresh_token=""

    const updatedUser = await this.#userService.findByIdAndUpdate(user._type, user);

    if(this.#userService.isNullUser(updatedUser)){
      throw new Error('password reset failed')
    }
    return true;

  }
}

class AuthWare{

    constructor(authService){
      this.authService = authService
    }

    authority(allowedAccess=[]){
      return async (req, next)=>{

        try {
          const requiredHeaders = (req.hasHeader("Authorization")) || (req.hasHeader("authorization"))
          if(!requiredHeaders) throw new AuthHeaderMissing()
        
          const authHeader = (req.headers.Authorization || req.headers.authorization);
          if(!authHeader || !authHeader.startsWith("Bearer")) throw new InvalidAuthFormatError() 

          const accessToken = authHeader.split(" ")[1];
          const payload = await this.authService.verifyAccessToken(accessToken);
          if(!payload) throw new UnauthorizedError()
            
          const isAllowed = allowedAccess.includes(payload.userType);
          if(!isAllowed) throw new DoesNotHavePermissionError();
    
          req.user= payload
          next();
        } catch (error) {
          throw error
        } 
      }
    }
}

module.exports = {AuthService, AuthWare}