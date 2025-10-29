
const {Admin, NullUser, Lecturer, Student, DepartmentHead} = require('../../../src/classes/USERS');
const AdminBuilder = require('../../../src/classes/USERS/AdminBuilder')
const LecturerBuilder = require('../../../src/classes/USERS/LecturerBuilder')
const StudentBuilder = require('../../../src/classes/USERS/StudentBuilder')
const DepartmentHeadBuilder = require('../../../src/classes/USERS/DepartmentHeadBuilder')
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const {config, userTypes} = require('../../../src/config');

const {UserAccountService, PasswordHashService} = require('../../../src/services/')

const { MongoMemoryServer } = require('mongodb-memory-server');
const { ServerCapabilities } = require('mongodb');
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

let createdUserList = {
  Admin:[],
  DepartmentHead:[],
  Lecturer:[],
  Student:[]
}

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
      
      createdUserList.Admin.push(createdAdmin.id)

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

      createdUserList.Lecturer.push(createdLecturer.id)

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

      createdUserList.Student.push(createdStudent.id)

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


  describe('Should create an DepartmentHead and get DepartmentHead using user-account-service', () => {
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

    let createdDepartmentHead;
    
    test('Should create a new DepartmentHead successfully', async () => {
      const builder = new DepartmentHeadBuilder ();
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

      createdDepartmentHead = await builder.create();

      expect(createdDepartmentHead).toBeInstanceOf(DepartmentHead);
      expect(createdDepartmentHead.registration_id).toBe(registration_id);
      expect(createdDepartmentHead.name.first_name).toBe(first_name);
      expect(createdDepartmentHead._type).toBe(userTypes.USER_DEPARTMENT);

      createdUserList.DepartmentHead.push(createdDepartmentHead.id)
      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdDepartmentHead.password);
      expect(compare).toBe(true);
    });

    test('Should find DepartmentHead by ID', async () => {
      const finder = new DepartmentHead();
      const found = await finder.findById(createdDepartmentHead.id);
      expect(found).toBeInstanceOf(DepartmentHead);
      expect(found.id).toStrictEqual(createdDepartmentHead.id);
    });

    
    test('Should get created Student user details suing user-account-service', async () => { 
      const service = UserAccountService;
      const user = await service.getUserById(userTypes.USER_DEPARTMENT,createdDepartmentHead.id)
      expect(user).toBeInstanceOf(DepartmentHead);
      expect(user.id).toStrictEqual(createdDepartmentHead.id)
      createdDepartmentHead = user
    })
    
    test('password filed should not visible in default condition in user-account-service', async() => { 
      expect(createdDepartmentHead.password).toBe(undefined)
    })
  })

