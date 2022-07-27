import './Navbar.css'

const Navbar = ({ref0, name0, icon0, ref1, name1, icon1, navigate}) => {
    
    // cerrar sesión
    function logout(){
        localStorage.clear();
        return navigate('/');
    }

    return (
        <nav className="configuration">
            <div>
                <i className= {icon0} ></i>
                <a href={ref0} className='btn btn-dark'>{name0}</a>
            </div>
            <div>
                <i className= {icon1}></i>
                <a href={ref1} className='btn btn-dark'>{name1}</a>
            </div>
            <div>
                <i onClick={logout} className="fa-solid fa-power-off"></i>
            </div>
        </nav>
    )
};

export default Navbar;