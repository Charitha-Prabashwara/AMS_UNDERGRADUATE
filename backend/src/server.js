const app = require('./app')
const {config} = require('./config');
const {DB_connect} = require('./database/db');
const USER_BUILDER = require('./classes/USERS/UserBuilder');
const User = require('./classes/USERS/User');


const test = async()=>{
  const builder = new USER_BUILDER();
  builder.registration_id = 'seu/is/20/ict/001';
  builder.name = {
  first_name:"Charitha",
  last_name:"Prabhashwara",
  full_name:"THELASINGHA HITIHAMI MUDIYANSELAGE CHARITHA PRABHASHWARA",
  with_initial:"T.H.M CHARITHA PRABHASHWARA"
  }
  builder.address={
    line1:"Pallahapitiya Mirihanegama", 
    line2:undefined, 
    zip:"60408"
  }

  builder.email="prabhashwara.seu@gmail.com"
  builder.password = "123456"


const result = await builder.create()
console.log(result);

const found = await new User().findById(result.id);
console.log(found);
found.name.first_name ="bla bla"
const changed_user = await found.save();
console.log(changed_user)
}


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(config.APPLICATION_PORT, () => {
 
  DB_connect();
  test();
  console.log(`Server is listening on port: ${config.APPLICATION_PORT}`);
});
