const router= require('express').Router();
const jwt = require('jsonwebtoken');
const User= require('../modals/UserSchema');

Conskid-at-469955463873      AKIAW224HJLA4APEZ564      K862YDzwCg8rO5r/cSxDiKt5xcB03X8Azhjdemfo
//login 
router.post('/login',async (req,res)=>{
  
    AKIAW224HJLAWS4JQZOH,bwOn/bOGBtbLiJVdd1S1VFkgvvY9gGR1x7lj31W/
    try {
      const {email,password}=req.body;
      console.log(email,password);
      const user= await User.findOne({email});
      if(!user)return res.status(400).json({success:false,error:"Wrong Credentials"});
      if(user.password!=password) return res.status(400).json({success:false,error:"Wrong Credentials"});
  
      const data={
          user:{
              id:user.id
          }
      }
      const authToken=jwt.sign(data,process.env.JWT_SECRET);
      
     return   res.json({success:true,authToken:authToken});
  
  } catch (error) {
      console.log(error);
     return  res.status(400).json({success:false,error:"Something went Wrong"});
  }
  
  
  })

module.exports = router;
