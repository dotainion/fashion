import React, { useEffect, useState } from 'react';
import { ColorsAvailable } from '../components/ColorsAvailable';
import { MenuContainer } from '../container/MenuContainer';
import defaultImage from '../images/dress.jpeg';
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from '../state/Store';
import { routes } from '../routes/Routes';
import { SizesAvailable } from '../components/SizesAvailable';
import $ from 'jquery';
import { CartItemSizeSelector } from '../components/CartItemSizeSelector';
import { SaleContent } from '../components/SaleContent';
import { BottomNavigationBar } from '../layout/BottomNavigationBar';
import bonnetImg from '../images/bonnet-search.jpg';
import { MostPopular } from '../components/MostPopular';


export const Sales = () =>{
    const { products, addToCart, searchValue, didSearch } = useStore();

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        console.log(products)
    }, [products]);
    return(
        <MenuContainer hideHomeNav >
            <div className="sales">
                {
                    products?.length?
                    products.map((data, key)=>(
                        <SaleContent data={data} key={key} />
                    )):
                    <div hidden={!didSearch} className="centered pad">
                        <div className="pad">
                            <img src={bonnetImg} alt="" />
                        </div>
                        <p>Your search <strong>{searchValue}</strong> did not match anything</p>
                        <p>Try something like</p>
                        <ul>
                            <li>Use more general terms</li>
                            <li>check your spelling</li>
                        </ul>
                    </div>
                }
                <MostPopular/>
            </div>
        </MenuContainer>
    )
}