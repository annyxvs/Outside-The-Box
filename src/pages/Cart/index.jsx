import { CardCart } from '../../components/Cards/Card-Cart'
import './index.scss'

import Logo from '/logo.svg'
import CartIcon from '/cart.svg'
import Dollar from '/dollar.svg'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

export const Cart = () =>{

    const navigate = useNavigate()

    const location = useLocation();
    const dadosRecebidos = location.state.dados;

    const [visible,setVisible] = useState(false)
    const [produtos,setProdutos] = useState([])
    const [subtotalCart,setSubtotalCart] = useState([])
    const [loading,setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [saldoAtual,setSaldoAtual] = useState(dadosRecebidos.wallet)


    function handlePageChange(newPage) {
        if (newPage >= 1) {
            setCurrentPage(newPage)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getCart(dados,page){
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        const response = await api.getCart(dados.user.id,page);
        setProdutos(response.results);
        setSubtotal()

        setTotalPages(Math.ceil(response.count / 9))        
        let totalPages = Math.ceil(response.count / 9)
        const pageNumbers = []
        
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
        setPageNumbers(pageNumbers)
    }

    const [warningSaldo,setWarningSaldo] = useState(false)

    async function handleConfirm() {
        try {
            let response = await api.confirmPurchase();
            if (response.status === 200) {                
                setSaldoAtual(parseFloat((saldoAtual - subtotalCart.subtotal).toFixed(2)));
                setTimeout(() => {
                    navigate('/finish');
                }, 1000);
            } 
        } catch {
            setWarningSaldo(true)

            setTimeout(() => {
                setWarningSaldo(false)
            }, 2000);
        }

        
    }

    async function setSubtotal(){
        let response = await api.getSubtotal()
        setSubtotalCart(response)
    }

    const [badAlertDelete,setBadAlertDelete] = useState(false)

    async function handleDeleteProduct(productId) {
        try {
            await api.deleteProductCart(productId);
            const updatedResponse = await api.getCart(dadosRecebidos.user.id,currentPage);    
            setProdutos(updatedResponse.results)
            setSubtotal()
        }catch(e) {
            setBadAlertDelete(true)
            setTimeout(() => {
                setBadAlertDelete(false)
            }, 1500);
        }
    }

    useEffect(() => { 
        if(dadosRecebidos){
            getCart(dadosRecebidos,currentPage)
        }
    },[currentPage]);

    return(
       <div className='card'>
        <header>
            <img className='logo' src={Logo} alt="Logo Outside the Box shop" onClick={() => navigate('/')}/>
            <div className='userWrapp'>
                <div className='Saldo' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}><img className='dollar' src={Dollar} alt="Ícone Dollar"/> <span>{visible ? `Saldo: R$ ${saldoAtual}` : ''}</span></div>
                <img src={CartIcon} alt="Ícone Carrinho de Compras" />
            </div>
        </header>
        <main>
            {!loading ? <div className='itens'>
                {produtos.length > 0 ? produtos.map((data) => (
                    <CardCart qnt={data.qnt} product={data.product_info} key={data.id} cartId={data.id} func={() => handleDeleteProduct(data.id)}/>
                )): <h1>Não há compras no carrinho.</h1>}
            </div> : <span className='loading'><div className="lds-dual-ring"></div></span>}
            <section className='finalizar'>
                <div className='subtotal'>Subtotal: <p>R$ {subtotalCart.subtotal}</p></div>
                <button onClick={handleConfirm} className='button-confirm'>confirmar compra</button>
                {warningSaldo && <section className='warning'><Alert severity="warning">Seu saldo é insuficiente!</Alert></section>}
            </section>
        </main>

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
                {badAlertDelete && <span className='alerta'><Alert severity="error">Erro ao deletar o item do carrinho!</Alert> </span>}
       </div>
    )
}