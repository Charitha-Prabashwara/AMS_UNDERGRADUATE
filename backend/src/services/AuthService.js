const {AuthTokenServiceHelper, PasswordHashServiceHelper, UserServiceHelper}= require('./authServiceHelper')
const UserService = require('./UserService')
const PasswordHashService = require('./PasswordHashService')
const AuthTokenService = require('./authTokenService')
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

      if(this.#userService.isNullUser(user)|| this.#userService.isSuspended(user)){throw new Error('login failed')}

      const isMatching = await this.#passwordHashService.verifyPassword(password, user.password)
      if(!isMatching){throw new Error('login failed')}

      const payload = this.#authTokenService.generatePayload(user._type, user.id, Date.now(), priority, {});
      const accessToken = this.#authTokenService.generateAccessToken(payload)
      const refreshToken = this.#authTokenService.generateRefreshToken(payload)

      user.access_token = accessToken
      user.refresh_token = refreshToken

      const updatedUser = await this.#userService.findByIdAndUpdate(user._type, user);
      if(this.#userService.isNullUser(updatedUser)){
        throw new Error('login failed')
      }
      
      return {
        user:{
          id:updatedUser.id,
          type: updatedUser._type,
          email: updatedUser.email,
          name: updatedUser.name
        },
        tokens:{
          refresh: refreshToken,
          access: refreshToken
        }
      }

    } catch (error) {
      throw error
    }
  }


}

module.exports = AuthService