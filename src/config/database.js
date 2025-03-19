const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xgyce0q.mongodb.net/pos-server?retryWrites=true&w=majority`);
        console.log(`MongoDB connected successfully to database: ${conn.connection.name}`);
    
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure
    }
};
module.exports = { connectDB };
