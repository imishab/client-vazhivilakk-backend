const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('\x1b[32m%s\x1b[0m', 'Database Connected Successfully...');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;