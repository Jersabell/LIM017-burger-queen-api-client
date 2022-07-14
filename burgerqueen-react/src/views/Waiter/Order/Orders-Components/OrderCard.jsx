import style from './OrderCard.module.css';
import CardProduct from './CardProduct';
import CardButton from './CardButton';

function OrderCard({client, dataEntry, userId, status, products }){
    const textToButton = () => {
        if(status==='pending'){
            return 'Pending . . .'
    } return 'Deliver'
}
    return(
        <article className={style.Card}>
            <div className={style.Card__info}>
                <h4>List of Order</h4>
                <p>Client: {client}</p>
                <p>Date: {dataEntry}</p>
                <p>Waiter: {userId}</p>
            </div>
            <div className={style.Card__products}>
                {products.map(item => <CardProduct
                key={`${item.product.name}-${item.product.id}-${client}`}
                qty={item.qty}
                img={!item.product.image ? 'image not found' : item.product.image }
                name={item.product.name}
                price={item.product.price}/>)}
            </div>
            <div className={style.Card__button}>
                <CardButton
                text={textToButton()}/>
                <p>Status: {status}</p>
                <p>tiempo de prepación: -</p>
            </div>
        </article>
    )
}

export default OrderCard;