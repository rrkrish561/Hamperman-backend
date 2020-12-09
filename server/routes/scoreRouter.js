/* This file is your server Router. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each
*/

//import controller
import * as scoreController from '../controllers/scoreController.js';

import express from 'express'; //refers to Express the middleware helper for Node.js

//declare router
const scoreRouter = express.Router();
/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
  */
 /*
  The ':' specifies a URL parameter. 
  Also, it allows the passing of data which is stored in req.params in the controller
 */



 //get top all scores
scoreRouter.get('/', scoreController.getAllScores);
//get top 10 scores
scoreRouter.get('/top', scoreController.getTopScores);
//add a new high score
scoreRouter.post('/', scoreController.create);
//remove a high score
scoreRouter.delete('/:Name/:Score', scoreController.remove);


export default scoreRouter;
