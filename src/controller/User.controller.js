const httpStatus = require("http-status")
const bcrypt = require('bcrypt')
const { CreateNewUserInDBService } = require("./../service/User.Service")

async function CreateNewUserController(request, response){
    try{

        const {name, email, password} = request.body

        if(!name || !email || !password){
            response.status(httpStatus.BAD_REQUEST).json({
                success : false,
                message : "Email, Name & Password is required"
            })
            
        }

        const SALT = bcrypt.genSaltSync(10)

        const encryptedPassword = bcrypt.hashSync(password, SALT)

        const result = await CreateNewUserInDBService(name, email, encryptedPassword)

        if(result.success){
            response.status(httpStatus.CREATED).json({
                success : true,
                message : "User registered successfully"
            })
        }else{
            throw new Error("CreateNewUserController unable to create a new user")
        }

    }catch(error){
        console.log(error)
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewUserController
}