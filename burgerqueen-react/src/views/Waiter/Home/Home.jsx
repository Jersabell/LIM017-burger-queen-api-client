import './Home.css';
import CupOfCofee from '../../Images/Cup-of-cofee.svg';
import burger from '../../Images/burger-lunch.svg';
// import burgerToSelect from '../../Images/burgertoselect.svg'
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ListOfOrder from './ListOfOrder';

const Home = () => {
    const [ products, setProducts ] = useState();
    const [ productsSelected, setProductsSelected] = useState([]);
    const [ priceTotal, setPriceTotal ] = useState(0);
    const [ orderData, setOrderData ] = useState({
        userId : '',
        client: '',
        products: [],
        status: 'pending',
        dataEntry: '',
    });
    // const [ productAndQty, setproductAndQty ] = useState([]);
    const token = localStorage.getItem('accessToken');
    const addingOrder = () => {
        const userId = localStorage.getItem('userId');
        const time =  new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        setOrderData(orderData.userId = userId, orderData.products = productsSelected, orderData.dataEntry = time)
        
        //FETCH subir datos POST
        // const url='http://localhost:8080/orders';
        // const peticionPost = () => fetch(url,{
        //     method: 'POST',
        //     body: JSON.stringify(orderData),
        //     headers:{
        //         'Content-type': 'application/json',
        //         'authorization': `Bearer ${token}`
        //     }
        // })
        // .then(res => res.json())
        // .then(response => {
        //     console.log(response)
        //     return response
        // })
        // .catch(error => error)
        // return peticionPost();
    }

    const addProductsSelected = (event, product) => {
        event.preventDefault();
        if(!productsSelected.find((item) => item.id === product.id)){
            // setproductAndQty(...productAndQty, product)
            // console.log(productAndQty)
            product.qty = 1;
            setProductsSelected([...productsSelected, product])
        } else{
            const updateQty = productsSelected.map((p) => {
            return p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            })
            setProductsSelected(updateQty)
        }
        // if(!productsSelected.find((item) => item.product.id === product.id)){
        //     // let qty = 1;
        //     setProductsSelected([...productsSelected, { qty:1 , product}])
        //     console.log(productsSelected)
        // } else{
        //     const updateQty = productsSelected.map((p) => {
        //     return p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        //     })
        //     setProductsSelected(updateQty)
        // }
    }

    const reduceProductSelected = (event, product) => {
        event.preventDefault();
            const updateQty = productsSelected.map((p) => {
            return p.id === product.id ? { ...p, qty: p.qty - 1 } : p
            })
            setProductsSelected(updateQty)
    }
    // eliminar producto seleccionado
    const deleteProductSelected = (event, product) => {
        event.preventDefault();
        const newArrayofProductsSelected = productsSelected.filter((item) => item.id !== product.id);
        setProductsSelected(newArrayofProductsSelected)
    }


    
    const getProducts = () => {
        
        return fetch('http://localhost:8080/products', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
            })
        .then(response => response.json()) 
        .then(json => setProducts(json))
        .catch(err => console.log(err));
    }

    useEffect(()=>{
        getProducts();
        
    }, [])

    useEffect(()=>{
    const arrayOfPrices = productsSelected.map((item)=> item.price*item.qty)
    const sumTotal = arrayOfPrices.reduce((a, b)=> a + b, 0)
    setPriceTotal(sumTotal)
    console.log(productsSelected)
    }, [productsSelected])


    return(
        <div className='Home'>
            <section className="section__chooseMenu">
                <div className='div__buttons'>
                    <div>
                        <button>
                            <p>Breakfasts</p>  
                            <img src={CupOfCofee} className='img-menu' alt='Cup of cofee'/>
                        </button>
                    </div>
                    <div >
                        <button>
                            <p>Lunches</p> 
                            <img src={burger} className='img-menu' alt='burger-lunch'/>
                        </button>
                        
                    </div>
                </div>
                           
                <div className="products">
                    {/* <div className="choose-by-type">
                        <div>
                            <img src={burgerToSelect} alt='burger'></img>
                            Burgers
                            <i className="fa-solid fa-circle-play iconHomeView"></i>
                        </div>
                        <div>
                        <img src={burgerToSelect} alt='burger'></img>
                            Extra
                            <i className="fa-solid fa-circle-play iconHomeView"></i>
                        </div>
                        <div>
                        <img src={burgerToSelect} alt='burger'></img>
                            Drinks
                            <i className="fa-solid fa-circle-play iconHomeView"></i>
                        </div>
                    </div>  */}
                    <div className="list-of-Products">
                        <div>
                        {!products ? 'Cargando...' : 
                        products.map((product) => {
                            return  <ProductCard 
                                key={product.id}
                                product={product}
                                addProductsSelected={addProductsSelected}                                
                                /> 
                                })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="section__makeOrder">
                    <ListOfOrder
                    productsProp={productsSelected}
                    addProductSelected={addProductsSelected}
                    quitProductSelected={reduceProductSelected}
                    deleteProduct={deleteProductSelected}
                    sumTotal={priceTotal}
                    addingOrder={addingOrder}
                    />

            </section>
        </div>
    )
}

export default Home