import * as React from 'react';
import {Delete, Add, Remove} from '@mui/icons-material';
import { Stack, Button, IconButton, Box, TextField, ButtonGroup, Snackbar, MuiAlert, AlertProps } from '@mui/material';
import  style  from './ListOfOrder.module.css'
import {CardButton} from '../Order/Orders-Components/CardButton';


function ListOfOrder({productsProp, addProductSelected, quitProductSelected, deleteProduct, sumTotal, addingOrder, handleChangeInputClient}){
    
// 
// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref,
//   ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });
  
//   export default function CustomizedSnackbars() {
//     const [open, setOpen] = React.useState(false);
  
//     const handleClick = () => {
//       setOpen(true);
//     };
  
//     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//       if (reason === 'clickaway') {
//         return;
//       }
  
//       setOpen(false);
//     };
  
//     return (
//       <Stack spacing={2} sx={{ width: '100%' }}>
//         <Button variant="outlined" onClick={handleClick}>
//           Open success snackbar
//         </Button>
//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//             This is a success message!
//           </Alert>
//         </Snackbar>
//         <Alert severity="error">This is an error message!</Alert>
//         <Alert severity="warning">This is a warning message!</Alert>
//         <Alert severity="info">This is an information message!</Alert>
//         <Alert severity="success">This is a success message!</Alert>
//       </Stack>
//     );
//   }
// 
    

    return(
        <div className={style.ListOfOrder}>
            <p className={style.titleOfList}>LIST OF ORDER</p>
            <div className={style.addClient}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Client" variant="standard" onChange={handleChangeInputClient} />
                </Box>
            </div>
            <div className={style.ProductsSelected}>
                { productsProp.length === 0 ?
                <div className={style.NoProductsSelected}>There aren't selected products</div>:
                productsProp.map((product) => {
                    return <div key={product.id} className={style.CardProductSelected}>
                                <div className={style.firstDiv}>
                                    <img src={product.image} alt={product.name} className={style.imgselectedProduct}/>
                                </div>
                                <div className={style.secondDiv}>   
                                    <p>{product.name}</p>
                                    <div>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                '& > *': {
                                                m: 0,
                                                },
                                            }}
                                            >
                                            <ButtonGroup color="warning" size="small" aria-label="small button group">
                                                <Button key="one" onClick={
                                                (evento)=>addProductSelected(evento, product)
                                                }><Add/></Button>
                                                <Button key="two">{product.qty}</Button>
                                                <Button key="three" onClick={
                                            (evento)=>quitProductSelected(evento, product)
                                            }><Remove/></Button>
                                            </ButtonGroup>
                                        </Box>
                                    </div>
                                </div>
                                <div className={style.thirdDiv}>
                                    <IconButton color="warning" onClick={(e) => deleteProduct(e, product)}>
                                        <Delete />
                                    </IconButton>
                                    <p>$ {product.price * product.qty}</p>
                                </div>
                            </div>
                })}
                
            </div>
            <div className={style.totalPrice}>
                <p>Total:</p>
                <p>$ {sumTotal}</p>
            </div>
            <CardButton
            text="Proced to order"
            clickftn={addingOrder}/>
        </div>
    )
}
export default ListOfOrder;