import React, { useEffect, useState } from 'react';
import { MenuContainer } from '../container/MenuContainer';
import { useStore } from '../state/Store';
import { SaleContent } from '../components/SaleContent';
import bonnetImg from '../images/logo.jpg';
import { MostPopular } from '../components/MostPopular';


export const Sales = () =>{
    const { products, searchValue, firstLoad } = useStore();

    useEffect(()=>{
        
    }, [products]);
    return(
        <MenuContainer hideHomeNav >
            <div className="sales">
                {
                    products?.length?
                    products.map((data, key)=>(
                        <SaleContent data={data} key={key} />
                    )):
                    <div hidden={firstLoad} className="centered pad">
                        <div className="no-result-img-container">
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