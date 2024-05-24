const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config.js');

function SetToken(req, res, next) {
  let token

  if(!req.cookies.GUID){
  
    token = jwt.sign({ GUID: uuidv4(), solved: [] }, config.SECRET_KEY);
    res.cookie('GUID', token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'});
  
  } else {
    
    token = req.cookies.GUID;
  }
  
  res.locals.jwt_token = token;
  next();
}


module.exports = SetToken;