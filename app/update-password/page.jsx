"use client";
import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {toast} from 'react-hot-toast'
import * as yup from 'yup'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios'
const RegisterPage = (params) => {
// console.log({params})
const router = useRouter()

const validationSchema =  yup.object({
    email:yup.string().email("EMail must be a valid email").required("Email is Required"),
    cpassword:yup.string().oneOf([yup.ref('password'),null],"Password should matched!").required("Confirm Password is required"),
    password:yup.string().min(6,"Password must be greater than 6 characters").required("Password is required"),
})

    const initialValue = {
        email:'',
        cpassword:'',
        password:''
    }
    
    
    const onSubmitHandler =async (e)=>{
        try {
            //code
            const response = await axios.put("/api/update-password",{...e,token:params.searchParams.token});
            const data  = await response.data;
            toast.success(data.msg);
            
            router.push("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error)
        }
    }
    if(!params.searchParams.token){
        router.replace("/login");
        return <>
        
        </>
    }
  return (
    <>
                <div className="min-h-[82vh] w-full flex items-center justify-center">
                  <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={onSubmitHandler} >
                    <Form className="w-1/2 mx-auto">

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field type="text" id='email' name='email' className='w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none' placeholder='Enter Your Email' />
                            <ErrorMessage name='email' component={'p'} className='text-red-500' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <Field type="text" id='password' name='password' className='w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none ' placeholder='Enter Your Password' />
                            <ErrorMessage name='password' component={'p'} className='text-red-500' />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <Field type="password" id='cpassword' name='cpassword' className='w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none ' placeholder='Enter Confirm Password' />
                            <ErrorMessage name='cpassword' component={'p'} className='text-red-500' />

                        </div>
                        <div className="mb-3">
                            <button type='submit' className="w-full bg-green-500 rounded text-white py-3 font-bold">Forget</button>
                        </div>
                        <div className="mb-3">
                            <p className='text-center '>Already Know ? <Link href={'/login'} className="text-blue-500 underline">Login</Link></p>
                        </div>
                    </Form>
                    </Formik>
                </div>

    </>
  )
}

export default RegisterPage