var admin = require("firebase-admin");
var express = require('express');
var app = express();
app.use(express.json());
const axios = require('axios')
var serviceAccount = require("../config/sk.json");

const API_KEY = 'AIzaSyB5BPj4Hn8arcVYG7SuAK9Ib_EsIx7-4j4'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log(admin)

  app.post('/createuser', function (req, res) {
      console.log(req.body)
      admin.auth().createUser({
        email: req.body.email,
        password:  req.body.password
    })
      .then((user) => {
        res.json({
          'status':'OK'
      })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.json({
          'errorMessage':errorMessage,
          'errorCode': errorCode,
          'status':'not OK'
      })
      });
   
      
 })
 


 app.post('/loginuser', function (req, res) {
  signIn(req.body.email,req.body.password)
  .then((user) => {
    console.log(user)
    res.json({
      'status':'OK',
      'user':user.data
  })
  })
  .catch((error) => {
    console.log("\n\n\n\n\n\n\n",error)
   // console.log("\n\n\n\n\n\n\n",error.data)
    var errorCode = error.code;
    var errorMessage = error.message;
    res.json({
      'errorMessage':error.response.data.error.message,
      'errorCode': errorCode,
      'status':'not OK'
  })
  });

  
})



const signIn = async (email,password) =>{
  let payload = {
      email: email,
      password:password,
      returnSecureToken:true
  }
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
       payload
  )

}


 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 