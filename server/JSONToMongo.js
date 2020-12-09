//this file can be used to generate scores from the document 'scores.json', using readFile.js
//to run, move to /server and run 'node JSONToMongo.js'

"use strict";
/*
  Import modules/files you may need to correctly run the script.
 */
import { readJsonFile } from "./readFile/readFile.js";
import HighScore from "./models/highScoreModel.js";
import {connectToDatabase} from './connectMongodb.js'
import mongoose from 'mongoose';

const connectToDB = () => {
  return connectToDatabase().on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );
}

const count = async () => {
  // This prints the count to the console
  // HighScore.countDocuments({}, (err, c) => console.log("count is", c))
  // This returns a promise that stores the count and has to be awaited
  const docCount = await HighScore.countDocuments({})
    .then((num) => {
      return num;
    })
    .catch((err) => {
      throw err;
    });
  return docCount;
};

const report = async (err, str) => {
  if (err) {
    throw err;
  }
  const c = await count();
  console.log(str, c);
};

const saveDataInDB = async (highScore) => {
  //save all highScores into the database
  return await new Promise(async (res, rej) => {
    HighScore.insertMany(highScore, async (err, docs) => {
      if (err) rej(err);
      res(docs);
    });
  });
};

const deleteDataInDB = async () => {
  //delete all scores from the database
  return await HighScore.deleteMany((err) => {
    if (err) throw err;
  });
};

const main = async () => {
  connectToDB()
  /*
    Instantiate a mongoose model for each object in the JSON file,
    and then save it to your Mongo database
    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

   */
    //delete the existing entries to start fresh
    await deleteDataInDB();
    //checking if the documents have been deleted successfully
    await report(null, "Documents deleted, there are now %d documents.");
    //read file and return the data
    await readJsonFile("scores")
    .then(async (highScoreData) => {
      //save the data into the database
      await saveDataInDB(highScoreData)
        .then(async (data) => {
          //check if the footballClub data has been saved successfully
          await report(null, "All %d documents have been added.");
          mongoose.disconnect() 
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};


main()
