import './Products.css';
import React, {useEffect, useState} from 'react';
import { Box, Table, TableContainer, 
    TableHead, TableCell, TableBody, TableRow, TextField, 
    Button, Modal, InputLabel, MenuItem, FormControl, Select, Paper } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

const url='http://localhost:8080/products';

const Products = () => {

    const token = localStorage.getItem('accessToken');
    const [ data, setData ]= useState([]);
    const [ modalInsertar, setmodalInsertar ]= useState(false);
    const [ newData, setNewData] = useState({
        product: '',
        price: '',
        type: '',
        dateEntry: '',
        image: '',
    });

    // datos que ingresan al INPUT del MODAL
    // const time = new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    
    const handleChangeModal=e=>{
        const {name, value}=e.target;
        setNewData(prevState=>({
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
    .then(json => console.log(setData(json)))
    .catch(err => console.log(err));

    //FETCH subir datos POST
    const peticionPost = () => fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name:newData.product, 
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
            <h2 id="parent-modal-title">Add Product</h2>
            <TextField color="warning" name="product"  label="Product" onChange={handleChangeModal}/>
            <TextField color="warning" name="price"  label="Price" onChange={handleChangeModal}/>
           <FormControl fullWidth>
                <InputLabel color="warning" id='select-label'>Type</InputLabel>
                <Select color="warning" name='type' label="Type" onChange={handleChangeModal}>
                    <MenuItem value={'Des'}>Desayuno</MenuItem>
                    <MenuItem value={'Alm'}>Almuerzo</MenuItem>
                </Select>
           </FormControl>
            <TextField color="warning" name="image"  label="Image" onChange={handleChangeModal}/>
            <div style={{display: 'flex', gap: '15px', justifyContent:'flex-end'}}>
                <Button variant="contained" color='warning' onClick={peticionPost}>INSERT</Button>
                <Button variant="contained" color='warning' onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </Box>
    )

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

export default Products;



