
class AuthTokenServiceHelper{
  constructor(authTokenService){
    this.authTokenService = authTokenService
  }

  generatePayload(userType, id, expiresTimestamp, priority=0,other={}){
    return this.authTokenService.generatePayload(userType, id, expiresTimestamp, priority=0,other={})
  }

  generateAccessToken(payload){
    return this.authTokenService.generateAccessToken(payload)
  }

  generateRefreshToken(payload){
    return this.authTokenService.generateRefreshToken(payload)
  }

  verifyAccessToken(token){
    return this.authTokenService.verifyAccessToken(token)
  }

  verifyRefreshToken(token){
    return this.authTokenService.verifyRefreshToken(token)
  }
}

class PasswordHashServiceHelper{

  constructor(passwordHashService){
    this.passwordHashService = passwordHashService
  }

  async hashPassword(password){
    return this.passwordHashService.hashPassword(password)
  }

  async verifyPassword(password, hashedPassword){
    return this.passwordHashService.verifyPassword(password, hashedPassword);
  }

}

class UserServiceHelper{

  constructor(userAccountService) {
    this.userAccountService = userAccountService
  }

  async getUserById(userType, id){
    return this.userAccountService.getUserById(userType, id)
  }

  async getUserByEmail(userType, email){
    return this.userAccountService.getUserByEmail(userType, email)
  }

  async findByIdAndUpdate(userType, user){
    return this.userAccountService.findByIdAndUpdate(userType, user)
  }

  isSuspended(user){
    return this.userAccountService.isSuspended(user);
  }

  isNullUser(user){
    return this.userAccountService.isNullUser(user)
  }
}

module.exports = {AuthTokenServiceHelper, PasswordHashServiceHelper, UserServiceHelper}