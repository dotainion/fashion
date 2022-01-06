import React, { useEffect, useRef, useState } from "react";
import img from '../images/dress.jpeg';
import img2 from '../images/dress2.jpg';
import { ColorsAvailable } from '../components/ColorsAvailable';
import { SizesAvailable } from "../components/SizesAvailable";
import { NavigationBar } from "../layout/NavigationBar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductById, getReview, getShippingInfo } from "../data/Database";
import { useStore } from "../state/Store";
import $ from 'jquery';
import { tools } from "../tools/Tools";
import { BiPlus, BiMinus } from 'react-icons/bi';
import { Reviews } from "../components/Reviews";
import { BottomNavigationBar } from "../layout/BottomNavigationBar";
import { BsFacebook, BsInstagram } from 'react-icons/bs';


export const ViewItem = () =>{
    const { addToCart } = useStore();

    const [image, setImage] = useState();
    const [imageOptoins, setImageOptoins] = useState([]);
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");
    const [sizes, setSizes] = useState([]);
    const [sizesSelected, setSizesSelected] = useState([]);
    const [description, setDescription] = useState("");
    const [imgIndexPicker, setImageIndexPicker] = useState(0);
    const [productId, setProductId] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [shipInfo, setShipInfo] = useState({pickup: {info: "", address: ""}, dropOff: {info: "", address: ""}, media: {facebook: "", instagram:""}, policy: "",});
    const [toggleIcon, setToggleIcon] = useState({pickup: true, dropOff: true, policy: true});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const param = useParams();
    const location = useLocation();

    const sizeRef = useRef();
    const cartBtnRef = useRef();
    const timeoutRef = useRef();

    const showPickupRef = useRef();
    const showDropOffRef = useRef();
    const showPolicyRef = useRef();

    const initProcuct = async(id) =>{
        initRecord(await getProductById(id));
    }

    const initRecord = async(data, id) =>{
        let index = data["imgageIndex"] || 0;
        setPrice(data?.price);
        setTitle(data?.title);
        setSizes(data?.sizes);
        setDescription(data?.description);
        setImage(data?.images?.[index]?.[0] || "");
        setImageOptoins(data?.images || []);
        setImageIndexPicker(index);
        setProductId(id);
        setSellerId(data?.userId);
        setShipInfo(await getShippingInfo(data?.userId));
    }

    const onAddToCart = () =>{
        if (loading){
            return;
        }
        if (!sizesSelected.length){
            return tools.shakeElement(sizeRef.current);
        }
        cartBtnRef.current.style.backgroundColor = "darkgreen";
        cartBtnRef.current.innerHTML = "SAVING ITEM TO CART...";
        setLoading(true);
        addToCart({
            image,
            price,
            title,
            sellerId,
            size: sizesSelected?.[0] || "",
            id: productId
        });
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            cartBtnRef.current.style.backgroundColor = "";
            cartBtnRef.current.innerHTML = "ADD TO CART";
            setLoading(false);
        }, 1000);
    }

    const toggleInfo = (ref, cmd) =>{
        $(ref.current).toggle("fast");
        if (cmd === "pickup"){
            setToggleIcon({pickup: !toggleIcon.pickup, dropOff: toggleIcon.dropOff, policy: toggleIcon.policy});
        }else if (cmd === "dropOff"){
            setToggleIcon({pickup: toggleIcon.pickup, dropOff: !toggleIcon.dropOff, policy: toggleIcon.policy});
        }else{//policies
            setToggleIcon({pickup: toggleIcon.pickup, dropOff: toggleIcon.dropOff, policy: !toggleIcon.policy});
        }
    }

    const onMediaClick = async(mediaLink) =>{
        if (mediaLink){
            window.open(mediaLink, "_blank");
        }
    }

    useEffect(()=>{
        const id = location?.state?.id || param?.id?.replace(":", "") || "";
        if (! location.state) initProcuct(id);
        else initRecord(location?.state?.info, id);
    }, []);

    return(
        <div className="">
            <NavigationBar relative/>
            <div className="flex-animate">
                <div className="item-options-image-container scroll">
                    {imageOptoins?.[imgIndexPicker]?.map?.((img, key)=>(
                        <div key={key}>
                            <img 
                                onClick={()=>setImage(img)} 
                                onMouseEnter={()=>setImage(img)} 
                                className="item-options-images" 
                                style={{borderColor:img === image && "dodgerblue"}}
                                src={img} 
                                alt=""
                            />
                        </div>
                    ))}
                </div>
                <div className="item-info-image-larg-container">
                    <img className="item-image" src={image} alt="" />
                </div>
                <div className="item-info-container">
                    <div style={{paddingLeft:"10px"}}>
                        <div><b>{title}</b></div>
                        <Reviews productId={productId}/>
                        <div className="item-info-media-icon-container">
                            <h5>FIND US ON</h5>
                            <BsFacebook onClick={()=>onMediaClick(shipInfo?.media?.facebook)} className="item-info-media-icon" fill="dodgerblue" />
                            <BsInstagram onClick={()=>onMediaClick(shipInfo?.media?.instagram)} className="item-info-media-icon" fill="orangeRed" />
                        </div>
                        <h2>{"XCD $"}{price}</h2>
                        <ColorsAvailable onClick={(i)=>setImageIndexPicker(i)} clothing={imageOptoins} title="Colors Available" size="30px" />
                        <SizesAvailable sizeRef={sizeRef} sizesData={sizes} onSizeSelected={setSizesSelected} />
                        <div className="cart-button-container">
                            <div onClick={onAddToCart} className="cart-button" ref={cartBtnRef}>ADD TO CART</div>
                        </div>
                        <div className="item-info">
                            <div className="item-info-sub">
                                <div onClick={()=>toggleInfo(showPickupRef, "pickup")} className="item-info-button">
                                    <b>Pickup info </b>
                                    {toggleIcon?.pickup? <BiPlus/>: <BiMinus/>}
                                </div>
                                <div hidden ref={showPickupRef}>
                                    <p>{shipInfo?.pickup?.info}</p>
                                    <div>Pickup address</div>
                                    <p>{shipInfo?.pickup?.address}</p>
                                </div>
                            </div>
                            <div className="item-info-sub">
                                <div onClick={()=>toggleInfo(showDropOffRef, "dropOff")} className="item-info-button">
                                    <b>Drop off info </b>
                                    {toggleIcon?.dropOff? <BiPlus/>: <BiMinus/>}
                                </div>
                                <div hidden ref={showDropOffRef}>
                                    <p>{shipInfo?.dropOff?.info}</p>
                                    <div>Drop off address</div>
                                    <p>{shipInfo?.dropOff?.address}</p>
                                </div>
                            </div>
                            <div className="item-info-sub">
                                <div onClick={()=>toggleInfo(showPolicyRef, "policy")} className="item-info-button">
                                    <b>Return Policy </b>
                                    {toggleIcon?.policy? <BiPlus/>: <BiMinus/>}
                                </div>
                                <div hidden ref={showPolicyRef}>
                                    <p>{shipInfo?.policy}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>{description}</p>
                        </div>
                        <div>
                            <h4>Size & Fit</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor:"red"}}>
                <div className="centered-animate">
                    <Reviews useEntry productId={productId} />
                </div>
            </div>
            <BottomNavigationBar medias={shipInfo?.media} />
        </div>
    )
}