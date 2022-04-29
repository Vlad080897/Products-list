import { Box, Button, Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewProduct, getProducts } from '../../app/ProductsList'
import { getProductsSelector } from '../../selectors/productsList'
import { ProductType } from '../../types/types'
import ModalWindow, { newProductInfo } from './Modal'
import ModalDelete from './ModalDelete'

const ProductsList = () => {
  const productsFromData = useAppSelector(getProductsSelector);
  const [products, setNewProducts] = useState<ProductType[]>()
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [deleteID, setDeleteID] = React.useState<number | undefined>()
  const dispatch = useAppDispatch();

  const addNewProductFunc = (productInfo: newProductInfo) => {
    dispatch(addNewProduct(productInfo))
  };

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  useEffect(() => {
    setNewProducts(productsFromData)
  }, [productsFromData])

  const handleOpen = () => setOpenDelete(true);

  const handleClick = (id: number) => {
    setDeleteID(id)
    handleOpen()
  };
  return (
    <Container>
      <Box >
        <Typography
          variant='h2'
          component={'h1'}
          sx={{ color: '#42a5f5' }}
        >
          Products List
        </Typography>
      </Box>
      <Box pt={2} pl={2} pr={2} mt={2} sx={{ border: '2px solid #42a5f5', borderRadius: '20px' }}>
        {products &&
          products
            .sort((product1, product2) => product1.name.localeCompare(product2.name))
            //.sort((product1,product2 ) => Number(product1.count) - Number(product2.count))
            .map((product) => {
              return (
                <Box key={product.id}>
                  <Box mb={2} mt={2} display={'flex'} key={product.id}>
                    <img src={product.imageUrl} alt="productPhoto" style={{ width: '200px' }} />
                    <Box ml={1}>
                      <Typography variant='h5' sx={{ fontWeight: '700' }}>{product.name}</Typography>
                      <Typography variant='h6' sx={{ fontWeight: '400' }}>{product.description}</Typography>
                      <Typography variant='h6' sx={{ fontWeight: '400' }}>count: {product.count}</Typography>
                      <Button variant='contained' color='warning' onClick={() => handleClick(product.id)}>Delet Product</Button>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              )
            })
        }
      </Box>
      <ModalWindow addNewProduct={addNewProductFunc} />
      <ModalDelete products={products} deleteID={deleteID} openDelete={openDelete} setOpenDelete={setOpenDelete} />
    </Container >
  )
}

export default ProductsList