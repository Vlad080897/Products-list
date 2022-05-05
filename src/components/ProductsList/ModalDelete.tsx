import { Button, Fade, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteProduct } from '../../app/ProductsList';
import { modal } from '../../styles/styles';
import { ProductType } from '../../types/types';

const ModalDelete =
  (props: { products?: ProductType[], deleteID: number | undefined, openDelete: boolean, setOpenDelete: Dispatch<SetStateAction<boolean>> }) => {
    const { products, openDelete, deleteID, setOpenDelete, } = props
    const productForDelete = products && products.find(el => el.id === deleteID); // defined the opened product
    const dispatch = useAppDispatch();

    const handleClose = () => setOpenDelete(false);  // close modal window

    const handleDelete = () => {
      dispatch(deleteProduct(deleteID))
      handleClose()
    }

    return (
      <Modal
        open={openDelete}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <Box sx={modal}>
            <Typography variant="h4" component="h2" color={'#42a5f5'} mb={5}>
              Delete the product?
            </Typography>
            {productForDelete && (
              <Box mb={2} mt={2} display={'flex'} key={productForDelete.id}>
                <img src={productForDelete.imageUrl} alt="productPhoto" style={{ width: '200px' }} />
                <Box ml={1}>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{productForDelete.name}</Typography>
                  <Typography variant='h6' sx={{ fontWeight: '400' }}>{productForDelete.description}</Typography>
                  <Typography variant='h6' sx={{ fontWeight: '400' }}>count: {productForDelete.count}</Typography>
                </Box>
              </Box>
            )}
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleDelete}>Delet</Button>
            <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
          </Box>
        </Fade>
      </Modal >
    )
  }

export default ModalDelete