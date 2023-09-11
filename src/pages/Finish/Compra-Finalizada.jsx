import Logo from '/logo.svg'
import Cart from '/cart.svg'
import Check from '/check-circle.svg'
import Arrow from '/arrow-left.svg'

import './index.scss'
import { useNavigate } from 'react-router-dom'

export const CompraFinalizada = () =>{

    const navigate = useNavigate()

    return(
        <>
            <header className='header-finalizada'>
                <img src={Logo} alt="Logo Outside the Box shop" />
                <img src={Cart} alt="Carrinho de Compras" />
            </header>
            <main className='main-finalizada'>
                <section className='check-img'><img src={Check} alt="CHECK" /></section>
                <div className='texts'>
                    <h1>Compra finalizada.</h1>
                    <p>Agradecemos a preferência!</p>
                </div>
            </main>
            <footer><button className='continuar' onClick={() => navigate('/')}><img src={Arrow} alt="" /> continuar comprando</button></footer>
        </>
    )
}