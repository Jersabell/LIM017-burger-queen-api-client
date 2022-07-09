import style from './CardButton.module.css'
function CardButton({text, clickftn}){
    return (
        <button onClick={clickftn} className={style.CardButton}>
            {text}
        </button>
    )
};
export default CardButton;