const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const routes = require('./routes/routes');
const logger = require('./config/winston.config');
const errorLogger = require('./middleware/errorLogger');
const swaggerSpec = require('./routes/swaggerConfig');
const app = express();
const port = process.env.PORT || 3000;
require('./config/db.config');

// set-up and configurations
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

winston.exceptions.handle(new winston.transports.File({filename: 'Exceptions.log'}));
process.on('unhandledRejection', (ex)=>{
    throw ex;
});

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorLogger);


const server = app.listen(port, ()=>{
    logger.info(`Circuit squad api server service intiated`);
    console.log(`Circuit squad api server service intiated`)
});