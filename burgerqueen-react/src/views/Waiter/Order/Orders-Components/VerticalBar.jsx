import style from './VerticalBar.module.css'
function VerticalBar({filterAllOrders, filterPending, filterDelivering, filterDelivered}){
    return(
        <ul className={style.VerticalBar}>
            <li className={style.VerticalBar__li} onClick={filterAllOrders}>All Orders</li>
            <li className={style.VerticalBar__li} onClick={filterPending}>Pending</li>
            <li className={style.VerticalBar__li} onClick={filterDelivering}>Delivering</li>
            <li className={style.VerticalBar__li} onClick={filterDelivered}>Delivered</li>
        </ul>
    )
};

export default VerticalBar;