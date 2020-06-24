import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR
} from './../types'
import axiosClient from './../config/axios'
import Swal from 'sweetalert2'

export function createNewProductAction(product) {
  return async dispatch => {
    dispatch(addProduct())
    try {
      await axiosClient.post('/products', product)
      dispatch(addProductSuccess(product))
      Swal.fire(
        'Success',
        'Product saved succesfully',
        'success'
      )
    } catch (error) {
      console.log(error)
      dispatch(addProductError(true))
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong, try again!'
      })
    }
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
})

const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
})

const addProductError = status => ({
  type: ADD_PRODUCT_ERROR,
  payload: status
})


export function getProductsAction() {
  return async dispatch => {
    dispatch(getProducts())
    try {
      const response = await axiosClient.get('/products')
      dispatch(getProductsSuccess(response.data))
    } catch(error) {
      dispatch(getProductsError(true))
    }
  }
}

const getProducts = () => ({
  type: GET_PRODUCTS,
  payload: true
})

const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products
})

const getProductsError = status => ({
  type: GET_PRODUCTS_ERROR,
  payload: status
})