describe('Should update an Admin using user-account-service', () => {

  const defaultPassword = '123456';
  const registration_id = faker.string.uuid();;
  const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
  };
  const name={
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    full_name: faker.person.fullName(),
    with_initial_name: faker.person.fullName()
  }
  const email = faker.internet.email().toLowerCase();

     test('Should create a new Admin successfully', async () => {
      const builder = new AdminBuilder();
      builder.registration_id = registration_id;
      builder.name = name
      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdAdmin = await builder.create();
      
      expect(createdAdmin).toBeInstanceOf(Admin);
      expect(createdAdmin.registration_id).toBe(registration_id);
      expect(createdAdmin.name.first_name).toBe(name.first_name);
      expect(createdAdmin._type).toBe(userTypes.USER_ADMIN);
      
      createdUserList.Admin.push(createdAdmin.id)

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdAdmin.password);
      expect(compare).toBe(true);
    });

    test('Should find Admin by ID', async () => {
      const finder = new Admin();
      const found = await finder.findById(createdAdmin.id);
      expect(found).toBeInstanceOf(Admin);
      expect(found.id).toStrictEqual(createdAdmin.id);
    });

    test('Should update Admin using user-account-service', async () => {
      
      const defaultPassword = '123456';
      const registration_id = faker.string.uuid();;
      const address = {
          line1: faker.location.streetAddress({ useFullAddress: true }),
          line2: faker.location.streetAddress({ useFullAddress: true }),
          zip: faker.location.zipCode()
      };
      const name={
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        full_name: faker.person.fullName(),
        with_initial_name: faker.person.fullName()
      }
      const email = faker.internet.email().toLowerCase();
      
      
      const service = UserAccountService
      const user = await service.updateUserById(userTypes.USER_ADMIN, createdAdmin.id, {
        registration_id: registration_id,
        name:name,
        address:{ ...address },
        password: await PasswordHashService.hashPassword(defaultPassword),
        email:email

      })

      expect(user).toBeInstanceOf(Admin);
      expect(user.registration_id).toBe(registration_id)
      expect(user.name).toStrictEqual(name)
      expect(user.address).toStrictEqual(address)
      expect(user.email).toBe(email)
     
        
    })
    
 })


 describe('Should update an DepartmentHead using user-account-service', () => {

  const defaultPassword = '123456';
  const registration_id = faker.string.uuid();;
  const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
  };
  const name={
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    full_name: faker.person.fullName(),
    with_initial_name: faker.person.fullName()
  }
  const email = faker.internet.email().toLowerCase();

     test('Should create a new DepartmentHead successfully', async () => {
      const builder = new DepartmentHeadBuilder();
      builder.registration_id = registration_id;
      builder.name = name
      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdDepartmentHead = await builder.create();
      
      expect(createdDepartmentHead).toBeInstanceOf(DepartmentHead);
      expect(createdDepartmentHead.registration_id).toBe(registration_id);
      expect(createdDepartmentHead.name.first_name).toBe(name.first_name);
      expect(createdDepartmentHead._type).toBe(userTypes.USER_DEPARTMENT);
      
      createdUserList.DepartmentHead.push(createdDepartmentHead.id)

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdDepartmentHead.password);
      expect(compare).toBe(true);
    });

    test('Should find DepartmentHead by ID', async () => {
      const finder = new DepartmentHead();
      const found = await finder.findById(createdDepartmentHead.id);
      expect(found).toBeInstanceOf(DepartmentHead);
      expect(found.id).toStrictEqual(createdDepartmentHead.id);
    });

    test('Should update DepartmentHead using user-account-service', async () => {
      
      const defaultPassword = '123456';
      const registration_id = faker.string.uuid();;
      const address = {
          line1: faker.location.streetAddress({ useFullAddress: true }),
          line2: faker.location.streetAddress({ useFullAddress: true }),
          zip: faker.location.zipCode()
      };
      const name={
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        full_name: faker.person.fullName(),
        with_initial_name: faker.person.fullName()
      }
      const email = faker.internet.email().toLowerCase();
      
      
      const service = UserAccountService
      const user = await service.updateUserById(userTypes.USER_DEPARTMENT, createdDepartmentHead.id, {
        registration_id: registration_id,
        name:name,
        address:{ ...address },
        password: await PasswordHashService.hashPassword(defaultPassword),
        email:email

      })

      expect(user).toBeInstanceOf(DepartmentHead);
      expect(user.registration_id).toBe(registration_id)
      expect(user.name).toStrictEqual(name)
      expect(user.address).toStrictEqual(address)
      expect(user.email).toBe(email)
     
        
    })
    
 })
 

 describe('Should update an Lecturer using user-account-service', () => {

  const defaultPassword = '123456';
  const registration_id = faker.string.uuid();;
  const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
  };
  const name={
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    full_name: faker.person.fullName(),
    with_initial_name: faker.person.fullName()
  }

  let createdLecturer
  const email = faker.internet.email().toLowerCase();

     test('Should create a new Lecturer successfully', async () => {
      const builder = new LecturerBuilder();
      builder.registration_id = registration_id;
      builder.name = name
      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdLecturer = await builder.create();
      
      expect(createdLecturer).toBeInstanceOf(Lecturer);
      expect(createdLecturer.registration_id).toBe(registration_id);
      expect(createdLecturer.name.first_name).toBe(name.first_name);
      expect(createdLecturer._type).toBe(userTypes.USER_LECTURER);
      
      createdUserList.Lecturer.push(createdLecturer.id)

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdLecturer.password);
      expect(compare).toBe(true);
    });

    test('Should find Lecturer by ID', async () => {
      const finder = new Lecturer();
      const found = await finder.findById(createdLecturer.id);
      expect(found).toBeInstanceOf(Lecturer);
      expect(found.id).toStrictEqual(createdLecturer.id);
    });

    test('Should update Lecturer using user-account-service', async () => {
      
      const defaultPassword = '123456';
      const registration_id = faker.string.uuid();;
      const address = {
          line1: faker.location.streetAddress({ useFullAddress: true }),
          line2: faker.location.streetAddress({ useFullAddress: true }),
          zip: faker.location.zipCode()
      };
      const name={
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        full_name: faker.person.fullName(),
        with_initial_name: faker.person.fullName()
      }
      const email = faker.internet.email().toLowerCase();
      
      
      const service = UserAccountService
      const user = await service.updateUserById(userTypes.USER_LECTURER, createdLecturer.id, {
        registration_id: registration_id,
        name:name,
        address:{ ...address },
        password: await PasswordHashService.hashPassword(defaultPassword),
        email:email

      })

      expect(user).toBeInstanceOf(Lecturer);
      expect(user.registration_id).toBe(registration_id)
      expect(user.name).toStrictEqual(name)
      expect(user.address).toStrictEqual(address)
      expect(user.email).toBe(email)
     
        
    })
    
 })


 describe('Should update an Student using user-account-service', () => {

  const defaultPassword = '123456';
  const registration_id = faker.string.uuid();;
  const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
  };
  const name={
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    full_name: faker.person.fullName(),
    with_initial_name: faker.person.fullName()
  }

  let createdStudent
  const email = faker.internet.email().toLowerCase();

     test('Should create a new Student successfully', async () => {
      const builder = new StudentBuilder();
      builder.registration_id = registration_id;
      builder.name = name
      builder.address = { ...address };
      builder.email = email;
      builder.password = await PasswordHashService.hashPassword(defaultPassword);

      createdStudent = await builder.create();
      
      expect(createdStudent).toBeInstanceOf(Student);
      expect(createdStudent.registration_id).toBe(registration_id);
      expect(createdStudent.name.first_name).toBe(name.first_name);
      expect(createdStudent._type).toBe(userTypes.USER_STUDENT);
      
      createdUserList.Student.push(createdStudent.id)

      const compare = await PasswordHashService.verifyPassword(defaultPassword, createdStudent.password);
      expect(compare).toBe(true);
    });

    test('Should find Student by ID', async () => {
      const finder = new Student();
      const found = await finder.findById(createdStudent.id);
      expect(found).toBeInstanceOf(Student);
      expect(found.id).toStrictEqual(createdStudent.id);
    });

    test('Should update Student using user-account-service', async () => {
      
      const defaultPassword = '123456';
      const registration_id = faker.string.uuid();;
      const address = {
          line1: faker.location.streetAddress({ useFullAddress: true }),
          line2: faker.location.streetAddress({ useFullAddress: true }),
          zip: faker.location.zipCode()
      };
      const name={
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        full_name: faker.person.fullName(),
        with_initial_name: faker.person.fullName()
      }
      const email = faker.internet.email().toLowerCase();
           
      const service = UserAccountService
      const user = await service.updateUserById(userTypes.USER_STUDENT, createdStudent.id, {
        registration_id: registration_id,
        name:name,
        address:{ ...address },
        password: await PasswordHashService.hashPassword(defaultPassword),
        email:email
      })

      expect(user).toBeInstanceOf(Student);
      expect(user.registration_id).toBe(registration_id)
      expect(user.name).toStrictEqual(name)
      expect(user.address).toStrictEqual(address)
      expect(user.email).toBe(email)
          
    })
    
 })

