import './Products.css';
import React, { useEffect, useState } from 'react';
import {
    Box, Table, TableContainer,
    TableHead, TableCell, TableBody, TableRow, TextField,
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { peticionGet, peticionPost, peticionPatch, peticionDelete } from '../../utils/fetchAdminUsers';

const Users = () => {
    const url = 'https://mk--server.herokuapp.com/users';
    const token = localStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const [modalInsertar, setmodalInsertar] = useState(false);
    const [buttonModalEditar, setButtonModalEditar] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        roles: '',
    });

    // muestra los datos obtenidos
      useEffect(() => {
        peticionGet(url, token).then(res => setUsers(res)).catch(e => console.log(e));
    }, [])

    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar = () => {
        setmodalInsertar(!modalInsertar);
    }
    useEffect(() => {
        if (modalInsertar === false) {
            setButtonModalEditar(false)
            return setNewUser(({
                name: '',
                email: '',
                password: '',
                roles: '',
            }))
        } else { console.log('open modal') }
    }, [modalInsertar])

    // datos que ingresan al INPUT del MODAL
    const handleChangeModal = e => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }
    const handleChangeModalSelect = e => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    // boton ELIMINAR
    const deleteUser = (e, id) => {
        e.preventDefault();
        return peticionDelete(id, token)
            .then(json => peticionGet(url, token))
            .then(res => setUsers(res))
            .catch(e => console.log(e))
    }

    // boton EDITAR (lapicito)
    const editUser = (e, user) => {
        e.preventDefault();
        console.log(user.name);
        setNewUser(user);
        setButtonModalEditar(true); // para convertir el texto del btn del modal a EDITR
        abrirCerrarModalInsertar(!modalInsertar)

    }

    function postOrPatchCall(e, id) {
        e.preventDefault();
        return buttonModalEditar ?
            peticionPatch(id, token, newUser)
                .then(response => {
                    peticionGet(url, token).then(res => setUsers(res)).catch(e => console.log(e));
                    abrirCerrarModalInsertar();
                })
                .catch(e => console.log(e)) :
            peticionPost(url, token, newUser)
                .then(response => {
                    setUsers([...users, response.user]);
                    abrirCerrarModalInsertar();
                })
                .catch(e => console.log(e));
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

    const bodyInsertarModal = (
        <Box sx={style}>
            <h2 id="parent-modal-title">ADD A USER</h2>
            <TextField color="warning" name="name" label="Name" value={newUser.name} onChange={handleChangeModal} />
            <TextField color="warning" name="email" label="Email" value={newUser.email} onChange={handleChangeModal} />
            <TextField color="warning" name="password" label="Password" type="password"
                autoComplete="current-password"
                onChange={handleChangeModal} />
            <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Rol</InputLabel>
                <Select labelId="select-label" value={newUser.roles} color="warning" name='roles' label="rol" onChange={handleChangeModalSelect}>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'waiter'}>Waiter</MenuItem>
                    <MenuItem value={'chef'}>Chef</MenuItem>
                </Select>
            </FormControl>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="contained" color='warning' onClick={(e) => postOrPatchCall(e, newUser.id)}>{buttonModalEditar ? 'EDIT' : 'INSERT'}</Button>
                <Button variant="contained" color='warning' onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </Box>
    )

    return (
        <div className='Table'>
            <Button color='warning' variant="contained" onClick={abrirCerrarModalInsertar} > ADD A USER </Button>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead sx={{ fontweight: 800, bgcolor: '#dbdbdb' }}>
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