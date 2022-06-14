import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Signup = () => {
    const router = useRouter()
    const { user, signUp } = useAuth()

    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleSignup = async (e: any) => {
        e.preventDefault()
        try {
            await signUp(data.email, data.password)
            router.push('/login')
        }
        catch (error) {
            console.log(error)
        }
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSignup}>
                <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default Signup