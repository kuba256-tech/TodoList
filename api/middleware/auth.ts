import express ,{Request, Response, NextFunction} from "express";
import { Jwt } from "jsonwebtoken";
import User from "../models/User";
import { HydratedDocument } from "mongoose";
import { IUserFields } from "../types";

export interface RequestWithUser extends Request{
    user: HydratedDocument<IUserFields>
}

const auth = async(expressReq:Request, res:Response, next:NextFunction)=>{
    try{
        const req = expressReq as RequestWithUser
        const token = req.get("Authorization")
        if(!token){
            res.status(401).send({error:"No Token Provided"});
            return
        }
        
        const user = await User.findOne({token});
        if(!user){
            res.status(401).send({error:"User with such token not Found"})
            return
        }
        req.user = user
        next();
    }catch(error){}
} 
export default auth