const app = require('./app')
const {config} = require('./config');
const {DB_connect} = require('./database/db');


// Error handling
app.use((error, req, res, next) => {
  
    if(error){
      const date =new Date().toISOString() 
      console.error(error.message + ":" +date );
      return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      details: error.details,
      timestamp:date
    });
    }
});

app.listen(config.APPLICATION_PORT, () => {
 
  DB_connect();
  console.log(`Server is listening on port: ${config.APPLICATION_PORT}`);
});
