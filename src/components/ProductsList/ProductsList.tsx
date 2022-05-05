import { Box, Button, Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewProduct, getComments, getProducts } from '../../app/ProductsList'
import { getProductsSelector } from '../../selectors/productsList'
import { ProductType } from '../../types/types'
import ModalAddProduct, { newProductInfo } from './ModalAddProduct'
import ModalDelete from './ModalDelete'
import ModalComments from './ModalComments'
import ModalEdit from './ModalEdit'

const ProductsList = () => {
  const productsFromData = useAppSelector(getProductsSelector);
  const [products, setNewProducts] = useState<ProductType[]>()
  const [openBtn, setOpenBtn] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openID, setOpenID] = useState<number | null>(null)
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<number | undefined>()
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpenDelete(true);

  const addNewProductFunc = (productInfo: newProductInfo) => {
    dispatch(addNewProduct(productInfo));
  };

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getComments())
  }, [dispatch]);

  useEffect(() => {
    setNewProducts(productsFromData);
  }, [productsFromData, dispatch]);

  const openModalInfo = (id: number) => {
    setOpenID(id);
    setOpenBtn(true);
  }
  const openEditInfo = (id: number) => {
    setOpenID(id);
    setOpenEdit(true);
  }

  const handleClick = (id: number) => {
    setDeleteID(id)
    handleOpen()
  };

  const sortProducts = (sortBy: string) => {
    let newProducts
    if (products?.length) {
      newProducts = [...products].map(p => {
        p = { ...p }
        return p
      })
      if (sortBy === 'Alphabet') {
        newProducts = newProducts?.sort((product1, product2) => product1.name.localeCompare(product2.name))
        setNewProducts(newProducts)
      }
      if (sortBy === 'Count') {
        newProducts = newProducts?.sort((p1, p2) => p1.count - p2.count)
        setNewProducts(newProducts)
      }
    }

  }
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
            .map((product) => {
              return (
                <Box key={product.id}>
                  <Box mb={2} mt={2} display={'flex'} key={product.id}>
                    <img src={product.imageUrl} alt="productPhoto" style={{ width: '200px' }} />
                    <Box ml={1}>
                      <Typography variant='h5' sx={{ fontWeight: '700' }}>{product.name}</Typography>
                      <Typography variant='h6' sx={{ fontWeight: '400' }}>{product.description}</Typography>
                      <Typography variant='h6' sx={{ fontWeight: '400' }}>count: {product.count}</Typography>
                      <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick={() => openEditInfo(product.id)}>Edit</Button>
                      <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick={() => openModalInfo(product.id)}>Commnets</Button>
                      <Button variant='contained' color='warning' onClick={() => handleClick(product.id)}>Delet</Button>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              )
            })
        }
      </Box>
      <ModalAddProduct addNewProduct={addNewProductFunc} sortProducts={sortProducts} />
      <ModalDelete products={products} deleteID={deleteID} openDelete={openDelete} setOpenDelete={setOpenDelete} />
      <ModalComments products={products} openBtn={openBtn} setOpenBtn={setOpenBtn} openID={openID} />
      <ModalEdit products={products} open={openEdit} close={setOpenEdit} openId={openID} />
    </Container >
  )
}

export default ProductsList