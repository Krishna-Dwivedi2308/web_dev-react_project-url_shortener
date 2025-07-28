import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import Usefetch from '@/hooks/Usefetch'
import { login } from '@/db/apiAuth'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'
const Login = () => {
    const [formData, setformData] = useState({
        'email': '',
        'password': ''
    })
    const [errors, setErrors] = useState({})
    const navigate=useNavigate()
    let [searchParams]=useSearchParams()
    const longLink=searchParams.get('createNew')


    const handleInput = (e) => {
        const { name, value } = e.target
        setformData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const { data, error, loading, fn: fnLogin } = Usefetch(login, formData)
    const {fetchUser}=UrlState()
    useEffect(() => {
        if(error==null && data){
            navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`)
            fetchUser()
        }
    }, [data, error])

    const handleLogin = async () => {
        setErrors({})
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Invaid Email').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 char long ')
                    .required('Password is required ')
            })
            await schema.validate(formData, { abortEarly: false })
            await fnLogin()
        } catch (error) {
            const newError = {}
            error?.inner?.forEach((error) => {
                newError[error.path] = error.message
            })
            setErrors(newError)
        }
    }

    const [password, setpassword] = useState()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login </CardTitle>
                <CardDescription>Enter the email and password to login</CardDescription>
                {error && <Error message={error.message}/>}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className='space-y-1'>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Enter your registered email'
                        value={formData.email}
                        onChange={handleInput}
                    />
                    {errors.email && <Error message={errors.email} />
                    }
                </div>
                <div className='space-y-1'>
                    <Input
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleInput}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin} type='submit' disabled={loading} >{loading? <BeatLoader size={10} color='#000000' /> : 'Login'}</Button>
            </CardFooter>
        </Card>
    )
}

export default Login