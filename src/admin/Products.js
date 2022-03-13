import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Widgets/Input";
import dress from '../images/dress.jpeg';
import { ColorsAvailable } from "../components/ColorsAvailable";
import { tools } from "../tools/Tools";
import { SizesAvailable } from "../components/SizesAvailable";
import { addProduct, deleteProduct, getAdminProductById, getImage, getProducts, updateProduct, updateShippingInfo } from "../data/Database";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Select } from "../Widgets/Select";
import { AdminNavBar } from "../layout/AdminNavBar";
import { categoryTypes, optionalProductTypes, productTypes } from "../contents/lists";
import { useAuth } from "../auth/Auth";
import { Textarea } from "../Widgets/Textarea";
import { useStore } from "../state/Store";
import { Loading } from "../components/Loading";
import { IoClose } from 'react-icons/io5';
import $ from 'jquery';
import { autoSave } from "../tools/AutoSave";


export const Products = () =>{
    const { user } = useAuth();
    const { shippingInfo } = useStore();

    const [smallImg, setSmallImg] = useState({});
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [editData, setEditData] = useState({sizes: [], images: [], id: null});

    const showDataRef = useRef();

    const titleRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const descriptionRef = useRef();
    const typeRef = useRef();
    const categoryRef = useRef();

    const initProducts = async() =>{
        setLoading(true);
        const dbProducts = await getAdminProductById(user?.id);
        setProducts(tools.prodImageSanitize(dbProducts));
        setLoading(false);
    }

    const InitEditData = (data) =>{
        onEditShow();
        titleRef.current.value = data?.info?.title || "";
        priceRef.current.value = data?.info?.price || "";
        quantityRef.current.value = data?.info?.quantity || "";
        descriptionRef.current.value = data?.info?.description || "";
        typeRef.current.value = data?.info?.type  || "";
        categoryRef.current.value = data?.info?.category || "";
        setEditData({
            images: data?.info?.images, 
            sizes: data?.info?.sizes,
            id: data?.id
        });
    }

    const onDeleteImage = (i, ii) =>{
        if (editData?.images[0]?.length > 1 || editData?.images[0]?.length > 1){
            let index = 0;
            let images = [];
            editData?.images?.map((img)=>{
                if (i === index){
                    img.splice(ii, 1);
                    images.push(img);
                }
                index ++;
            });
            setEditData({
                sizes: editData?.sizes, 
                images: images,
                id: editData?.id
            });
        }else{
            alert("Must have at lease one image!");
        }
    }

    const updateContentAfterUpdating = (data, id) =>{
        let tempProd = [];
        products.map((prod)=>{
            if (prod?.id === id){
                prod["info"] = data;
            }
            tempProd.push(prod);
        });
        setProducts(tempProd);
    }

    const onDelete = async() =>{
        await deleteProduct(editData?.id);
        let tempProd = products.filter((prod)=> prod?.id !== editData?.id);
        setProducts(tempProd);
        onEditHide();
    }

    const onSave = async() =>{
        setLoading(true);
        const toUpdate = {
            title: titleRef.current.value,
            sizes: editData?.sizes,
            quantity: quantityRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            userId: user?.id,
            images: tools.nestedArrToObj(editData?.images),
            type: typeRef.current.value,
            category: categoryRef.current.value,
        }
        await updateProduct(toUpdate, editData?.id);
        updateContentAfterUpdating(toUpdate, editData?.id);
        setLoading(false);
    }

    const onAddImage = async(event, i) =>{
        let index = 0;
        let images = [];
        const image = await tools.toBase64(event.target.files[0]);
        editData?.images?.map((img)=>{
            if (i === index){
                img.push(image);
            }
            images.push(img);
            index ++;
        });
        setEditData({
            sizes: editData?.sizes, 
            images: images,
            id: editData?.id
        });
    }

    const onAddNewImage = async(event) =>{
        const image = await tools.toBase64(event.target.files[0]);
        let images = editData?.images;
        images.push([image]);
        setEditData({
            sizes: editData?.sizes, 
            images: images,
            id: editData?.id
        });
    }

    const onEditShow = () =>{
        setSmallImg({height: "15vh"});
        $(showDataRef.current).show("slow");
        //find all inputs and focus it so title will be initialize.
        $(showDataRef.current).find('input').focus();
    }

    const onEditHide = () =>{
        setSmallImg({height: ""});
        $(showDataRef.current).hide("slow");
    }

    useEffect(()=>{
        initProducts();
    }, []);

    return(
        <div className="data-entry">
            <AdminNavBar />
            <div className="data-entry-container" style={{textAlign:'center'}}>
                <div className="data-entry-sub-container">
                    <div className="flex">
                        <div className="data-entry-prod-scroll scroll">
                            {
                                products.length?
                                products.map((prod, key)=>(
                                    <div onClick={()=>InitEditData(prod)} className="data-entry-edit" key={key}>
                                        <div className="data-entry-sub-edit">
                                            <img style={smallImg || {}} src={prod?.info?.images[0][0]} alt="" />
                                            <div><b>{prod?.info?.title}</b></div>
                                            <div>{"$"}{prod?.info?.price}</div>
                                        </div>
                                    </div>
                                )):
                                <div>No Record</div>
                            }
                        </div>
                        <div hidden ref={showDataRef} className="data-entry-edit-scroll scroll">
                            <div className="data-entery-edit-action">
                                <div className="data-entery-edit-action-images-close">
                                    <button onClick={onDelete} className="btn">Delete</button>
                                    <button onClick={onSave} className="btn">Save</button>
                                    <IoClose onClick={onEditHide} />
                                </div>
                                <h1>Edit Product</h1>
                                <Input inputRef={titleRef} title="Title" />
                                <Input inputRef={descriptionRef} title="Description" />
                                <Input inputRef={priceRef} title="Price" type={"price"} />
                                <Input inputRef={quantityRef} title="Quantity" />
                                <div style={{margin: "20px"}}>
                                    <SizesAvailable useSelection editable sizesData={editData?.sizes ||[]} onSizeSelected={(size)=>setEditData({sizes: size, images: editData?.images, id: editData?.id})} title={null} />
                                    <Select inputRef={typeRef} option={Object.values(productTypes).concat(Object.values(optionalProductTypes))} title="Type" defaultOption="Add Product type" />
                                    <Select inputRef={categoryRef} option={Object.values(categoryTypes)} title="Category" defaultOption="Add Product category" />
                                </div>
                                <button onClick={(e)=>document.getElementById("new-prod-file")?.click?.()} className="btn pad-mini">Add New</button>
                                {editData.images?.map?.((images, key)=>(
                                    <div className="data-entery-edit-action-images" key={key}>
                                        {images?.map?.((img, key2)=>(
                                            <div key={key2}>
                                                <img src={img} alt="" />
                                                <label hidden onClick={()=>onDeleteImage(key, key2)} className="float-center data-entery-float">Delete</label>
                                            </div>
                                        ))}
                                        <label onClick={()=>document.getElementById(`prod-file${key}`)?.click?.()} className="float-bottom-right data-entery-float">Add Angles</label>
                                        <input hidden onChange={(e)=>onAddImage(e, key)} type="file" id={`prod-file${key}`} />
                                    </div>
                                ))}
                                <button onClick={(e)=>document.getElementById("new-prod-file")?.click?.()} className="btn pad-mini">Add New</button>
                                <input hidden onChange={(e)=>onAddNewImage(e)} type="file" id="new-prod-file" />
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <Loading isOpen={loading} darkMode />
        </div>
    )
}