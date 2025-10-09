const { faker, de } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../../src/config');

const Subject = require('../../src/classes/Subject')
const SubjectBuilder = require('../../src/classes/SubjectBuilder')

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


describe('Test Subject class', ()=>{
    const name = faker.person.firstName()
    const code = faker.phone.number()
    const creadits = 2

    let subjectId;

    test('Create new Subject', async()=>{
        const builder = new SubjectBuilder()
        builder.name = name
        builder.code=code
        builder.credits=creadits

        const subject = await builder.create();

        expect(subject.name).toBe(name)
        expect(subject.code).toBe(code)
        expect(subject.credits).toBe(creadits)
        subjectId = subject.id
        
    }, 20000)

    test('Select find created Subject', async()=>{

      const subject = new Subject();
      subject.name = name;
      subject.code = code;
      subject.credits = creadits;

      const result = await subject.find()
      expect(result[0].name).toBe(name)
      expect(result[0].code).toBe(code)
      expect(result[0].credits).toBe(creadits)


    }, 20000)

    test('Select subject byId', async()=>{
      const subject = await new Subject().findById(subjectId);

      expect(subject.name).toBe(name)
      expect(subject.code).toBe(code)
      expect(subject.credits).toBe(creadits)
      
    }, 20000)

    test('Update subject ById', async()=>{

      const subject = await new Subject().findById(subjectId)

      const new_name = faker.person.jobTitle()
      const new_code = faker.phone.number()
      const new_credits = 1

      subject.name = new_name;
      subject.code = new_code;
      subject.credits = new_credits;

      const updated_subject = await subject.save()

      expect(updated_subject.name).toBe(new_name)
      expect(updated_subject.code).toBe(new_code)
      expect(updated_subject.credits).toBe(new_credits)
    }, 20000);

    test('Delete subject ById', async()=>{
      const subject = await new Subject().deleteById(subjectId);
      expect(subject.id).toStrictEqual(subjectId)
    }, 20000)
})