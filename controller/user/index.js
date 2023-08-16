const service = require('./service')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

//reg
const savedata = async(req,res)=>
{
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.Password,salt)
    req.body.Password=hashpassword

    
    const saved = await service.savenewuser(req.body)
    res.send("saved successfully")
}

//login
const login = async(req,res)=>
{
    let email = req.body.Email
    const display = await service.loginuser(email)
                                                                                 //display[0]-->compares both email and its Password
    
    if(display.length==0)                                                        //.length reads email column
    {
        res.send({
            code:400,
            message:"Email not found"
        })
    }
    else
    {
        const hasedpassword = display[0].Password
        const passwordmatch = await bcrypt.compare(req.body.Password,hasedpassword)
        const token = await JWT.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:"30 minutes"})
        if(passwordmatch)
        {
            res.send({
                code:200,
                message:"Login Successfull",
                Token : token

            })
        }
        else
        {
            res.send({
                code:400,
                message:"Password Incorrect"
            })
        }

    }
    
}


module.exports=
{
    savedata,
    login
}