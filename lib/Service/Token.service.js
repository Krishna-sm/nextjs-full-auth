import jwt from 'jsonwebtoken'

const AUTH = process.env.AUTH_JWT ||"FGHJ"
const FORGET= process.env.FORGET_JWT ||"FGHJ"

export const GenerateToken = async(user)=>{
    const token = await jwt.sign({userId:user._id},AUTH,{
        expiresIn:'2d'
    })
    return token
}

export const VerifyToken = async(token,email)=>{
    const verified = await jwt.verify(token,AUTH);
    return verified
}

export const GenerateForgetToken = async(user,email)=>{
    const token = await jwt.sign({userId:user._id},`${FORGET}${email}`,{
        expiresIn:'5h'
    })
    return token
}

export const VerifyForgetToken = async(token,email)=>{
    const verified = await jwt.verify(token,`${FORGET}${email}`);
    return verified
}