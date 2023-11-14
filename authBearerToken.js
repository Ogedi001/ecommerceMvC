require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();


app.use(express.json())
//in production this should be stored in database
const refreshTokens =[]
const generateAcessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN,{expiresIn:'40s'});
}


//route to create a refresh token
app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  //check if refreshtoken is available
  if (refreshToken === null) { return res.sendStatus(401) }
  //check if the user enter refresh token is similar to refreshtokens in DB
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err,user) => {
    if (!err) {
//generate a new refresh token with the user object used before
      const accessToken = generateAcessToken({name: user.name })
     return res.json({accessToken})
    } 
      return res.sendStatus(403)
  })
})

app.post("/login", (req, res) => {
  // First authenticate user
  const username = req.body.username;
  const user = { name: username };
  const acessToken =generateAcessToken(user)
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN);
  //push to token to db 
  refreshTokens.push(refreshToken)
  res.json({ acessToken, refreshToken });
});

// N/B: bearer token can work in different server
//this server generates token for auth
app.listen(4000);
