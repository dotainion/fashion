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
import { getAdminCheckout, getCheckedout, getCheckout, getCheckoutDelivered, updateAdminCheckout, updateCheckout, updateProduct } from '../data/Database';
import { useAuth } from '../auth/Auth';
import { AdminNavBar } from '../layout/AdminNavBar';


export const AdminOrders = () =>{
    const { user, authenticated } = useAuth();

    const [checkout, setCheckout] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [viewImage, setViewImage] = useState({state: false, data: null});

    const navigate = useNavigate();

    const buildListObjects = (prods) =>{
        let items = [];
        prods?.forEach((item)=>{
            item?.info?.items?.forEach((cart)=>{
                cart["id"] = item?.id;
                cart["time"] = item?.info?.time;
                cart["status"] = item?.info?.delivered;
                cart["deliveryType"] = item?.info?.deliveryType;
                cart["address"] = {
                    to: item?.info?.toAddress,
                    from: item?.info?.fromAddress
                };
                items.push(cart);
            });
        });
        return items;
    }

    const initCheckout = async() =>{
        const items = await getAdminCheckout(user?.id);
        setPendingCount(items?.length);
        setCheckout([...items]);
    }

    const updateCheckout = async(status, id) =>{
        await updateAdminCheckout({
            delivered: status
        }, id);
    }

    const updateStaus = (status, id) =>{
        if (authenticated?.isAdmin){
            return;
        }
        updateCheckout({
            delivered: status
        }, id);
        setViewImage({state: false, data:null});
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
    }, []);
    
    return(
        <div className="table-style">
            <div style={{textAlign:"left"}}>
                <AdminNavBar />
            </div>
            <h1>({pendingCount}) Sales orders</h1>
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
                        <div hidden={!authenticated?.isAdmin}>
                            <button 
                                hidden={viewImage?.data?.info?.delivered === "Pending"} 
                                onClick={()=>updateStaus("Pending", viewImage?.data?.id)} 
                                className="btn"
                            >Update as pending</button>
                            <button 
                                hidden={viewImage?.data?.info?.delivered === "Delivered"} 
                                onClick={()=>updateStaus("Delivered", viewImage?.data?.id)} 
                                className="btn"
                            >Update as delivered</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}