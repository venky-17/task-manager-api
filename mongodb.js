const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectId

const connectUrl = process.env.MONGODB_URL;
const databaseName = "task-manager";


const id = new objectID()
console.log(id.toHexString().length);
console.log(id.getTimestamp());


// MongoClient.connect(connectUrl, (error, client) => {
//     if (error) {
//         return console.log('Error connecting to the database:', error);
//     }

//     const db = client.db(databaseName);

//     db.collection('users').insertOne({
//         name: "venky",
//         age: 21
//     }, (error, result) => {
//         if (error) {
//             return console.log('Error in inserting data ', error);
//         }
//         console.log(result.ops);

//         // Close the connection when done
//         client.close();
//     });
// });
