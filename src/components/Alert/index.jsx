import './index.scss'

// eslint-disable-next-line react/prop-types
export const Alert = ({text,type}) =>{
    return(
        <div className={`alert ${type}`}>
            <p>{text}</p>
        </div>
    )
}