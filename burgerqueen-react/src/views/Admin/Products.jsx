import './Products.css';
import React, {useEffect, useState} from 'react';
import { Box, Table, TableContainer, 
    TableHead, TableCell, TableBody, TableRow, TextField, 
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper, IconButton } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';


const Products = () => {

    const token = localStorage.getItem('accessToken');
    const [ data, setData ]= useState([]);
    const [ modalInsertar, setmodalInsertar ]= useState(false);
    const [ buttonModalEditar, setButtonModalEditar ]= useState(false);
    // const [ datosparaEditar, setDatosparaEditar] = useState(null);

    const [ newData, setNewData] = useState({
        name: '',
        price: '',
        type: '',
        dateEntry: '',
        image: '',
    });
    
    const url='http://localhost:8080/products';

    //FETCH: obtención de datos GET
    const peticionGet = () => fetch(url,{
        method: "GET",
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(json => setData(json))
    .catch(err => console.log(err));

    //FETCH subir datos POST
    const peticionPost = () => fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name:newData.name, 
            price:newData.price, 
            type:newData.type, 
            dateEntry:new Date().toLocaleString(), 
            image:newData.image
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        setData([...data, response]);
        abrirCerrarModalInsertar();
    })
    .catch(error => error)
    
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
    // PATCH ****************************************************************************
    const peticionPatch = (id) => fetch(`http://localhost:8080/products/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
            name:newData.name, 
            price:newData.price, 
            type:newData.type, 
            image:newData.image
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

    // DELETE ****************************************************************************
    const deleteProduct = (e, id) => {
        e.preventDefault();

        return fetch(`http://localhost:8080/products/${id}`, {
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
    
    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar=()=> setmodalInsertar(!modalInsertar);
    
    useEffect(()=>{
        if(modalInsertar === false){
            setButtonModalEditar(false)
            return setNewData(({
                name: '',
                price: '',
                type: '',
                dateEntry: '',
                image: '',
            })) 
        } else{ console.log('open modal')}
    }, [modalInsertar]) 

    const handleChangeModal=e=>{
        const {name, value}=e.target;
        setNewData(prevState=>({
            ...prevState,
            [name]: value
        }))
        console.log(name)
        console.log(value)
    }

    // muestra los datos obtenidos
    useEffect(()=>{
        peticionGet();
    },[])

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
            {console.log(newData)}
            <h2 id="parent-modal-title">Add Product</h2>
            <TextField color="warning" name="name"  label="Product" value={newData.name} onChange={handleChangeModal} /> 
            <TextField color="warning" name="price"  label="Price" value={newData.price} onChange={handleChangeModal} />
           <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Type</InputLabel>
                <Select idlaber='select-label' value={newData.type} color="warning" name='type' label="Type" onChange={handleChangeModal}>
                    <MenuItem value={'Desayuno'}>Desayuno</MenuItem>
                    <MenuItem value={'Almuerzo'}>Almuerzo</MenuItem>
                </Select>
           </FormControl>
            <TextField color="warning" name="image"  label="Image" value={newData.image} onChange={handleChangeModal} />
            <div style={{display: 'flex', gap: '15px', justifyContent:'flex-end'}}>
                <Button variant="contained" color='warning' onClick={(e)=>postOrPatchCall(e, newData.id)}>{buttonModalEditar?'EDIT':'INSERT'}</Button>
                <Button variant="contained" color='warning' onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </Box>
    );
 

    return(
        <div className='Table'>
            <Button color='warning' variant="contained" onClick={abrirCerrarModalInsertar} > Add Product</Button>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead sx={{fontweight: 800, bgcolor: '#dbdbdb'}}>
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
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>{product.dateEntry}</TableCell>
                                <TableCell>
                                    <img className='image-product-Admin' src={product.image} alt="Product" />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="warning" onClick={(e) => editProduct(e, product)}>
                                        <Edit />
                                    </IconButton>
                                    &nbsp;&nbsp;&nbsp;
                                    <IconButton color="warning" onClick={e => deleteProduct(e, product.id)}>
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