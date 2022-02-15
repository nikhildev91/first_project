var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var userHelper = require('../../helpers/user-helper');
require('dotenv').config()

const serviceSSID = "VA1f66b4f2f4aa0fec2e83522ae8e3acb2"
const accountSSID = "ACbe91336549fb48eef27dadf69d6c0f9e"
const authToken = "9d9a485e4aa81370948c2d454b525d5f"

const client = require('twilio')(accountSSID, authToken)


const isUser = true;




/* GET users listing. */


router.get('/', function(req, res, next) {
  if (req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin){
    res.redirect('/')

  }else{
    userHelper.takeCategory().then(async(category)=>{
      let cartCount = 0;
              if(req.session.userObj){
                cartCount = await userHelper.getCartCount(req.session.userObj._id)
              }
    let err = req.session.SignupErr 
    req.session.SignupErr = null
    res.render('user/signup', { isUser, err, category});
    })

  }
});


router.post('/',(req, res, next)=>{
var NewUserData = req.body;
userHelper.checkIsUser(NewUserData.phone, NewUserData.email).then((response)=>{
  if(response){
    req.session.SignupErr = "Your Email and Mobile Number is already existed"
    res.redirect('/signup')
  }else{

    req.session.newUser = NewUserData

    

        client.verify
        .services(serviceSSID)
        .verifications.create({
        to: `+91${NewUserData.phone}`,
        channel: "sms"
        })
        .then((resp)=>{
        res.redirect('/signup/otp')
        }).catch((resp)=>{
          res.send(resp)
        })
      }
})
});
router.get('/otp',(req, res, next)=>{

  if(req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin){
    res.redirect('/')
  }else{
    let resendSignUpMsg = req.session.resendSignUpMsg;
    req.session.resendSignUpMsg = null;
    let otperr = req.session.otpErr
    req.session.otpErr = null;
    res.render('user/otp',{isUser, otpverify:true, otperr, resendSignUpMsg})
  }


});

router.post('/otp', (req, res,next)=>{
  // console.log(req.body.code);

  console.log(req.session.newUser);

  var phoneNumber = req.session.newUser.phone

  client.verify
.services(serviceSSID)
.verificationChecks.create({
  to: `+91${phoneNumber}`,
  code: req.body.code
}).then((resp)=>{

  console.log(resp.valid);

  if(resp.valid){
    if(req.session.refferapplied){
      req.session.newUser.ref = true;
      req.session.newUser.refby = req.session.refferedBy
    }

    userHelper.insertNewUserData(req.session.newUser).then(async(response)=>{
      if(response.status){
        req.session.userObj = response.user;
        req.session.isLoggedin = true;
           if(req.session.refferapplied){
            let resp = await userHelper.updateUserWallet( req.session.newUser.refby)
            if(resp){
              res.redirect('/')
            }
           }else{

             res.redirect('/')
           }
      }
    })
    

  }else{
    req.session.otpErr = "Incorrect OTP"
    req.session.resendSignUpMsg = true;
    res.redirect('/signup/otp')
  }

 

}).catch((err)=>{
  console.log(err);
})
})

router.post('/resendOtp',(req, res)=>{

  let NewUserData = req.session.newUser
client.verify
        .services(serviceSSID)
        .verifications.create({
        to: `+91${NewUserData.phone}`,
        channel: "sms"
        })
        .then((resp)=>{
        res.send(true)
        }).catch((resp)=>{
          res.send(false)
        })

})

module.exports = router;