describe('Should create an users(Admin, Lecturer, DepartmentHead, Student) using user-account-service', () => {
  
  test('Should Create Admin', async () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();;
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
    };
    const name={
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      full_name: faker.person.fullName(),
      with_initial_name: faker.person.fullName()
    }
    const email = faker.internet.email().toLowerCase();
   
    const service = await UserAccountService
    const admin = await service.createUser(userTypes.USER_ADMIN,{
      registration_id: registration_id,
      name: name,
      email: email,
      address: address,
      password: await PasswordHashService.hashPassword(defaultPassword)
    })
    expect(admin).toBeInstanceOf(Admin);
    expect(admin.name).toStrictEqual(name)
    expect(admin.email).toBe(email)
    expect(admin.address).toStrictEqual(address)
    createdUserList.Admin.push(admin.id)
  })

    test('Should Create DepartmentHead', async () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();;
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
    };
    const name={
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      full_name: faker.person.fullName(),
      with_initial_name: faker.person.fullName()
    }
    const email = faker.internet.email().toLowerCase();
  
    const service = await UserAccountService
    const departmentHead = await service.createUser(userTypes.USER_DEPARTMENT,{
      registration_id: registration_id,
      name: name,
      email: email,
      address: address,
      password: await PasswordHashService.hashPassword(defaultPassword)
    })
    expect(departmentHead).toBeInstanceOf(DepartmentHead);
    expect(departmentHead.name).toStrictEqual(name)
    expect(departmentHead.email).toBe(email)
    expect(departmentHead.address).toStrictEqual(address)
    createdUserList.DepartmentHead.push(departmentHead.id)
  })


  test('Should Create Lecturer', async () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
    };
    const name={
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      full_name: faker.person.fullName(),
      with_initial_name: faker.person.fullName()
    }
    const email = faker.internet.email().toLowerCase();
    

    const service = await UserAccountService
    const lecturer = await service.createUser(userTypes.USER_LECTURER,{
      registration_id: registration_id,
      name: name,
      email: email,
      address: address,
      password: await PasswordHashService.hashPassword(defaultPassword)
    })
    expect(lecturer).toBeInstanceOf(Lecturer);
    expect(lecturer.name).toStrictEqual(name)
    expect(lecturer.email).toBe(email)
    expect(lecturer.address).toStrictEqual(address)
    createdUserList.Lecturer.push(lecturer.id)
  })


  test('Should Create Student', async () => {
    const defaultPassword = '123456';
    const registration_id = faker.string.uuid();;
    const address = {
      line1: faker.location.streetAddress({ useFullAddress: true }),
      line2: faker.location.streetAddress({ useFullAddress: true }),
      zip: faker.location.zipCode()
    };
    const name={
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      full_name: faker.person.fullName(),
      with_initial_name: faker.person.fullName()
    }
    const email = faker.internet.email().toLowerCase();
    

    const service = await UserAccountService
    const student = await service.createUser(userTypes.USER_STUDENT,{
      registration_id: registration_id,
      name: name,
      email: email,
      address: address,
      password: await PasswordHashService.hashPassword(defaultPassword)
    })
    expect(student).toBeInstanceOf(Student);
    expect(student.name).toStrictEqual(name)
    expect(student.email).toBe(email)
    expect(student.address).toStrictEqual(address)
    createdUserList.Student.push(student.id)

  })
})

