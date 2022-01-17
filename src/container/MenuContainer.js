import React, { useEffect, useState } from 'react';
import { NavigationBar } from '../layout/NavigationBar';
import tag from '../images/tag.png';
import offer from '../images/offer.jpg';
import { availableSizes, availableSizesObj, optionalProductTypes } from '../contents/lists';
import { Checkbox } from '../Widgets/Checkbox';
import { Input } from '../Widgets/Input';
import { useStore } from '../state/Store';
import { BottomNavigationBar } from '../layout/BottomNavigationBar';
import { MostPopular } from '../components/MostPopular';
import $ from 'jquery';


export const MenuContainer = ({children, hideHomeNav}) =>{
    const { productsByType, initProducts } = useStore();

    const [hideNav, setHideNav] = useState(false);

    const onFilter = (type=null) =>{
        if (type === null){
            initProducts(); 
        }else{
            productsByType(type);
        }
    }

    useEffect(()=>{
        $("#root").scroll((e)=>{
            if (e.currentTarget.scrollTop > 100) setHideNav(true);
            else setHideNav(false);
        })
    }, []);
    return(
        <div className="">
            <div className="hide-scroll relative">
                <NavigationBar hide={hideNav} hideHomeNav={hideHomeNav} />
                <div className="hide-scroll">
                    <div className="hide-scroll flex-animate">
                        <div className="side-menu-container">
                            <div className="side-menu-inner-container">
                                <div className="side-menu-filter-container">
                                    <div className="side-menu-hader">PRETTY LITTLE THINGS</div>
                                    <img src={offer} alt="" />
                                    <h4>Filer</h4>
                                    {Object.values(optionalProductTypes).map((type, key)=>(
                                        <div onClick={()=>onFilter(type)} className="side-menu-filter-hover" key={key}>
                                            <label>{type}</label>
                                        </div>
                                    ))}
                                    <div onClick={()=>onFilter()} className="side-menu-filter-hover">
                                        <label>VIEW ALL</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="side-menu-children-container hide-scroll">{children}</div>
                    </div>
                </div>
                <BottomNavigationBar/>
            </div>
        </div>
    )
}