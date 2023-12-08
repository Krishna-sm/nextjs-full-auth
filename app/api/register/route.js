import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const POST = async(request)=>{
    const {name,email,password} =await request.json();

    const existUser = await UserModel.findOne({email})
    if(existUser){
        return NextResponse.json({msg:null,error:"User Already Exist"},{
            status:400
        })
        return
    }

    await UserModel.create({
        name,email,password
    })
    return NextResponse.json({error:null,msg:"User Register Successfully"},{
        status:201
    })
}