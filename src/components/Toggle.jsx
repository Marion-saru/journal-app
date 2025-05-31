import '../assets/css/Toggle.css';

export default function Toggle({ onClick,text }){
    return (
        <button className= "toggle-btn" onClick={onClick}>{text}</button>
    )
}
