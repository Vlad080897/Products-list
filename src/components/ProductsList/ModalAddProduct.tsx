import { Button, Fade, Modal, TextField, Typography, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { modal } from '../../styles/styles';

const ModalAddProduct = (props: { addNewProduct: (productInfo: newProductInfo) => void, sortProducts: (sortBy: string) => void }) => {
  const { addNewProduct, sortProducts } = props;
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [sortButtonValue, setSortButtonValue] = useState<null | string>('Alphabet');
  const menuOpen = Boolean(menuAnchor);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(null);
    setSortButtonValue(event.currentTarget.innerText);
    sortProducts(event.currentTarget.innerText);
  };

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required('Add name'),
    imageURL: Yup
      .string()
      .matches(/^ *https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]* *)$/g, 'Your url is not correct')
      .required('Add url'),
    count: Yup
      .string()
      .matches(/^\d+$/, 'Only numbers')
      .required('Add count'),
    description: Yup
      .string()
      .required('Add description')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      imageURL: '',
      count: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values: newProductInfo, { resetForm }) => {
      addNewProduct(values);
      handleClose();
      resetForm();
    },
  });
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Button variant='contained' onClick={handleOpen} sx={{ mt: 2 }}>Add new product</Button>
        <Box>
          <Typography component={'span'}>Sorted by:</Typography>
          <Button
            id='fade-button'
            aria-controls={menuOpen ? 'open-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleOpenMenu}
          >
            {sortButtonValue}
          </Button>
          <Menu
            id='open-menu'
            open={menuOpen}
            anchorEl={menuAnchor}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Alphabet</MenuItem>
            <MenuItem onClick={handleMenuClose}>Count</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modal}>
            <Typography id="spring-modal-title" variant="h4" component="h2" color={'#42a5f5'} mb={5}>
              Add new product
            </Typography>
            <form onSubmit={formik.handleSubmit} >
              <TextField
                id="name"
                name="name"
                label='Name'
                fullWidth
                variant='standard'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 3 }}
              />
              <TextField
                id="imageURL"
                name="imageURL"
                fullWidth
                label='Image URL'
                variant='standard'
                value={formik.values.imageURL}
                onChange={formik.handleChange}
                error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
                helperText={formik.touched.imageURL && formik.errors.imageURL}
                sx={{ mb: 3 }}
              />
              <TextField
                id="count"
                name="count"
                fullWidth
                label='Count'
                variant='standard'
                value={formik.values.count}
                onChange={formik.handleChange}
                error={formik.touched.count && Boolean(formik.errors.count)}
                helperText={formik.touched.count && formik.errors.count}
                sx={{ mb: 3 }}
              />
              <TextField
                id="description"
                name="description"
                label='Description'
                fullWidth
                variant='standard'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                sx={{ mb: 3 }}
              />
              <Button variant='contained' sx={{ mr: 2 }} type={'submit'}>Add new product</Button>
              <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ModalAddProduct

export type newProductInfo = {
  name: string
  imageURL: string
  count: string
  description: string
}