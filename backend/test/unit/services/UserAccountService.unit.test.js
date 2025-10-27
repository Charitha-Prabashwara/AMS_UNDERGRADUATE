
const {Admin, NullUser, Lecturer, Student} = require('../../../src/classes/USERS');
const AdminBuilder = require('../../../src/classes/USERS/AdminBuilder')
const LecturerBuilder = require('../../../src/classes/USERS/LecturerBuilder')
const StudentBuilder = require('../../../src/classes/USERS/StudentBuilder')
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config, userTypes} = require('../../../src/config');

const {UserAccountService, PasswordHashService} = require('../../../src/services/')

const { MongoMemoryServer } = require('mongodb-memory-server');
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

 

  describe('Should create an Admin and get Admin using user-account-service', () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = faker.person.fullName();
    const with_initial = faker.person.fullName();
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: undefined,
      zip: faker.location.zipCode()
    };
    const email = faker.internet.email().toLowerCase();

    let createdAdmin;
    

    test('Should create a new Admin successfully', async () => {
      const builder = new AdminBuilder();
      builder.registration_id = registration_id;
      builder.name = {
        first_name,
        last_name,
        full_name,
        with_initial_name: with_initial
      };

      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdAdmin = await builder.create();

      expect(createdAdmin).toBeInstanceOf(Admin);
      expect(createdAdmin.registration_id).toBe(registration_id);
      expect(createdAdmin.name.first_name).toBe(first_name);
      expect(createdAdmin._type).toBe(userTypes.USER_ADMIN);

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdAdmin.password);
      expect(compare).toBe(true);
    });

    test('Should find Admin by ID', async () => {
      const finder = new Admin();
      const found = await finder.findById(createdAdmin.id);
      expect(found).toBeInstanceOf(Admin);
      expect(found.id).toStrictEqual(createdAdmin.id);
    });

    
    test('Should get created Admin user details suing user-account-service', async () => { 
      const service = UserAccountService;
      const user = await service.getUserById(userTypes.USER_ADMIN,createdAdmin.id)
      expect(user).toBeInstanceOf(Admin);
      expect(user.id).toStrictEqual(createdAdmin.id)
      createdAdmin = user
    })
    
    test('password filed should not visible in default condition in user-account-service', async() => { 
      expect(createdAdmin.password).toBe(undefined)
    })
  })

describe('Should create an Lecturer and get Lecturer using user-account-service', () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = faker.person.fullName();
    const with_initial = faker.person.fullName();
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: undefined,
      zip: faker.location.zipCode()
    };
    const email = faker.internet.email().toLowerCase();

    let createdLecturer;
    
    test('Should create a new Lecturer successfully', async () => {
      const builder = new LecturerBuilder();
      builder.registration_id = registration_id;
      builder.name = {
        first_name,
        last_name,
        full_name,
        with_initial_name: with_initial
      };

      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdLecturer = await builder.create();

      expect(createdLecturer).toBeInstanceOf(Lecturer);
      expect(createdLecturer.registration_id).toBe(registration_id);
      expect(createdLecturer.name.first_name).toBe(first_name);
      expect(createdLecturer._type).toBe(userTypes.USER_LECTURER);

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdLecturer.password);
      expect(compare).toBe(true);
    });

    test('Should find Lecturer by ID', async () => {
      const finder = new Lecturer();
      const found = await finder.findById(createdLecturer.id);
      expect(found).toBeInstanceOf(Lecturer);
      expect(found.id).toStrictEqual(createdLecturer.id);
    });

    
    test('Should get created Lecturer user details suing user-account-service', async () => { 
      const service = UserAccountService;
      const user = await service.getUserById(userTypes.USER_LECTURER,createdLecturer.id)
      expect(user).toBeInstanceOf(Lecturer);
      expect(user.id).toStrictEqual(createdLecturer.id)
      createdLecturer = user
    })
    
    test('password filed should not visible in default condition in user-account-service', async() => { 
      expect(createdLecturer.password).toBe(undefined)
    })
  })


describe('Should create an Student and get Student using user-account-service', () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = faker.person.fullName();
    const with_initial = faker.person.fullName();
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: undefined,
      zip: faker.location.zipCode()
    };
    const email = faker.internet.email().toLowerCase();

    let createdStudent;
    
    test('Should create a new Student successfully', async () => {
      const builder = new StudentBuilder();
      builder.registration_id = registration_id;
      builder.name = {
        first_name,
        last_name,
        full_name,
        with_initial_name: with_initial
      };

      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdStudent = await builder.create();

      expect(createdStudent).toBeInstanceOf(Student);
      expect(createdStudent.registration_id).toBe(registration_id);
      expect(createdStudent.name.first_name).toBe(first_name);
      expect(createdStudent._type).toBe(userTypes.USER_STUDENT);

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdStudent.password);
      expect(compare).toBe(true);
    });

    test('Should find Student by ID', async () => {
      const finder = new Student();
      const found = await finder.findById(createdStudent.id);
      expect(found).toBeInstanceOf(Student);
      expect(found.id).toStrictEqual(createdStudent.id);
    });

    
    test('Should get created Student user details suing user-account-service', async () => { 
      const service = UserAccountService;
      const user = await service.getUserById(userTypes.USER_STUDENT,createdStudent.id)
      expect(user).toBeInstanceOf(Student);
      expect(user.id).toStrictEqual(createdStudent.id)
      createdStudent = user
    })
    
    test('password filed should not visible in default condition in user-account-service', async() => { 
      expect(createdStudent.password).toBe(undefined)
    })
  })

 