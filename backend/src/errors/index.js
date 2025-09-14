const UserNotFoundError = require('./RepositoryErrors/UserRepositoryErrors/UserNotFoundError');
const InvalidUserIdError = require('./RepositoryErrors/UserRepositoryErrors/InvalidUserIdError');
const ValidationFailedError = require('./DataTransferObjectErrors/ValidationFailedError')
const DuplicateKeyError = require('./RepositoryErrors/UserRepositoryErrors/DuplicateKeyError')
const ValidationError = require('./RepositoryErrors/UserRepositoryErrors/ValidationError')

const DepartmentNotFoundError = require('./RepositoryErrors/DepartmentRepositoryErrors/DepartmentNotFoundError')
const InvalidDepartmentIdError = require('./RepositoryErrors/DepartmentRepositoryErrors/InvalidDepartmentIdError')

module.exports = {
    UserNotFoundError,
    InvalidUserIdError,
    ValidationFailedError,
    DuplicateKeyError,
    ValidationError,
    DepartmentNotFoundError,
    InvalidDepartmentIdError
}