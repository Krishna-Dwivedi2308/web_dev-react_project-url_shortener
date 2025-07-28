import { createContext, useContext, useEffect } from 'react' 
import Usefetch from './hooks/Usefetch'
import { getCurrentUser } from './db/apiAuth'

const UrlContext=createContext()

const UrlProvider=({children})=>{
    const {data:user,loading,fn:fetchUser}=Usefetch(getCurrentUser)   
    const isAuthenticated=user?.role=== 'authenticated'
    useEffect(()=>{
        fetchUser();
    },[])
    return <UrlContext.Provider value={{user,fetchUser,loading,isAuthenticated}}>
        {children}
        </UrlContext.Provider>
}

export default UrlProvider;

export const UrlState=()=>{   
   return useContext(UrlContext)
}