var Db = require('./user_operation');
var user = require('./user');
const speakeasy = require('speakeasy');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const user_operation = require('./user_operation');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request, response, next) => {
   console.log('middleware');
   next();
})

/// Get OTP
router.route('/users/getOtp').get((request, response) => {
   const secret = speakeasy.generateSecret({ length: 20 });
   const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
   });
   console.log('Secret: ', secret.base32);
   console.log('Code: ', code);
   
   response.json({ "success": true,
   "message": "Success",
   "data": [{"OTP":code}], })
})

router.route('/users').get((request, response) => {
   //console.log("OTP Code hold value is : "+ codeOne);
   user_operation.getUsers().then(result => {
      try {
         response.json({
            "success": true,
            "message": "Success",
            "data": result[0]
         });
         console.log(result);

      } catch (error) {
         response.json({
            "success": "false",
            "message": error,
            "data": []
         });
      }
   })

})

///

router.route('/users/register').post((request, response) => {

   let user = { ...request.body }
   console.log(user);
   user_operation.addUser(user).then(result => {

      try {
         response.status(201).json({
            "success": true,
            "message": "Success",
            "data": result

         });
         console.log(result);

      } catch (error) {
         console.log(error);
      }
   })

})

///

router.route('/users/:userName/:email').get((request, response) => {
   user_operation.getSignInUser(request.params.userName, request.params.email).then(result => {

      try {

         response.json({
            "success": true,
            "message": "Success",
            "data": result[0]
         });
         console.log(result);

      } catch (error) {
         response.json({
            "success": "false",
            "message": error,
            "data": []
         });
      }
   })
})




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



