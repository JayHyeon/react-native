const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    function connect() {
        mongoose.connect(process.env.MONGO_URI, { 
            dbName: 'mypetdiary',
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }, function(err) {
            if (err) {
                console.error('mongodb connection error', err);
            }else
                console.log('mongodb connected');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};