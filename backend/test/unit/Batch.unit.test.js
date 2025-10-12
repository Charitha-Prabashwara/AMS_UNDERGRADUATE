const {faker} = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config} = require('../../src/config');

const Batch = require('../../src/classes/Batch')
const BatchBuilder = require('../../src/classes/BatchBuilder')

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

describe('Test Batch class', ()=>{
    const name = faker.person.jobTitle();
    const lb = faker.number.int({min:20, max:25})
    const ub = faker.number.int({min:26, max:30});

    let batchId;

    test('Create Batch using BatchBuilder', async ()=>{
        const builder = new BatchBuilder();
        builder.name = name;
        builder.academic ={ lb:lb, ub:ub};

        const result = await builder.create();
        expect(result.name).toBe(name);
        expect(result.academic).toStrictEqual({ lb:lb, ub:ub})
        batchId = result.id;

    });

    test('Select created Batch', async()=>{
        const batch = new Batch();
        batch.name = name;
        batch.academic = {lb:lb, ub:ub};

        const result = await batch.find();
        expect(result[0].name).toBe(name);
        expect(result[0].academic).toStrictEqual({ lb:lb, ub:ub})
        expect(result[0].id).toStrictEqual(batchId)


       
    })

    test('Select batch ById', async()=>{
        const batch = await new Batch().findById(batchId);
        expect(batch.name).toBe(name);
        expect(batch.academic).toStrictEqual({ lb:lb, ub:ub})
        expect(batch.id).toStrictEqual(batchId)

    })

    test('Update batchById', async()=>{
        const batch = new Batch();
        batch.name = name;
        batch.academic = {lb:lb, ub:ub};

        const result = await batch.find()

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].name).toBe(name);
        expect(result[0].academic).toStrictEqual({ lb:lb, ub:ub})
        expect(result[0].id).toStrictEqual(batchId)

        const new_batch_name = faker.person.jobTitle();
        const new_academic = {ub:faker.number.int({min:25, max:27}), lb:faker.number.int({min:25, max:27})};

        result[0].name = new_batch_name;
        result[0].academic = new_academic;

        const updated_batch = await result[0].save()
        expect(updated_batch.name).toBe(new_batch_name)
        expect(updated_batch.academic).toStrictEqual(new_academic)
    });

    test('Delete batch by id', async()=>{
        const batch =await new Batch().deleteById(batchId);
        expect(batch.id).toStrictEqual(batchId)
    })

})
