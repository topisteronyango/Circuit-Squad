const mongoose = require('mongoose');

const logger = require('./winston.config');

mongoose.connect(process.env.DATABASE_CONNETION_URI);

mongoose.connection.once('open', ()=>{
    logger.info("Database connection intiated.");
    console.log("Database connection initiated.");
}).on('error', (error)=>{
    logger.error(`Error connecting to the database server: ${error.message}`);
    console.log(`Error connecting to the database server: ${error.message}`);
})