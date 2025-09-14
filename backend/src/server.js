const app = require('./app')
const {config} = require('./config');
const {DB_connect} = require('./database/db');
const {ErrorTranslator, ErrorHandler} = require('./middleware')


app.use(ErrorTranslator);
app.use(ErrorHandler)

app.listen(config.APPLICATION_PORT, () => {
 
  DB_connect();
  console.log(`Server is listening on port: ${config.APPLICATION_PORT}`);
});
