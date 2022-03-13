import React, { useEffect, useRef } from 'react';
import { getSearch } from '../data/Collection';
import { autoSave } from '../tools/AutoSave';
import { Input } from '../Widgets/Input';
import { Checkbox } from '../Widgets/Checkbox';
import { Textarea } from '../Widgets/Textarea';
import { Select } from '../Widgets/Select';


export const Test = () =>{
    const inputRef = useRef();

    const search = async() =>{
        console.log(await getSearch("products", "title", "Bonnet"));
    }

    useEffect(()=>{
        
    }, []);
    return(
        <div className="text-center">
            <Input title={'testing title'} />
            <Checkbox title={'this is a test'} />
            <Textarea title={'this is a test'} />
            <Select title={'hello world'} />
        </div>
    )
}