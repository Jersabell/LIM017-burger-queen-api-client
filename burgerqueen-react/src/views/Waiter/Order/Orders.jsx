import style from './Orders.module.css'
import VerticalBar from "./Orders-Components/VerticalBar";
import OrderCard from "./Orders-Components/OrderCard";
// import CardProduct from './Orders-Components/CardProduct';
import { useState, useEffect } from 'react';

const Order = () => {

    const [orders, setOrders] = useState();
    const [ filterOrders, setFilterOrders ] = useState(null);
    const token = localStorage.getItem('accessToken');

    // Conseguir ordenes
    const getOrders = () => fetch('https://mk--server.herokuapp.com/orders', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
            })
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            setFilterOrders(json)
            return setOrders(json)})
        .catch(err => console.log(err));

    useEffect(()=>{
        getOrders();
        
    }, [])

    // petición path
    const peticionPatch = (id, textStatus) => fetch(`https://mk--server.herokuapp.com/orders/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
            status: textStatus, 
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        getOrders();
    })
    .catch(error => error)

    // Editando status de la orden
    const changeToDelivered = (e, id) =>{
        e.preventDefault();
        return peticionPatch(id, 'delivered')
    }
    const changeToDelivering = (e, id) =>{
        e.preventDefault();
        return peticionPatch(id, 'delivering')
    }
    
    // filtrar por status
    const filterAllOrders = () =>{
        setFilterOrders(orders)
    }
    const filterPending = () =>{
        const array = orders.filter((order) => order.status === 'pending');
        return setFilterOrders(array)
    }
    const filterDelivering = () =>{
        const array = orders.filter((order) => order.status === 'delivering');
        return setFilterOrders(array)
    }
    const filterDelivered = () =>{
        const array = orders.filter((order) => order.status === 'delivered');
        return setFilterOrders(array)
    }

    return(
        <div className={style.Container}>
            <VerticalBar
            filterAllOrders={filterAllOrders}
            filterPending={filterPending}
            filterDelivering={filterDelivering}
             filterDelivered={filterDelivered}
             />
            <section className={style.SectionCards}>
                <div className={style.Cards}>
                    {!filterOrders ? <div>Loading</div> : 
                    filterOrders.map(order =>{
                        return <OrderCard
                        key={`order-${order.id}`}
                        id={order.id}
                        client={order.client}
                        dataEntry={order.dataEntry}
                        userId={order.userId}
                        status={order.status}
                        products={order.products}
                        changeToDelivered={changeToDelivered}
                        changeToDelivering={changeToDelivering}
                        />
                    })}
                </div>
            </section>
            
        </div>
    )
}

export default Order