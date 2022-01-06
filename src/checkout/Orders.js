import React, { useEffect, useState } from 'react';
import { GiCardPickup } from 'react-icons/gi';
import { FaShuttleVan } from 'react-icons/fa';
import bonnet from '../images/bonnets.jpeg';
import { FcHome } from 'react-icons/fc';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/Routes';
import { TransitBar } from '../components/TransitBar';
import { CheckoutNavBar } from '../layout/CheckoutNavBar';
import { getCheckedout, getCheckout, getCheckoutDelivered, updateCheckout, updateProduct } from '../data/Database';
import { useAuth } from '../auth/Auth';


export const Orders = () =>{
    const { user } = useAuth();

    const [checkout, setCheckout] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [viewImage, setViewImage] = useState({state: false, data: null});

    const navigate = useNavigate();

    const initCheckout = async() =>{
        const items = await getCheckout(user?.id);
        setPendingCount(items?.length);
        setCheckout([...items]);
    }

    const initDelivered = async() =>{
        const items = await getCheckoutDelivered(user?.id);
        setDelivered([...items]);
    }

    const isValidDate = (date) =>{
        const time = new Date(date).toLocaleString();
        if (time === "Invalid Date"){
            return "Date not provided";
        }
        return time;
    }

    useEffect(()=>{
        initCheckout();
        initDelivered();
    }, []);
    
    return(
        <div className="table-style">
            <CheckoutNavBar />
            <h1>Scheduled delivery:</h1>
            <h1>Orders</h1>
            <TransitBar level={1} />
            <h2>({pendingCount}) IN TRANSIT</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Quantity</th>
                        <th>Title</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {checkout.map?.((history, key)=>(
                        <tr onClick={()=>setViewImage({data: history, state: true})} key={key}>
                            <td>{isValidDate(history?.info?.time)}</td>
                            <td>{history?.info?.items?.qty}</td>
                            <td>{history?.info?.items?.title}</td>
                            <td>{history?.info?.items?.size}</td>
                            <td>{"$" + history?.info?.items?.price}</td>
                            <td><b>{history?.info?.deliveryType?.toUpperCase?.()}</b></td>
                            <td>{history?.info?.delivered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>HISTORY</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Quantity</th>
                        <th>Title</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {delivered.map?.((history, key)=>(
                        <tr onClick={()=>setViewImage({data: history, state: true})} key={key}>
                            <td>{isValidDate(history?.info?.time)}</td>
                            <td>{history?.info?.items?.qty}</td>
                            <td>{history?.info?.items?.title}</td>
                            <td>{history?.info?.items?.size}</td>
                            <td>{"$" + history?.info?.items?.price}</td>
                            <td><b>{history?.info?.deliveryType?.toUpperCase?.()}</b></td>
                            <td>{history?.info?.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div hidden={!viewImage?.state} className="transit-popover">
                <div className="close" onClick={()=>setViewImage({state: false, data:null})}>X</div>
                <div className="flex">
                    <img src={viewImage?.data?.info?.items?.image} alt=""/>
                    <div className="pad max-width">
                        <div className="pad">
                            <h4>FROM</h4>
                            <div>{viewImage?.data?.info?.fromAddress}</div>
                        </div>
                        <div className="pad">
                            <h4>TO</h4>
                            <div>{viewImage?.data?.info?.toAddress}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}