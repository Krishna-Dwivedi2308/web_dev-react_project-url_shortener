import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link2, LogOut } from 'lucide-react'
const Header = () => {
  const user = true
  const navigate = useNavigate()
  const loginNavigation = () => (navigate("/auth"))
  return (
    <nav className='m-1 p-1 flex justify-between items-center' >
      <Link to='/'>
        <img src="/logo.png" className='h-16 rounded-lg' alt="Qlinky Logo" />
      </Link>
      <div>
        {!user ? <Button onClick={loginNavigation}>Login</Button> : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2/>
                My Links</DropdownMenuItem>
              <DropdownMenuItem className='text-red-500'>
                <span className='flex items-center'>
                <LogOut/>
                Logout
                </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  )
}

export default Header