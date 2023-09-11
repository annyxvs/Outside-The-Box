import './index.scss'

import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const ButtonAuth = ({text,path,func}) => {
    const navigate = useNavigate()

    return(
        <button className='buttonAuth' onClick={async () => {navigate(path); await func()}}>{text}</button>
    )
}