import axios from "axios";

function getAPI() {

    let API_PATH = axios.create({
        baseURL: 'http://45.145.164.240:8000/api',
    })

    const dadosDeAutenticacao =  JSON.parse(localStorage.getItem('dadosDeAutenticacao'));

    if (dadosDeAutenticacao) {
        const tokenAcess = dadosDeAutenticacao.access;
        API_PATH.defaults.headers.common['Authorization'] = `Bearer ${tokenAcess}`;

    }

    return API_PATH
}


export const api = {
    getAllProducts: async (page) => {
        let response = await getAPI().get(`/products/?page=${page}`)
        return response.data
    },
    searchProducts: async (text) => {
        let response = await getAPI().get(`/products/?filter=%22name__contains%22:%22${text}%22`)
        return response.data
    },
    registerClient: async (nome,senha) => {
        let response = await getAPI().post('/register/', {username: nome,password: senha})
        return response.status
    },
    loginClient: async (nome, senha) => {
        let response = await getAPI().post('/login/', { username: nome, password: senha })       
        return response
    },
    getCart: async (id,page) => {
        let response = await getAPI().get(`/cart-entries/?filter="user":${id}&page=${page}`)
        return response.data
    },
    logout: async () => {
        let response = await getAPI().delete('/logout')  
        return response.data
    },
    getProduct: async (id) => {
        let response = await getAPI().get(`/products/${id}/`)
        return response.data
    },
    confirmPurchase: async () => {
        let response = await getAPI().get(`/cart/purchase/`)
        return response
    },
    addProducCart: async (id) => {
        let response = await getAPI().post('/cart-entries/',{product: id,qnt: 1})
        return response.data
    },
    deleteProductCart: async (id) => {
        let response = await getAPI().delete(`/cart-entries/${id}`)
        return response
    },
    getSubtotal: async () => {
        let response = await getAPI().get(`/cart/`)
        return response.data
    }
}