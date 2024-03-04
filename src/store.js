import { createStore } from 'vuex'
import axios from 'axios';

const store = createStore({
    state() {
        return {
            count: 0,
            baseUrl: "http://localhost:8762",
            tokenGHN: "5c069b33-d794-11ee-8026-f29d8335aebb",
            urlGHNProvince: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
            urlGHNDistrict: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
            cart: null,
        }
    },

    getters: {
        getCart(state) {
            return state.cart;
        }
    },

    mutations: {
        increment(state) {
            state.count++
        },
        setCart(state, cartPayload) {
            state.cart = cartPayload;
        }
    },

    actions: {
        async getCart({ commit }) {
            try {
                const response = await axios.get(
                    this.state.baseUrl + "/order/cart",
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                for(let i = 0; i < response.data.shoppingCartLine.length; i++) {
                    response.data.shoppingCartLine[i].sku = (await axios.get(
                        this.state.baseUrl + "/product/product_sku/" + response.data.shoppingCartLine[i].sku,
                    )).data;
                    response.data.shoppingCartLine[i].sku.productId = (await axios.get(
                        this.state.baseUrl + "/product/product/" + response.data.shoppingCartLine[i].sku.productId,
                    )).data;
                }
                commit('setCart', response.data.shoppingCartLine);
            } catch (error) {
                console.error(error);
            }
        },
    }
})

export default store