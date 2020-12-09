import * as fs from "fs";

const readJsonFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName + '.json', "utf8", async (err, data) => {
      /*
          You should now save the parsed data into a variable, then pass that into the resolve function.
  
          HINT: Check out this resource on fs.readFile
          //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
  
          HINT: Read up on JSON parsing Node.js
         */
      // Check for errors and pass the error into the reject function
      if (err) reject(err);
      // Save the parsed data in a variable
      const highScore = JSON.parse(data);
  
      /**
       * pass the variable that contains the parsed data
       * into the resolve function as an argument
       * e.g resolve(data)
       * Learn more about javascript promises (resolve and reject)
       * https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
       */
      resolve(highScore)
    });
  })
  
};

export { readJsonFile };
