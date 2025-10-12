const {DepartmentHead} = require('../../../src/classes/USERS');
const DepartmentHeadBuilder = require('../../../src/classes/USERS/DepartmentHeadBuilder')
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../../../src/config');
const PasswordHashService =require('../../../src/services/PasswordHashService')

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

describe('Test Department Head', () => {
    const registration_id =  faker.string.uuid();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = faker.person.fullName();
    const with_initial = faker.person.fullName();

    const default_test_password = "123456"
    const address = {
        line1: faker.location.streetAddress({ useFullAddress: true }),
        line2: undefined,
        zip: faker.location.zipCode()
    }
    const email = faker.internet.email().toLowerCase();

    let new_department_id;

    test('Create new departmentHead', async() => { 
        const builder = new DepartmentHeadBuilder();

        builder.registration_id = registration_id;
        builder.name = {
            first_name:first_name,
            last_name:last_name,
            full_name:full_name,
            with_initial_name:with_initial
        }
        builder.address={
            line1:address.line1, 
            line2:address.line2, 
            zip:address.zip
        }

        builder.email=email;
        builder.password = await PasswordHashService.hashPassword(default_test_password);
        const result = await builder.create()
    
        expect(result.registration_id).toBe(registration_id);
        expect(result.name.first_name).toBe(first_name);
        expect(result.name.last_name).toBe(last_name);
        expect(result.name.full_name).toBe(full_name);
        expect(result.name.with_initial_name).toBe(with_initial);


    })

    test('Select departmentHead', async () => {
        const departmentHead = new DepartmentHead()

        departmentHead.registration_id = registration_id
        departmentHead.name =  {
            first_name:first_name,
            last_name:last_name,
            full_name:full_name,
            with_initial_name:with_initial
        }
        departmentHead.address={
            line1:address.line1, 
            zip:address.zip
        }
        departmentHead.email = email
        
        const d_heads = await departmentHead.find();
        const result= d_heads[0]

        expect(result.registration_id).toBe(registration_id);
        expect(result.name.first_name).toBe(first_name);
        expect(result.name.last_name).toBe(last_name);
        expect(result.name.full_name).toBe(full_name);
        expect(result.name.with_initial_name).toBe(with_initial);
        new_department_id = result.id
    })

    test('Select ById', async () => {
        const departmentHead = await new DepartmentHead().findById(new_department_id)
        
        expect(departmentHead.registration_id).toBe(registration_id);
        expect(departmentHead.name.first_name).toBe(first_name);
        expect(departmentHead.name.last_name).toBe(last_name);
        expect(departmentHead.name.full_name).toBe(full_name);
        expect(departmentHead.name.with_initial_name).toBe(with_initial);
    })

        test('Select ById and update', async () => {
        const departmentHead = await new DepartmentHead().findById(new_department_id)
        
        expect(departmentHead.registration_id).toBe(registration_id);
        expect(departmentHead.name.first_name).toBe(first_name);
        expect(departmentHead.name.last_name).toBe(last_name);
        expect(departmentHead.name.full_name).toBe(full_name);
        expect(departmentHead.name.with_initial_name).toBe(with_initial);

        const new_registration_id =  faker.string.uuid();
        const new_first_name = faker.person.firstName();
        const new_last_name = faker.person.lastName();
        const new_full_name = faker.person.fullName();
        const new_with_initial = faker.person.fullName();

        departmentHead.registration_id = new_registration_id;
        departmentHead.name =  {
            first_name:new_first_name,
            last_name:new_last_name,
            full_name:new_full_name,
            with_initial_name:new_with_initial
        }

        const saved = await departmentHead.save()

        expect(saved.registration_id).toBe(new_registration_id);
        expect(saved.name.first_name).toBe(new_first_name);
        expect(saved.name.last_name).toBe(new_last_name);
        expect(saved.name.full_name).toBe(new_full_name);
        expect(saved.name.with_initial_name).toBe(new_with_initial);
    })

    test('Delete byId', async () => { 
        const user = await new DepartmentHead().deleteById(new_department_id)
        expect(user.id).toStrictEqual(new_department_id)
     })
})