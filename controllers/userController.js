
 let User = require('../model/user')
 const bcrypt = require('bcrypt');
 const jwt = require ('jsonwebtoken');





// THIS IS FOR  CREATED THE DATA
let register = async (req,res)=>{

    // let name = req.body.name
    // let email =req.body.email
    // let password =req.body.password

    // ##### or we can also write like that one line#####
    let{name,email,password}=req.body

    console.log(name,email,password)


    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt); 


    let user = new User({name,email,password})
    await  user.save()

    // res.send('this is register page')

    let payload = {id:user.id}

    jwt.sign(
        payload,
        process.env.JwT_SECRET,
        {
            expiresIn:'1h'
        },(err,token)=>{

        if(err){
            throw err
        }
        else{
            res.send(token)
        }

    }).catch(()=>{
        console.log("error signing jwt!")
    })

}







let login = async (req,res)=>
    {

        let{inp_email,inp_password}=req.body

        let user = await User.findOne({email:inp_email})

        let isValidPWD = await bcrypt.compare(inp_password,user.password)
        
        if(!isValidPWD){
            res.status(400).send("user not found!!")
        }
        else{
            let payload = {id:user.id}

    jwt.sign(
        payload,
        process.env.JwT_SECRET,
        {
            expiresIn:'1h'
        },(err,token)=>{

        if(err){
            throw err
        }
        else{
            res.send(token)
        }

    })
}
}





let profile = async (req,res)=>  {
    res.status(200).send(req.user)   
}



let transaction = async (req,res)=>{
        res.status(200).send("this is transaction page")
}



let wishlist = async (req,res)=>{
        res.status(200).send("this is wishlist page")

}


module.exports = { 
    login, 
    register, 
    profile,
    transaction,
    wishlist
    
};
