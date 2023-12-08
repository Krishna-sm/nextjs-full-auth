
import { NextResponse } from "next/server";

export const POST = async(request)=>{


    // request.cookies.delete("token") 
const response =  NextResponse.json({error:null,msg:"logout success"},{
        status:200
    })

    response.cookies.delete("token");


    return response
}