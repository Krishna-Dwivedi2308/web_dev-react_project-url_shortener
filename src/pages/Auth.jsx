import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { UrlState } from '@/Context';
 const Auth =  () => {
  const [searcchParams] = useSearchParams()
  const longlink = searcchParams.get('createNew')
  const navigate=useNavigate();
  const {user}= UrlState();
  // console.log(`from auth isauthenticated=${isauthenticated} loading=${loading}`);

  
  useEffect(()=>{
    if(user?.role=='authenticated'){
      navigate(`/dashboard?${longlink?`createNew=${longlink}`:""}`)
    }
  },[user])



  return  (
  <div className='mt-10 flex flex-col items-center gap-10'>
    <div className='text-5xl font-extrabold'>{longlink
    ? (<h1>Please Login First.We will pick you where you left off!</h1>) 
    : (<h1>Login/Signup</h1>)}</div>
    <Tabs defaultValue="login" className="w-100 flex flex-col items-center ">
      <TabsList className='w-100'>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent className='w-100 flex flex-col'value="login"><Login/></TabsContent>
      <TabsContent value="signup"><Signup/></TabsContent>
    </Tabs>
  </div>
  )
};

export default Auth;
