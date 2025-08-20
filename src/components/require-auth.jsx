import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UrlState } from "@/Context";
import { BarLoader } from "react-spinners";

function RequireAuth({children}){
const navigate=useNavigate()

const {loading,user}=UrlState()

useEffect(()=>{

    if(!(user?.role=='authenticated') && loading ===false)
        navigate('/auth')
},[loading,user])

if(loading) return <BarLoader width={'100%'} color='#36d7b7'/>
if(user?.role=='authenticated') return children
}

export default RequireAuth