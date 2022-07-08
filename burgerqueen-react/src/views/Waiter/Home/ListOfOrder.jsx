import {Delete} from '@mui/icons-material';
import  style  from './ListOfOrder.module.css'


function ListOfOrder({productsProp, addProductSelected, quitProductSelected, deleteProduct}){

    return(
        <div className={style.ListOfOrder}>
            <h2>List of order</h2>
            <label >
                    Client:
                      <input
                        type='text'
                        placeholder='name'>
                      </input> 
            </label>
            <div className={style.ProductsSelected}>
                {productsProp.map((product) => {
                    return <div key={product.id} className={style.CardProductSelected}>
                                <img src={product.image} alt={product.name} className={style.imselectedProduct}/>
                                <div>   <h4>{product.name}</h4>
                                    <div>
                                        <button onClick={
                                            (evento)=>addProductSelected(evento, product)
                                            }>
                                            +
                                        </button>
                                        <p>{product.qty}</p>
                                        <button onClick={
                                            (evento)=>quitProductSelected(evento, product)
                                            }>
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div>
                                <Delete onClick={(e) => deleteProduct(e, product)}/>
                                <p>{product.price * product.qty}</p>
                                </div>
                            </div>
                })}
                
            </div>
        </div>
    )
}
export default ListOfOrder;