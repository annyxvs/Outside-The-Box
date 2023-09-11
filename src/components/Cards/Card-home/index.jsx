import './index.scss'

// eslint-disable-next-line react/prop-types
export const CardHome = ({name,price,image,comprar}) =>{
    return(
        <div className='card-home'>
            <div className='img-produto'>
                <img src={image} alt="" />
            </div>
            <div className='info-produto'>
                <h1>{name}</h1>
                <p>R${price}</p>
                <button className='comprar' onClick={comprar}>comprar</button>
            </div>
        </div>
    )
}