import './Products.css';
import React, {useEffect, useState} from 'react';
import { Box, Table, TableContainer, 
    TableHead, TableCell, TableBody, TableRow, TextField, 
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper, IconButton } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';

const Users = () => {
    const url='http://localhost:8080/users';
    const token = localStorage.getItem('accessToken');
    const [ users, setUsers ]= useState([]);
    const [ modalInsertar, setmodalInsertar ]= useState(false);
    const [buttonModalEditar, setButtonModalEditar] = useState(false);
    const [ newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        roles: '',
    });


    //FETCH: obtención de datos GET
    const peticionGet = () => fetch(url,{
        method: "GET",
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(json => console.log(setUsers(json)))
    .catch(err => console.log(err));

    //FETCH subir datos POST
    const objtRol = { [newUser.roles] : true }
    const peticionPost = () => fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name:newUser.name, 
            email:newUser.email, 
            password:newUser.password, 
            roles: objtRol
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        setUsers([...users, response.user]);
        abrirCerrarModalInsertar();
    })
    .catch(error => error)

     // PATCH ****************************************************************************
     const peticionPatch = (id) => fetch(`http://localhost:8080/users/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
            name:newUser.name, 
            email:newUser.email, 
            roles:objtRol, 
            password:newUser.password
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        // setData([...data, response]);
        peticionGet();
        abrirCerrarModalInsertar();
    })
    .catch(error => error)
    
    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar=()=>{
        setmodalInsertar(!modalInsertar);
    }    
    useEffect(()=>{
        if(modalInsertar === false){
            setButtonModalEditar(false)
            return setNewUser(({
                name: '',
                email: '',
                password: '',
                roles: '',
            })) 
        } else{ console.log('open modal')}
    }, [modalInsertar]) 
    
    // datos que ingresan al INPUT del MODAL
    
    const handleChangeModal=e=>{
        const {name, value}=e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const handleChangeModalSelect=e=>{
        const {name, value}=e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }
    // muestra los datos obtenidos
    useEffect(()=>{
        peticionGet();
    },[])

    // botn ELIMINAR
    const deleteUser = (e, id) => {
        e.preventDefault();

        return fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
        })
        .then(res => {
            return res.json()})
        .then(json => {
            return peticionGet()})
        .catch(error=>error)

    }

    // boton EDITAR (lapicito)
    const editUser = (e, user) => {
        e.preventDefault();
        console.log(user.name);
        setNewUser(user);
        setButtonModalEditar(true); // para convertir el texto del btn del modal a EDITR
        abrirCerrarModalInsertar(!modalInsertar)

    }
    function postOrPatchCall(e, id){
        e.preventDefault();
        return buttonModalEditar? peticionPatch(id):peticionPost();
    }

    // Insertar el cuerpo del MODAL
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        justifyContent: 'center',
        
      };

    const bodyInsertarModal=(
        <Box sx={style}>
            <h2 id="parent-modal-title">ADD A USER</h2>
            <TextField color="warning" name="name"  label="Name" value={newUser.name} onChange={handleChangeModal}/>
            <TextField color="warning" name="email"  label="Email" value={newUser.email} onChange={handleChangeModal}/>
            <TextField color="warning" name="password"  label="Password" type="password"
 autoComplete="current-password"
  onChange={handleChangeModal}/>
           <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Rol</InputLabel>
                <Select labelId="select-label" value={newUser.roles} color="warning" name='roles' label="rol" onChange={handleChangeModalSelect}>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'waiter'}>Waiter</MenuItem>
                    <MenuItem value={'chef'}>Chef</MenuItem>
                </Select>
           </FormControl>
            
            <div style={{display: 'flex', gap: '15px', justifyContent:'flex-end'}}>
                <Button variant="contained" color='warning' onClick={(e)=>postOrPatchCall(e, newUser.id)}>{buttonModalEditar?'EDIT':'INSERT'}</Button>
                <Button variant="contained" color='warning' onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </Box>
    )

    return(
        <div className='Table'>
            <Button color='warning' variant="contained" onClick={abrirCerrarModalInsertar} > ADD A USER </Button>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead sx={{fontweight: 800, bgcolor: '#dbdbdb'}}>
                        <TableRow >
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Tools</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{Object.keys(user.roles).toString()}</TableCell>
                                <TableCell>
                                    <IconButton color="warning" onClick={(e) => editUser(e, user)}>
                                        <Edit />
                                    </IconButton>
                                    &nbsp;&nbsp;&nbsp;
                                    <IconButton color="warning" onClick={e => deleteUser(e, user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                    {bodyInsertarModal}   
                </Modal>
            </div>

        </div>       
    );
}

export default Users;



