/* eslint-disable react/prop-types */
import { useState } from 'react'
import './index.scss'
import trash from '/trash.svg'
import { useEffect } from 'react'

export const CardCart = ({qnt,product,func}) =>{

    const [count,setCount] = useState(qnt)
    const [dataProd,setDataprod] = useState({})


    useEffect(()=>{
        if(count <= 0) setCount(1)
    },[count])

    useEffect(() =>{
        setDataprod(product)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
            {dataProd ? <div className='card-cart'>
            <div className='img-produto'><img src={`http://45.145.164.240:8000${dataProd.image}`} alt="" /></div>
            <div className='infos-produto'>
                
                <div>
                    <h1>{dataProd.name}</h1>
                    <p>{dataProd.price}</p>
                </div>

                <div className='qnt-produto'>
                    <button onClick={() => setCount(count+1)}>+</button>
                    <div className='qnt'><p>{count}</p></div>
                    <button onClick={() => setCount(count-1)}>-</button>
                </div>
            </div>
            <button className='trash' onClick={func}><img src={trash} alt="Ícone Lixeira" /></button>
        </div> : <h1>Não há nada no seu carrinho.</h1>}
        </>
    )
}