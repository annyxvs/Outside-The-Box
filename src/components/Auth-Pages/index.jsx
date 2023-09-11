import Logo from '/logo.svg'
import Vector from '/vector/Rectangle.svg'
import './index.scss'

import { Input } from '../Inputs'
import { ButtonAuth } from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import {   useState } from 'react'
import { api } from '../../api/api'
import { Alert } from '@mui/material'

// eslint-disable-next-line react/prop-types
export const AuthPage = ({page,textCadastro,under,textLogin,path,spanPath,esc,alertText}) =>{
    const navigate = useNavigate()

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [alert,setAlert] = useState(false)
    const [badAlert,setBadAlert] = useState(false)

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

   const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    async function registerClient(nome,senha){
        try{
            await api.registerClient(nome, senha)
            setAlert(true)
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        }catch{
            setBadAlert(true)
            setTimeout(() => {
                setBadAlert(false)
            }, 2500);
        }
    }

    async function loginClient(nome,senha){
       try{
        let response = await api.loginClient(nome,senha)
        if(response.status == 200){
                setAlert(true) 
                setTimeout(() => {
                    localStorage.setItem('dadosDeAutenticacao', JSON.stringify(response.data));
                    navigate('/') 
                    setAlert(false)
                }, 1000);
        }
       }catch{
            setBadAlert(true)
            setTimeout(() => {
                setBadAlert(false)
            }, 2500);
       }
    } 

    async function loginAdmin(){
        const URL = 'http://45.145.164.240:8000/admin/'
        window.open(URL,'_blank')
    }
    

    const User = (esc,nome,senha) => {
        switch(esc){
            case 1:
                registerClient(nome,senha);
                break
            case 2:
                loginClient(nome,senha);
                break
            case 3:
                loginAdmin();     
        }
    } 

    return(
            <div className='auth-page'>
                <header><img src={Logo} alt="Logo Outside the Box shop" /></header>
                <main className='main-auth'>
                    <h1 className='text'>Olá, seja bem vindo!</h1>
                    <form className="input-Wrapp">
                        <Input type='text' placeholder='Nome' onInputChange={handleNomeChange} classe='username'/>
                        <Input type='password' placeholder='Senha' onInputChange={handleSenhaChange} classe='current-password'/>
                    </form>
                    <p className='quest'>{textCadastro} <span onClick={() => navigate(spanPath)}> {under}</span></p>

                    <div className='button-Wrapp'>
                        <ButtonAuth text={page} func={() => User(esc,nome,senha)}/>
                        <Link to={path}><p to='/cadastro'>{textLogin}</p> </Link>
                    </div>
                </main>
                <img src={Vector} alt="Rectangle" className='vector'/>
                {alert && <span className='alerta'><Alert severity="success">O {alertText} foi realizado com sucesso!</Alert> </span>}
                {badAlert && <span className='alerta'><Alert severity="error">Erro ao realizar o {alertText}!</Alert> </span>}
            </div>
    )
}
