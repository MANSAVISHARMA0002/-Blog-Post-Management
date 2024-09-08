import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';
import Token from '../model/token.js';
dotenv.config();
export const signupUser= async (request, response)=>{
    try{
        //const salt=await bcrypt.genSalt();
        const hashpass=await bcrypt.hash(request.body.password, 10);
        const user= { email: request.body.email, name: request.body.name, password: hashpass}
        const newuser=new User(user);
        await newuser.save();
        return response.status(200).json({msg:"signup successfully"});
    }catch(error){
        return response.status(500).json({msg:"Error while creating user"});
    }
}

export const loginUser= async (request,response)=>{
    let user=await User.findOne({email: request.body.email});
    //console.log(user);
    if(!user){
        return response.status(400).json({msg:"User not found."})
    }
    try{
        let match=await bcrypt.compare(request.body.password,user.password);
        // console.log("true");
        if(match){
            let accessToken=jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
            let refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken=new Token({token: refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email});
        }else{
            return response.status(400).json({msg:"Password doesn't match."});
        }
    }catch(e){
        response.status(500).json({msg: "error while login user."});
    }
}