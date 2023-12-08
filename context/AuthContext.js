'use client'
import {createContext,useState,useContext,useEffect} from 'react'
import { usePathname ,useRouter} from 'next/navigation'
import {toast} from 'react-hot-toast'
import axios from 'axios'
const AuthContext = createContext();
export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider= ({children})=>{
const router = useRouter()

    const fetchData = async()=>{

        try{
          const response = await axios.get("/api/profile");
          const data = await response.data;
          setUser(data?.user)
        }catch(e){
          toast.error(e.message)
          router.push("/login")
        }
      
      }
      
      
  const LogoutHandler = async()=>{
    try {
      const response = await axios.post("/api/logout");
      const data = await response.data;
          toast.success(data.msg)
          setUser(null)
          router.push("/login")
    } catch (error) {
      toast.error(error.response?.data?.error)
    }
  }


    const pathname = usePathname()
    const [user,setUser] = useState(null);

    
    useEffect(()=>{
    const isPrivatePath = ['/','/update-profile']
        if(isPrivatePath.includes(pathname)){
            fetchData()
        }else{
            setUser(null)
        }
    },[pathname])

    

    return <AuthContext.Provider value={{user,LogoutHandler}} >
        {children}
    </AuthContext.Provider>
}