import { AuthPage } from "../../components/Auth-Pages"

export const CadastroCliente = () =>{

    return(
        <AuthPage page='registrar'
            textCadastro='Já está cadastrado?'
            under='clique aqui'
            textLogin=''
            spanPath='/login'
            esc={1}
            alertText='cadastro'
        />
    )
}