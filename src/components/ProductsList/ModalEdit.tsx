import { Button, Divider, Fade, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { updateProduct } from '../../app/ProductsList'
import { modal } from '../../styles/styles'
import { ProductType } from '../../types/types'
import * as Yup from 'yup';

const ModalEdit: React.FC<ModalEditProps> = ({ open, close, openId, products }) => {
  const [editModeName, setEditModeName] = useState(false);
  const [editModeDescription, setEditModeDescription] = useState(false);
  const [editModeCount, setEditModeCountName] = useState(false);
  const [editModeUrl, setEditModeUrl] = useState(false);
  const openedProduct = products?.find(el => el.id === openId) // define opened product
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    newImageUrl: Yup
      .string()
      .matches(/^ *https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]* *)$/g, 'Your url is not correct')
  })

  //form for change inputs
  const formik = useFormik({
    initialValues: {
      newName: '',
      newDescription: '',
      newCount: 0,
      newImageUrl: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values: valuesType, { resetForm }) => {
      if (openedProduct) {
        const name = values.newName ? values.newName : openedProduct.name;
        const description = values.newDescription ? values.newDescription : openedProduct.description;
        const count = values.newCount ? Number(values.newCount) : Number(openedProduct.count);
        const imageUrl = values.newImageUrl ? values.newImageUrl : openedProduct.imageUrl;
        dispatch(updateProduct(openedProduct.id, imageUrl, name, description, count))
      };
      setEditModeName(false);
      setEditModeDescription(false);
      setEditModeCountName(false);
      setEditModeUrl(false);
      resetForm()
    }
  });

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => close(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modal}>
            <Box mb={2}>
              {editModeName ?
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      id="newName"
                      name="newName"
                      fullWidth
                      label={`New name`}
                      variant='standard'
                      value={formik.values.newName}
                      onChange={formik.handleChange}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => setEditModeName(false)}
                    >
                      Cancel
                    </Button>
                  </form>
                </>
                :
                <>
                  <Typography variant='h5'>Name:</Typography>
                  <Typography variant='h4' >{openedProduct?.name}</Typography>
                  <Button variant='contained' onClick={() => setEditModeName(true)} sx={{ mb: 1 }} >Change</Button>
                  <Divider />
                </>
              }

            </Box>
            <Box mb={2}>
              {editModeDescription ?
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      id="newDescription"
                      name="newDescription"
                      fullWidth
                      label={`New description`}
                      variant='standard'
                      value={formik.values.newDescription}
                      onChange={formik.handleChange}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => setEditModeDescription(false)}
                    >
                      Cancel
                    </Button>
                  </form>
                </>
                :
                <>
                  <Typography variant='h5'>Description:</Typography>
                  <Typography variant='h4' >{openedProduct?.description}</Typography>
                  <Button variant='contained' onClick={() => setEditModeDescription(true)} sx={{ mb: 1 }}>Change</Button>
                  <Divider />
                </>
              }

            </Box>
            <Box mb={2}>
              {editModeCount ?
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      id="newCount"
                      name="newCount"
                      fullWidth
                      label={`New count`}
                      variant='standard'
                      value={formik.values.newCount}
                      onChange={formik.handleChange}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => setEditModeCountName(false)}
                    >
                      Cancel
                    </Button>
                  </form>
                </>
                :
                <>
                  <Typography variant='h5'>Count:</Typography>
                  <Typography variant='h4' >{openedProduct?.count}</Typography>
                  <Button variant='contained' onClick={() => setEditModeCountName(true)} sx={{ mb: 1 }}>Change</Button>
                  <Divider />
                </>
              }

            </Box>
            <Box
              mb={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              {editModeUrl ?
                <>
                  <>
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        id="newImageUrl"
                        name="newImageUrl"
                        fullWidth
                        label={`New image`}
                        variant='standard'
                        value={formik.values.newImageUrl}
                        error={formik.touched.newImageUrl && Boolean(formik.errors.newImageUrl)}
                        helperText={formik.touched.newImageUrl && formik.errors.newImageUrl}
                        onChange={formik.handleChange}
                        sx={{ mb: 2 }}
                      />
                      <Button
                        variant='contained'
                        type='submit'
                        sx={{ mr: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => setEditModeUrl(false)}
                      >
                        Cancel
                      </Button>
                    </form>
                  </>
                </>
                :
                <>
                  <Typography variant='h5'>Image Url:</Typography>
                  <input type={"text"} readOnly value={openedProduct?.imageUrl} style={{ padding: '1rem 0.5rem', fontSize: '1rem' }} />
                  <Button variant='contained' onClick={() => setEditModeUrl(true)} sx={{ mb: 1, mt: 1 }}>Change</Button>
                  <Divider />
                </>
              }

            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box >
  )
}

export default ModalEdit

type ModalEditProps = {
  products?: ProductType[]
  open: boolean
  openId: number | null
  close: Dispatch<SetStateAction<boolean>>
}

type valuesType = {
  newName: string,
  newDescription: string,
  newCount: number,
  newImageUrl: string
}