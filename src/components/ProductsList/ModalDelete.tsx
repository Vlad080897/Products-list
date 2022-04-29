import { Button, Fade, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteProduct } from '../../app/ProductsList';
import { ProductType } from '../../types/types';

const modal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#FFF',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const ModalDelete =
  (props: { products?: ProductType[], deleteID: number | undefined, openDelete: boolean, setOpenDelete: Dispatch<SetStateAction<boolean>> }) => {
    const { products, openDelete, deleteID, setOpenDelete, } = props
    const productForDelete = products && products.find(el => el.id === deleteID);
    const dispatch = useAppDispatch();

    const handleClose = () => setOpenDelete(false);

    const handleDelete = () => {
      dispatch(deleteProduct(deleteID))
      handleClose()
    }

    return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openDelete}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <Box sx={modal}>
            <Typography id="spring-modal-title" variant="h4" component="h2" color={'#42a5f5'} mb={5}>
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