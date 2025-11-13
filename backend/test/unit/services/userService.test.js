const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { faker } = require('@faker-js/faker');

const { Admin } = require('../../../src/classes/USERS');
const AdminBuilder = require('../../../src/classes/USERS/AdminBuilder');
const PasswordHashService = require('../../../src/services/PasswordHashService');
const { config, userTypes } = require('../../../src/config');

const UserService = require('../../../src/services/UserService')

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

describe('userService test', () => {
  let adminBuilders = [];
  let adminPasswords = [];
  let adminUsers = [];

  beforeAll(async () => {
    const tempBuilders = [];
    const tempPasswords = [];

    // Create fake admin builders and users
    for (let i = 0; i < 5; i++) {
      const builder = new AdminBuilder();
      const defaultPassword = faker.internet.password(10);

      builder.registration_id = faker.string.uuid();
      builder.address = {
        line1: faker.location.streetAddress({ useFullAddress: true }),
        line2: faker.location.streetAddress({ useFullAddress: true }),
        zip: faker.location.zipCode(),
      };

      builder.email = faker.internet.email().toLowerCase();
      builder.name = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        full_name: faker.person.fullName(),
        with_initial_name: faker.person.fullName(),
      };
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      tempBuilders.push(builder);
      tempPasswords.push(defaultPassword);
    }

    adminBuilders = tempBuilders;
    adminPasswords = tempPasswords;

    // Create actual Admin users
    for (const builder of adminBuilders) {
      const user = await builder.create();
      adminUsers.push(user);
    }

    // ensure we have data
    expect(adminUsers.length).toBeGreaterThan(0);
  });

 
  test('all created users should be valid', async () => {
    for (const user of adminUsers) {
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();

    }
  });

 
  test('should find each user by ID from database', async () => {
    for (const user of adminUsers) {

      const service = new UserService();
      const found = await service.getUserById(userTypes.USER_ADMIN,user.id);

      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Admin)
      expect(found._type).toBe(userTypes.USER_ADMIN)
      expect(found.email).toBe(user.email);
    }
  });

  test('should find each user by registration id from database', async () => {
    for (const user of adminUsers) {

      const service = new UserService();
      const found = await service.getUserByRegistrationId(userTypes.USER_ADMIN,user.registration_id);
    
      expect(found).toBeDefined();
      expect(found.registration_id).toBeDefined();
      expect(found).toBeInstanceOf(Admin)
      expect(found._type).toBe(userTypes.USER_ADMIN)
      expect(found.email).toBe(user.email);
    }
   })

   test('should find each user by email id from database', async () => {
    for (const user of adminUsers) {

      const service = new UserService();
      const found = await service.geyUserByEmail(userTypes.USER_ADMIN,user.email);
        
      expect(found).toBeDefined();
      expect(found).toBeInstanceOf(Admin)
      expect(found._type).toBe(userTypes.USER_ADMIN)
      expect(found.email).toBe(user.email);
    }

    
})

  test('should find each user from database', async () => {
    for (const user of adminUsers) {

      const service = new UserService();
      const found_users = await service.getFindUsers(user);
      found_users.forEach(found => {
        expect(found).toBeDefined();
        expect(found).toBeInstanceOf(Admin)
        expect(found).toBe(user);
      });
     
    }
   })
});
