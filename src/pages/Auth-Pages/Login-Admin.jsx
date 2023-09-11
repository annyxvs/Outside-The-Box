import { useEffect } from "react"

export const LoginAdmin = () =>{


    const redirect = () =>{
        window.location.href = 'http://45.145.164.240:8000/admin/'
    }

    useEffect(() =>{
        redirect()
    })

    return null
}