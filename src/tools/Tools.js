import React from 'react';
import $ from 'jquery';


class Tools{
    maintainValidNumber = (e) =>{
        if (e.currentTarget.value <= 0) e.currentTarget.value = 1;
        if (e.key.toLowerCase() != e.key.toUpperCase()){
            e.currentTarget.value = e.currentTarget.value.replace(e.key, "");
        }
    }
    nestedArrToObj(nestedArray){
        let index = 0;
        let arraysOfobj = [];
        for(let array of nestedArray){
            let obj = {};
            obj[index] = array
            arraysOfobj.push(obj);
            index ++;
        }
        return arraysOfobj;
    }
    nestedObjToArr(nestedObj){
        let nestedArrays = [];
        for(let obj of nestedObj){
            const valueArr = Object.values(obj);
            nestedArrays.push(valueArr?.[0]);
        }
        return nestedArrays;
    }
    prodImageSanitize(products){
        let configProducts = [];
        for(let product of products){
            product["info"]["images"] = tools.nestedObjToArr(product?.info?.images);
            configProducts.push(product);
        }
        return configProducts;
    }
    async toBase64(file){
        try{
            return await new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file); 
            });
        }catch(error){
            console.log(error)
            return null;
        }
    };
    shakeElement(element){
        const position = $(element).css("position");
        const color = $(element).css("color");
        let posL = null;
        let posR = null
        if (position === "absolute"){
            posL = parseFloat($(element).css("padding-left"));
            posR = parseFloat($(element).css("padding-right"));
        }else{
            posL = parseFloat($(element).css("margin-left"));
            posR = parseFloat($(element).css("margin-right"));
        }
        let state = false;
        const intervalRef = setInterval(() => {
            $(element).css({color: "red"});
            if (!state){
                state = true;
                if (position === "absolute"){
                    $(element).css({paddingLeft: `${posL - 5}px`});
                    $(element).css({paddingRight: `${posR + 5}px`});
                }else{
                    $(element).css({marginLeft: `${posL - 5}px`});
                    $(element).css({marginRight: `${posR + 5}px`});
                }
            }else{
                state = false;
                if (position === "absolute"){
                    $(element).css({paddingLeft: `${posL}px`});
                    $(element).css({paddingRight: `${posR}px`});
                }else{
                    $(element).css({marginLeft: `${posL}px`});
                    $(element).css({marginRight: `${posR}px`});
                }
            }
        }, 100);
        setTimeout(() => {
            $(element).css({color: color});
            if (position === "absolute"){
                $(element).css({paddingLeft: `${posL}px`});
                $(element).css({paddingRight: `${posR}px`});
            }else{
                $(element).css({marginLeft: `${posL}px`});
                $(element).css({marginRight: `${posR}px`});
            }
            clearInterval(intervalRef);
        }, 700);
    }
}

export const tools = new Tools();