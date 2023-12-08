import { ConnectDB } from "@/lib/config/db";
import { VerifyForgetToken } from "@/lib/Service/Token.service";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";
import bcrypt  from 'bcryptjs';
ConnectDB();
export const PUT = async(request)=>{
const {email,password,token,cpassword} =await request.json()



if(cpassword!== password){
    return NextResponse.json({msg:null,error:"Password and Cpassword are not matched"},{
        status:400
    })
    return
}

    const auth = token|| '';

    if(!auth){
        return NextResponse.json({msg:null,error:"Please login First"},{
            status:400
        })
        return
    }

    const {userId} = await VerifyForgetToken(auth,email);
    if(!userId){
        return NextResponse.json({msg:null,error:"Invalid Token"},{
            status:400
        })
        return
    }
    const existUser = await UserModel.findById(userId);
    
    
    if(!existUser){
        return NextResponse.json({msg:null,error:"User Does not Exist"},{
            status:401
        })
        return
    }

    const hashPassword = await bcrypt.hash(password,10);


  await  UserModel.findByIdAndUpdate(userId,{
        $set:{
            password:hashPassword
        }
    });

    return NextResponse.json({error:null,msg:"Password Update successfully"},{
        status:200
    })
}