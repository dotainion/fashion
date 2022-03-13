import React, { useEffect } from 'react';
import { app } from '../contents/appInfos';
import logo from '../images/logo.jpg';
import { useStore } from '../state/Store';


export const LandingPage = () =>{
    const { landingProducts, onViewProduct } = useStore();

    return(
        <div className="landing-page">
            <div className="header">
                <div>
                    <div>Home</div>
                </div>
                <div className="flex max-width">
                    <div className="max-width relative">
                        <div className="modal">
                            <h1>{app.name}</h1>
                            <h3>Phone Number</h3>
                            <h2>{app.number}</h2>
                            <h3>email</h3>
                            <h2>{app.email}</h2>
                        </div>
                    </div>
                    <div className="max-width">
                        <div className="text-center">
                            <img className="logo" src={logo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                {landingProducts.map((product, key)=>(
                    <div onClick={()=>onViewProduct(product)} className="landing-page-products" key={key}>
                        <div className="landing-page-flex">
                            <div>
                                <img src={product?.info?.images?.[0]} alt="" />
                            </div>
                            <div>
                                <h1>New!</h1>
                                <h3>{product?.info?.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}