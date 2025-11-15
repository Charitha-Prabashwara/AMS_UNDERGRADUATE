const UserNotFoundError = require('./RepositoryErrors/UserRepositoryErrors/UserNotFoundError');
const InvalidUserIdError = require('./RepositoryErrors/UserRepositoryErrors/InvalidUserIdError');
const ValidationFailedError = require('./DataTransferObjectErrors/ValidationFailedError')
const DuplicateKeyError = require('./RepositoryErrors/UserRepositoryErrors/DuplicateKeyError')
const ValidationError = require('./RepositoryErrors/UserRepositoryErrors/ValidationError')

const TokenExpiredError = require('./AuthTokenErrors/TokenExpiredError')
const JsonWebTokenError = require('./AuthTokenErrors/JsonWebTokenError')
const TokenNotBefore = require('./AuthTokenErrors/TokenNotBeforeError')
const GeneralTokenError = require('./AuthTokenErrors/GeneralTokenError')
const DepartmentNotFoundError = require('./RepositoryErrors/DepartmentRepositoryErrors/DepartmentNotFoundError')
const InvalidDepartmentIdError = require('./RepositoryErrors/DepartmentRepositoryErrors/InvalidDepartmentIdError')

const InvalidPasswordProvided = require('./PasswordHashErrors/InvalidPasswordProvided')
module.exports = {
    UserNotFoundError,
    InvalidUserIdError,
    ValidationFailedError,
    DuplicateKeyError,
    ValidationError,
    DepartmentNotFoundError,
    InvalidDepartmentIdError,
    TokenExpiredError,
    JsonWebTokenError,
    TokenNotBefore,
    GeneralTokenError,
    InvalidPasswordProvided
}