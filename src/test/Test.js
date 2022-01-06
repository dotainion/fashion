import React, { useEffect, useRef } from 'react';
import { getSearch } from '../data/Collection';
import { autoSave } from '../tools/AutoSave';
import { Input } from '../Widgets/Input';


export const Test = () =>{
    const inputRef = useRef();

    const search = async() =>{
        console.log(await getSearch("products", "title", "Bonnet"));
    }

    useEffect(()=>{
        
    }, []);
    return(
        <div className="text-center">
            <Input />
            <button onClick={search} className="btn">Search</button>
        </div>
    )
}