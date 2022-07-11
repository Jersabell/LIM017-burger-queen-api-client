import './Products.css';
import React, {useEffect, useState} from 'react';
import { Box, Table, TableContainer, 
    TableHead, TableCell, TableBody, TableRow, TextField, 
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

const url='http://localhost:8080/users';

const Users = () => {

    const token = localStorage.getItem('accessToken');
    const [ users, setUsers ]= useState([]);
    const [ modalInsertar, setmodalInsertar ]= useState(false);
    const [ newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        roles: {},
    });

    // datos que ingresan al INPUT del MODAL
    // const time = new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    
    const handleChangeModal=e=>{
        const {name, value}=e.target;
        setNewUser(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

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
    const peticionPost = () => fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name:newUser.name, 
            email:newUser.email, 
            password:newUser.password, 
            roles:newUser.roles
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        setUsers([...users, response]);
        abrirCerrarModalInsertar();
    })
    .catch(error => error)

    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar=()=>{
        setmodalInsertar(!modalInsertar);
    }    

    // muestra los datos obtenidos
    useEffect(()=>{
        peticionGet();
    },[])

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
            <TextField color="warning" name="name"  label="Name" onChange={handleChangeModal}/>
            <TextField color="warning" name="email"  label="Email" onChange={handleChangeModal}/>
            <TextField color="warning" name="password"  label="Password" onChange={handleChangeModal}/>
           <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Rol</InputLabel>
                <Select color="warning" name='roles' label="rol" onChange={handleChangeModal}>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'Waiter'}>Waiter</MenuItem>
                    <MenuItem value={'Chef'}>Chef</MenuItem>
                </Select>
           </FormControl>
            
            <div style={{display: 'flex', gap: '15px', justifyContent:'flex-end'}}>
                <Button variant="contained" color='warning' onClick={peticionPost}>INSERT</Button>
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
                            <TableCell >Id</TableCell>
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
                                <TableCell>{user.roles.admin ? 'Admin':'Waiter'}</TableCell>
                                <TableCell>
                                    <Edit />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete />
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


