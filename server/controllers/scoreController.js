/* Dependencies */
import HighScore from "../models/highScoreModel.js";
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update data.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the data as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
  or
  https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
 */


 
/* Create a high score */
export const create = async (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  });
  /* get the high score data from req.body */
  /* Then save to the database */
  console.log(req.body);
  const highScore = req.body;
  if (!highScore) {
    return res.status(200).send({
      error: "Score not found",
    });
  }
  await new HighScore(highScore).save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};


/* Delete a highscore */
export const remove = async (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  });
  /* If the highscore could not be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
  console.log(req.params);
  let name = req.params.Name;
  let score = req.params.Score;

  await HighScore.deleteOne({ Name: name }, { Score: score }, (err) => {
    if (err) {
      return res.status(200).send({
        error: err.message || "An unknown error occurred",
      });
    }
    res.send({
      error: name + " has been deleted successfully",
    });
  });
};


/* Retrieve all the directory, FootballClubs*/
export const getAllScores = async (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  });
  /* Add your code. Make sure to send the documents as a JSON response.*/
  await HighScore.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
      console.log(data);
    res.json(data);
  });
};

/* Retrieve all the directory, FootballClubs*/
export const getTopScores = async (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  });
  /* Add your code. Make sure to send the documents as a JSON response.*/
  var out;
  await HighScore.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
      //console.log(data);
    out = data;
  });

  out.sort((a,b)=>b.Score - a.Score);
  out = out.slice(0,10);
  res.json(out);
};

