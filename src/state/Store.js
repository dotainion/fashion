import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/Auth';
import { Loading } from '../components/Loading';
import { addUser, getProducts, getProductsByCategory, getProductsByTitle, getProductsByType, getShippingInfo, getUser } from '../data/Database';
import { tools } from '../tools/Tools';


const StoreContextProvider = createContext();
export const useStore = () => useContext(StoreContextProvider);

export const StoreContext = ({children}) =>{
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState([]);
    const [cartItemsTotal, setCartItemsTotal] = useState("");
    const [deliveryType, setDeliveryType] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [didSearch, setDidSearch] = useState(false);

    const initShippingInfo = async(id) =>{
        setShippingInfo(await getShippingInfo(id));
    }

    const initProducts = async() =>{
        setLoading(true);
        setDidSearch(false);
        const dbProducts = await getProducts(100);
        const products = tools.prodImageSanitize(dbProducts);
        setProducts(products);
        setLoading(false);
    }

    const productsByType = async(type) =>{
        setLoading(true);
        setDidSearch(false);
        const dbProducts = await getProductsByType(type, 100);
        const products = tools.prodImageSanitize(dbProducts);
        setProducts(products);
        setLoading(false);
    }

    const productsByCategory = async(category) =>{
        setLoading(true);
        setDidSearch(false);
        const dbProducts = await getProductsByCategory(category, 100);
        const products = tools.prodImageSanitize(dbProducts);
        setProducts(products);
        setLoading(false);
    }

    const productsSearch = async(searchVal) =>{
        setLoading(true);
        setSearchValue(searchVal);
        const dbProducts = await getProductsByTitle(searchVal);
        const products = tools.prodImageSanitize(dbProducts);
        setProducts(products);
        setDidSearch(true);
        setLoading(false);
    }

    const addToCart = (item, qty=1, del=false, refresh=false) =>{
        console.log(item);
        let itemExist = false;
        let tempProducts = [];
        for (let product of cartItems){
            let deleting = false;
            if (product?.id === item?.id && product?.size === item?.size){
                itemExist = true;
                if (del === false){
                    if (qty?.includes?.("-") || parseInt(qty) < 0){
                        product["qty"] = product?.qty - parseInt(qty?.replace?.("-", "") || 1);
                    }else{
                        product["qty"] = parseInt(qty) + parseInt(product?.qty);
                    }
                }else{
                    deleting = true;
                }
            }
            if (!deleting){
                tempProducts.push(product);
            }
        }
        if (itemExist){
            if (refresh){
                setCartItems([]);
                setTimeout(() => {
                    setCartItems(tempProducts);
                }, 100);
            }else{
                setCartItems(tempProducts);
            }
            window.localStorage.setItem("cart", JSON.stringify(tempProducts));
        }else if (Object.keys(item || {}).length){
            item["qty"] = qty;
            item["hold"] = false;
            setCartItems([...cartItems, item]);
            window.localStorage.setItem("cart", JSON.stringify([...cartItems, item]));
        }
    }

    const onUpdateQty = (cmd, item, id, e, del=false) =>{
        e.stopPropagation();
        const element = document.getElementById(id);
        const value = parseInt(element.value);
        if (value <= 1 && cmd !== "add") return;
        if (cmd === "add"){
            element.value = value + 1;
            addToCart(item, 1, del);
        }else{
            element.value = value - 1;
            addToCart(item, -1, del);
        }
    }

    const initCartItem = () =>{
        let item = window.localStorage.getItem("cart");
        if (item){
            setCartItems(JSON.parse(item));
        }
    }

    const clearCart = () =>{
        setCartItems([]);
        window.localStorage.clear();
    }

    const holdCheckout = (item, state) =>{
        let tempProducts = [];
        for (let product of cartItems){
            if (product?.id === item?.id && product?.size === item?.size){
                product["hold"] = state;
            }
            tempProducts.push(product);
        }
        setCartItems(tempProducts);
        window.localStorage.setItem("cart", JSON.stringify(tempProducts));
    }

    const changeDeliveryType = (type) =>{ 
        setDeliveryType(type);
    }

    useEffect(()=>{
        let subTotal = 0;
        for (let item of cartItems || []){
            subTotal = subTotal + (parseInt(item?.qty || 0)) * (parseFloat(item?.price || 0));
        }
        setCartItemsTotal(subTotal);
    }, [cartItems]);

    useEffect(()=>{
        initCartItem();
        initProducts();
    }, []);

    useEffect(()=>{
        initShippingInfo(user?.id);
    }, [user]);

    const providerValue = {
        products,
        productsByType,
        productsByCategory,
        cartItems,
        addToCart,
        onUpdateQty,
        clearCart,
        didSearch,
        searchValue,
        shippingInfo,
        initProducts,
        cartItemsTotal,
        deliveryType,
        holdCheckout,
        productsSearch,
        changeDeliveryType
    }
    return(
        <StoreContextProvider.Provider value={providerValue}>
            <Loading isOpen={loading} />
            {children}
        </StoreContextProvider.Provider>
    )
}