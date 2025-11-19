const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { faker } = require('@faker-js/faker');

const PasswordHashService = require('../../../src/services/PasswordHashService');
const { config, userTypes } = require('../../../src/config');
const { Admin, DepartmentHead, Lecturer, Student } = require('../../../src/classes/USERS');
const AdminBuilder = require('../../../src/classes/USERS/AdminBuilder');

const {AuthTokenServiceHelper, UserServiceHelper, PasswordHashServiceHelper} = require('../../../src/services/authServiceHelper');
const AuthTokenService = require('../../../src/services/authTokenService')
const UserService = require('../../../src/services/UserService')
const {AuthService} = require('../../../src/services/AuthService')
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Service - Admin', () => {
    let admin
    let password
    beforeAll(async () => {
        const defaultPassword = faker.internet.password(10);
        const registration_id = faker.string.uuid();
        const address = {
            line1: faker.location.streetAddress({ useFullAddress: true }),
            line2: faker.location.streetAddress({ useFullAddress: true }),
            zip: faker.location.zipCode()
        };
        const name = {
            first_name:faker.person.firstName(),
            last_name:faker.person.lastName(),
            full_name:faker.person.fullName(),
            with_initial_name:faker.person.fullName()
        }
        const email = faker.internet.email().toLowerCase();

        const builder = new AdminBuilder();

        builder.registration_id= registration_id
        builder.address = address
        builder.name = name
        builder.email = email
        builder.password = await PasswordHashService.hashPassword(defaultPassword);


        const user = await builder.create()
        expect(user).toBeDefined()
        admin=user
        password=defaultPassword
    });

    test('should login', async () => {
        const service = new AuthService(new UserServiceHelper(new UserService()), new AuthTokenServiceHelper(AuthTokenService), new PasswordHashServiceHelper(PasswordHashService))
        const response =await service.login(userTypes.USER_ADMIN, admin.email, password)
        
        expect(response).toBeDefined()
        expect(response.user).toBeDefined()
        expect(response.tokens).toBeDefined()

        expect(response.user.id).toBeDefined()
        expect(response.user.name).toBeDefined()
        expect(response.user.type).toBeDefined()
        expect(response.user.email).toBeDefined()

        expect(response.tokens.access).toBeDefined()
        expect(response.tokens.refresh).toBeDefined()

        
        
     })

     test('should rest user password', async () => {
       const service  = new AuthService(new UserServiceHelper(new UserService()), new AuthTokenServiceHelper(AuthTokenService), new PasswordHashServiceHelper(PasswordHashService))
       const new_password = faker.internet.password(10)
       const isChanged = await service.passwordReset(userTypes.USER_ADMIN, admin.id, new_password)

       expect(isChanged).toBe(true)

       const response =await service.login(userTypes.USER_ADMIN, admin.email, new_password)

       expect(response).toBeDefined()
        expect(response.user).toBeDefined()
        expect(response.tokens).toBeDefined()

        expect(response.user.id).toBeDefined()
        expect(response.user.name).toBeDefined()
        expect(response.user.type).toBeDefined()
        expect(response.user.email).toBeDefined()

        expect(response.tokens.access).toBeDefined()
        expect(response.tokens.refresh).toBeDefined()
       
       

     })

    test('should handle incorrect credentials', async () => {
      const service = new AuthService(new UserServiceHelper(new UserService()), new AuthTokenServiceHelper(AuthTokenService), new PasswordHashServiceHelper(PasswordHashService))
      await expect(service.login(userTypes.USER_ADMIN, faker.internet.email().toLowerCase(), password))
      .rejects.toThrow("Invalid Credentials");

       await expect(service.login(userTypes.USER_ADMIN, admin.email, faker.internet.password(10)))
      .rejects.toThrow("Invalid Credentials");
    })
})
