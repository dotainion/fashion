import { Collections } from "../config/Collection";
import { addData, deleteData, getData, getDataByDoubleField, getDataByField, getDataById, updateData } from "./Collection";

export const addProduct = async(data) =>{
    try{
        return await addData(Collections.products, data);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateProduct = async(data, id) =>{
    try{
        return await updateData(Collections.products, data, id);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const deleteProduct = async(id) =>{
    try{
        await deleteData(Collections.products, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getProducts = async(limit=false) =>{
    try{
        return await getData(Collections.products, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getProductsByType = async(type, limit=false) =>{
    try{
        return await getDataByField(Collections.products, "type", type, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getProductsByCategory = async(category, limit=false) =>{
    try{
        return await getDataByField(Collections.products, "category", category, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getProductsByTitle = async(title, limit=false) =>{
    try{
        return await getDataByField(Collections.products, "title", title, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getProductById = async(id) =>{
    try{
        return await getDataById(Collections.products, id);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const getAdminProductById = async(id, limit=false) =>{
    try{
        return await getDataByField(Collections.products, "userId", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const addUser = async(newUser, id) =>{
    try{
        await addData(Collections.user, newUser, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getUser = async(id) =>{
    try{
        return await getDataById(Collections.user, id);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const updateShippingInfo = async(data, id) =>{
    try{
        try{ await updateData(Collections.shippingInfo, data, id) }
        catch{ addData(Collections.shippingInfo, data, id) }
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getShippingInfo = async(id) =>{
    try{
        return await getDataById(Collections.shippingInfo, id);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const addCheckout = async(data) =>{
    try{
        await addData(Collections.checkout, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const updateCheckout = async(data, id) =>{
    try{
        await updateData(Collections.checkout, data, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getCheckout = async(id, limit=false) =>{
    try{
        return await getDataByDoubleField(Collections.checkout, "delivered", "Pending", "userId", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getCheckoutDelivered = async(id, limit=false) =>{
    try{
        return await getDataByDoubleField(Collections.checkout, "delivered", "Delivered", "userId", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getAdminCheckout = async(id, limit=false) =>{
    try{
        return await getDataByField(Collections.checkout, "sellerId", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}

export const updateAdminCheckout = async(data, id) =>{
    try{
        await updateData(Collections.checkout, data, id);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const addReview = async(data) =>{
    try{
        await addData(Collections.reviews, data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getReview = async(id, limit=false) =>{
    try{
        console.log(id)
        return await getDataByField(Collections.reviews, "productId", id, limit);
    }catch(error){
        console.log(error);
        return [];
    }
}
