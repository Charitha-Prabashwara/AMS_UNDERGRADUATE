const app = require('./app')
const {config} = require('./config');
const {DB_connect} = require('./database/db');




// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(config.APPLICATION_PORT, () => {
 
  DB_connect();
  console.log(`Server is listening on port: ${config.APPLICATION_PORT}`);
});
