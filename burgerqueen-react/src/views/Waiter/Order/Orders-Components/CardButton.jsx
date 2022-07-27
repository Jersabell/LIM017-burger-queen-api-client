import style from './CardButton.module.css';
import { Button } from '@mui/material';

export function CardButton({text, clickftn}){
    return (
        <button onClick={clickftn} className={style.CardButton}>
            {text}
        </button>
    )
};
export function CardButtonDisabled({text}){
    return(
        <Button variant="contained" disabled>
            {text}
        </Button>
    )
}