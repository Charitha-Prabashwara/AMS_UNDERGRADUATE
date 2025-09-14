const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../src/config');

const Department = require('../src/classes//Department')
const DepartmentBuilder = require('../src/classes/DepartmentBuilder')

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

describe('Test Department class', ()=>{
    const name ={
        long:faker.person.jobTitle(),
        short:faker.person.jobTitle(),
        key:faker.person.jobTitle()
    }

    const description = faker.lorem.paragraph()

    test('Create new Department', async()=>{
       const builder = new DepartmentBuilder();
       builder.name = name;
       builder.description = description;

       const result = await builder.create();
    console.log(result.id)
       expect(result.name).toStrictEqual(name);
       expect(result.description).toBe(description)
    },20000)
})




