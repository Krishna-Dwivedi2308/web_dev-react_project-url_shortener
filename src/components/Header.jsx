import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link2, LogOut } from 'lucide-react'
import { UrlState } from '@/Context'
import Usefetch from '@/hooks/Usefetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'
const Header = () => {
  const { user, fetchUser } = UrlState()

  const { loading, fn: fnlogout } = Usefetch(logout)

  console.log(user?.role);

  const navigate = useNavigate()
  const loginNavigation = () => (navigate("/auth"))
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith('/auth')

  return (
    <>
      <nav className='m-1 p-1 flex justify-between items-center' >
        <Link to='/'>
          <img src="/logo.png" className='h-16 rounded-lg' alt="Qlinky Logo" />
        </Link>
        <div>
          {!(user?.role === 'authenticated') ? <Button onClick={loginNavigation}>{isAuthRoute ? 'Welcome to Login/Signup Page' : 'Login'}</Button> : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} classname='object-contain' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to='/dashboard' className='flex'>
                    <Link2 />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-500'>
                  <span className='flex items-center' onClick={() => {
                    fnlogout().then(() => {
                      fetchUser()
                      navigate('/')
                    })
                  }}>
                    <LogOut />Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader classname='mb-4' widht={'100%'} color='#36d7b7' />}
    </>
  )
}

export default Header