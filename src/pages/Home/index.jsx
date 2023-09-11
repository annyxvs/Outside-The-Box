import { ButtonAuth } from '../../components/Button'
import './index.scss'

import LogoWithe from '/logo -white.svg'
import Logo from '/logo.svg'
import down from '/down.svg'
import search from '/search.svg'
import cart from '/cart.svg'
import logout from '/log-out.svg'
import { CardHome } from '../../components/Cards/Card-home'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/api'
import { Alert } from '@mui/material'

export const Home = () =>{

    const navigate = useNavigate()

    const [products,setProducts] = useState([])
    const [text,setText] = useState('')

    function  handleClickDown (){ 
        const tag = document.querySelector('.search-produtos')
        tag.scrollIntoView({ block: 'center' })
    }

    async function handleSearch(){
        const search = await api.searchProducts(text)
        setProducts(search.results)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([])
    const [totalPages, setTotalPages] = useState(0);

    async function getProducts (page){
        const response = await api.getAllProducts(page)
        setProducts(response.results)

        setTotalPages(Math.ceil(response.count / 9))        
        let totalPages = Math.ceil(response.count / 9)
        const pageNumbers = []

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
        setPageNumbers(pageNumbers)
    }

    function handlePageChange(newPage) {
        if (newPage >= 1) {
            setCurrentPage(newPage)
        }
    }
    

    async function setDadosAuth(){
        const dadosDeAutenticacao = await JSON.parse(localStorage.getItem('dadosDeAutenticacao'));
        
        if (dadosDeAutenticacao && dadosDeAutenticacao.user) {
            setDados(dadosDeAutenticacao);
        }else{
            setDados()

        }
    }


    const [dados,setDados] = useState({})
    const [alertWarning,setAlertWarning] = useState(false)

    const handleClick = () => {
        if(dados == undefined){
            setAlertWarning(true)
            setTimeout(() => {
                navigate('/login')
                setAlertWarning(false)
            }, 1500);
        }else{
            navigate('/cart', { state: { dados: dados } });
        }
    };

    const [logoutAlert,setLogoutAlert] = useState(false)

    async function handleLogout (){
        await api.logout()
        setDados()
        localStorage.removeItem('dadosDeAutenticacao')
        setLogoutAlert(true)
        setTimeout(() => {
            setLogoutAlert(false)
        }, 2000);
    }

    const [infoProduct,setInfoProduct] = useState(false)

    async function handleAddCartItem(product){
        try{
            await api.addProducCart(product)
            setInfoProduct(true)
            setTimeout(() => {
                setInfoProduct(false)
            }, 2000);
        }catch{
            setAlertWarning(true)
            setTimeout(() => {
                setAlertWarning(false)
            }, 2000);
        }
    }
    

    useEffect(() => {
        getProducts(currentPage)
        setDadosAuth()
    },[currentPage])

    return(
        <div className='home'>
        <div className='landing'>
            <header>
                {!dados && <ButtonAuth text='login' func={ () =>  navigate('/login') }/>}
                {dados && <button className="logout" onClick={handleLogout}><img src={logout} alt="" /></button>}
                {logoutAlert && <span className='logoutAlert'><Alert severity="success">Você foi deslogado com sucesso!</Alert></span>}
            </header>
            <main className='main-home'>
                <div className='slogan'>
                    <img src={Logo} alt="Logo" className='logo-home'/>
                    <p className='sloganText'>O lugar perfeito para fazer suas compras.</p>
                </div>
            </main>
        </div>
            <footer className='footer-home'>
                <p>ver produtos</p>
                <span className='arrow-down'>
                    <button className='ver-produtos' onClick={handleClickDown}><img src={down} alt="" /></button>
                </span>
            </footer>

            <section className='section-produtos'>
                <header className='search-produtos'>
                    <div className='input-search'>
                        <input type="text" placeholder='pesquise um produto...' onChange={(e) => setText(e.target.value)}/>
                        <img src={search} alt="" />
                    </div>
                    <ButtonAuth text='pesquisar' func={handleSearch}/>
                    <img src={cart} alt="" className='cart' onClick={handleClick}/>
                    {alertWarning && <span className='alertWarning'><Alert severity="warning">É necessário realizar o login!</Alert></span>}
                </header>
            </section>
            
            <section className='produtos'>
                <main className='lista-produto'>
                    {products.length > 0 ? (
                    products.map((product, index) => (
                        <CardHome
                            key={index}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            comprar={() => handleAddCartItem(product.id)}
                        />
                    ))
                ) : (
                    <p>Sem produtos.</p>
                )}
                </main>
                {infoProduct && <span className='alertInfo'><Alert severity="info">Item adcionado ao carrinho!</Alert></span>}
                <div className="pagination">
                    <button className='button-pag' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;  
                    </button>
                    <section className='num-pag'>
                        {pageNumbers.map((pageNumber) => (
                           <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>
                           {pageNumber}
                       </button>  
                        ))}
                    </section>
                    <button className='button-pag' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
            </section>

            <footer className='footer'>
                <div className='logo-footer'><img src={LogoWithe} alt="" /></div>
                <p onClick={() => api.logout()}>outsidetheboxshop@contato.co</p>
            </footer>
        </div>
    )
}