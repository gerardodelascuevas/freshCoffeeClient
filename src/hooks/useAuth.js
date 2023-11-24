import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth({middleware, url}){

    const token = localStorage.getItem('AUTH_TOKEN'); 

    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/user', ()=> 
        clienteAxios('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=> res.data)
        .catch(e => {
            throw Error(e.response.data.errors)
        })
    )
    const login = async(datos, setErrores)=> {
        try {
            const {data} = await clienteAxios.post('/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([]);
            await mutate();
        } catch (error) {
            console.log(error)
            console.error(Object.values(error.response.data.errors));
            setErrores(Object.values(error.response.data.errors));
        } 
    }

    const registro = async (datos, setErrores)=> {
        try {
            const res = await clienteAxios.post('/registro', datos);
            localStorage.setItem('AUTH_TOKEN', res.token); 
            setErrores([]); 
            await mutate(); 
        } catch (error) {
            console.log(error)
            console.error(Object.values(error.response.data.errors));
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async ()=> {
        try {
            await clienteAxios.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined); 
        } catch (error) {
            console.error(error)
        }
    }

    console.log(user)
    console.log(error)

    useEffect(()=> {
        if(middleware === 'guest' && url && user){
            navigate('/');
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login');
        }
    }, [user, error])

    return {
        login, registro, logout, user, error
    }
}