describe('Should find users(Admin, Lecturer, DepartmentHead, Student) using user-account-service', () => {
 
  test('Should find all Admins', async () => {
    const service = UserAccountService
    const admins = await service.findUsers(userTypes.USER_ADMIN, {});
    
    expect(admins.length).toBe(createdUserList.Admin.length)
    admins.forEach(admin => {
      expect(admin).toBeInstanceOf(Admin)
      expect(admin._type).toBe(userTypes.USER_ADMIN)
    });
  })

  test('Should find all Lecturers', async () => { 
    const service = UserAccountService
    const lecturers = await service.findUsers(userTypes.USER_LECTURER, {})
    expect(lecturers.length).toBe(createdUserList.Lecturer.length)
    lecturers.forEach(lecturer => {
      expect(lecturer).toBeInstanceOf(Lecturer)
      expect(lecturer._type).toBe(userTypes.USER_LECTURER)
    });
   })

   test('Should find all DepartmentHeads', async () => { 
    const service = UserAccountService
    const departmentHeads = await service.findUsers(userTypes.USER_DEPARTMENT, {})
    expect(departmentHeads.length).toBe(createdUserList.DepartmentHead.length)
    departmentHeads.forEach(departmentHead => {
      expect(departmentHead).toBeInstanceOf(DepartmentHead)
      expect(departmentHead._type).toBe(userTypes.USER_DEPARTMENT)
    });
    })

  test('Should find all Students', async () => {
    const service = UserAccountService
    const students = await service.findUsers(userTypes.USER_STUDENT, {})
    expect(students.length).toBe(createdUserList.Student.length)
    students.forEach(student => {
      expect(student).toBeInstanceOf(Student)
      expect(student._type).toBe(userTypes.USER_STUDENT)
    });
   })
       
});
