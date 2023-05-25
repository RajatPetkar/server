// const mongoose = require('mongoose');

// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/collage-final-project').then(() => {
//     console.log("Connected to MongoDB");
// }).catch((err) => {
//     console.log(err);
// });

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Rajat_Petkar:Rajat2005@cluster0.4bak7ct.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
client.connect();
console.log('Connected to the database!');