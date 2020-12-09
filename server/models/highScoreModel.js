/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

/*  will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also 
     https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
const highScoreSchema = new mongoose.Schema({
    //Check out - https://mongoosejs.com/docs/guide.html
    Name: { type: String, required: true },
    Score: { type: Number, required: true },
});



/* Use your schema to instantiate a Mongoose model
Export the model to make it available to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('highScores', highScoreSchema);