import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { BsPerson, BsCart3 } from 'react-icons/bs';
import { routes } from "../routes/Routes";
import { Dropdown } from "../components/Dropdown";
import { useAuth } from "../auth/Auth";
import { categoryTypes, productTypes } from "../contents/lists";
import { useStore } from "../state/Store";
import { CartItems } from '../components/CartItems';
import { BiSearchAlt } from 'react-icons/bi';


export const NavigationBar = ({relative, hide, hideHomeNav}) =>{
    const { signOut, authenticated } = useAuth();
    const { productsByType, productsByCategory, productsSearch } = useStore();
    const navigate = useNavigate();

    const navRef = useRef();
    const searchRef = useRef();

    const navOptions = [
        {
            component: null,
            title: "Accounts",
            title2: "",
            image: "",
            icon: BsPerson,
            iconStyle: {},
            option: [
                {title: "Sign In", action: ()=>navigate(routes.singin), hidden: authenticated?.signIn},
                {title: "Sign Up", action: ()=>navigate(routes.register), hidden: authenticated?.signIn},
                {title: "Sign Out", action: ()=>signOut(), hidden: !authenticated?.signIn},
                {title: "Profile", action: ()=>navigate(routes.profile), hidden: !authenticated?.signIn || !authenticated?.isAdmin},
            ],
            option2: []
        },{
            component: CartItems,
            icon: BsCart3,
            iconStyle: {fontSize:"23px",paddingBottom:"3px"}
        }
    ];

    const onSearch = async() =>{
        if (!searchRef.current.value){
            return;
        }
        await productsSearch(searchRef.current.value);
    }

    const getProducts = (type) =>{
        navigate(routes.default);
        productsByType(type);
    }

    const getProductsCat = (category) =>{
        navigate(routes.default);
        productsByCategory(category);
    }

    useEffect(()=>{
        $(navRef.current).keypress((e)=>{
            if(e.key === "Enter"){
                onSearch();
            }
        });
    }, [hide]);

    useEffect(()=>{
        if (hide) $(navRef.current).hide("slow");
        else $(navRef.current).show("slow");
    }, [hide]);
    return(
        <div ref={navRef} className="navigation-container" style={{position:relative && "relative"}}>
            <div className="navigation-inner-container">
                <div className="navigation-mini-title-header">LIFE STYLE</div>
                <div className="navigation-navs">
                    <div className="flex-animate">
                        <div className="navigation-top-navs scroll">
                            <div className="navigation-top-navs-inner">
                                <label onClick={()=>getProductsCat(categoryTypes.kids)}>KIDS</label>
                                <label onClick={()=>getProductsCat(categoryTypes.audults)}>AUDULTS</label>
                                <label onClick={()=>getProductsCat(categoryTypes.babies)}>BABIES</label>
                                <label onClick={()=>getProductsCat(categoryTypes.women)}>WOMEN</label>
                                <label onClick={()=>getProductsCat(categoryTypes.men)}>MEN</label>
                            </div>
                        </div>
                        <div className="navigation-title-header">PRETTY LITTLE THINGS</div>
                        <div className="navigation-option-container" >
                            <div className="navigation-option-inner-container">
                                {navOptions.map((opt, key)=>(
                                    <span className="relative" key={key}>
                                        {opt?.icon && <opt.icon style={opt?.iconStyle || {}} />}
                                        {opt?.component? <opt.component/>:
                                        <Dropdown 
                                            title={opt?.title} 
                                            title2={opt?.title2}
                                            image={opt?.image || null}
                                            option={opt?.option || []} 
                                            option2={opt?.option2 || []} 
                                        />}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="navigation-lower-navs">
                        <span onClick={()=>navigate(routes.default)} hidden={hideHomeNav}>HOME</span>
                        <span onClick={()=>getProducts(productTypes.cloths)}>CLOTHS</span>
                        <span onClick={()=>getProducts(productTypes.hats)}>HATS</span>
                        <span onClick={()=>getProducts(productTypes.bonnets)}>BONNETS</span>
                        <span onClick={()=>getProducts(productTypes.headBands)}>HEAD BANDS</span>
                        <div className="nav-search">
                            <input ref={searchRef} type="search" placeholder="Search" />
                            <div onClick={onSearch}>
                                <BiSearchAlt className="float-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}