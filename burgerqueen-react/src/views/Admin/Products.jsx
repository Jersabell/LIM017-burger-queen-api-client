import './Products.css';
import React, { useEffect, useState } from 'react';
import {
    Box, Table, TableContainer,
    TableHead, TableCell, TableBody, TableRow, TextField,
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { peticionGet, peticionPost, peticionPatch, peticionDelete } from '../../utils/fetchAdminProducts';

const Products = () => {

    const token = localStorage.getItem('accessToken');
    const [data, setData] = useState([]);
    const [modalInsertar, setmodalInsertar] = useState(false);
    const [buttonModalEditar, setButtonModalEditar] = useState(false);
    const [newData, setNewData] = useState({
        name: '',
        price: '',
        type: '',
        dateEntry: '',
        image: '',
    });
    const url = 'https://mk--server.herokuapp.com/products';

    // muestra los datos-productos obtenidos con fetch
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        peticionGet(url, token).then(res => setData(res)).catch(e => console.log(e));
    }, [])

    // funcion del boton que EDITA EL PRODUCTO (lapicito)
    const editProduct = (e, product) => {
        e.preventDefault();
        console.log(product.name)
        setNewData(product)
        setButtonModalEditar(true);
        abrirCerrarModalInsertar(!modalInsertar);
        console.log(modalInsertar);
        console.log(newData);
    }

    // eliminar producto
    const deleteProduct = (e, id) => {
        e.preventDefault();
        return peticionDelete(id, token)
            .then(response => peticionGet(url, token))
            .then(res => setData(res))
            .catch(e => console.log(e))
    }

    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar = () => setmodalInsertar(!modalInsertar);
    useEffect(() => {
        if (modalInsertar === false) {
            setButtonModalEditar(false)
            return setNewData(({
                name: '',
                price: '',
                type: '',
                dateEntry: '',
                image: '',
            }))
        } else { console.log('open modal') }
    }, [modalInsertar])

    // función para seleccionar values de los input del modal
    const handleChangeModal = e => {
        const { name, value } = e.target;
        setNewData(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(name)
        console.log(value)
    }

    // funcion para boton de añadir o editar producto
    function postOrPatchCall(e, id) {
        e.preventDefault();
        return buttonModalEditar ?
            peticionPatch(id, token, newData)
                .then(response => {
                    peticionGet(url, token).then(res => setData(res)).catch(e => console.log(e));;
                    abrirCerrarModalInsertar();
                }) :
            peticionPost(url, token, newData)
                .then(res => {
                    setData([...data, res]);
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
        <Box sx={style} data-testid={"box-modal"}>
            {console.log(newData)}
            <h2 id="parent-modal-title">Add Product</h2>
            <TextField color="warning" name="name" label="Product" value={newData.name} onChange={handleChangeModal} />
            <TextField color="warning" name="price" label="Price" value={newData.price} onChange={handleChangeModal} />
            <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Type</InputLabel>
                <Select idlaber='select-label' value={newData.type} color="warning" name='type' label="Type" onChange={handleChangeModal}>
                    <MenuItem value={'Desayuno'}>Desayuno</MenuItem>
                    <MenuItem value={'Almuerzo'}>Almuerzo</MenuItem>
                </Select>
            </FormControl>
            <TextField color="warning" name="image" label="Image" value={newData.image} onChange={handleChangeModal} />
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <Button variant="contained" color='warning' onClick={(e) => postOrPatchCall(e, newData.id)}>{buttonModalEditar ? 'EDIT' : 'INSERT'}</Button>
                <Button variant="contained" color='warning' onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </Box>
    );

    return (
        <div className='Table'>
            <Button color='warning' variant="contained" onClick={abrirCerrarModalInsertar} data-testid={"button-add"} > Add Product</Button>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead sx={{ fontweight: 800, bgcolor: '#dbdbdb' }}>
                        <TableRow >
                            <TableCell >Id</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>DateEntry</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Tools</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(product => (
                            <TableRow key={product.id} data-testid={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>{product.dateEntry}</TableCell>
                                <TableCell>
                                    <img className='image-product-Admin' src={product.image} alt="Product" />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="warning" onClick={(e) => editProduct(e, product)} data-testid={"button-edit"}>
                                        <Edit />
                                    </IconButton>
                                    &nbsp;&nbsp;&nbsp;
                                    <IconButton color="warning" onClick={e => deleteProduct(e, product.id)} data-testid={`button-${product.id}`}>
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

export default Products;