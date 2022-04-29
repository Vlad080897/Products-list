import { Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

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

const ModalWindow = (props: { addNewProduct: (productInfo: newProductInfo) => void }) => {
  const { addNewProduct } = props
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required('Add name'),
    imageURL: Yup
      .string()
      .matches(/^ *https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]* *)$/g, 'Your url is not correct')
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
    onSubmit: (values: newProductInfo) => {
      addNewProduct(values)
      handleClose()
    },
  });
  return (
    <>
      <Button variant='contained' onClick={handleOpen} sx={{ mt: 2 }}>Add new product</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
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
                fullWidth label='Name'
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
                id="count"
                name="description"
                fullWidth
                label='Description'
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

export default ModalWindow

export type newProductInfo = {
  name: string
  imageURL: string
  count: string
  description: string
}