import './index.scss'

// eslint-disable-next-line react/prop-types
export const Input = ({type,placeholder,onInputChange,classe}) =>{
    return(
        <input type={type} placeholder={placeholder} onChange={onInputChange} autoComplete={classe}/>
    )
}

