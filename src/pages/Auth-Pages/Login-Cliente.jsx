import { AuthPage } from "../../components/Auth-Pages"

export const LoginCliente = () => {
    return(
        <AuthPage page='login' 
            textCadastro='não está cadastrado?' 
            under=' clique aqui' 
            textLogin='é administrador? faça login aqui'
            spanPath='/cadastro'
            path='/admin'
            esc={2}
            alertText='login'
        />
    )
}