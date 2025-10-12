const { faker, de } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../../src/config');

const Department = require('../../src/classes//Department')
const DepartmentBuilder = require('../../src/classes/DepartmentBuilder')

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
    })

    test('Select created department', async()=>{
      const department = new Department()
      department.name = name;

      const found_department = await department.find()
      expect(found_department.length).toBeGreaterThan(0)
      expect(found_department[0].name).toStrictEqual(name);
    });
    test('Select department by id', async()=>{
      const department = new Department()
      const found_department = await department.findById(departmentId);
      expect(found_department.name).toStrictEqual(name);
    })

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
    })

    test('Delete department by id', async()=>{
      const department = new Department()
      department.id = departmentId;
      
      const found_department = await department.find();

      const deleted_department = await department.deleteById(found_department[0].id)
      expect(deleted_department.id).toStrictEqual(found_department[0].id)
    })
})




