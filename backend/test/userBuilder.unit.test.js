
const { UserBuilder} = require('../src/classes/USERS');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../src/config');
beforeAll(async () => {
   try {
    await mongoose.connect(config.DB_MONGODB_URI + config.DB_MONGODB_DATABASE_TEST);
   
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});

afterAll(async () => {
 
  await mongoose.connection.close();
});

describe('Test User class', () => {
  test('Create new User', async () => {


    const registration_id =  faker.string.uuid();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = faker.person.fullName();
    const with_initial = faker.person.fullName();

    const address = {
        line1: faker.location.streetAddress({ useFullAddress: true }),
        line2: undefined,
        zip: faker.location.zipCode()
    }
    const email = faker.internet.email();

      const builder = new UserBuilder();
        builder.registration_id = registration_id;
        builder.name = {
        first_name:first_name,
        last_name:last_name,
        full_name:full_name,
        with_initial:with_initial
        }
        builder.address={
            line1:address.line1, 
            line2:address.line2, 
            zip:address.zip
        }

        builder.email=email;
        builder.password = "123456";
        const result = await builder.create()
    
    expect(result.registration_id).toBe(registration_id);
    expect(result.name.first_name).toBe(first_name);
    expect(result.name.last_name).toBe(last_name);
    expect(result.name.full_name).toBe(full_name);
    expect(result.name.with_initial_name).toBe(with_initial);
   
  }, 20000);

});
