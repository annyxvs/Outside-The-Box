import './index.scss'

import trash from '/trash-white.svg'
import edit from '/edit.svg'

import teste from '/teste.avif'

export const CardNew = () =>{
    return(
        <section className='card-new'>
            <div className='buttons-edit'>
                <button><img src={edit} alt="" />editar</button>
                <button className='delete'><img src={trash} alt="" style={{ fill: 'white' }} />deletar</button>
            </div>
            <div className='produto'>
                <div className='img-produto'>
                    <img src={teste} alt="" />
                </div>
                <div className='info-produto'>
                    <h1>Mouse Logitech</h1>
                    <p>R$67,00</p>
                </div>
            </div>
        </section>
    )
}