const exp = require('express')
const router = exp.Router()

const functions = require('../controller/user/index')

let routes=(app)=>
{
    router.post('/save',functions.savedata)
    router.post('/login',functions.login)

    app.use('/api',router)
}


module.exports=
routes