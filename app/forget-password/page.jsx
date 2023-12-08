"use client";
import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {toast} from 'react-hot-toast'
import * as yup from 'yup'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios'
const RegisterPage = () => {

    const router = useRouter()

    const validationSchema =  yup.object({
        email:yup.string().email("EMail must be a valid email").required("Email is Required"),
     })

    const initialValue = {
        email:''
    }


    const onSubmitHandler = async(e,{resetForm})=>{
        try {
                    //code
                    // toast.success("form submit");
                    const response =await axios.post("/api/forget-password",e);
                    const data = await response.data;
                    resetForm()
                    toast.success(data.msg);
                    router.push("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error)
        }
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