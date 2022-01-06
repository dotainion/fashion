import React , { useState, useEffect } from "react";
import { BsAlignBottom } from "react-icons/bs";
import { useStore } from "../state/Store";
import defaultImage from '../images/dress.jpeg';
import { SlideContainer } from "../container/SlideContainer";
import { getProductsByTitle } from "../data/Database";
import { tools } from "../tools/Tools";


export const MostPopular = () =>{
    const [popular, setPopular] = useState([]);

    const initPopular = async() =>{
        const prod = await getProductsByTitle("Bonnet", 7);
        const prodImage = tools.prodImageSanitize(prod);
        setPopular(prodImage);
    }

    useEffect(()=>{
        initPopular();
    }, []);
    return(
        <SlideContainer data={popular}>
            <h1>Most Popular Products</h1>
        </SlideContainer>
    )
}