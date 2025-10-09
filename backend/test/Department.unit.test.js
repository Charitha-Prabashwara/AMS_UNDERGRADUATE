const { faker, de } = require('@faker-js/faker');
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
},20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);

describe('Test Department class', ()=>{
    const name ={
        long:faker.person.jobTitle(),
        short:faker.person.jobTitle(),
        key:faker.person.jobTitle()
    }

    const description = faker.lorem.paragraph()
    let departmentId
    test('Create new Department', async()=>{
       const builder = new DepartmentBuilder();
       builder.name = name;
       builder.description = description;

       const result = await builder.create();
       expect(result.name).toStrictEqual(name);
       expect(result.description).toBe(description)
       departmentId = result.id;
    },20000)

    test('Select created department', async()=>{
      const department = new Department()
      department.name = name;

      const found_department = await department.find()
      expect(found_department.length).toBeGreaterThan(0)
      expect(found_department[0].name).toStrictEqual(name);
    },20000);
    test('Select department by id', async()=>{
      const department = new Department()
      const found_department = await department.findById(departmentId);
      expect(found_department.name).toStrictEqual(name);
    }, 20000)

    test('Update department by id', async()=>{
      const department = new Department();
      department.id = departmentId;

      const new_name = {
          long:faker.person.jobTitle(),
          short:faker.person.jobTitle(),
          key:faker.person.jobTitle()
      }

     
      const found_department = await department.find();

      found_department[0].name = new_name;

      const updated = await found_department[0].save()

      expect(updated.name).toStrictEqual(new_name) 
    }, 20000)

    test('Delete department by id', async()=>{
      const department = new Department()
      department.id = departmentId;
      
      const found_department = await department.find();

      const deleted_department = await department.deleteById(found_department[0].id)
      expect(deleted_department.id).toStrictEqual(found_department[0].id)
    }, 20000)
})




