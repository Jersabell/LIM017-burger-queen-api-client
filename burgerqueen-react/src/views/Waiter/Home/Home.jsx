import './Home.css';
import CupOfCofee from '../../Images/Cup-of-cofee.svg';
import burger from '../../Images/burger-lunch.svg';
import allproducts from '../../Images/allproducts.png'
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
    const [ client, setClient ] =  useState('');
    const token = localStorage.getItem('accessToken');

    // Función que adquiere el nombre del cliente para hacer orden
    function handleChangeInputClient(e){
        setClient(e.target.value);
        console.log(client)
    }

    // Añdir una nueva orden:
    const addingOrder = () => {
        const userId = localStorage.getItem('userId');
        // const time =  new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        const time = new Date().toLocaleString();
        const convertingToObject = productsSelected.map(obj => {
                const newObjt= {
                    qty: obj.qty,
                    product: {
                        id: obj.id,
                        name:obj.name, 
                        price:obj.price, 
                        type:obj.type, 
                        dateEntry:obj.dataEntry, 
                        image:obj.image
                    }
                }
                return newObjt
            });
        // pasandole los valores al estado 
        setOrderData(orderData.userId = userId, orderData.products = convertingToObject, orderData.dataEntry = time, orderData.client = client)
        
        //FETCH subir datos de orden POST
        const url='http://localhost:8080/orders';
        const peticionPost = () => fetch(url,{
            method: 'POST',
            body: JSON.stringify(orderData),
            headers:{
                'Content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
        return peticionPost();
    }

    // Añadiendo productos al carrito de orden
    const addProductsSelected = (event, product) => {
        event.preventDefault();
        if(!productsSelected.find((item) => item.id === product.id)){
            product.qty = 1;
            setProductsSelected([...productsSelected, product])
        } else{
            const updateQty = productsSelected.map((p) => {
            return p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            })
            setProductsSelected(updateQty)
        }
    }
    // Dismunyendo productos del carrito de orden
    const reduceProductSelected = (event, product) => {
        event.preventDefault();
            const updateQty = productsSelected.map((p) => {
            return p.id === product.id ? { ...p, qty: p.qty - 1 } : p
            })
            setProductsSelected(updateQty)
    }

    // Eliminando producto seleccionado del carrito de orden
    const deleteProductSelected = (event, product) => {
        event.preventDefault();
        const newArrayofProductsSelected = productsSelected.filter((item) => item.id !== product.id);
        setProductsSelected(newArrayofProductsSelected)
    }

    // Actualizando precio total de productos seleccionados
    useEffect(()=>{
        const arrayOfPrices = productsSelected.map((item)=> item.price*item.qty)
        const sumTotal = arrayOfPrices.reduce((a, b)=> a + b, 0)
        setPriceTotal(sumTotal)
        console.log(productsSelected)
        }, [productsSelected])

    // Consiguiendo listado de productos con FETCH: GET
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

    
    return(
        <div className='Home'>
            <section className="section__chooseMenu">
                <div className='div__buttons'>
                    <div>
                        <button>
                            <p>All products</p>  
                            <img src={allproducts} className='img-menu-all' alt='Cup of cofee'/>
                        </button>
                    </div>
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
                    handleChangeInputClient={handleChangeInputClient}
                    />

            </section>
        </div>
    )
}

export default Home