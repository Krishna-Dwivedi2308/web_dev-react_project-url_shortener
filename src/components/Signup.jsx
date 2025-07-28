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
import { signup } from '@/db/apiAuth'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'
const Signup = () => {
    const [formData, setformData] = useState({
        'name':'',
        'email': '',
        'password': '',
        'profile_pic':''
    })
    const [errors, setErrors] = useState({})
    const navigate=useNavigate()
    let [searchParams]=useSearchParams()
    const longLink=searchParams.get('createNew')


    const handleInput = (e) => {
        const { name, value ,files} = e.target
        setformData((prev) => ({
            ...prev, [name]: files? files[0]:value
        }))
    }

    const { data, error, loading, fn: fnSignup } = Usefetch(signup, formData)
    const {fetchUser}=UrlState()
    useEffect(() => {
        if(error==null && data){
            navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`)
            fetchUser()
        }
    }, [data, error])

    const handleSignup = async () => {
        setErrors({})
        try {
            const schema = Yup.object().shape({
                name:Yup.string().required('Name is Required'),
                email: Yup.string().email('Invaid Email').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 char long ')
                    .required('Password is required '),
                profile_pic:Yup.mixed().required('Profile Pic is Required')
            })
            await schema.validate(formData, { abortEarly: false })
            await fnSignup()
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
        <Card className='w-100'>
            <CardHeader>
                <CardTitle>Signup </CardTitle>
                <CardDescription>Create a new account if you haven't already</CardDescription>
                {error && <Error message={error.message}/>}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className='space-y-1'>
                    <Input
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                        value={formData.name}
                        onChange={handleInput}
                    />
                    {errors.name && <Error message={errors.name} />
                    }
                </div>
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
                <div className='space-y-1'>
                    <Input
                        type='file'
                        name='profile_pic'
                        accept='image/*'
                        onChange={handleInput}
                    />
                    {errors.profle_pic && <Error message={errors.profle_pic} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup} type='submit'>{!true ? <BeatLoader size={10} color='#000000' /> : 'Create Account'}</Button>
            </CardFooter>
        </Card>
    )
}

export default Signup