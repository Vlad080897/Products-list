import { Button, Divider, Fade, List, ListItem, ListSubheader, Modal, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formatRelative, subDays } from 'date-fns';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addNewComment, deleteComment, toggleEdit, updateComment } from '../../app/ProductsList';
import { modal } from '../../styles/styles';
import { ProductType } from '../../types/types';
import * as Yup from 'yup';

const commentsButtons = {
  mr: 1,
  color: '#ede7f6',
  padding: 0,
  minWidth: 'fit-content',
  '&:hover': {
    color: '#d1c4e9',
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}

const ModalComments: React.FC<ModalInfoProps> = ({ products, openBtn, setOpenBtn, openID }) => {
  const [openedProduct, setOpenedProduct] = useState<ProductType>()
  const [editingCommet, setEditingComment] = useState<number | null>(null)
  const dispatch = useAppDispatch()


  useEffect(() => {
    const openedProduct = products?.find(el => el.id === openID);
    setOpenedProduct(openedProduct)
  }, [openBtn, products, openID])

  const handleEdit = (productId: number, commentId: number) => {
    dispatch(toggleEdit(productId, commentId))
    setEditingComment(commentId)
  }

  const handleCancel = (productId: number, commentId: number) => {
    dispatch(toggleEdit(productId, commentId))
    setEditingComment(null)
  }

  const handleUpdate = (commentId: number, productId: number, description: string) => {
    const date = formatRelative(subDays(new Date(), 0), new Date());
    dispatch(updateComment(commentId, productId, description, date))
  }
  const handleDelete = (id: number) => {
    dispatch(deleteComment(id))
  }
  const handleAddComment = (productId: number, description: string) => {
    const date = formatRelative(subDays(new Date(), 0), new Date());
    dispatch(addNewComment(productId, description, date));
  }

  const validationUpdateComment = Yup.object().shape({
    commentText: Yup
      .string()
      .required('Add your comment'),
  })

  const validationNewComment = Yup.object().shape({
    newComment: Yup
      .string()
      .required('Add your comment'),
  })

  const updateCommentForm = useFormik({
    initialValues: {
      commentText: '',
    },
    validationSchema: validationUpdateComment,
    onSubmit: (values: vulesUpdateComment, { resetForm }) => {
      if (editingCommet && openedProduct) {
        handleUpdate(editingCommet, openedProduct.id, values.commentText)
        handleCancel(editingCommet, openedProduct.id)
      }
      resetForm()
    },
  });

  const newCommentForm = useFormik({
    initialValues: {
      newComment: '',
    },
    validationSchema: validationNewComment,
    onSubmit: (values: vulesNewComment, { resetForm }) => {
      if (openedProduct) {
        handleAddComment(openedProduct?.id, values.newComment)
      }
      resetForm()
    },
  });



  return (
    <Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openBtn}
        onClose={() => {
          if (openedProduct) {
            setOpenBtn(false)
            if (editingCommet) {
              setEditingComment(null)
              dispatch(toggleEdit(openedProduct.id, editingCommet))
            }

          }
        }}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBtn}>
          <Box sx={modal}>
            <Box>
              <List

                subheader={
                  < ListSubheader component="div" >
                    Comments
                    <Divider />
                  </ListSubheader>
                }>
                {openedProduct?.comments.map((comment, index) => {
                  return (
                    <ListItem sx={{ flexDirection: 'column', alignItems: 'baseline' }} key={index}>
                      {comment.editMode ?
                        <form onSubmit={updateCommentForm.handleSubmit}>
                          <TextField
                            id="commentText"
                            name="commentText"
                            fullWidth
                            label='Comment Text'
                            variant='standard'
                            onChange={updateCommentForm.handleChange}
                            value={updateCommentForm.values.commentText}
                            error={updateCommentForm.touched.commentText && Boolean(updateCommentForm.errors.commentText)}
                            helperText={updateCommentForm.touched.commentText && updateCommentForm.errors.commentText}
                            sx={{ mb: 2 }}
                          />
                          <Button
                            variant='contained'
                            type='submit'
                          >
                            Update
                          </Button>
                        </form>
                        :
                        (
                          <>
                            <Typography component={'div'}>
                              {comment.description}
                            </Typography>
                            <Typography>{comment.date}</Typography>
                          </>
                        )
                      }
                      <Box>
                        {comment.editMode ?
                          <Button
                            onClick={() => handleCancel(openedProduct.id, comment.id)}
                            variant='text'
                            sx={commentsButtons}>
                            Cancel
                          </Button>
                          :
                          <Button
                            onClick={() => handleEdit(openedProduct.id, comment.id)}
                            variant='text'
                            sx={commentsButtons}>
                            Edit
                          </Button>
                        }

                        <Button variant='text'
                          sx={commentsButtons}
                          onClick={() => handleDelete(comment.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </ListItem>
                  )
                })}
              </List>
              <form onSubmit={newCommentForm.handleSubmit}>
                <TextField
                  id="newComment"
                  name="newComment"
                  fullWidth
                  label='New Comment'
                  variant='standard'
                  onChange={newCommentForm.handleChange}
                  value={newCommentForm.values.newComment}
                  error={newCommentForm.touched.newComment && Boolean(newCommentForm.errors.newComment)}
                  helperText={newCommentForm.touched.newComment && newCommentForm.errors.newComment}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ mt: 1 }}>Add</Button>
              </form>
            </Box>
          </Box>
        </Fade >
      </Modal >
    </Box >
  )
}

export default ModalComments

type ModalInfoProps = {
  products?: ProductType[]
  openBtn: boolean
  openID: number | null
  setOpenBtn: Dispatch<SetStateAction<boolean>>
}

type vulesUpdateComment = {
  commentText: string
}

type vulesNewComment = {
  newComment: string
}