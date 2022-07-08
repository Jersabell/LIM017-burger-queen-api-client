import './Home.css';
import CupOfCofee from '../../Images/Cup-of-cofee.svg';
import burger from '../../Images/burger-lunch.svg';
import burgerToSelect from '../../Images/burgertoselect.svg'
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ListOfOrder from './ListOfOrder';

const Home = () => {
    const [ products, setProducts ] = useState();
    const [ productsSelected, setProductsSelected] = useState([]);

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
        const token = localStorage.getItem('accessToken');
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
                    <div className="choose-by-type">
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
                    </div> 
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
                    />

            </section>
        </div>
    )
}

export default Home