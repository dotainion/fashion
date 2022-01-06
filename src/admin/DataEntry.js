import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Widgets/Input";
import dress from '../images/dress.jpeg';
import { ColorsAvailable } from "../components/ColorsAvailable";
import { tools } from "../tools/Tools";
import { SizesAvailable } from "../components/SizesAvailable";
import { addProduct, getImage, getProducts, updateShippingInfo } from "../data/Database";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Select } from "../Widgets/Select";
import { AdminNavBar } from "../layout/AdminNavBar";
import { categoryTypes, optionalProductTypes, productTypes } from "../contents/lists";
import { useAuth } from "../auth/Auth";
import { Textarea } from "../Widgets/Textarea";
import { useStore } from "../state/Store";
import { Loading } from "../components/Loading";
import { autoSave } from "../tools/AutoSave";
import { Settings } from "./Settings";


export const DataEntry = () =>{
    const { user } = useAuth();

    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [imagesError, setImagesError] = useState(false);
    const [sizesError, setSizesError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fileAngleRef = useRef();
    const fileNewRef = useRef();
    const imgIndexRef = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const typeRef = useRef();
    const categoryRef = useRef();

    const onDeleteGroup = async(index) =>{
        let tempImages = images;
        tempImages.splice(index, 1);
        let filtered = tempImages.filter((el) => el.length);
        setImages(filtered);
    }

    const onImageDelete = async(index, index2) =>{
        let tempImages = images;
        tempImages[index].splice(index2, 1);
        let filtered = tempImages.filter((el) => el.length);
        setImages(filtered);
    }

    const onAddAngle = async(event) =>{
        const img = await tools.toBase64(event.target.files[0]);
        let tempImages = images;
        tempImages[imgIndexRef.current].push(img);
        let filtered = tempImages.filter((el) => el.length);
        setImages(filtered);
    }

    const onAddNewImage = async(event) =>{
        const img = await tools.toBase64(event.target.files[0]);
        setImages([...images, [img]]);
    }

    const saveProduct = async() =>{
        setSizesError(false);
        setImagesError(false);
        let state = true;
        if (typeRef.current.value === "Add Product type"){
            state = false;
            typeRef.current.style.borderColor = "red";
        }
        if (categoryRef.current.value === "Add Product category"){
            state = false;
            categoryRef.current.style.borderColor = "red";
        }
        if (!sizes.length){
            state = false;
            setSizesError(true);
        }
        if (!images.length){
            state = false;
            setImagesError(true);
        }
        if (!state) return;

        setLoading(true);
        await addProduct({
            title: titleRef.current.value,
            sizes: sizes,
            quantity: quantityRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            userId: user?.id,
            images: tools.nestedArrToObj(images),
            type: typeRef.current.value,
            category: categoryRef.current.value,
        });
        setSizes([]);
        setImages([]);
        setLoading(false);
    }

    return(
        <div className="data-entry">
            <AdminNavBar />
            <div className="flex-animate data-entry-prod-info-scroll">
                <div className="data-entry-container text-center">
                    <div className="data-entry-sub-container">
                        <h1>Product Information</h1>
                        <div className="data-entry-inner-container scroll">
                            <Input inputRef={titleRef} title="Title" />
                            <SizesAvailable title="Size Available In" onSizeSelected={setSizes} loading={loading} useSelection error={sizesError} clearError={setSizesError} />
                            <Input inputRef={descriptionRef} title="Description" />
                            <Input inputRef={quantityRef} title="Quantity" />
                            <Input inputRef={priceRef} title="Price" type={"price"} />
                            <Select inputRef={typeRef} option={Object.values(productTypes).concat(Object.values(optionalProductTypes))} title="Type" defaultOption="Add Product type" />
                            <Select inputRef={categoryRef} option={Object.values(categoryTypes)} title="Category" defaultOption="Add Product category" />
                            <ColorsAvailable clothing={images} title="Colors" size="30px" />
                        </div>
                    </div>
                </div>
                <div className="data-entry-container">
                    <div className="data-entry-sub-container">
                        <button className="btn" onClick={()=>{setImagesError(false); fileNewRef.current.click()}} style={{border:imagesError && "1px solid red"}}>{images.length? "New Style": "New Product"}</button>
                        <button className="btn" onClick={saveProduct} >Save Product</button>
                        <div className="data-entry-inner-container scroll">
                            <input hidden onChange={(e)=>onAddNewImage(e)} ref={fileNewRef} type="file" />
                            <div className="data-entry-list-image-container">
                                {images.map((imgs, key)=>(
                                    <div className="data-entry-list-image-div" key={key}>
                                        <div onClick={()=>onDeleteGroup(key)} className="data-entry-list-image-close">
                                            <span>delete all</span>
                                            <AiOutlineCloseCircle/>
                                        </div>
                                        {imgs.map((img, key1)=>(
                                            <img onClick={()=>onImageDelete(key, key1)} src={img} alt="" key={key1} />
                                        ))}
                                        <div>
                                            <button className="btn" onClick={()=>{imgIndexRef.current = key; fileAngleRef.current.click()}}>Add Angles</button>
                                            <input hidden onChange={(e)=>onAddAngle(e)} ref={fileAngleRef} type="file" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading isOpen={loading} darkMode />
        </div>
    )
}