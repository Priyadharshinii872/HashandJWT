const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema(
    {
        Name:{
            type:String
        },
        Mobileno:{
            type:String
        },
        Email:{
            type:String
        },
        Password:{
            type:String
        }
    }
)

const collect = mongoose.model('users',userschema)

//register
const savenewuser = async(data)=>
{
    if(data.length!=0)
    {
        const exsuser = await collect.findOne({Mobileno:data.Mobileno})
        if(exsuser)
        {
            return false
        }
        else
        {
            const newuser = new collect(data)
            const savedata = await newuser.save()
            return savedata;
        }
    }
}

//login
const loginuser = async(data)=>
{
    const ldata = await collect.aggregate([{$match : {Email:data}}])
    return ldata;
}

module.exports=
{
    savenewuser,
    loginuser

}