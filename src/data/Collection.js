import { app, db, rtDb } from "../security/Secure";

export const addData = async(collection, data, setUid=null) =>{
    let state = null;
    if(setUid !== null){
        state = await db.collection(collection).doc(setUid).set(data);
    }else{
        const accountRef = db.collection(collection);
        state = await accountRef.add(data);
    }
    let record = await state.get();
    return {info: record.data(), id: record.id};
}

export const getData = async(collection, limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (!limit) accountRef = db.collection(collection);
    else accountRef = db.collection(collection).limit(limit);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const getDataById = async(collection, uId) =>{
    if(uId){
        const aUser = db.collection(collection).doc(uId);
        return (await aUser.get()).data();
    }
    return null;
}

export const getDataByField = async(collection,queryKey,queryValue,limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (limit !== false) accountRef = db.collection(collection).where(queryKey,"==",queryValue).limit(limit);
    else accountRef = db.collection(collection).where(queryKey,"==",queryValue);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const getDataByDoubleField = async(collection,queryKey,queryValue,queryKey2,queryValue2,limit=false) =>{
    let allData = [];
    let accountRef = "";
    if (limit !== false) accountRef = db.collection(collection).where(queryKey,"==",queryValue).where(queryKey2,"==",queryValue2).limit(limit);
    else accountRef = db.collection(collection).where(queryKey,"==",queryValue).where(queryKey2,"==",queryValue2);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}

export const updateData = async(collection, data, id) =>{
    if(id){
        const delRef = db.collection(collection).doc(id);
        return await delRef.update(data)
    }
    return null;
}

export const deleteData = async(collection, id) =>{
    if(id){
        const delRef = db.collection(collection).doc(id);
        return await delRef.delete();
    }
    return null;
}

export const getSearch = async(collection,queryKey,queryValue) =>{
    let allData = [];
    let accountRef = db.collection(collection).where(queryKey,">=",queryValue);
    let data = await accountRef.get();
    data.forEach((record) => {
        allData.push({ id: record.id, info: record.data() });
    });
    return allData;
}