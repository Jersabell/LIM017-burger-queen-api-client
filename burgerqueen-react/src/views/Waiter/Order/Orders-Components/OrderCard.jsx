import style from './OrderCard.module.css';
import CardProduct from './CardProduct';
import {CardButton, CardButtonDisabled} from './CardButton';

function OrderCard({ client, dataEntry, userId, status, products, id, changeToDelivered, changeToDelivering}){

    const showButton = () => {
        const rol = localStorage.getItem('userRol');

        if(status==='delivering'&& rol ==='{"waiter":true}'){
            return  <CardButton text={'Delivered'} clickftn={(e) => changeToDelivered(e, id)}/>
        } else if(status==='pending'&& rol ==='{"chef":true}'){
            return <CardButton text={'Delivering'} clickftn={(e) => changeToDelivering(e, id)}/>
        } return <CardButtonDisabled text={status}/>
        }

    return(
        <article className={style.Card}>
            <div>
                <div className={style.Card__info}>
                    <h4>List of Order</h4>
                    <p>Client: {client}</p>
                    <p>Date: {dataEntry}</p>
                    <p>Waiter: {userId}</p>
                    <p>Status: {status}</p>
                {/* <p>tiempo de prepación: -</p> */}
                    <br></br>
                </div>
                <div className={style.Card__products}>
                    {products.map(item => <CardProduct
                    key={`${item.product.name}-${item.product.id}-${client}`}
                    qty={item.qty}
                    img={!item.product.image ? 'image not found' : item.product.image }
                    name={item.product.name}
                    price={item.product.price}/>)}
                </div>
            </div>
            <div className={style.Card__button}>
                {showButton()}
            </div>
        </article>
    )
}

export default OrderCard;