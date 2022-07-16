import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from '../views/Inicio/Login';
import Products from '../views/Admin/Products'
import Users from '../views/Admin/Users'
import { AppWaiter, AppAdmin, AppChef } from '../App';
import Order from "../views/Waiter/Order/Orders";
import HomeWaiter from "../views/Waiter/Home/Home";
import PageNotFound from "../views/Waiter/PageNotFound";
import '../views/Inicio/Login.css';
import logo from '../views/Images/IconBurger.svg';
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useState } from "react";
import PublicRoutes from "./PublicRoute";

// Petición HTTP
const request = ({ email, password }, url) => new Promise((resolve, reject) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => resolve(response))
    .catch(error => reject(error))
})

// .... vista login
// COMPONENTE PARA FORMULARIO


function PrincipalRoute() {
    const [ admin, setAdmin ] = useState(false);
    const [ waiter, setWaiter ] = useState(false);
    const [ chef, setChef ] = useState(false);
    // console.log(admin)
    
    // ***********
    const LoginT = () => {

        let navigate = useNavigate();
        const { register, setError, formState: { errors }, handleSubmit } = useForm();
      
        const onSubmit = (data, event) => {
          const url = 'http://localhost:8080/login';
          const { email, password } = data;
      
          request({ email, password }, url)
            .then((res) => {
              const { accessToken, user } = res;
              const rol = user?.roles;
            //   console.log(user)
      
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('userId', user.id);
              localStorage.setItem('userRol', JSON.stringify(user.roles));
      
              if (res === 'Cannot find user') {
                setError('email', {
                  type: "server",
                  message: res,
                })
              } else if (res === 'Incorrect password') {
                setError('password', {
                  type: "server",
                  message: res,
                })
              } else if (rol?.waiter === true) {
                // navigate('/Waiter')
                setAdmin(false)
                setWaiter(true)
                setChef(false)
                return navigate('/Waiter')
      
              } else if (rol?.admin === true) {
                setAdmin(true)
                setWaiter(false)
                setChef(false)
                console.log(admin, 'dentro')
                return navigate('/Admin')
              } else if (rol?.chef === true) {
                setAdmin(false)
                setWaiter(false)
                setChef(true)
                return navigate('/Chef')
              } else {
                document.write('Ocurrió un error 404');
              }
      
            })
            .catch((error) => {
              console.log('catch', error.message);
            })
          event.target.reset();
          console.log(localStorage.getItem('userRol'))
        }
        return (
          <main className="App-main">
          <img src={logo} className="App-logo" alt="logo" />
          <section className='sectionLoginForm'>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-3">
              <label className='label-form'>
                Email:
                <div className='div__Icon-Input'>
                  <i className="fa-solid fa-envelope Icon"></i>
                  <input
                    type="email"
                    placeholder="example@example.com"
                    className="input-form-control"
                    name="email"
                    {...register('email', {
                      required: {
                        value: true,
                        message: '⚠️ Email is required'
                      }
                    })}
                  />
                </div>
                <span className='spanLogin'>
                  {errors?.email?.message}
                </span>
              </label>
            </div>
            <div className="col-md-3">
              <label className='label-form'>
                Password:
                <div className='div__Icon-Input'>
                  <i className="fa-solid fa-lock Icon"></i>
                  <input
                    type="password"
                    placeholder="******"
                    className="input-form-control"
                    name="password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: '⚠️ Password is required'
                      },
                      maxLength: {
                        value: 200,
                        message: '⚠️ No more than 30 characteres!'
                      },
                      minLength: {
                        value: 6,
                        message: '⚠️ At least 6 characteres!'
                      }
                    })}
                  />
                </div>
                <span className='spanLogin'>
                  {errors?.password?.message}
                </span>
              </label>
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
          </section>
          </main>
        );
      }

    // **************
const waiterLS = localStorage.getItem('userRol') === '{"waiter":true}'? true: false;
const adminLS = localStorage.getItem('userRol') === '{"admin":true}'? true : false;
const chefLS = localStorage.getItem('userRol') === '{"chef":true}' ? true : false;

    return (
        <BrowserRouter>
            <Routes>

    <Route path='/' element={
        <PublicRoutes waiter={waiterLS && waiter} admin={adminLS && admin} chef={chefLS && chef}>
    <LoginT />
    </PublicRoutes>
    }></Route>

                
                <Route path='*' element={<PageNotFound />}></Route>
{(waiter || waiterLS) && (
                <Route path='/Waiter/' element={<AppWaiter />}>
                    <Route index element={<HomeWaiter />} />
                    <Route path='Orders' element={<Order />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>)}
 
                
{(admin || adminLS) && (<Route path='/Admin' element={<AppAdmin />}>
                    <Route index element={<Products />} />
                    <Route path='Users' element={<Users />} />
                </Route>)}
                
{(chef || chefLS) && (
                <Route path='/Chef' element={<AppChef />}>
                    <Route index element={<Order />} />
                </Route>)}
    
            </Routes>
        </BrowserRouter>
        
    )

}
export default PrincipalRoute;