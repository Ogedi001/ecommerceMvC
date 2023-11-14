require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const posts = [
  {
    username: "fave",
    title: "post1",
  },
  {
    username: "pat",
    title: "post2",
  },
];

app.get("/posts", authFunc, (req, res) => {
    console.log(req.headers["authorization"]);
    
  //username of user in session (authenticated)
  const username = req.user.name;
  
    //return all auth user data
  const authUserPost = posts.filter((post) => post.username === username);
  res.json(authUserPost);
});



function authFunc(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token =authHeader && authHeader.split(" ")[1];
    if (token === null){
        return res.sendStatus(401)
    }
    
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (!err) {

            console.log(user)
            //store the authenticated user in request object
            req.user = user
            next()
        } else {
            console.log(err)
            return res.sendStatus(403);
        }
        
    })

}

// N/B: bearer token can work in different server
//this servers uses token generated in authBearerToken server
app.listen(3000);
